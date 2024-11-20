import { pgClient } from "@/lib/pgClient";

class BranchService {
  constructor() { }

  async getBranchData(branch_id: number) {
    try {
      const branches_sql = `
        SELECT 
          branches.*
        FROM branches
        WHERE branches.id = $1
      `
      const branch = await pgClient.query(branches_sql, [branch_id])
      return branch.rows[0]
    } catch (error) {
      console.error("Database query error for branches")
      throw new Error("Database error")
    }
  }

  async getPositionData() {
    try {
      const branches_sql = `
        SELECT 
          positions.*,
          grades.name AS grade_name,
          grades.annual_leave_quota AS annual_leave_quota
        FROM positions
        JOIN grades ON positions.grade_id = grades.id
      `
      const position = await pgClient.query(branches_sql)

      const grades_sql = `
        SELECT 
          grades.*
        FROM grades
      `
      const grade = await pgClient.query(grades_sql)

      return position.rows
    } catch (error) {
      console.error("Database query error for positions")
      throw new Error("Database error")
    }
  }

  async updateGrade(id: number, name: string, annualLeaveQuota: number) {
    try {
      const checkGrade_sql = `
        SELECT
          grades.*
        FROM grades
        WHERE id = $1
        `
      const checkGrade_result = await pgClient.query(checkGrade_sql, [id])

      if (checkGrade_result.rows.length === 0) {
        throw new Error("Grade does not exist")
      }

      const checkName_sql = `
        SELECT name
        FROM grades
        WHERE name = $1 AND id != $2
        `
      const checkName_result = await pgClient.query(checkName_sql, [name, id])

      if (checkName_result.rows.length > 0 && checkName_result.rows[0].name === name) {
        const changeGradeRepeatName_sql = `
          UPDATE grades
          SET name = $1,
              annual_leave_quota = $2
          WHERE id = $3
          `
        await pgClient.query(changeGradeRepeatName_sql, [`${name}(2)`, annualLeaveQuota, id])
      } else {
        const changeGradeName_sql = `
          UPDATE grades
          SET name = $1,
              annual_leave_quota = $2
          WHERE id = $3
        `
        await pgClient.query(changeGradeName_sql, [name, annualLeaveQuota, id])
      }

      return {
        success: true,
        message: "Updated successfully",
      }
    } catch (error) {
      console.error("Database query error for grades")
      throw new Error("Database error")
    }
  }

  async updatePosition(id: number, name: string, grade_id: string, type: string, part_time_hour_wage: number, full_time_wage: number, weekend_restDay: boolean, restDay_per_week: number, restDay_countBy: string) {
    try {
      const checkPosition_sql = `
      SELECT
        positions.*
      FROM positions
      WHERE id = $1
      `
      const checkPosition_result = await pgClient.query(checkPosition_sql, [id])

      if (checkPosition_result.rows.length === 0) {
        throw new Error("Position does not exist")
      }

      const checkName_sql = `
      SELECT name
      FROM positions
      WHERE name = $1 AND id != $2
      `
      const checkName_result = await pgClient.query(checkName_sql, [name, id])

      if (checkName_result.rows.length > 0 && checkName_result.rows[0].name === name) {
        const changePositionRepeatName_sql = `
          UPDATE positions
          SET name = $1,
              grade_id = $2,
              type = $3,
              part_time_hour_wage = $4,
              full_time_wage = $5,
              weekend_restDay = $6,
              restDay_per_week = $7,
              restDay_countBy = $8
          WHERE id = $9
          `
        await pgClient.query(changePositionRepeatName_sql, [`${name}(2)`, grade_id, type, part_time_hour_wage, full_time_wage, weekend_restDay, restDay_per_week, restDay_countBy, id])
      } else {
        const changePositionsName_sql = `
          UPDATE positions
          SET name = $1,
              grade_id = $2,
              type = $3,
              part_time_hour_wage = $4,
              full_time_wage = $5,
              weekend_restDay = $6,
              restDay_per_week = $7,
              restDay_countBy = $8
          WHERE id = $9
          `
        await pgClient.query(changePositionsName_sql, [name, grade_id, type, part_time_hour_wage, full_time_wage, weekend_restDay, restDay_per_week, restDay_countBy, id])
      }

      return {
        success: true,
        message: "Updated successfully",
      }

    } catch (error) {
      console.error("Database query error for position")
      throw new Error("Database error")
    }
  }

}

export const branchService = new BranchService()