
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states/q?country=India",
      {
        cache: "force-cache",
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "States service is temporarily unavailable." },
        { status: 502 }
      );
    }

    const result = await response.json();

    if (result.error || !Array.isArray(result.data?.states)) {
      return NextResponse.json(
        { error: "Could not retrieve Indian states." },
        { status: 502 }
      );
    }

    const states = result.data.states
      .map((item: { name: string }) => item.name)
      .filter(Boolean)
      .sort((a: string, b: string) => a.localeCompare(b));

    return NextResponse.json({ states });
  } catch {
    return NextResponse.json(
      { error: "Unable to load states." },
      { status: 502 }
    );
  }
}
