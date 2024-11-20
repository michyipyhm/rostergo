import { storageUtil } from './auth-api';

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export async function getPayslips(): Promise<any> {
  try {
    const token = await storageUtil.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await fetch(apiUrl + '/api/user/payslips', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching payslipData:', error);
    throw error;
  }
}