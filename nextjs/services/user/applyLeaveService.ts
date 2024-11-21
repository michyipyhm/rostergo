import { pgClient } from "@/lib/pgClient";
import { co } from "@fullcalendar/core/internal-common";

type leaveData = {
  id: number;
  user_id: number;
  shift_slot_id: number;
  leave_type_id: number;
  start_date: Date;
  end_date: Date;
  status: string;
};


export async function getLeaveTypes(): Promise<any> {
  const result = await pgClient.query(
    `SELECT * FROM leave_types`
  );
  return result.rows;
}

export async function getLeaveTypesWithoutSickLeave(): Promise<any> {
  const result = await pgClient.query(
        `SELECT * FROM leave_types WHERE id <> 1`
  );
  return result.rows;
}