import { pgClient } from "./pgClient";

class MonthlyRosterService {

  constructor() { }

  async getMonthlyRoster(date: string) {
    try {
      const shifts_sql = `
        SELECT 
          shifts.*, 
          users.nickname AS user_nickname,
		      positions.name AS position_name,
		      positions.type AS position_type,
          shift_slots.title AS slot_title, 
          shift_slots.short_title AS slot_short_title
        FROM shifts
        JOIN users ON shifts.user_id = users.id
        JOIN shift_slots ON shifts.shift_slot_id = shift_slots.id
		    JOIN positions ON users.position_id = positions.id
        WHERE DATE_TRUNC('month', shifts.date) = $1;
        `
      const shift_requests_sql = `
        SELECT 
          shift_requests.*, 
          users.nickname AS user_nickname,
		      positions.name AS position_name,
		      positions.type AS position_type,
          shift_slots.title AS slot_title, 
          shift_slots.short_title AS slot_short_title
        FROM shift_requests
        JOIN users ON shift_requests.user_id = users.id
        JOIN shift_slots ON shift_requests.shift_slot_id = shift_slots.id
		    JOIN positions ON users.position_id = positions.id
        WHERE DATE_TRUNC('month', shift_requests.date) = $1;
        `
      const leave_requests_sql = `
        SELECT 
          leave_requests.*, 
          users.nickname AS user_nickname,
		      positions.name AS position_name,
		      positions.type AS position_type,
          shift_slots.title AS slot_title, 
          shift_slots.short_title AS slot_short_title,
	    	  leave_types.name AS  leave_type_name,
	    	  leave_types.short_name AS leave_type_short_name
        FROM leave_requests
        JOIN users ON leave_requests.user_id = users.id
        JOIN shift_slots ON leave_requests.shift_slot_id = shift_slots.id
	    	JOIN positions ON users.position_id = positions.id
	    	JOIN leave_types ON leave_requests.leave_type_id = leave_types.id
        WHERE DATE_TRUNC('month', leave_requests.start_date) = $1;
        `
      const shifts_result = await pgClient.query(shifts_sql, [`${date}-01`])
      const shift_requests_result = await pgClient.query(shift_requests_sql, [`${date}-01`])
      const leave_requests_result = await pgClient.query(leave_requests_sql, [`${date}-01`])

      return {
        shifts: shifts_result.rows,
        shiftRequests: shift_requests_result.rows,
        leaveRequests: leave_requests_result.rows
      }
    } catch (error) {
      console.error("Database query error:", error)
      throw new Error("Database error")
    }
  }
}
export const monthlyRosterService = new MonthlyRosterService();
