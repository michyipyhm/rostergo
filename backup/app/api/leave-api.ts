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
        'Authorization': `Bearer ${token}`, 
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

  export async function getLeaveDetail(): Promise<any> {
    try {
      const token = await storageUtil.getItem('token');
      const res = await fetch(apiUrl + '/api/leaveRequestsDetail', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      })
      
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = (await res.json()).data
    
      return data
    } catch (error) {
      console.error('Error sending OTP:', error)
      throw error
    }
  }
///////////////Apply for leave//////////////////

interface LeaveApplicationData {
  leaveType: string
  startDate: string
  endDate: string
  shiftSlot?: string
  duration?: string
  proof?: string
}

export async function submitLeaveApplication(data: LeaveApplicationData): Promise<{ success: boolean; message: string }> {
  const formData = new FormData()
  
  formData.append('leaveType', data.leaveType)
  formData.append('startDate', data.startDate)
  formData.append('endDate', data.endDate)
  
  if (data.shiftSlot) {
    formData.append('shiftSlot', data.shiftSlot)
  }
  
  if (data.duration) {
    formData.append('duration', data.duration)
  }
  
  if (data.proof) {
    formData.append('proof', data.proof)
  }

  try {
    const token = await storageUtil.getItem('token');
    const response = await fetch(`${apiUrl}/api/applyLeave`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to submit leave application')
    }

    const result = await response.json()
    return { success: true, message: 'Leave application submitted successfully' }
  } catch (error) {
    console.error('Error submitting leave application:', error)
    return { success: false, message: 'Failed to submit leave application. Please try again.' }
  }
}

///////////////Apply for sick leave//////////////////
  interface SickLeaveRequest {
    shiftSlot: string;
    startDate: string;
    endDate: string;
    duration: string;
    proofImageUri?: string;
  }
  
  interface SickLeaveResponse {
    id: string;
    status: string;
    message: string;
  }
  
  export async function applySickLeave(leaveData: SickLeaveRequest): Promise<SickLeaveResponse> {
    try {
      const token = await storageUtil.getItem('token');
      const formData = new FormData();
  
      // Append text data
      formData.append('shiftSlot', leaveData.shiftSlot);
      formData.append('startDate', leaveData.startDate);
      formData.append('endDate', leaveData.endDate);
      formData.append('duration', leaveData.duration);
  
      // Append image if available
      if (leaveData.proofImageUri) {
        const uriParts = leaveData.proofImageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
  
        formData.append('proofImage', {
          uri: leaveData.proofImageUri,
          name: `proof.${fileType}`,
          type: `image/${fileType}`
        } as any);
      }
  
      const response = await fetch(`${apiUrl}/api/applySickLeave`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: SickLeaveResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error applying for sick leave:', error);
      throw error;
    }
  }

  // export async function fetchShiftSlots(): Promise<any> {
  //   try {
  //     const res = await fetch(apiUrl + '/api/applySickLeave', {
  //       method: 'GET',
  //     })
      
  //     if (!res.ok) {
  //       throw new Error('Network response was not ok')
  //     }
  //     const data = (await res.json()).data
  //     // console.log("data: ", data)
  //     return data
  //   } catch (error) {
  //     console.error('Error sending OTP:', error)
  //     throw error
  //   }
  // }



interface ShiftSlot {
  date: string;
  shift_slot_id: number;
  start_time: string;
  end_time: string;
  title: string;
}

export async function fetchShiftSlots(userId: string): Promise<ShiftSlot[]> {
  try {
    const token = await storageUtil.getItem('token');
    const response = await fetch(`${apiUrl}/api/fetchShiftSlots/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shift slots');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching shift slots:', error);
    throw error;
  }
}

