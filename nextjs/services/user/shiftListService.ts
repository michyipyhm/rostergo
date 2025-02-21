import { pgClient } from "@/lib/pgClient";

class MobileShiftListService {
  constructor() {}

  async getShiftListById(id: string, yearMonth: string) {
    try {
      const sql = `
      SELECT 
      shifts.user_id as user_id,
      shifts.date as date,
      shift_slots.title as shift_slot,
      shift_slots.start_time as start_time,
      shift_slots.end_time as end_time,      
      shift_slots.id as shift_slot_id
    FROM shifts
    JOIN shift_slots ON shifts.shift_slot_id = shift_slots.id
    WHERE shifts.user_id = $1 AND DATE_TRUNC('month', shifts.date) = $2
    ORDER BY
    shifts.date ASC
    `;
      const result = await pgClient.query(sql, [id, [`${yearMonth}-01`]]);

      return result.rows;
    } catch (error) {
      console.log("cannot get shifts by Id:", error);
      throw new Error("Failed to retrieve shifts by Id");
    }
  }
}

export const mobileShiftListService = new MobileShiftListService();
