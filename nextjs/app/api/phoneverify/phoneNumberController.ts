import { verifyNumber, verifyOtp } from '@/services/otpService'
import { NextRequest, NextResponse } from 'next/server'

export async function handleUpdateOtp(req: NextRequest): Promise<NextResponse> {
  try {
    const { phone } = await req.json()

    const generateOtp = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const generatedOtp = generateOtp();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number required' },
        { status: 400 }
      )
    }

    const result = await verifyNumber(phone)

    if (result.redirectToLogin) {
      return NextResponse.json({
        message: 'User already active',
        redirectToLogin: true,
        redirectToRegister: false,
        redirectToVerifyOtp: false,
        user: result.user
      })
    }

    // if (result.redirectToRegister) {
    //   return NextResponse.json({
    //     message: 'User verified but not active',
    //     redirectToLogin: false,
    //     redirectToRegister: true,
    //     redirectToVerifyOtp: false,
    //     user: result.user
    //   })
    // }

    if (result.redirectToVerifyOtp) {
      
      
      
      return NextResponse.json({
        message: 'OTP sent via whatsapp',
        redirectToLogin: false,
        redirectToRegister: false,
        redirectToVerifyOtp: true,
        user: result.user
      })
    }

    if (!result.user) {
      return NextResponse.json(
        { error: 'Failed to update or create user' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'OTP updated successfully',
      user: result.user,
      redirectToLogin: false,
      redirectToRegister: false,
      redirectToVerifyOtp: false
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