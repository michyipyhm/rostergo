import { NextRequest, NextResponse } from 'next/server';
import { handleMobileRegister } from './mobileRegisterController';

export async function POST(req: NextRequest) {
  return handleMobileRegister(req);
}