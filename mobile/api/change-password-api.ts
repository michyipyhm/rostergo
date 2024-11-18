import { storageUtil } from './auth-api';

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export async function mobileChangePassword(
  currentPassword: string, newPassword: string): Promise<any> {

  try {
    const token = await storageUtil.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const res = await fetch(apiUrl + '/api/auth/changepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to change password');
    }

    const data = (await res.json()).data;
    return data;
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    throw error;
  }
}