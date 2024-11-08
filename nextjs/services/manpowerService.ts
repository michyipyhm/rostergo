import { pgClient } from "@/services/pgClient";

class ManpowerService {

  constructor() { }

  async getDailyManpower(date: string) {
    try {

      const result = await pgClient.query("SELECT * FROM shifts WHERE date = $1", [date])

      return result.rows
    } catch (error) {
      console.error("Database query error:", error)
      throw new Error("Database error")
    }
  }
}
export const manpowerService = new ManpowerService();