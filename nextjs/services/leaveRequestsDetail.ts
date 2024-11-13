import { Pool } from "pg";
import { pgClient } from "./pgClient";

type LeaveRequest = {
  id: number;
  user_id: number;
  shift_slot_id: number;
  leave_type_id: number;
  start_date: Date;
  end_date: Date;
  status: string;
};

type User = {
  id: number;
  name: string;
};


type LeaveType = {
  id: number;
  name: string;
};

type LeaveRequestDetail = LeaveRequest & {
  user: User;
  leave_type: LeaveType;
};

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export async function getLeaveRequestDetailByUserId(
  userId: number
): Promise<LeaveRequestDetail[]> {
  const query = `
    SELECT 
      lr.*, 
      u.id AS user_id, u.name AS user_name,
      lt.id AS leave_type_id, lt.name AS leave_type_name
    FROM leave_requests lr
    JOIN users u ON lr.user_id = u.id
    JOIN leave_types lt ON lr.leave_type_id = lt.id
    WHERE lr.user_id = $1
  `;

  try {
    const result = await pool.query(query, [userId]);

    return result.rows.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      shift_slot_id: row.shift_slot_id,
      leave_type_id: row.leave_type_id,
      start_date: row.start_date,
      end_date: row.end_date,
      status: row.status,
      user: {
        id: row.user_id,
        name: row.user_nickname,
      },
      leave_type: {
        id: row.leave_type_id,
        name: row.leave_type_name,
      },
    }));
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}
