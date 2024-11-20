import { NextRequest, NextResponse } from "next/server";
import { branchService } from "@/services/admin/BranchService";
import { jwtDecode } from "jwt-decode";
import { Payload } from "@/lib/models";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    const payload = jwtDecode<Payload>(token)
    const branch_id = payload.branch_id
    
    const branch = await branchService.getBranchData(branch_id)
    return NextResponse.json(branch)
  } catch (error) {
    console.error("Error fetching API")
    return NextResponse.json(
      { error: "Failed to fetch API" },
      { status: 500 }
    )
  }
}