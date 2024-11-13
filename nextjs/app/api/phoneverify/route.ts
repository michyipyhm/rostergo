import { NextRequest, NextResponse } from 'next/server'
import { handleVerifyOtp, handleVerifyPhoneNumber } from './phoneNumberController'

export async function POST(req: NextRequest): Promise<any> {
  console.log("POST")
  return handleVerifyPhoneNumber(req)
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return handleVerifyOtp(req)
}