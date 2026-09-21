import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { generateOtp, getOtpExpiry, hashOtp } from "@/lib/otp";
import { contactEmail, resend } from "@/lib/email/resend";

const OTP_COOLDOWN_SECONDS = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        { status: 400 },
      );
    }

    const existingOtp = await prisma.emailOtp.findFirst({
      where: {
        email,
        verified: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (existingOtp) {
      const secondsSinceLastOtp = Math.floor(
        (Date.now() - existingOtp.createdAt.getTime()) / 1000,
      );

      if (secondsSinceLastOtp < OTP_COOLDOWN_SECONDS) {
        const remainingSeconds = OTP_COOLDOWN_SECONDS - secondsSinceLastOtp;

        return NextResponse.json(
          {
            success: false,
            message: `Please wait ${remainingSeconds} seconds before requesting another code.`,
          },
          { status: 429 },
        );
      }
    }

    await prisma.emailOtp.deleteMany({
      where: {
        email,
        verified: false,
      },
    });

    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = getOtpExpiry();

    await prisma.emailOtp.create({
      data: {
        email,
        otpHash,
        expiresAt,
      },
    });

    const { error } = await resend.emails.send({
      from: "FOSTIIMA Business School <no-reply@fostiima.org>",
      to: email,
      subject: "Your FOSTIIMA verification code",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 24px;
        ">
          <h2 style="color: #061a3a;">
            FOSTIIMA Business School
          </h2>

          <p>
            Your email verification code is:
          </p>

          <div style="
            display: inline-block;
            padding: 12px 20px;
            background: #f8fafc;
            border: 1px solid #dbe3ee;
            border-radius: 8px;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 6px;
            color: #c31e3b;
          ">
            ${otp}
          </div>

          <p style="margin-top: 20px;">
            This code is valid for 5 minutes.
          </p>

          <p style="
            color: #64748b;
            font-size: 13px;
          ">
            If you did not request this code,
            you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND OTP ERROR:", {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });

      await prisma.emailOtp.deleteMany({
        where: {
          email,
          otpHash,
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Unable to send verification code.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error) {
    console.error("OTP send error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending the verification code.",
      },
      { status: 500 },
    );
  }
}
