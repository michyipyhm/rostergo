import { NextRequest, NextResponse } from 'next/server'
import { handleUpdateOtp, handleVerifyOtp } from './otpController'

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handleUpdateOtp(req)
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return handleVerifyOtp(req)
}