import { pgClient } from "@/lib/pgClient";

class MobileProfileService {
  constructor() {}

  async getProfileByUserId (userId: number) {
    try {
      const sql = `
       SELECT 
          users.id as id,
          users.nickname as nickname,
          users.gender as gender,
          users.phone as phone,
          users.branch_id as branch, 
          positions.name as position,
          grades.name as grade,
          grades.annual_leave_quota as annual_leave,
          users.join_date as join_date
        FROM users
        JOIN positions ON users.position_id = positions.id
        JOIN grades ON positions.grade_id = grades.id
        WHERE users.id = $1
      `;
      const result = await pgClient.query(sql, [userId]);
      return result.rows[0];
    } catch (error) {
      console.log("cannot get employeeById:", error);
      throw new Error("EmployeeById not found");
    }
  }
}

export const mobileProfileService = new MobileProfileService();