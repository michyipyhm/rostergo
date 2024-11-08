import { pgClient } from "@/services/pgClient";

class ManpowerService {

  constructor() { }

  async getDailyManpower(date: string) {
    try {
      const sql = `
      SELECT 
        shifts.*, 
        users.nickname AS user_nickname, 
        shift_slots.title AS slot_title, 
        shift_slots.start_time AS slot_start_time, 
        shift_slots.end_time AS slot_end_time
      FROM shifts
      JOIN users ON shifts.user_id = users.id
      JOIN shift_slots ON shifts.shift_slot_id = shift_slots.id
      WHERE shifts.date = $1
      `
      const result = await pgClient.query(sql, [date])

      return result.rows
    } catch (error) {
      console.error("Database query error:", error)
      throw new Error("Database error")
    }
  }
}
export const manpowerService = new ManpowerService();