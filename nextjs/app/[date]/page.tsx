import React from "react"
import CalendarAdmin from '@/component/Calendar'
import ManpowerTable from '@/component/ManpowerTable'
import DayShiftRecord from '@/component/DayShiftRecord'
import styles from '@/app/page.module.scss'
import SelectDate from "@/component/SelectDate";
import { manpowerService } from "@/services/manpowerService"

const DatePage = async () => {

  const result = await manpowerService.getDailyManpower("2024-11-07")
  console.log(result)

  return (
    <div className={styles.secondSection}>
      <div className={styles.calendar}>
        <SelectDate />
        <CalendarAdmin />
      </div>
      <div className={styles.manpower}>
        <h1>ManPower</h1>
        <ManpowerTable />
      </div>
      <div className={styles.record}>
        <h1>Record</h1>
        <DayShiftRecord />
      </div>
    </div>
  );
};

export default DatePage;