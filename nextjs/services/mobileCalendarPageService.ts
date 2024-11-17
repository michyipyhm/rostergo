import { pgClient } from "./pgClient";

export async function getUserShifts(userId: number) {
  const query = `
   SELECT 
      shifts.id as shift_id,
      shifts.date,
      shift_slots.start_time,
      shift_slots.end_time,
      users.id as user_id,
      users.nickname
    FROM 
      shifts
    JOIN 
      shift_slots ON shifts.shift_slot_id = shift_slots.id
    LEFT JOIN 
      shift_requests ON shifts.user_id = shift_requests.user_id 
        AND shifts.date = shift_requests.date 
        AND shifts.shift_slot_id = shift_requests.shift_slot_id
    JOIN
      users ON shifts.user_id = users.id
    WHERE 
      shifts.user_id = $1
    ORDER BY 
      shifts.date ASC
  `;

  try {
    const result = await pgClient.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching user shifts:', error);
    throw error;
  }
}