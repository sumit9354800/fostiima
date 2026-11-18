import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { isValidIndianMobile } from "@/lib/phone";
import {
  attributionSummary,
  resolveLeadAttribution,
} from "@/lib/lead-attribution";
import { isTurnstileEnforced, verifyTurnstile } from "@/lib/turnstile";
import {
  GRADUATION_STATUS_OPTIONS,
  QUALIFYING_EXAM_LABEL,
  QUALIFYING_EXAM_OPTIONS,
  isOneOf,
} from "@/lib/admission-form-options";
import { isMissingColumnError } from "@/lib/prisma-missing-column";

export const runtime = "nodejs";

type AdmissionEnquiryBody = {
  fullName?: unknown;
  mobile?: unknown;
  email?: unknown;
  state?: unknown;
  city?: unknown;
  course?: unknown;
  graduationStatus?: unknown;
  qualifyingExam?: unknown;
  remarks?: unknown;
  consent?: unknown;
  source?: unknown;
  attribution?: unknown;
  turnstileToken?: unknown;
};

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createAdmissionEmail(data: {
  fullName: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  course: string;
  graduationStatus: string;
  qualifyingExam: string;
  remarks: string;
  attributionRows: [string, string][];
}) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:35%;vertical-align:top">
        ${label}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#061a3a;font-size:14px;font-weight:600">
        ${escapeHtml(value || "Not provided")}
      </td>
    </tr>
  `;

  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
        <div style="max-width:700px;margin:0 auto;padding:32px 16px">
          <div style="background:#fff;border:1px solid #dbe3ee;border-radius:14px;overflow:hidden">
            <div style="background:#061a3a;padding:28px 32px">
              <h1 style="margin:0;color:#fff;font-size:22px">New Admission Enquiry</h1>
              <p style="margin:8px 0 0;color:#b8c5d8;font-size:14px">FOSTIIMA Business School</p>
            </div>
            <div style="padding:28px 32px">
              <table style="width:100%;border-collapse:collapse">
                ${row("Full Name", data.fullName)}
                ${row("Mobile Number", data.mobile)}
                ${row("Email Address", data.email)}
                ${row("State", data.state)}
                ${data.city ? row("City", data.city) : ""}
                ${row("Course", data.course)}
                ${row("Graduation Status", data.graduationStatus)}
                ${row(QUALIFYING_EXAM_LABEL, data.qualifyingExam)}
              </table>
              <div style="margin-top:24px">
                <p style="font-weight:700;color:#061a3a">Remarks</p>
                <div style="padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;color:#475569;font-size:14px;line-height:1.7;white-space:pre-wrap">${escapeHtml(data.remarks || "No remarks provided")}</div>
              </div>
              <p style="margin-top:24px;font-weight:700;color:#061a3a">Lead Attribution</p>
              <table style="width:100%;border-collapse:collapse">
                ${data.attributionRows.map(([label, value]) => row(label, value)).join("")}
              </table>
              <p style="margin-top:24px;color:#94a3b8;font-size:12px">
                This enquiry was submitted through the FOSTIIMA website.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    let body: AdmissionEnquiryBody;

    try {
      body = (await request.json()) as AdmissionEnquiryBody;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const fullName = cleanText(body.fullName, 150);
    const mobile = cleanText(body.mobile, 20).replace(/\D/g, "");
    const email = cleanText(body.email, 254).toLowerCase();
    const state = cleanText(body.state, 100);
    // City was removed from the form (November 2026). Still accepted if a
    // client sends it; otherwise stored as "" because the column is NOT NULL.
    const city = cleanText(body.city, 150);
    const course = cleanText(body.course, 100) || "PGDM";
    const graduationStatus = cleanText(body.graduationStatus, 100);
    const qualifyingExam = cleanText(body.qualifyingExam, 50);
    const remarks = cleanText(body.remarks, 5000);
    // Derived server-side from the validated raw attribution
    // (lib/lead-attribution.ts). Any client-supplied body.source is ignored.
    const { attribution, classification, source } = resolveLeadAttribution(
      body.attribution,
    );

    if (
      !fullName ||
      !mobile ||
      !email ||
      !state ||
      !graduationStatus ||
      !qualifyingExam
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    if (!isOneOf(GRADUATION_STATUS_OPTIONS, graduationStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid graduation status.",
        },
        { status: 400 },
      );
    }

    if (!isOneOf(QUALIFYING_EXAM_OPTIONS, qualifyingExam)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select whether you have qualified CAT, MAT or XAT.",
        },
        { status: 400 },
      );
    }

    if (mobile.length !== 10 || !isValidIndianMobile(mobile)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid 10-digit mobile number.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (body.consent !== true) {
      return NextResponse.json(
        {
          success: false,
          error: "Please accept the communication consent to continue.",
        },
        { status: 400 },
      );
    }

    // Bot check before anything is stored or emailed (see lib/turnstile.ts).
    if (isTurnstileEnforced()) {
      const remoteIp =
        request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        null;
      const verification = await verifyTurnstile(body.turnstileToken, remoteIp);
      if (!verification.ok) {
        return NextResponse.json(
          { success: false, error: verification.error },
          { status: verification.status },
        );
      }
    }

    // Save first so email issues never cause the enquiry to be lost.
    const baseData = {
      fullName,
      mobile,
      email,
      state,
      city,
      course,
      graduationStatus,
      remarks: remarks || null,
      consent: true,
      // Server-derived label. The raw attribution columns are not in the
      // production database yet; the details still go in the email below.
      source,
      status: "NEW",
      emailSent: false,
    };
    const createSelect = { id: true, createdAt: true } as const;

    let enquiry: { id: string; createdAt: Date };
    try {
      enquiry = await prisma.admissionEnquiry.create({
        data: { ...baseData, qualifyingExam },
        select: createSelect,
      });
    } catch (createError) {
      // Until the qualifyingExam column exists in the live database, save the
      // lead without it rather than lose it. The answer is still emailed.
      if (!isMissingColumnError(createError, "qualifyingExam")) {
        throw createError;
      }
      console.error(
        "[ADMISSION_QUALIFYING_EXAM_COLUMN_MISSING]",
        "Run prisma/manual-migrations/2026-11-18-add-admission-qualifying-exam.sql",
      );
      enquiry = await prisma.admissionEnquiry.create({
        data: baseData,
        select: createSelect,
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail =
      process.env.ADMISSIONS_EMAIL || process.env.CONTACT_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      const configError =
        "Admission email configuration is missing. Check RESEND_API_KEY, RESEND_FROM_EMAIL and ADMISSIONS_EMAIL (or CONTACT_EMAIL).";

      console.error("[ADMISSION_EMAIL_CONFIG]", configError);

      await prisma.admissionEnquiry.update({
        where: { id: enquiry.id },
        data: { emailError: configError },
      });

      return NextResponse.json(
        {
          success: true,
          message:
            "Your enquiry has been recorded successfully. Our team will follow up with you.",
          enquiryId: enquiry.id,
        },
        { status: 201 },
      );
    }

    try {
      const resend = new Resend(apiKey);

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `New Admission Enquiry — ${fullName}`,
        html: createAdmissionEmail({
          fullName,
          mobile,
          email,
          state,
          city,
          course,
          graduationStatus,
          qualifyingExam,
          remarks,
          attributionRows: attributionSummary(attribution, classification),
        }),
      });

      if (error) {
        console.error("[ADMISSION_EMAIL_ERROR]", error);

        await prisma.admissionEnquiry.update({
          where: { id: enquiry.id },
          data: {
            emailSent: false,
            emailError: JSON.stringify(error).slice(0, 5000),
          },
        });
      } else {
        await prisma.admissionEnquiry.update({
          where: { id: enquiry.id },
          data: {
            emailSent: true,
            emailError: null,
          },
        });
      }
    } catch (emailError) {
      console.error("[ADMISSION_EMAIL_EXCEPTION]", emailError);

      try {
        await prisma.admissionEnquiry.update({
          where: { id: enquiry.id },
          data: {
            emailSent: false,
            emailError:
              emailError instanceof Error
                ? emailError.message.slice(0, 5000)
                : "Unknown email delivery error",
          },
        });
      } catch (updateError) {
        console.error("[ADMISSION_EMAIL_LOG_UPDATE_ERROR]", updateError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your admission enquiry has been submitted successfully.",
        enquiryId: enquiry.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[ADMISSION_ENQUIRY_POST]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit your enquiry right now. Please try again.",
      },
      { status: 500 },
    );
  }
}