import { payslipsService } from "@/services/user/payslipsService";
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
    const payslipData = await payslipsService.getPayslipsByUserId(userId);

    // Check if data was found
    if (!payslipData) {
      return NextResponse.json(
        { error: "No payslipData found for this userId" },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json({ payslipData });
  } catch (error) {
    console.error("Error fetching payslipData", error);
    return NextResponse.json(
      { error: " 33 Internal Server Error" },
      { status: 500 }
    );
  }
}
