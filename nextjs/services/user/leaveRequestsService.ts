// import { pgClient } from "@/lib/pgClient";
// import { co } from "@fullcalendar/core/internal-common";


// type LeaveRequest = {
//   id: number;
//   user_id: number;
//   shift_slot_id: number;
//   leave_type_id: number;
//   start_date: Date;
//   end_date: Date;
//   status: string;
// };
// type LeaveType = {
//   id: number;
//   name: string;
// };

// type User = {
//   id: number;
//   nickname: string;
// };

// export async function getLeaveRequestlistByUserId(
//   userId: number
// ): Promise<any> {
//   const data = [userId];
//   const result = await pgClient.query(
//     `SELECT *, leave_types.name as leave_type_name
//      FROM leave_requests 
//      JOIN leave_types ON leave_requests.leave_type_id = leave_types.id
//      WHERE user_id = $1`,
//     data
//   );
//   console.log(userId);
// console.log(result.rows);
//   return result.rows;
// }

import { pgClient } from "@/lib/pgClient";
import { co } from "@fullcalendar/core/internal-common";

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

type User = {
  id: number;
  nickname: string;
};

export async function getLeaveRequestlistByUserId(
  userId: number
): Promise<any> {
  const data = [userId];
  const result = await pgClient.query(
    `SELECT 
      leave_requests.id,
      leave_requests.user_id,
      leave_requests.shift_slot_id,
      leave_requests.leave_type_id,
      leave_requests.start_date + INTERVAL '1 day' AS start_date,
      leave_requests.end_date + INTERVAL '1 day' AS end_date,
      leave_requests.status,
      leave_types.name as leave_type_name
     FROM leave_requests 
     JOIN leave_types ON leave_requests.leave_type_id = leave_types.id
     WHERE user_id = $1`,
    data
  );
  console.log(userId);
  console.log(result.rows);
  return result.rows;
}

