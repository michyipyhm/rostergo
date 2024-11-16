import * as SecureStore from 'expo-secure-store';
import { storageUtil } from './auth-api';

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export interface Shift {
  shift_id: number;
  date: string;
  start_time: string;
  end_time: string;
  user_id: number;
  nickname: string;
}

// Helper function to get the token
async function getToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

// Get User Shifts
export async function getUserShifts(): Promise<Shift[]> {
  try {
    const token = await storageUtil.getItem('token');
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${apiUrl}/api/mobilecalendarpage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error fetching user shifts:", error);
    throw error;
  }
}
