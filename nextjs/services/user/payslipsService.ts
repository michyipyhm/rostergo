import { pgClient } from "@/lib/pgClient";

class PayslipsService {
  constructor() {}

  async getPayslipsByFTid (userId: number) {
    
    try {
      const sql = `
       SELECT 
          users.id as id,
          users.nickname as nickname,
          positions.type as employee_type,
          positions.full_time_wage as ft_wage
        FROM users
        JOIN positions ON users.position_id = positions.id
        WHERE users.id = $1 and positions.type = 'Full Time'
      `;
      const result = await pgClient.query(sql, [userId]);
      return result.rows[0];
    } catch (error) {
      console.log("cannot get payslips by Id:", error);
      throw new Error("payslips ById not found: ${error.message}");
    }
  }

  async getPayslipsByPTid (userId: number) {
    
    try {
      const sql = `
       SELECT 
          shifts.user_id as id,
	        users.nickname as nickname,
	        positions.type as employee_type,
	        positions.part_time_hour_wage as pt_wage,
          shift_slots.work_hour as work_hour
        FROM shifts
        JOIN shift_slots ON shifts.shift_slot_id = shift_slots.id
	      JOIN users ON shifts.user_id = users.id
	      JOIN positions ON users.position_id = positions.id
        WHERE shifts.user_id = $1 and positions.type = 'Part Time'
      `;
      const result = await pgClient.query(sql, [userId]);
      return result.rows[0];
    } catch (error) {
      console.log("cannot get payslips by Id:", error);
      throw new Error("payslips ById not found: ${error.message}");
    }
  }
}

export const payslipsService = new PayslipsService();
