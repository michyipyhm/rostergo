import { NextRequest, NextResponse } from "next/server";
import { shiftSlotService } from "@/services/admin/shiftSlotService";

export async function POST(req: NextRequest) {
  try {
    const { name, short_name, quota } = await req.json()

    await shiftSlotService.addLeaveType(name, short_name, quota)

    return NextResponse.json(
      { success: true, message: "Leave Type added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding Leave Type:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}