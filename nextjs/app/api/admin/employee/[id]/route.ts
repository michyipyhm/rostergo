import { NextRequest, NextResponse } from "next/server";
import { adminEmployeeService } from "@/services/admin/employeeService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const {id} = params
  if (!id) {
    return NextResponse.json(
      { error: "Employee ID is required" },
      { status: 400 }
    );
  }

  try {
    const employee = await adminEmployeeService.getEmployeeById(id);
    console.log("Found employee:", employee);

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json(
      { error: "Failed to fetch employee details" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const {id} = await params;
  if(!id){
    return NextResponse.json(
      { error: "Employee ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const updatedEmployee = await adminEmployeeService.updateEmployee(
      id, body );
    if (!updatedEmployee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { error: "Failed to update employee details" },
      { status: 500 }
    );
  }
}
