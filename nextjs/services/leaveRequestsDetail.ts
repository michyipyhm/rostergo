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
    const result = await pgClient.query(query, [userId]);

    return result.rows.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      shift_slot_id: row.shift_slot_id,
      leave_type_id: row.leave_type_id,
      start_date: new Date(row.start_date), // 确保转换为 Date 对象
      end_date: new Date(row.end_date), // 确保转换为 Date 对象
      status: row.status,
      user: {
        id: row.user_id,
        name: row.user_name, // 使用正确的字段名
      },
      leave_type: {
        id: row.leave_type_id,
        name: row.leave_type_name, // 使用正确的字段名
      },
    }));
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}
