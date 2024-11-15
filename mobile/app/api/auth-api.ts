import * as SecureStore from 'expo-secure-store';

// import { API_URL } from '@/config'
const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export interface OtpResponse {
  message: string
  redirectToLogin: boolean
  redirectToVerifyOtp: boolean
  user?: any 
}

export interface VerifyOtpResponse {
  message: string
  redirectToLogin: boolean
  user?: any ;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: any; 
}

// Send OTP (Verify Phone Number)
export async function sendOtp(phoneNumber: string): Promise<OtpResponse> {
  try {
    const response = await fetch(`${apiUrl}/api/phoneverify`, {
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
    const response = await fetch(`${apiUrl}/api/phoneverify`, {
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

// Register
export async function register(userData: {
  nickname: string;
  password: string;
  gender: 'male' | 'female';
  phone: string;
}): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${apiUrl}/api/mobileregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}

// Login
// export async function login(): Promise<any> {
//   try {
//     const res = await fetch(apiUrl + '/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "nickname": "",
//         "password": ""
//       })
//     })
    
//     if (!res.ok) {
//       throw new Error('Network response was not ok')
//     }
//     const data = await res.json()
//     localStorage.setItem('token', data.token)
//     console.log(data)
//     return data
//   } catch (error) {
//     console.error('Error sending OTP:', error)
//     throw error
//   }
// }

//login



export async function login(): Promise<any> {
  try {
    const res = await fetch(apiUrl + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "nickname": "",
        "password": ""
      })
    });
    
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();

    // Store the token using SecureStore instead of localStorage
    try {
      await SecureStore.setItemAsync('token', data.token);
    } catch (secureStoreError) {
      console.error('Error storing token in SecureStore:', secureStoreError);
      // You might want to handle this error differently depending on your app's requirements
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}




