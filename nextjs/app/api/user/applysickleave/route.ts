import { applySickLeave } from "@/services/user/applySickLeaveService";
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
        shiftSlot: body.shiftSlot,
        duration: body.duration,
        proof: body.proof // This will be a string (likely a URL or path) instead of a File object
      };
  
      // Apply for leave
      const result = await applySickLeave(leaveData);
  
      // Return the result
      return NextResponse.json({ success: true, data: result });
    } catch (error) {
      console.error("Error applying for leave:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
