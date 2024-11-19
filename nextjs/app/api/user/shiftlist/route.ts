import { NextRequest, NextResponse } from 'next/server'
import { getShiftList } from './shiftListController';

export async function GET(req: NextRequest) {
 return await getShiftList(req)

}