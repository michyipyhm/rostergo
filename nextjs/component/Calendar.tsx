"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRouter } from "next/navigation";
import holidaysData from "@/HKPH-en.json";
import styles from "./Calendar.module.scss";

interface Event {
  title: string
  start: string
  end: string
}

const CalendarAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const router = useRouter()

  useEffect(() => {
    const publicHolidays: Event[] = holidaysData.vcalendar[0].vevent.map((event) => ({
      title: event.summary,
      start: typeof event.dtstart[0] === "string" ? event.dtstart[0] : "",
      end: typeof event.dtend[0] === "string" ? event.dtend[0] : "",
    }));
    setEvents(publicHolidays)
  }, [])

  const DateClick = (arg: { dateStr: string }) => {
    const clickDate = arg.dateStr
    router.push(`/${clickDate}`)
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={DateClick}
      dayCellClassNames={() => styles.dayCellHover}
    />
  )
}

export default CalendarAdmin;