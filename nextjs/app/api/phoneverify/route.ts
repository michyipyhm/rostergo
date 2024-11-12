import { NextRequest, NextResponse } from 'next/server'
import { handleVerifyNumber, handleVerifyOtp } from './otpController'

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handleVerifyNumber(req)
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return handleVerifyOtp(req)
}