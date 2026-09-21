import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  hashOtp,
  OTP_MAX_ATTEMPTS,
} from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const otp =
      typeof body.otp === "string"
        ? body.otp.trim()
        : "";

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email and verification code are required.",
        },
        { status: 400 },
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Verification code must be 6 digits.",
        },
        { status: 400 },
      );
    }

    const otpRecord =
      await prisma.emailOtp.findFirst({
        where: {
          email,
          verified: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (!otpRecord) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Verification code not found. Please request a new code.",
        },
        { status: 404 },
      );
    }

    if (otpRecord.expiresAt.getTime() < Date.now()) {
      await prisma.emailOtp.delete({
        where: {
          id: otpRecord.id,
        },
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Verification code has expired. Please request a new code.",
        },
        { status: 400 },
      );
    }

    if (
      otpRecord.attempts >=
      OTP_MAX_ATTEMPTS
    ) {
      await prisma.emailOtp.delete({
        where: {
          id: otpRecord.id,
        },
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Too many incorrect attempts. Please request a new code.",
        },
        { status: 429 },
      );
    }

    const hashedOtp = hashOtp(otp);

    if (hashedOtp !== otpRecord.otpHash) {
      const updatedAttempts =
        otpRecord.attempts + 1;

      await prisma.emailOtp.update({
        where: {
          id: otpRecord.id,
        },
        data: {
          attempts: updatedAttempts,
        },
      });

      const remainingAttempts =
        OTP_MAX_ATTEMPTS -
        updatedAttempts;

      return NextResponse.json(
        {
          success: false,
          message:
            remainingAttempts > 0
              ? `Incorrect code. ${remainingAttempts} attempts remaining.`
              : "Too many incorrect attempts. Please request a new code.",
        },
        { status: 400 },
      );
    }

    await prisma.emailOtp.update({
      where: {
        id: otpRecord.id,
      },
      data: {
        verified: true,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Email verified successfully.",
    });
  } catch (error) {
    console.error(
      "OTP verification error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while verifying the code.",
      },
      { status: 500 },
    );
  }
}