import { storageUtil } from './auth-api';

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export async function mobileLogout(
  currentPassword: string, newPassword: string): Promise<any> {

  try {
    const token = await storageUtil.getItem('token');
    if (!token) {
      throw new Error('you are not logged in');
    }
    const res = await fetch(apiUrl + '/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!res.ok) {
      console.error('Logout failed on server');
    }
    storageUtil.removeItem('token')

  } catch (error) {
    console.error('Logout error:', error);
 }
}
