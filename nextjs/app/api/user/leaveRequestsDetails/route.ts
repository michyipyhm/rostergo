import { NextResponse, NextRequest } from 'next/server';

import { jwtVerify } from 'jose';
import { getLeaveRequestDetailByUserId } from '@/services/user/leaveRequestsDetailService';

const SECRET_KEY = new TextEncoder().encode('your-secret-key'); // 替换为你的密钥

export async function GET(req: NextRequest) {
  // Retrieve userId from request headers and parse it
  const userIdParam = req.headers.get("userId");
  const userId = parseInt(userIdParam);

  // Validate userId
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    // Fetch leave request list by userId
    const data = await getLeaveRequestDetailByUserId(userId);

    // Check if data was found
    if (!data) {
      return NextResponse.json(
        { error: "No data found for the specified userId" },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}