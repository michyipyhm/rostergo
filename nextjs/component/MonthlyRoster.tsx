"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import styles from './MonthlyRoster.module.scss';
import { MonthlyRosterData } from "@/services/models";

function MonthlyRosterForm({ data }: { data: MonthlyRosterData }) {
    const { shifts, shiftRequests, leaveRequests } = data

    const params = useParams()
    const date = params?.date

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

    // calculate how many day on the month
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate()

    //loop data 所有結果並集成 staffResult
    const staffResult = [
        ...shifts.map((shift) => ({
            id: shift.user_id,
            name: shift.user_nickname,
            position: shift.position_name,
            positionType: shift.position_type,
        })),
        ...shiftRequests.map((shiftRequest) => ({
            id: shiftRequest.user_id,
            name: shiftRequest.user_nickname,
            position: shiftRequest.position_name,
            positionType: shiftRequest.position_type,
        })),
        ...leaveRequests.map((leaveRequest) => ({
            id: leaveRequest.user_id,
            name: leaveRequest.user_nickname,
            position: leaveRequest.position_name,
            positionType: leaveRequest.position_type,
        })),
    ]

    // staffResult中，假如user_id 重覆則合并成一
    const staff = Array.from(
        new Map(staffResult.map((member) => [member.id, member])).values()
    )

    //loop data 所有結果並集成 dayResult
    const dayResult = [
        ...shifts.map((shift) => ({
            dayType: "Shift",
            userId: shift.user_id,
            date: new Date(shift.date).getDate(),
            slot_title: shift.slot_title,
            slot_short_title: shift.slot_short_title,
            status: shift.status,
        })),
        ...shiftRequests.map((shiftRequest) => ({
            dayType: "Shift Request",
            userId: shiftRequest.user_id,
            date: new Date(shiftRequest.date).getDate(),
            slot_title: shiftRequest.slot_title,
            short_title: shiftRequest.slot_short_title,
            status: shiftRequest.status,
        })),
        ...leaveRequests.map((leaveRequest) => ({
            dayType: "Leave Request",
            userId: leaveRequest.user_id,
            startDate: new Date(leaveRequest.start_date).getDate(),
            endDate: new Date(leaveRequest.end_date).getDate(),
            duration: leaveRequest.duration,
            short_title: leaveRequest.slot_title,
            slot_short_title: leaveRequest.slot_short_title,
            leave_name: leaveRequest.leave_type_name,
            leave_short_name: leaveRequest.leave_type_short_name,
            sick_photo_prove: leaveRequest.sick_photo_prove,
            status: leaveRequest.status,
        })),
    ]

    const shiftsStatus = staff.reduce((acc, member) => {
        acc[member.id] = Array(daysInMonth).fill("")
        shifts.forEach((shift) => {
            if (shift.user_id === member.id) {
                const day = new Date(shift.date).getDate()
                acc[member.id][day - 1] = shift.slot_short_title
            }
        });
        return acc;
    }, {} as Record<number, string[]>);

    const shiftRequestsStatus = staff.reduce((acc, member) => {
        acc[member.id] = Array(daysInMonth).fill("");
        shiftRequests.forEach((shiftRequest) => {
            if (shiftRequest.user_id === member.id) {
                const day = new Date(shiftRequest.date).getDate();
                acc[member.id][day - 1] = shiftRequest.slot_short_title;
            }
        });
        return acc;
    }, {} as Record<number, string[]>);

    const leaveRequestsStatus = staff.reduce((acc, member) => {
        acc[member.id] = Array(daysInMonth).fill("");
        leaveRequests.forEach((leaveRequest) => {
            if (leaveRequest.user_id === member.id) {
                const startDay = new Date(leaveRequest.start_date).getDate();
                const endDay = new Date(leaveRequest.end_date).getDate();
                for (let d = startDay; d <= endDay; d++) {
                    acc[member.id][d - 1] = leaveRequest.leave_type_short_name;
                }
            }
        });
        return acc;
    }, {} as Record<number, string[]>);

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
                            <th>ID</th>
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
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.position}</td>
                                <td>{member.positionType}</td>
                                {Array.from({ length: daysInMonth }, (_, i) => {
                                    const shift = shiftsStatus[member.id]?.[i] || ""
                                    const shiftRequest = shiftRequestsStatus[member.id]?.[i] || ""
                                    const leaveRequest = leaveRequestsStatus[member.id]?.[i] || ""
                                    const showTheDay = leaveRequest || shiftRequest || shift
                                    const cellClassName = leaveRequest ? styles.request
                                    : shiftRequest ? styles.request
                                    : shift ? styles.confirmed
                                    : ""

                                    return (
                                        <td
                                            key={i + 1}
                                            onClick={() => handleCellClick(i + 1, member.name)}
                                            className={`${styles.clickableCell} ${cellClassName}`}
                                        >
                                            {showTheDay}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MonthlyRosterForm