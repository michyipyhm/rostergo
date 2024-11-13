import { pgClient } from "@/services/pgClient";
import { sessionStore } from "@/lib/sessionStore";

class EmployeeService {
  constructor() {}

  async getEmployees() {
    try {
      const session = await sessionStore.get();

      if (!session.branch_id) {
        throw new Error("Unauthorized: No branch associated with the current session");
      }
      
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
        users.join_date as join_date,
        users.updated_at as updated_at
      FROM users
      JOIN positions ON users.position_id = positions.id
      JOIN grades ON positions.grade_id = grades.id
      WHERE users.branch_id = $1
      ORDER BY
        CASE
          WHEN users.status = 'active' THEN 1
          WHEN users.status = 'resigned' THEN 2
          ELSE 5
        END,
        users.id DESC
        `
      const result = await pgClient.query(sql, [session.branch_id])
      console.log('result:', result.rows)

      return result.rows
    } catch (error) {
      console.log("cannot get employees:", error)
      throw new Error("Failed to retrieve employees");
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
          users.resign_date as resign_date,
          users.join_date as join_date,
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

  async updateEmployee(id: string, updateData: {phone?: number, position?: string, status?: string}) {
    try {
      const { phone, position, status } = updateData;

      if (phone) {
        const updatePositionSql = `
          UPDATE users
          SET phone = (SELECT id FROM users WHERE phone = $1)
          WHERE phone = $2
        `;
        await pgClient.query(updatePositionSql, [phone, id]);
      }
      
      
      if (position) {
        const updatePositionSql = `
          UPDATE users
          SET position_id = (SELECT id FROM positions WHERE name = $1)
          WHERE id = $2
        `;
        await pgClient.query(updatePositionSql, [position, id]);
      }

      if (status) {
        const updatePositionSql = `
          UPDATE users
          SET status = (SELECT id FROM users WHERE status = $1)
          WHERE phone = $2
        `;
        await pgClient.query(updatePositionSql, [status, id]);
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
