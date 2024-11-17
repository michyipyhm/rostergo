"use client";
import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import styles from './MonthlyRoster.module.scss';
import { MonthlyRosterData } from "@/services/models";
import holidaysData from "@/HKPH-en.json"
import EditRoster from './EditRoster';

function MonthlyRosterForm({ data }: { data: MonthlyRosterData }) {
    const { users, shifts, shiftRequests, leaveRequests } = data

    const params = useParams()
    const date = params?.date

    const [publicHolidays, setPublicHolidays] = useState<Set<number>>(new Set());
    const [showEditRoster, setShowEditRoster] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMemberName, setSelectedMemberName] = useState<string | null>(null);

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

    // get the month then take the holiday as a number
    const getPublicHolidaysForMonth = (year: number, month: number) => {
        const events = holidaysData.vcalendar[0].vevent;
        return events
            .map(event => {
                const dateValue = event.dtstart[0];
                return typeof dateValue === "string" ? dateValue : "";
            })
            .filter(dateStr => dateStr !== "")
            .filter(dateStr => {
                const date = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
                return date.getFullYear() === year && date.getMonth() + 1 === month;
            })
            .map(dateStr => Number(dateStr.slice(6, 8)))
    };

    useEffect(() => {
        const holidays = getPublicHolidaysForMonth(yearNum, monthNum);
        setPublicHolidays(new Set(holidays));
    }, [yearNum, monthNum]);

    // convert Weekday(string) to number
    const weekdayMap: { [key: string]: number } = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    }

    // calculate rest days in a month based on weekday and rest days per week
    const calculateRestDays = (weekdayStr: string, perWeek: number) => {
        const weekday = weekdayMap[weekdayStr];
        if (weekday === undefined) return 0;

        let weekdayRestDays = 0
        let holidayRestDays = 0

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(yearNum, monthNum - 1, day);

            if (publicHolidays.has(day)) {
                holidayRestDays += 1;
            } else if (date.getDay() === weekday) {
                weekdayRestDays += perWeek;
            }
        }
        return weekdayRestDays + holidayRestDays
    };

    //loop data 所有結果並集成 staffResult
    const staff = [
        ...users.map((user) => ({
            id: user.id,
            name: user.nickname,
            gender: user.gender,
            branch_id: user.branch_id,
            status: user.status,
            position: user.positions_name,
            grade: user.grade_name,
            position_type: user.position_type,
            isWeekend_Restday: user.weekend_restday,
            rest_day: calculateRestDays(user.restday_countby, user.restday_per_week),
        })),
    ]

    //loop data shifts所有結果
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

    //loop data shift requests所有結果
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

    //loop data leave requests所有結果
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

    // handleCellClick 更新狀態
    const handleCellClick = (day: number, memberName: string) => {
        setSelectedDay(day);
        setSelectedMemberName(memberName);
        setShowEditRoster(true);
    };

    // 關閉小視窗的方法
    const closeEditRoster = () => {
        setShowEditRoster(false);
        setSelectedDay(null);
        setSelectedMemberName(null);
    };

    // Generate weekday labels for each day of the month
    const weekdays = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(yearNum, monthNum - 1, i + 1);
        return date.toLocaleString("en-US", { weekday: "short" });
    });

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
                            <th rowSpan={2}>ID</th>
                            <th rowSpan={2}>Name</th>
                            <th rowSpan={2}>Position</th>
                            <th rowSpan={2}>Rest Day Count</th>
                            {weekdays.map((weekday, i) => (
                                <th
                                    key={`weekday-${i}`}
                                    className={`${weekday === "Sat" || weekday === "Sun" ? styles.weekend : ""} ${publicHolidays.has(i + 1) ? styles.holiday : ""}`}
                                >
                                    {weekday}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            {Array.from({ length: daysInMonth }, (_, i) => {
                                const date = new Date(yearNum, monthNum - 1, i + 1);
                                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                                const isHoliday = publicHolidays.has(i + 1);
                                return (
                                    <th key={i + 1} className={`${isWeekend ? styles.weekend : ""} ${isHoliday ? styles.holiday : ""}`}>
                                        {i + 1}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((member, index) => (
                            <tr key={index}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.position}</td>
                                <td>
                                    {member.position_type === "Part Time" ? (
                                        "N/A"
                                    ) : member.isWeekend_Restday === true ? (
                                        "Weekend Holidays"
                                    ) : (
                                        `${member.rest_day} days`
                                    )}
                                </td>
                                {Array.from({ length: daysInMonth }, (_, i) => {
                                    const date = new Date(yearNum, monthNum - 1, i + 1);
                                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                                    const isHoliday = publicHolidays.has(i + 1);
                                    const shift = shiftsStatus[member.id]?.[i] || "";
                                    const shiftRequest = shiftRequestsStatus[member.id]?.[i] || "";
                                    const leaveRequest = leaveRequestsStatus[member.id]?.[i] || "";
                                    const showTheDay = leaveRequest || shiftRequest || shift;
                                    const cellClassName = `${styles.clickableCell} ${leaveRequest
                                        ? styles.request
                                        : shiftRequest
                                            ? styles.request
                                            : shift
                                                ? styles.confirmed
                                                : ""
                                        } ${isWeekend ? styles.weekend : ""} ${isHoliday ? styles.holiday : ""}`;

                                    return (
                                        <td
                                            key={i + 1}
                                            onClick={() => handleCellClick(i + 1, member.name)}
                                            className={cellClassName}
                                        >
                                            {shiftsStatus[member.id]?.[i] || ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showEditRoster && selectedDay !== null && selectedMemberName !== null && (
                <EditRoster
                    day={selectedDay}
                    memberName={selectedMemberName}
                    onClose={closeEditRoster}
                />
            )}
        </div>
    );
}

export default MonthlyRosterForm