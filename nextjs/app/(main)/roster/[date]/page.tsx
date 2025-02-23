import MonthlyRosterForm from "@/component/MonthlyRoster";
import MonthlyRosterSelector from "@/component/MonthlyRosterSelector";
import React from "react";
import { monthlyRosterService } from "@/services/admin/monthlyRosterService";
import { notFound } from "next/navigation";
import { Params } from "@/lib/models";
import ShiftSlot from "@/component/ShiftSlot";
import LeaveRequest from "@/component/LeaveRequest";
import { Calendar, Users, Clock, FileText } from "lucide-react";
import styles from "./page.module.scss";

export default async function MonthlyRoster({ params }: { params: Params }) {
  const { date } = await params;
  const datePattern = /^\d{4}-\d{2}$/;
  if (!datePattern.test(date)) {
    notFound();
  }
  if (!date) {
    notFound();
  }
  const result = await monthlyRosterService.getMonthlyRoster(date);
  const leaveRequestData = await monthlyRosterService.getLeaveRequest(date);
  const leaveRequest = leaveRequestData.leave_requests;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Monthly Roster</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.selectorSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Calendar className={styles.icon} size={20} />
              <h2>Month Selector</h2>
            </div>
            <div className={styles.cardContent}>
              <MonthlyRosterSelector />
            </div>
          </div>
        </div>

        <div className={styles.rosterSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Users className={styles.icon} size={20} />
              <h2>Monthly Roster</h2>
            </div>
            <div className={styles.cardContent}>
              <MonthlyRosterForm data={result} />
            </div>
          </div>
        </div>

        <div className={styles.shiftSlotSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Clock className={styles.icon} size={20} />
              <h2>Shift Slots</h2>
            </div>
            <div className={styles.cardContent}>
              <ShiftSlot />
            </div>
          </div>
        </div>

        <div className={styles.leaveRequestSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FileText className={styles.icon} size={20} />
              <h2>Leave Requests</h2>
            </div>
            {/* <div className={styles.cardContent}> */}
            <LeaveRequest leaveRequests={leaveRequest} />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
