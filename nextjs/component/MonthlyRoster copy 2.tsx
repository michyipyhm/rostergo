"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import styles from './MonthlyRoster.module.scss';

interface Shift {
    id: number,
    date: string,
    shift_slot_id: number,
    user_id: number,
    checkin_time: string,
    checkout_time: string,
    minute_late_time: number,
    minute_over_time: number,
    over_time_approve: boolean,
    status: string,
    created_at: string,
    updated_at: string,
    user_nickname: string,
    position_name: string,
    position_type: string,
    slot_title: string,
    slot_short_title: string,
}

interface ShiftRequest {
    id: number,
    user_id: number,
    date: string,
    shift_slot_id: number,
    status: string,
    created_at: string,
    updated_at: string,
    user_nickname: string,
    position_name: string,
    position_type: string,
    slot_title: string,
    slot_short_title: string,
}

interface LeaveRequest {
    id: number,
    user_id: number,
    shift_slot_id: number,
    start_date: string,
    end_date: string,
    duration: string,
    leave_type_id: number,
    sick_photo_prove: string,
    status: string,
    created_at: string,
    updated_at: string,
    user_nickname: string,
    position_name: string,
    position_type: string,
    slot_title: string,
    slot_short_title: string,
    leave_type_name: string,
    leave_type_short_name: string,
}

interface MonthlyRosterData {
    shifts: Shift[],
    shiftRequests: ShiftRequest[]
    leaveRequests: LeaveRequest[]
}


function MonthlyRosterForm({ data }: { data: MonthlyRosterData }) {
    const { shifts, shiftRequests, leaveRequests } = data

    const params = useParams()
    const date = params?.date

    const staff = [
        {
            name: shifts[1].user_nickname,
            POS: "Manager",
            Type: "Full Time",
        },
        {
            name: "pt1",
            POS: "Salesperson",
            Type: "Part Time",
        },
        {
            name: "ft1",
            POS: "Salesperson",
            Type: "Full Time",
        }
    ]

    // check the date(string) parameter should be YYYY-MM
    if (!date || Array.isArray(date) || !/^\d{4}-\d{2}$/.test(date)) {
        notFound()
    }

    // split the date(string) then convert to number
    const [year, month] = date.split("-")
    const monthNum = Number(month)
    const yearNum = Number(year)

    // Range of year can be choose
    const currentYear = new Date().getFullYear()
    const minYear = currentYear - 2
    const maxYear = currentYear + 1

    // Range of month should be 1~12
    if (yearNum < minYear || yearNum > maxYear || monthNum < 1 || monthNum > 12) {
        notFound()
    }

    const daysInMonth = new Date(yearNum, monthNum, 0).getDate()

    const handleCellClick = (day: number, memberName: string) => {
        alert(`Clicked on day ${day} for ${memberName}`)
    }

    return (
        <div>
            <div className={styles.selectedMonth}>
                Year: <h3>{year}</h3>
                Month: <h3>{month}</h3>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.rosterTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Type</th>
                            {Array.from({ length: daysInMonth }, (_, i) => (
                                <th key={i + 1}>{i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((member, index) => (
                            <tr key={index}>
                                <td>{member.name}</td>
                                <td>{member.POS}</td>
                                <td>{member.Type}</td>
                                {Array.from({ length: daysInMonth }, (_, i) => (
                                    <td
                                        key={i + 1}
                                        onClick={() => handleCellClick(i + 1, member.name)}
                                        className={styles.clickableCell}
                                    >
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MonthlyRosterForm