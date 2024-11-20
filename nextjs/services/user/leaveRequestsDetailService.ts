
import { pgClient } from "@/lib/pgClient";


type LeaveRequest = {
  id: number;
  user_id: number;
  shift_slot_id: number;
  leave_type_id: number;
  start_date: Date;
  end_date: Date;
  duration: string;
  status: string;
};

type User = {
  id: number;
  nickname: string;
};

type ShiftSlot = {
  id: number;
  title: string;
  start_time: Date | null;
  end_time: Date | null;
};

type LeaveType = {
  id: number;
  name: string;
};

type LeaveRequestDetail = LeaveRequest & {
  user: User;
  shift_slot: ShiftSlot | null;
  leave_type: LeaveType;
};

export async function getLeaveRequestDetailByUserId(
  id: number
): Promise<LeaveRequestDetail> {
  const query = `
    SELECT 
      lr.id, 
      lr.user_id, 
      lr.shift_slot_id, 
      lr.leave_type_id, 
      lr.start_date + INTERVAL '1 day' AS start_date,
      lr.end_date + INTERVAL '1 day' AS end_date,
      lr.duration, 
      lr.status,
      u.id AS user_id, u.nickname AS user_nickname,
      lt.id AS leave_type_id, lt.name AS leave_type_name,
      ss.id AS shift_slot_id, ss.title AS shift_slot_title, 
      ss.start_time AS shift_slot_start_time, ss.end_time AS shift_slot_end_time
    FROM leave_requests lr
    JOIN users u ON lr.user_id = u.id
    JOIN leave_types lt ON lr.leave_type_id = lt.id
    LEFT JOIN shift_slots ss ON lr.shift_slot_id = ss.id
    WHERE lr.id = $1
  `;

  try {
    const result = await pgClient.query(query, [id]);

    return result.rows.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      shift_slot_id: row.shift_slot_id,
      leave_type_id: row.leave_type_id,
      start_date: new Date(row.start_date),
      end_date: new Date(row.end_date),
      duration: row.duration,
      status: row.status,
      user: {
        id: row.user_id,
        nickname: row.user_nickname,
      },
      shift_slot: row.shift_slot_id ? {
        id: row.shift_slot_id,
        title: row.shift_slot_title,
        start_time: row.shift_slot_start_time ? new Date(row.shift_slot_start_time) : null,
        end_time: row.shift_slot_end_time ? new Date(row.shift_slot_end_time) : null,
      } : null,
      leave_type: {
        id: row.leave_type_id,
        name: row.leave_type_name,
      },
    }))[0];
  } catch (error) {
    console.error("error", error);
    throw new Error("error");
  }
}


export async function deleteLeaveRequest(leaveId: number): Promise<{ affectedRows: number }> {
  const query = `DELETE FROM leave_requests WHERE id = $1`;
  try {
    const result = await pgClient.query(query, [leaveId]);
    return { affectedRows: result.rowCount };
  } catch (error) {
    console.error("Error deleting leave request:", error);
    throw new Error("Failed to delete leave request");
  }
}

export async function updateLeaveRequest(leaveId: number, userId: string, updateData: Partial<LeaveRequest>) {
  try {
    const { start_date, end_date, duration } = updateData;

    const result = await pgClient.query(
      `UPDATE leave_requests 
       SET start_date = $1 - INTERVAL '1 day', 
           end_date = $2 - INTERVAL '1 day', 
           duration = $3
       WHERE id = $4 AND user_id = $5 AND status = 'pending'
       RETURNING *`,
      [start_date, end_date, duration, leaveId, userId]
    );

    if (result.rowCount === 0) {
      return null;
    }

    // Fetch the updated leave request with all related data
    return await getLeaveRequestDetailByUserId(leaveId);
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to update leave request');
  }
}