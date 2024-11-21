import { getLeaveTypesWithoutSickLeave } from "@/services/user/applyLeaveService";
import { applyLeave } from "@/services/user/applySickLeaveService";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    const jwtPayloadString = req.headers.get("x-jwt-payload");
  
    if (!jwtPayloadString) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    
    const jwtPayload = JSON.parse(jwtPayloadString);
    const userId = jwtPayload.id;
  
    console.log("userid from jwt:", userId);
    
    // Validate userId
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
  
    try {
      // Parse JSON body
      const body = await req.json();
      
      // Extract leave data from body
      const leaveData = {
        userId,
        leaveType: body.leaveType,
        startDate: body.startDate,
        endDate: body.endDate,

      };
  
      // Apply for leave
      const result = await applyLeave(leaveData);
  
      // Return the result
      return NextResponse.json({ success: true,  data: result });
    } catch (error) {
      console.error("Error applying for leave:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  export async function GET(req: NextRequest) {
 
    const jwtPayloadString = req.headers.get("x-jwt-payload");
  
    if (!jwtPayloadString) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    
    const jwtPayload = JSON.parse(jwtPayloadString);
  
    const userId = jwtPayload.id;
  
    console.log("userid from jwt:", userId);
    // Validate userId
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
  
    try {
      // Fetch leave request list by userId
      const data = await getLeaveTypesWithoutSickLeave();
  
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