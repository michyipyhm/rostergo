import { NextRequest, NextResponse } from "next/server";
import { branchService } from "@/services/admin/BranchService";

export async function POST(req: NextRequest) {
  try {
    const { id, name, annualLeaveQuota } = await req.json()

    await branchService.updateGrade(id, name, annualLeaveQuota)

    return NextResponse.json(
      { success: true, message: "Grade updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating grade:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}