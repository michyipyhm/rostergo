import React from "react"
import CalendarAdmin from '@/component/Calendar'
import ManpowerTable from '@/component/ManpowerTable'
import DayShiftRecord from '@/component/DayShiftRecord'
import styles from '@/app/page.module.scss'
import { manpowerService } from "@/services/manpowerService"
import { Params } from "@/services/models";

const DatePage = async ({ params }: { params: Params }) => {
  const { date } = params
  const result = await manpowerService.getDailyManpower(date)

  return (
    <div className={styles.secondSection}>
      <div className={styles.calendar}>
      <h1>Date Selected: {date}</h1>

        <CalendarAdmin />
      </div>
      <div className={styles.manpower}>
        <h1>ManPower</h1>
        <ManpowerTable shifts={result} />
      </div>
      <div className={styles.record}>
        <h1>Record</h1>
        <DayShiftRecord shifts={result} />
      </div>
    </div>
  )
}

export default DatePage;