import { pgClient } from "@/lib/pgClient";
import { co } from "@fullcalendar/core/internal-common";


interface SickLeaveData {
  userId: number;         // Assuming userId is a number; adjust if it's a string
  startDate: string;      // Adjust type if using Date
  endDate: string;        // Adjust type if using Date
  shiftSlot: number;
  duration: string;       // Assuming duration is a number; adjust if needed
}


interface LeaveData {
  userId: number;         // Assuming userId is a number; adjust if it's a string
  startDate: string;      // Adjust type if using Date
  endDate: string;        // Adjust type if using Date
  leaveType: number
}

export async function applySickLeave(leaveData: SickLeaveData) {
  const query = `
      INSERT INTO leave_requests (
          user_id, leave_type_id, start_date, end_date, 
          shift_slot_id, duration, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
  `;

  const values = [
      leaveData.userId,
      1,                // Assuming you store a string for leave type
      leaveData.startDate,
      leaveData.endDate,
      leaveData.shiftSlot,    // Assuming title is a string
      leaveData.duration,
      'pending'                     // Assuming status is a string
  ];

  const result = await pgClient.query(query, values);
  return result.rows[0];
}

export async function applyLeave(leaveData: LeaveData) {
  const query = `
      INSERT INTO leave_requests (
          user_id, leave_type_id, start_date, end_date, status
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
  `;

  const values = [
      leaveData.userId,
      leaveData.leaveType,                // Assuming you store a string for leave type
      leaveData.startDate,
      leaveData.endDate,
      'pending'                     // Assuming status is a string
  ];

  const result = await pgClient.query(query, values);
  return result.rows[0];
}