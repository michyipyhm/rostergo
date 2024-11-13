// import { API_URL } from '@/config'

export interface OtpResponse {
  message: string
  redirectToLogin: boolean
  redirectToVerifyOtp: boolean
  user?: any // Replace with your user type
}

export interface VerifyOtpResponse {
  message: string
  redirectToLogin: boolean
  user?: any // Replace with your user type
}

// Send OTP (Verify Phone Number)
export async function sendOtp(phoneNumber: string): Promise<OtpResponse> {
  try {
    const response = await fetch('http://192.168.80.48:3000/api/phoneverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber,
      })
    })
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error sending OTP:', error)
    throw error
  }
}

// Verify OTP
export async function verifyOtp(phoneNumber: string, enteredOtp: string): Promise<VerifyOtpResponse> {
  try {
    const response = await fetch('http://192.168.80.48:3000/api/phoneverify', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber,
        otp: enteredOtp
      })
    })
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error verifying OTP:', error)
    throw error
  }
}