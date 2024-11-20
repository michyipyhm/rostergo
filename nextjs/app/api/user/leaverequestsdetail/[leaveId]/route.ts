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

export async function PUT(req: NextRequest, { params } : { params: Params }) {
  const { leaveId } = await params; 
  const userId = req.headers.get('userId');
  const body = await req.json();
  try {
    console.log(leaveId)
    
    const data = await updateLeaveRequest(Number(leaveId), userId, body);

    if (!data) {
      return NextResponse.json(
        { error: "No data found for the specified userId" },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



