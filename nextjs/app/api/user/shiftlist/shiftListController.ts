import { mobileShiftListService } from "@/services/user/shiftListService";
import { NextRequest, NextResponse } from "next/server";

export async function getShiftList(req: NextRequest) {
  const jwtPayloadString = req.headers.get("x-jwt-payload");

  if (!jwtPayloadString) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const jwtPayload = JSON.parse(jwtPayloadString);

  const userId = jwtPayload.id;

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    const shifts = await mobileShiftListService.getShiftListById(userId);

    console.log("shift from shift list controller: ", shifts);

    return NextResponse.json(shifts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get shift list" },
      { status: 500 }
    );
  }
}
