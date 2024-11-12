import { pgClient } from "./pgClient";

export async function getLeaveRequestlistByUserId(
  userId: number
): Promise<any> {
  const data = [userId];
  const result = await pgClient.query(
    "SELECT * FROM leave_requests WHERE user_id = $1",
    data
  );

  return result.rows;
}

