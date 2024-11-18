import { getUserShifts } from "@/services/user/calendarPageService";
import { NextRequest, NextResponse } from "next/server";

export async function handleGetShifts(req: NextRequest) {
  // Verify the token
  const userIdParam = req.headers.get("userId");
  const userId = parseInt(userIdParam);

  console.log("userIdParam:", userIdParam);
  
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
