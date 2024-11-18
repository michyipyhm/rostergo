import React from "react"
import CalendarAdmin from '@/component/Calendar'
import ManpowerTable from '@/component/ManpowerTable'
import DayShiftRecord from '@/component/DayShiftRecord'
import styles from '@/app/page.module.scss'
import { manpowerService } from "@/services/admin/manpowerService"
import { Params } from "@/lib/models";
import { notFound } from "next/navigation"

const DatePage = async ({ params }: { params: Params }) => {
  const { date } = await params
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!datePattern.test(date)) {
    notFound()
  }
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