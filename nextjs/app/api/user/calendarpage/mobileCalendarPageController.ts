import { getUserShifts } from "@/services/user/calendarPageService";
import { NextRequest, NextResponse } from "next/server";

export async function handleGetShifts(req: NextRequest) {
  // Verify the token
  // const userIdParam = req.headers.get("userId");

  const jwtPayloadString = req.headers.get("x-jwt-payload");

  if (!jwtPayloadString) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  
  const jwtPayload = JSON.parse(jwtPayloadString);

  const userId = jwtPayload.id;

  console.log("userid from jwt:", userId);

  // const userId = parseInt(payload.id);

  // Validate userId
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }
  try {
    const shifts = await getUserShifts(userId);
    console.log("Shifts:", shifts);
    return NextResponse.json(shifts);
  } catch (error) {
    console.error("Error in handleGetShifts:", error);
    return NextResponse.json(
      { error: "Invalid token or internal server error" },
      { status: 401 }
    );
  }
}
