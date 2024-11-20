import { pgClient } from "@/lib/pgClient";

class PayslipsService {
  constructor() {}

  async getPayslipsByUserId (userId: number) {
    console.log("PayslipsService: Fetching payslip for userId:", userId);
    
    try {
      const sql = `
       SELECT 
          users.id as id,
          users.nickname as nickname,
          positions.type as employee_type,
          positions.full_time_wage as ft_wage,
          positions.part_time_hour_wage as pt_wage,
          shift_slots.title as shift_title,
          shift_slots.work_hour as work_hour
        FROM users
        JOIN positions ON users.position_id = positions.id
        LEFT JOIN shifts ON users.id = shifts.user_id
        LEFT JOIN shift_slots ON shifts.shift_slot_id = shift_slot_id 
        WHERE users.id = $1
        ORDER BY shifts.date DESC
        LIMIT 1
      `;
      const result = await pgClient.query(sql, [userId]);
      console.log("PayslipsService: SQL query result:", result.rows);
      return result.rows[0];
    } catch (error) {
      console.log("cannot get payslips ById:", error);
      throw new Error("payslips ById not found: ${error.message}");
    }
  }
}

export const payslipsService = new PayslipsService();
