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
  shift_slot_id: number;
}

// Get User Shifts
export async function getUserShifts(): Promise<Shift[]> {
  try {
    const token = await storageUtil.getItem('token');
    console.log("calender token is", token);
    if (!token) {
      throw new Error("No token found");
    }

    const res = await fetch(`${apiUrl}/api/user/calendarpage`, {
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

    const adjustedData = data.map((shift: Shift) => {
      const date = new Date(shift.date);
      date.setDate(date.getDate() + 1);
      return {
        ...shift,
        date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      };
    });

    console.log("Adjusted User Shifts:", adjustedData);

    return adjustedData;

  } catch (error) {
    console.error("Error fetching user shifts:", error);
    throw error;
  }
}
