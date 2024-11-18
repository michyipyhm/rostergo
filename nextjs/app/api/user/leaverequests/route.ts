import { getLeaveRequestlistByUserId } from "@/services/user/leaveRequestsService";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
 
  const jwtPayloadString = req.headers.get("x-jwt-payload");

  if (!jwtPayloadString) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  
  const jwtPayload = JSON.parse(jwtPayloadString);

  const userId = jwtPayload.id;

  console.log("userid from jwt:", userId);
  // Validate userId
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    // Fetch leave request list by userId
    const data = await getLeaveRequestlistByUserId(userId);

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