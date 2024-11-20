import { NextResponse, NextRequest } from "next/server";
import { payslipsService } from "@/services/user/payslipsService";

interface Payload {
  id: number;
  nickname: string;
  admin: boolean;
  type: 'Full Time' | 'Part Time';
}

export async function GET(req: NextRequest) {
  console.log("Payslips API route called");

  try {
    const payloadString = req.headers.get("x-jwt-payload");
    if (!payloadString) {
      return NextResponse.json({ error: "No payload found in headers" }, { status: 400 });
    }

    const payload: Payload = JSON.parse(payloadString);
    console.log("Decoded JWT payload:", payload);

    const userId = payload.id;
    if (!userId) {
      return NextResponse.json({ error: "UserId not found in payload" }, { status: 400 });
    }

    console.log(`Fetching payslip data for userId: ${userId}, type: ${payload.type}`);

    let data;
    if (payload.type === 'Part Time') {
      data = await payslipsService.getPayslipsByPTid(userId);
    } else if (payload.type === 'Full Time') {
      data = await payslipsService.getPayslipsByFTid(userId);
    } else {
      return NextResponse.json({ error: "Invalid employee type" }, { status: 400 });
    }

    if (!data) {
      console.log(`No payslip data found for userId: ${userId}`);
      return NextResponse.json({ error: "No payslip data found for this userId" }, { status: 404 });
    }

    console.log("Payslip data fetched successfully");
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error in payslips API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}