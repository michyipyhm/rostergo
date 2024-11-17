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

// Get User Shifts
export async function getUserShifts(): Promise<Shift[]> {
  try {
    const token = await storageUtil.getItem('token');
    console.log("calender token is", token);
    if (!token) {
      throw new Error("No token found");
    }

    const res = await fetch(`${apiUrl}/api/mobilecalendarpage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    console.log("User Shifts:", data);

    return data;

  } catch (error) {
    console.error("Error fetching user shifts:", error);
    throw error;
  }
}
