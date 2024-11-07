"use client"
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styles from './page.module.scss'
import holidaysData from '@/HKPH-en.json'
import ManpowerTable from '@/component/ManpowerTable';
import DayShiftRecord from '@/component/DayShiftRecord';

interface Event {
  title: string
  start: string
  end: string
}

export default function Home() {

  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const publicHolidays: Event[] = holidaysData.vcalendar[0].vevent.map(event => ({
      title: event.summary,
      start: typeof event.dtstart[0] === 'string' ? event.dtstart[0] : '',
      end: typeof event.dtend[0] === 'string' ? event.dtend[0] : ''
    }))
    setEvents(publicHolidays)
  }, [])

  return (
    <div className={styles.secondSection}>
      <div className={styles.calendar}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
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
}
