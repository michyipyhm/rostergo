import { mobileProfileService } from "@/services/user/ProfileService";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const userIdParam = req.headers.get("userId");

    if (!userIdParam) {
      return NextResponse.json({ error: "UserId not provided in headers" }, { status: 400 });
  }
  
    const userId = parseInt(userIdParam);

     // Validate userId
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    const data = await mobileProfileService.getProfileByUserId(userId);

    // Check if data was found
    if (!data) {
      return NextResponse.json(
        { error: "No profile found for this userId" },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
