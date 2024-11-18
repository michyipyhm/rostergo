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
  start_time: Date;
  end_time: Date;
};

type LeaveType = {
  id: number;
  name: string;
};

type LeaveRequestDetail = LeaveRequest & {
  user: User;
  shift_slot: ShiftSlot;
  leave_type: LeaveType;
};

export async function getLeaveRequestDetailByUserId(
  userId: number
): Promise<LeaveRequestDetail[]> {
  const query = `
    SELECT 
      lr.*, 
      u.id AS user_id, u.nickname AS user_nickname,
      lt.id AS leave_type_id, lt.name AS leave_type_name,
      ss.id AS shift_slot_id, ss.title AS shift_slot_title, 
      ss.start_time AS shift_slot_start_time, ss.end_time AS shift_slot_end_time
    FROM leave_requests lr
    JOIN users u ON lr.user_id = u.id
    JOIN leave_types lt ON lr.leave_type_id = lt.id
    LEFT JOIN shift_slots ss ON lr.shift_slot_id = ss.id
    WHERE lr.user_id = $1
  `;

  try {
    const result = await pgClient.query(query, [userId]);

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
    }));
  } catch (error) {
    console.error("error", error);
    throw new Error("error");
  }
}