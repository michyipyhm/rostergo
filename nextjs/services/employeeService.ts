import { pgClient } from "@/services/pgClient";

class EmployeeService {
  constructor() {}

  async getEmployees() {
    try {
      const sql = `
      SELECT 
        users.*,
        users.nickname as nickname,
        users.gender as gender,
        users.phone as phone,
        positions.name as position,
        users.created_at as joining_date
      FROM users
      JOIN positions ON users.position_id = positions.id
      WHERE users.status = 'active'
      `
      const result = await pgClient.query(sql)
      // console.log('result:', result)

      return result.rows
    } catch (error) {
      console.log("cannot get users:", error)
      throw new Error("Users error")
    }
  }
}
export const employeeService = new EmployeeService();