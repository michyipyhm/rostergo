import { getLeaveRequestlistByUserId } from '@/services/leaveRequests';
import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from 'path/to/jwt/utility';


export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    let userId;
  
    if (authHeader) {
   
      const token = authHeader.split(' ')[1]; 
      try {
        
        const decoded = verifyToken(token);
        userId = decoded.userId; 
      } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }
  
    if (!userId) {
      
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const userPayload = req.nextUrl.searchParams.get("user");
    console.log(userPayload);
  
    const data = await getLeaveRequestlistByUserId(userId);
  
    return NextResponse.json({ data, userPayload });
  }