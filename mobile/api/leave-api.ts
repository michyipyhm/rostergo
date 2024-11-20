import * as SecureStore from "expo-secure-store";
import { storageUtil } from "./auth-api";

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

///////////////get all leave requests//////////////////
export async function getAllLeaves(): Promise<any> {
  try {
    // 從 SecureStore 獲取存儲的令牌
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
  leaveType: string;
  startDate: string;
  endDate: string;
  shiftSlot?: string;
  duration?: string;
  proof?: string;
}

export async function submitLeaveApplication(
  data: LeaveApplicationData
): Promise<{ success: boolean; message: string }> {
  const formData = new FormData();

  formData.append("leaveType", data.leaveType);
  formData.append("startDate", data.startDate);
  formData.append("endDate", data.endDate);

  if (data.shiftSlot) {
    formData.append("shiftSlot", data.shiftSlot);
  }

  if (data.duration) {
    formData.append("duration", data.duration);
  }

  if (data.proof) {
    formData.append("proof", data.proof);
  }

  try {
    const token = await storageUtil.getItem("token");
    const response = await fetch(`${apiUrl}/api/applyleave`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to submit leave application");
    }

    const result = await response.json();
    return {
      success: true,
      message: "Leave application submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting leave application:", error);
    return {
      success: false,
      message: "Failed to submit leave application. Please try again.",
    };
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

export async function applySickLeave(
  leaveData: SickLeaveRequest
): Promise<SickLeaveResponse> {
  try {
    const token = await storageUtil.getItem("token");
    const formData = new FormData();

    // Append text data
    formData.append("shiftSlot", leaveData.shiftSlot);
    formData.append("startDate", leaveData.startDate);
    formData.append("endDate", leaveData.endDate);
    formData.append("duration", leaveData.duration);

    // Append image if available
    if (leaveData.proofImageUri) {
      const uriParts = leaveData.proofImageUri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("proofImage", {
        uri: leaveData.proofImageUri,
        name: `proof.${fileType}`,
        type: `image/${fileType}`,
      } as any);
    }

    const response = await fetch(`${apiUrl}/api/applysickleave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SickLeaveResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error applying for sick leave:", error);
    throw error;
  }
}

///////////////delete data for leaverequest//////////////////

export async function deleteLeaveRequest(leaveId: number): Promise<void> {
  try {
    const token = await storageUtil.getItem("token");
    const response = await fetch(`${apiUrl}/api/user/leaverequests/${leaveId}`, {
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
  id: string;
  status: string;
  message: string;
  start_date: Date;
  end_date: Date;
  duration: string;
}

export async function updateLeaveRequest(data: { id: number } & Partial<LeaveRequestItem>): Promise<LeaveRequestItem> {
  try {
    const token = await storageUtil.getItem("token");
    const response = await fetch(`${apiUrl}/api/leave-requests/${data.id}`, {
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