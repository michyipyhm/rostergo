import { storageUtil } from "./auth-api";

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export interface ShiftPage {
  date: string;
  user_id: number;
  shift_slot: string;
}

export async function getShiftList(): Promise<ShiftPage> {
    try {
      const token = await storageUtil.getItem('token');

      // console.log("shift api token is", token);

      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const res = await fetch(apiUrl + '/api/user/shiftlist', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await res.json();

      return data
    } catch (error) {
      console.error('Error sending OTP:', error)
      throw error
    }
  }
  