import { getLeaveRequestDetailByUserId } from "@/services/leaveRequestsDetail";
import { error } from "console";
import { Pool } from 'pg';



export async function main() {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});
    try {
      const leaveRequests = await getLeaveRequestDetailByUserId(1);
      console.log(leaveRequests);
    } catch (error) {
      console.error('error', error);
    } finally {
      await pool.end();
    }
  }
  
  main();