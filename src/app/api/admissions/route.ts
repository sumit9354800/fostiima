import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const ALLOWED_PROGRAMMES = new Set([
  "PGDM",
  "MBA",
]);

const MAX_NAME_LENGTH = 150;
const MAX_PHONE_LENGTH = 30;
const MAX_STATE_LENGTH = 100;
const MAX_DISTRICT_LENGTH = 100;

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = cleanString(body.fullName);
    const email = cleanString(body.email).toLowerCase();
    const phone = cleanString(body.phone);
    const state = cleanString(body.state);
    const district = cleanString(body.district);
    const programme = cleanString(body.programme);
    const consent = body.consent === true;

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required.",
        },
        { status: 400 },
      );
    }

    if (fullName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is too long.",
        },
        { status: 400 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email address is required.",
        },
        { status: 400 },
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required.",
        },
        { status: 400 },
      );
    }

    if (phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is too long.",
        },
        { status: 400 },
      );
    }

    if (!state) {
      return NextResponse.json(
        {
          success: false,
          message: "State is required.",
        },
        { status: 400 },
      );
    }

    if (state.length > MAX_STATE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: "State value is too long.",
        },
        { status: 400 },
      );
    }

    if (!district) {
      return NextResponse.json(
        {
          success: false,
          message: "District is required.",
        },
        { status: 400 },
      );
    }

    if (district.length > MAX_DISTRICT_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: "District value is too long.",
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_PROGRAMMES.has(programme)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid programme.",
        },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          message: "Consent is required.",
        },
        { status: 400 },
      );
    }

    const verifiedOtp = await prisma.emailOtp.findFirst({
      where: {
        email,
        verified: true,
        verifiedAt: {
          not: null,
        },
      },
      orderBy: {
        verifiedAt: "desc",
      },
    });

    if (!verifiedOtp) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please verify your email address before submitting the application.",
        },
        { status: 403 },
      );
    }

    const verificationAge =
      Date.now() -
      (verifiedOtp.verifiedAt?.getTime() ?? 0);

    const VERIFIED_EMAIL_WINDOW_MS =
      15 * 60 * 1000;

    if (
      verificationAge < 0 ||
      verificationAge > VERIFIED_EMAIL_WINDOW_MS
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email verification has expired. Please verify your email again.",
        },
        { status: 403 },
      );
    }

    const existingApplication =
      await prisma.admissionApplication.findFirst({
        where: {
          email,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An application has already been submitted with this email address.",
        },
        { status: 409 },
      );
    }

    const application =
      await prisma.admissionApplication.create({
        data: {
          fullName,
          email,
          phone,
          state,
          district,
          programme,
          consent,
          status: "NEW",
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your application has been submitted successfully.",
        applicationId: application.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Admission application error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your application.",
      },
      { status: 500 },
    );
  }
}