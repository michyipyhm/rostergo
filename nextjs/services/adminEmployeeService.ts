import { pgClient } from "@/services/pgClient";
import * as jose from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY);


class AdminEmployeeService {
  constructor() {}

  async getEmployees(token: string) {
    try {
      // Verify and decode the JWT token
      const { payload } = await jose.jwtVerify(token, SECRET_KEY);
      
      if (!payload.branch_id) {
        throw new Error("Unauthorized: No branch associated with the current user");
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
        users.resign_date as resign_date,
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
      const result = await pgClient.query(sql, [payload.branch_id])
      // console.log('result:', result.rows)

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
          users.join_date as join_date,
          users.resign_date as resign_date,
          users.updated_at as updated_at
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

  async updateEmployee(id: string, updateData: {phone?: number, position?: string, status?: string, resign_date?:string}) {
    try {
      const { phone, position, status, resign_date } = updateData;

      if (phone) {
        const updatePhoneSql = `
          UPDATE users
          SET phone = $1
          WHERE id = $2
        `;
        await pgClient.query(updatePhoneSql, [phone, id]);
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
        const updateStatusSql = `
          UPDATE users
          SET status = $1
          WHERE id = $2
        `;
        await pgClient.query(updateStatusSql, [status, id]);
      }
      if (resign_date) {
        const updateResignSql = `
          UPDATE users
          SET resign_date = $1
          WHERE id = $2
        `;
        await pgClient.query(updateResignSql, [resign_date, id]);
      }

      // Finally, fetch and return the updated employee data
      return this.getEmployeeById(id);
    } catch (error) {
      console.log("cannot update employee:", error);
      throw new Error("Failed to update employee");
    }
  }
}
export const adminEmployeeService = new AdminEmployeeService();
