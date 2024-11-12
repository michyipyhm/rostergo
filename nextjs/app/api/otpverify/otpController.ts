import { updateOtp, verifyOtp } from '@/services/otpService'
import { NextRequest, NextResponse } from 'next/server'

export async function handleUpdateOtp(req: NextRequest): Promise<NextResponse> {
  try {
    const { phone, otp } = await req.json()

    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 }
      )
    }

    const updatedUser = await updateOtp(phone, otp)

    console.log('Updated user:', updatedUser)
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'OTP updated successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('Error updating OTP:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function handleVerifyOtp(req: NextRequest): Promise<NextResponse> {
  try {
    const { phone, otp } = await req.json()

    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 }
      )
    }

    const verifiedUser = await verifyOtp(phone, otp)

    if (!verifiedUser) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'OTP verified successfully',
      user: verifiedUser
    })

  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}