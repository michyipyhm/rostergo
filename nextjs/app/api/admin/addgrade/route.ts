import { NextRequest, NextResponse } from "next/server";
import { branchService } from "@/services/admin/BranchService";

export async function POST(req: NextRequest) {
  try {
    const { name, annualLeaveQuota } = await req.json()

    await branchService.addGrade(name, annualLeaveQuota)

    return NextResponse.json(
      { success: true, message: "Grade added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding grade:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}