import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getLeaveRequestDetailByUserId } from '@/services/user/leaveRequestsDetailService';
import { deleteLeaveRequest } from '@/services/user/leaveRequestsDetailService'; 


// const SECRET_KEY = new TextEncoder().encode('your-secret-key'); 

// function a() {
//   const req = {}
//   const obj = {
//     params : {
//       leveaId: 1
//     },
//     query: {},
//     abc:{},
//     efg: {},
//     xyz: {}
//   }
//   b(req, obj)
// }

// function b( req, { params,abc, efg}) {
//   // const params = obj.params;
//   console.log(params)
//   // const { leaveId } = params; 
//   const leaveId = params.leaveId; // 
// }

type Params = {
  leaveId: number; // Assuming leaveId is a string
};

export async function GET(req: NextRequest, { params } : { params: Params }) {
  const { leaveId } = await params; // Now TypeScript knows leaveId is a string
  try {
    console.log(leaveId)
    
    const data = await getLeaveRequestDetailByUserId(leaveId);
// console.log(data)
    // Check if data was found
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

// export async function DELETE(req: NextRequest, { params } : { params: Params }) {
//   const { leaveId } = await params; // Now TypeScript knows leaveId is a string
//   try {
//     console.log(leaveId)
   
//     const data = await deleteLeaveRequest(leaveId);

//     if (!data) {
//       return NextResponse.json(
//         { error: "No data found for the specified userId" },
//         { status: 404 }
//       );
//     }

   
//     return NextResponse.json({ data });
//   } catch (error) {
//     console.error("Error fetching leave requests:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(req: NextRequest, { params } : { params: Params }) {
  const { leaveId } = params;
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



