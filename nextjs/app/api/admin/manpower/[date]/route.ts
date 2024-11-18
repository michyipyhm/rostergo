import { NextRequest, NextResponse } from "next/server";
import { manpowerService } from "@/services/manpowerService";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.pathname.split("/").pop()

  if (!date) {
    return NextResponse.json({ error: "Invalid date parameter" }, { status: 400 });
  }

  try {
    const data = await manpowerService.getDailyManpower(date);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}