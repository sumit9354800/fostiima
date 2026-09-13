import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Admissions API is under development.",
  });
}