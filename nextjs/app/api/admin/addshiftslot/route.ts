import { NextRequest, NextResponse } from "next/server";
import { shiftSlotService } from "@/services/admin/shiftSlotService";
import { jwtDecode } from "jwt-decode";
import { Payload } from "@/lib/models";

export async function POST(req: NextRequest) {
    
  try {
    const { title, short_title, start_time, end_time } = await req.json()

    const token = req.headers.get('Authorization')?.split(' ')[1]
    const payload = jwtDecode<Payload>(token)
    const branch_id = payload.branch_id

    await shiftSlotService.addShiftSlot(branch_id, title, short_title, start_time, end_time)

    return NextResponse.json(
      { success: true, message: "Shift Slot added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding Shift Slot:", error);

    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}