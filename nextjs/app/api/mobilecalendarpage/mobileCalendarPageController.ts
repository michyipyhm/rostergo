import { getUserShifts } from "@/services/mobileCalendarPageService";
import { NextRequest, NextResponse } from "next/server";
import jose from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY);

export async function handleGetShifts(request: NextRequest) {
  // Verify the token
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    
    // Use the user ID from the token payload
    const userId = payload.userId as number;

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in token' }, { status: 400 });
    }

    const shifts = await getUserShifts(userId);
    return NextResponse.json(shifts);
  } catch (error) {
    console.error('Error in handleGetShifts:', error);
    return NextResponse.json({ error: 'Invalid token or internal server error' }, { status: 401 });
  }
}
