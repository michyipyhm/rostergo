import { NextRequest, NextResponse } from "next/server";
import { employeeService } from "@/services/employeeService";

export async function GET(request: NextRequest) {
  try {
    const employees = await employeeService.getEmployees();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}