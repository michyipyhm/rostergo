import { mobileShiftListService } from '@/services/user/shiftListService';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

try {
  const id = "2"
  // const token = request.headers.get('Authorization')?.split(' ')[1];
  const shiftList = await mobileShiftListService.getShiftListById(id)
  return NextResponse.json({data: shiftList});
} catch (error) {
  console.error("Error fetching employees:", error);
  return NextResponse.json(
    { error: "Failed to fetch employees" },
    { status: 500 }
  );
}
}