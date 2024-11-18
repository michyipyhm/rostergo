import { mobileProfileService } from "@/services/user/profileService";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const payload = JSON.parse(req.headers.get("x-jwt-payload"));
  console.log("check verified payload", payload);
  const userIdParam = payload.id;
  if (!userIdParam) {
    return NextResponse.json(
      { error: "UserId not provided in headers" },
      { status: 400 }
    );
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
