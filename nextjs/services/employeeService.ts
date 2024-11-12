import { pgClient } from "@/services/pgClient";

class EmployeeService {
  constructor() {}

  async getEmployees() {
    try {
      const sql = `
      SELECT 
        users.*,
        positions.*,
        grades.*,
        users.id as id,
        users.nickname as nickname,
        users.gender as gender,
        users.phone as phone,
        positions.name as position,
        grades.name as grade,
        positions.type as employee_type,
        grades.annual_leave_quota as annual_leave,
        users.status as status,
        users.created_at as joining_date,
        users.updated_at as updated_at
      FROM users
      JOIN positions ON users.position_id = positions.id
      JOIN grades ON positions.grade_id = grades.id
      ORDER BY
        CASE
          WHEN users.status = 'otp_pending' THEN 1
          WHEN users.status = 'otp_verified' THEN 2
          WHEN users.status = 'active' THEN 3
          WHEN users.status = 'resigned' THEN 4
          ELSE 5
        END,
        users.id DESC
        `
      const result = await pgClient.query(sql)
      console.log('result:', result.rows)

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
          users.*,
          positions.*,
          grades.*,
          users.id as id,
          users.nickname as nickname,
          users.gender as gender,
          users.phone as phone,
          positions.name as position,
          grades.name as grade,
          positions.type as employee_type,
          grades.annual_leave_quota as annual_leave,
          users.status as status,
          users.employment_end_date as end_date,
          users.created_at as joining_date,
          users.updated_at as updated_at
        FROM users
        JOIN positions ON users.position_id = positions.id
        JOIN grades ON positions.grade_id = grades.id
        WHERE users.id = $1
      `;
      const result = await pgClient.query(sql, [id]);
      //  console.log('result:', result.rows[0])
      return result.rows[0];
    } catch (error) {
      console.log("cannot get employeeById:", error);
      throw new Error("EmployeeById not found");
    }
  }

  async updateEmployee(id: string, updateData: { position?: string, grade?: string, employee_type?: string }) {
    try {
      const { position, grade, employee_type } = updateData;
      
      // First, update the position
      if (position) {
        const updatePositionSql = `
          UPDATE users
          SET position_id = (SELECT id FROM positions WHERE name = $1)
          WHERE id = $2
        `;
        await pgClient.query(updatePositionSql, [position, id]);
      }

      // Then, update the grade and employee type (which are in the positions table)
      if (grade || employee_type) {
        const updateGradeAndTypeSql = `
          UPDATE positions
          SET 
            grade_id = COALESCE((SELECT id FROM grades WHERE name = $1), grade_id),
            type = COALESCE($2, type)
          WHERE id = (SELECT position_id FROM users WHERE id = $3)
        `;
        await pgClient.query(updateGradeAndTypeSql, [grade, employee_type, id]);
      }

      // Finally, fetch and return the updated employee data
      return this.getEmployeeById(id);
    } catch (error) {
      console.log("cannot update employee:", error);
      throw new Error("Failed to update employee");
    }
  }
}
export const employeeService = new EmployeeService();
