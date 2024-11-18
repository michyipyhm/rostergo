import { storageUtil } from "./auth-api";

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export async function getShiftList(): Promise<any> {
    try {
      const token = await storageUtil.getItem('token');


      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const res = await fetch(apiUrl + '/api/user/shiftList', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = (await res.json()).data
      console.log("shift data: ", data)
      return data
    } catch (error) {
      console.error('Error sending OTP:', error)
      throw error
    }
  }
  