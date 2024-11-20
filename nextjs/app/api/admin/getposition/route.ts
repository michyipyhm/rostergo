import { NextRequest, NextResponse } from "next/server";
import { branchService } from "@/services/admin/BranchService";

export async function GET(request: NextRequest) {
  try {
    const position = await branchService.getPositionData()
    return NextResponse.json(position)
  } catch (error) {
    console.error("Error fetching API")
    return NextResponse.json(
      { error: "Failed to fetch API" },
      { status: 500 }
    )
  }
}