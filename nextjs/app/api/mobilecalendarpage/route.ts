import { NextRequest } from 'next/server';
import { handleGetShifts } from './mobileCalendarPageController';


export async function GET(req: NextRequest) {
    return handleGetShifts(req);
  }
