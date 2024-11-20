import { NextRequest, NextResponse } from "next/server";
import { shiftSlotService } from "@/services/admin/shiftSlotService";
import { jwtDecode } from "jwt-decode";
import { Payload } from "@/lib/models";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    const payload = jwtDecode<Payload>(token)
    const branch_id = payload.branch_id

    const position = await shiftSlotService.getShiftSlot(branch_id)
    return NextResponse.json(position)
  } catch (error) {
    console.error("Error fetching API")
    return NextResponse.json(
      { error: "Failed to fetch API" },
      { status: 500 }
    )
  }
}