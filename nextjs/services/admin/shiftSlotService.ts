import { pgClient } from "@/lib/pgClient";

class ShiftSlotService {
  constructor() { }

  async getShiftSlot(branch_id: number) {
    try {
      const shiftSlots_sql = `
        SELECT 
          shift_slots.*
        FROM shift_slots
        WHERE branch_id = $1
      `
      const shiftSlots_result = await pgClient.query(shiftSlots_sql, [branch_id])

      const leaveTypes_sql = `
      SELECT 
        leave_types.*
      FROM leave_types
    `
      const leaveTypes_result = await pgClient.query(leaveTypes_sql)

      return {
        shiftSlots: shiftSlots_result.rows,
        leaveTypes: leaveTypes_result.rows
      }
    } catch (error) {
      console.error("Database query error for Shift Slots and Leave Types")
      throw new Error("Database error")
    }
  }

  async updateShiftSlot(id: number, branch_id: number, title: string, short_title: string, start_time: string, end_time: string) {
    try {

      const checkShiftSlot_sql = `
      SELECT
        shift_slots.*
      FROM shift_slots
      WHERE id = $1
      `
      const checkShiftSlot_result = await pgClient.query(checkShiftSlot_sql, [id])

      if (checkShiftSlot_result.rows.length === 0) {
        throw new Error("Shift Slot does not exist")
      }

      const checkRepeatTitle_sql = `
      SELECT title, short_title
      FROM shift_slots
      WHERE (title = $1 OR short_title = $2) AND branch_id = $3 AND id != $4
      `
      const checkRepeatTitle_result = await pgClient.query(checkRepeatTitle_sql, [title, short_title, branch_id, id])

      if (checkRepeatTitle_result.rows.length > 0) {
        throw new Error("Title or Short Title cannot be repeated with other Shift Slots")
      }

      const updateShiftSlot_sql = `
          UPDATE shift_slots
          SET title = $1,
              short_title = $2,
              start_time = $3,
              end_time = $4
          WHERE id = $5
      `
      await pgClient.query(updateShiftSlot_sql, [title, short_title, start_time, end_time, id])

      return {
        success: true,
        message: "Updated successfully",
      }
    } catch (error) {
      console.error("Database query error for Shift Slots")
      throw new Error("Database error")
    }
  }

  async updateLeaveType(id: number, name: string, short_name: string, quota: number) {
    try {

      const checkLeaveType_sql = `
      SELECT
        leave_types.*
      FROM leave_types
      WHERE id = $1
      `
      const checkLeaveType_result = await pgClient.query(checkLeaveType_sql, [id])

      if (checkLeaveType_result.rows.length === 0) {
        throw new Error("Leave Type does not exist")
      }

      const checkRepeatName_sql = `
      SELECT name, short_name
      FROM leave_types
      WHERE (name = $1 OR short_name = $2) AND id != $3
      `
      const checkRepeatName_result = await pgClient.query(checkRepeatName_sql, [name, short_name, id])

      if (checkRepeatName_result.rows.length > 0) {
        throw new Error("Name or Short Name cannot be repeated with other Leave Types")
      }

      const updateLeaveType_sql = `
      UPDATE leave_types
      SET name = $1,
          short_name = $2,
          quota = $3
      WHERE id = $4
  `
      await pgClient.query(updateLeaveType_sql, [name, short_name, quota, id])

      return {
        success: true,
        message: "Updated successfully",
      }

    } catch (error) {
      console.error("Database query error for Leave Types")
      throw new Error("Database error")
    }
  }

  async addShiftSlot(branch_id: number, title: string, short_title: string, start_time: string, end_time: string) {
    try {

      const checkRepeatTitle_sql = `
      SELECT title, short_title
      FROM shift_slots
      WHERE (title = $1 OR short_title = $2) AND branch_id = $3
      `
      const checkRepeatTitle_result = await pgClient.query(checkRepeatTitle_sql, [title, short_title, branch_id])

      if (checkRepeatTitle_result.rows.length > 0) {
        throw new Error("Title or Short Title cannot be repeated with other Shift Slots")
      }

      const addShiftSlot_sql = `
      INSERT INTO shift_slots (branch_id, title, short_title, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5);
      `
        await pgClient.query(addShiftSlot_sql, [branch_id, title, short_title, start_time, end_time])

      return {
        success: true,
        message: "Add new Shift Slot successfully",
      }
    } catch (error) {
      console.error("Database query error for Shift Slot adding")
      throw new Error("Database error")
    }
  }

  async addLeaveType(name: string, short_name: string, quota: number) {
    try {

      const checkRepeatName_sql = `
      SELECT name, short_name
      FROM leave_types
      WHERE name = $1 OR short_name = $2
      `
      const checkRepeatName_result = await pgClient.query(checkRepeatName_sql, [name, short_name])

      if (checkRepeatName_result.rows.length > 0) {
        throw new Error("Name or Short Name cannot be repeated with other Leave Types")
      }

      const addLeaveType_sql = `
      INSERT INTO leave_types (name, short_name, quota)
      VALUES ($1, $2, $3);
      `
      await pgClient.query(addLeaveType_sql, [name, short_name, quota])

      return {
        success: true,
        message: "Updated successfully",
      }

    } catch (error) {
      console.error("Database query error for Leave Types")
      throw new Error("Database error")
    }
  }

}

export const shiftSlotService = new ShiftSlotService()