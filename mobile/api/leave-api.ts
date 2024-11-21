import * as SecureStore from "expo-secure-store";
import { storageUtil } from "./auth-api";

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

///////////////get all leave requests//////////////////
export async function getAllLeaves(): Promise<any> {
  try {
   
    const token = await storageUtil.getItem("token");
    console.log(token);
    const res = await fetch(apiUrl + "/api/user/leaverequests", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = (await res.json()).data;
    return data;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
}

///////////////get leave detail//////////////////
export async function getLeaveDetail(leaveId: number): Promise<any> {
  if (!leaveId) {
    throw new Error("Leave ID is required");
  }
  try {
    const token = await storageUtil.getItem("token");
    const res = await fetch(apiUrl + `/api/user/leaverequestsdetail/${leaveId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await res.json()).data;

    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

///////////////Apply for leave//////////////////

interface LeaveApplicationData {
  leaveType: number;
  startDate: string;
  endDate: string;
}
export async function applySickLeave(leaveData: SickLeaveRequest): Promise<any> {
  try {
    const token = await storageUtil.getItem("token");

    const response = await fetch(`${apiUrl}/api/user/applysickleave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(leaveData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error applying for sick leave:", error);
    throw error;
  }
}
export async function applyLeave(leaveData: LeaveApplicationData): Promise<any> {
  try {
    const token = await storageUtil.getItem("token");
    const response = await fetch(`${apiUrl}/api/user/applyleave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(leaveData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error applying for sick leave:", error);
    throw error;
  }
}

export async function getLeaveTypes(): Promise<any> {
  try {
    const token = await storageUtil.getItem("token");
    const res = await fetch(`${apiUrl}/api/user/applyleave`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await res.json()).data;

    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}



///////////////Apply for sick leave//////////////////
interface SickLeaveRequest {
  shiftSlot: number;
  startDate: string;
  endDate: string;
  duration: string;
  proofImageUri?: string;
}


///////////////delete data for leaverequest//////////////////

export async function deleteLeaveRequest(leaveId: number): Promise<void> {
  try {
    const token = await storageUtil.getItem("token");
    const response = await fetch(`${apiUrl}/api/user/leaverequestsdetail/${leaveId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete leave request");
    }
  } catch (error) {
    console.error("Error deleting leave request:", error);
    throw error;
  }
}

///////////////update data for leaverequest//////////////////

interface LeaveRequestItem {
  id: number;
  status: string;
  message: string;
  start_date: Date;
  end_date: Date;
  duration: string;
}

export async function updateLeaveRequest(data: { id: number } & {start_date: string, end_date: string, duration: string}): Promise<LeaveRequestItem> {
  try {
    const token = await storageUtil.getItem("token");
    const response = await fetch(`${apiUrl}/api/user/leaverequestsdetail/${data.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_date: data.start_date,
        end_date: data.end_date,
        duration: data.duration,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update leave request");
    }

    const responseData = await response.json();
    console.log('Update response:', responseData);
    return responseData.data;
  } catch (error) {
    console.error("Error updating leave request:", error);
    throw error;
  }
}