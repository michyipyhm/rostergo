import { pgClient } from "@/lib/pgClient";


type LeaveRequest = {
  id: number;
  user_id: number;
  shift_slot_id: number;
  leave_type_id: number;
  start_date: Date;
  end_date: Date;
  status: string;
};
type LeaveType = {
  id: number;
  name: string;
};

export async function getLeaveRequestlistByUserId(
  userId: number
): Promise<any> {
  const data = [userId];
  const result = await pgClient.query(
    `SELECT *, leave_types.name as leave_type_name
     FROM leave_requests 
     JOIN leave_types ON leave_requests.leave_type_id = leave_types.id
     WHERE user_id = $1`,
    data
  );

  return result.rows;
}

