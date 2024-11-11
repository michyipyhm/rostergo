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
      `
      const result = await pgClient.query(sql)
      // console.log('result:', result)

      return result.rows
    } catch (error) {
      console.log("cannot get employees:", error)
      throw new Error("Users error")
    }
  }

  async getEmployeeById(id: string) {
    try {
      const sql = `
        SELECT 
          users.id,
          users.nickname,
          users.gender,
          positions.name as position,
          positions.type as employee_type,
          grades.name as grade,
          grades.annual_leave_quota as annual_leave,
          users.created_at as joining_date
        FROM users
        JOIN positions ON users.position_id = positions.id
        JOIN grades ON positions.grade_id = grades.id
        WHERE users.id = $1
      `;
      const result = await pgClient.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.log("cannot get employeeById:", error);
      throw new Error("EmployeeById not found");
    }
  }
}
export const employeeService = new EmployeeService();
