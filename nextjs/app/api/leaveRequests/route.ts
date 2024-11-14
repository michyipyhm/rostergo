import { getLeaveRequestlistByUserId } from '@/services/leaveRequests';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // Retrieve the user payload from the query parameters
  const userPayload = req.nextUrl.searchParams.get("user");
  console.log(req.nextUrl.searchParams.get("user"))
  const userId = 2

  const data = await getLeaveRequestlistByUserId(userId);

//   // Parse the user payload from JSON string to object
//   let parsedUserPayload = null;
//   if (userPayload) {
//     try {
//       parsedUserPayload = JSON.parse(userPayload);
//     } catch (error) {
//       console.error('Error parsing user payload:', error);
//       return NextResponse.json({ error: 'Invalid user payload' }, { status: 400 });
//     }
//   }

//   console.log(parsedUserPayload);
  
  // Return the response with the user payload
  return NextResponse.json({ data, userPayload });
}