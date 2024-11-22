import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { API_URL } from '@/config'
const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export interface OtpResponse {
  message: string;
  redirectToLogin: boolean;
  redirectToVerifyOtp: boolean;
  user?: any;
}

export interface VerifyOtpResponse {
  message: string;
  redirectToLogin: boolean;
  redirectToRegister: boolean;
  user?: any;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: any;
}

export const storageUtil = {
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') { // web
      await AsyncStorage.setItem(key, value);
    } else { // mobile
      await SecureStore.setItemAsync(key, value.toString());
    }
  },
  
  getItem: async (key: string) => {
    if (Platform.OS === 'web') { // web
      return await AsyncStorage.getItem(key);
    } else { // mobile
      return await SecureStore.getItemAsync(key);
    }
  },
  removeItem: async (key: string) => {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};


// Send OTP (Verify Phone Number)
export async function sendOtp(phoneNumber: string): Promise<OtpResponse> {
  try {
    const response = await fetch(`${apiUrl}/api/auth/phoneverify`, {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phoneNumber,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

// Verify OTP
export async function verifyOtp(
  phoneNumber: string,
  enteredOtp: string
): Promise<VerifyOtpResponse> {
  try {
    const response = await fetch(`${apiUrl}/api/auth/phoneverify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phoneNumber,
        otp: enteredOtp,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}

// Register
export async function register(userData: {
  nickname: string;
  password: string;
  gender: "male" | "female";
  phone: string;
}): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}


export async function login(nickname: string, password: string): Promise<any> {
  try {
    const res = await fetch(apiUrl + '/api/auth/userlogin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        password: password
      })
    });
    
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    const token = data.token
    console.log(token)
    // Store the token using SecureStore instead of localStorage
    try {
      await storageUtil.setItem('token', token);
      await storageUtil.setItem('userPayload', JSON.stringify(data.payload));
      console.log('Token and user data saved successfully.');
    } catch (secureStoreError) {
      console.error('Error storing token in SecureStore:', secureStoreError);
      // You might want to handle this error differently depending on your app's requirements
    }
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await storageUtil.removeItem('token');
    await storageUtil.removeItem('userPayload');
    console.log('Token and user data removed successfully.');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
}

export async function checkAuth(): Promise<boolean> {
  try {
    const token = await storageUtil.getItem('token');
    return !!token;
  } catch (error) {
    console.error('Error checking auth:', error);
    return false;
  }
}

export async function getUserData(): Promise<any | null> {
  try {
    const userPayload = await storageUtil.getItem('userPayload');
    return userPayload ? JSON.parse(userPayload) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}