import { NextRequest, NextResponse } from "next/server";
import { employeeService } from "@/services/EmployeeService";

// export async function GET(request: NextRequest) {
//   const { id } = request.query;

//   export async function GET(
//     request: NextRequest,
//     { params }: { params: { id: string } }
//   ) {
//   try {
//     const employee = await employeeService.getEmployeeById(Number(id));
//     return NextResponse.json(employee);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch employee" }, { status: 500 });
//   }
// }

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params?.id) {
    return NextResponse.json(
      { error: "Employee ID is required" },
      { status: 400 }
    );
  }

  try {
    const employee = await employeeService.getEmployeeById(params.id);
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