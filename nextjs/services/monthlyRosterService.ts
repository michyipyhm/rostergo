import { pgClient } from "./pgClient";

class MonthlyRosterService {

  constructor() { }

  async getMonthlyRoster(date: string) {

    const [year, month] = date.split("-").map(Number)
    const newMonth = month === 12 ? 1 : month + 1
    const newYear = month === 12 ? year + 1 : year
    const nextMonthDate = `${newYear}-${String(newMonth).padStart(2, "0")}`

    try {
      const shifts_sql = `
        SELECT 
          shifts.*, 
          users.id AS user_id,
          users.nickname AS user_nickname,
          shift_slots.title AS slot_title, 
          shift_slots.short_title AS slot_short_title
        FROM shifts
        JOIN users ON shifts.user_id = users.id
        JOIN shift_slots ON shifts.shift_slot_id = shift_slots.id
        WHERE DATE_TRUNC('month', shifts.date) = $1;
        `
      const shift_requests_sql = `
        SELECT 
          shift_requests.*, 
          users.id AS user_id,
          users.nickname AS user_nickname,
          shift_slots.title AS slot_title, 
          shift_slots.short_title AS slot_short_title
        FROM shift_requests
        JOIN users ON shift_requests.user_id = users.id
        JOIN shift_slots ON shift_requests.shift_slot_id = shift_slots.id
        WHERE DATE_TRUNC('month', shift_requests.date) = $1;
        `
      const leave_requests_sql = `
        SELECT 
          leave_requests.*, 
          users.id AS user_id,
          users.nickname AS user_nickname,
          shift_slots.title AS slot_title, 
          shift_slots.short_title AS slot_short_title,
	    	  leave_types.name AS  leave_type_name,
	    	  leave_types.short_name AS leave_type_short_name
        FROM leave_requests
        JOIN users ON leave_requests.user_id = users.id
        JOIN shift_slots ON leave_requests.shift_slot_id = shift_slots.id
	    	JOIN leave_types ON leave_requests.leave_type_id = leave_types.id
        WHERE DATE_TRUNC('month', leave_requests.start_date) = $1;
        `

      const users_sql = `
        SELECT 
          users.id, users.nickname, users.gender, users.branch_id, users.status, 
          positions.name AS positions_name,
		      grades.name AS grade_name,
		      positions.type AS position_type,
          positions."weekend_restDay" AS weekend_restDay, 
          positions."restDay_per_week" AS restDay_per_week,
          positions."restDay_countBy" AS restDay_countBy,
          grades.annual_leave_quota AS annual_leave_quota
        FROM users
	    	JOIN positions ON users.position_id = positions.id
	    	JOIN grades ON positions.grade_id = grades.id
        WHERE (users.status = 'active' AND users.join_date < $1)
			    OR (users.status = 'resigned' AND users.join_date < $1 AND users.resign_date > $2);
      `
      const shifts_result = await pgClient.query(shifts_sql, [`${date}-01`])
      const shift_requests_result = await pgClient.query(shift_requests_sql, [`${date}-01`])
      const leave_requests_result = await pgClient.query(leave_requests_sql, [`${date}-01`])
      const users_result = await pgClient.query(users_sql, [`${nextMonthDate}-01`, `${date}-01`])

      return {
        users: users_result.rows,
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
