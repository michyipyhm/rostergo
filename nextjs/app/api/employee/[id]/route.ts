import { NextRequest, NextResponse } from "next/server";
import { employeeService } from "@/services/EmployeeService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await employeeService.getEmployeesById(params.id);
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employee" },
      { status: 500 }
    );
  }
}