"use client";
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"

const SelectDate = () => {
  const router = useRouter()
  const pathname = usePathname()

  const date = pathname.split("/")[1]

  useEffect(() => {

    const isValidDate = (date: string) => {
      const [year, month, day] = date.split("-").map(Number)
      const dateObj = new Date(year, month - 1, day)
      return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getDate() === day
      )
    }

    if (!isValidDate(date)) {
      router.push("/404/error")
    }
  }, [date, router])

  return (
    <div>
        <h1>Date Selected: {date}</h1>
    </div>
  );
};

export default SelectDate;