import * as SecureStore from 'expo-secure-store';
import { storageUtil } from './auth-api';

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export async function getAllLeaves(): Promise<any> {
  try {
    // 從 SecureStore 獲取存儲的令牌
    const token = await storageUtil.getItem('token');
    console.log(token)
    const res = await fetch(apiUrl + '/api/leaveRequests', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // 使用 Bearer 認證
      }
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (await res.json()).data;
    return data;
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    throw error;
  }
}