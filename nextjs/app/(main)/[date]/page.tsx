import React from "react";
import CalendarAdmin from "@/component/Calendar";
import ManpowerTable from "@/component/ManpowerTable";
import DayShiftRecord from "@/component/DayShiftRecord";
import styles from "@/app/page.module.scss";
import { manpowerService } from "@/services/admin/manpowerService";
import { Params } from "@/lib/models";
import { notFound } from "next/navigation";
import { Calendar, LayoutDashboard, Users, ClipboardList } from "lucide-react"

const DatePage = async ({ params }: { params: Params }) => {
  const { date } = await params;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) {
    notFound();
  }
  const result = await manpowerService.getDailyManpower(date);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Daily Status</h1>
        <div className={styles.dateDisplay}>
          <Calendar className={styles.icon} size={20} />
          <span>{date}</span>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.calendarSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <LayoutDashboard className={styles.icon} size={20} />
              <h2>Calendar View</h2>
            </div>
            <div className={styles.cardContent}>
              <CalendarAdmin />
            </div>
          </div>
        </div>

        <div className={styles.manpowerSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Users className={styles.icon} size={20} />
              <h2>Manpower Overview</h2>
            </div>
            {/* <div className={styles.cardContent}> */}
              <ManpowerTable shifts={result} />
            {/* </div> */}
          </div>
        </div>

        <div className={styles.recordSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <ClipboardList className={styles.icon} size={20} />
              <h2>Shift Records</h2>
            </div>
            {/* <div className={styles.cardContent}> */}
              <DayShiftRecord shifts={result} />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePage;
