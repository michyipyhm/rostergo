import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getLeaveRequestDetailByUserId } from '@/services/user/leaveRequestsDetailService';
import { deleteLeaveRequest, updateLeaveRequest } from '@/services/user/leaveRequestsDetailService'; 




type Params = {
  leaveId: number; 
};

export async function GET(req: NextRequest, { params } : { params: Params }) {
  const { leaveId } = await params; 
  try {
    console.log(leaveId)
    
    const data = await getLeaveRequestDetailByUserId(leaveId);

    if (!data) {
      return NextResponse.json(
        { error: "No data found for the specified userId" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest, { params } : { params: Params }) {
  const { leaveId } = await params;
  try {
    const result = await deleteLeaveRequest(Number(leaveId));
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "No leave request found with the specified ID" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    console.error("Error deleting leave request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { leaveId } = await params; // Directly destructuring from params
  const body = await req.json(); // Parse the JSON body
  
  const jwtPayloadString = req.headers.get("x-jwt-payload");

  if (!jwtPayloadString) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  
  const jwtPayload = JSON.parse(jwtPayloadString);

  const userId = jwtPayload.id;

  try {
    console.log({ leaveId });
    console.log(body);
    
    // Ensure leaveId and userId are valid
    if (!leaveId || !userId) {
      return NextResponse.json(
        { error: "Missing leaveId or userId" },
        { status: 400 }
      );
    }

    const data = await updateLeaveRequest(Number(leaveId), userId, body);

    // Check if data was returned
    if (!data) {
      return NextResponse.json(
        { error: "No data found for the specified leaveId and userId" },
        { status: 404 }
      );
    }

    // Return the updated data
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error updating leave request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}