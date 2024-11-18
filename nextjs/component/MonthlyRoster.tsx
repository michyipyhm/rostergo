"use client";
import React, { useEffect, useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import styles from './MonthlyRoster.module.scss';
import { MonthlyRosterData } from "@/lib/models";
import holidaysData from "@/HKPH-en.json"
import EditRoster from './EditRoster';

function MonthlyRosterForm({ data }: { data: MonthlyRosterData }) {

    const router = useRouter()

    const { users, shifts, shiftRequests, leaveRequests, shift_slots } = data

    const params = useParams()
    const date = params?.date

    const [publicHolidays, setPublicHolidays] = useState<Set<number>>(new Set());
    const [showEditRoster, setShowEditRoster] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const [selectedNickname, setSelectedNickname] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedShift, setSelectedShift] = useState<string | null>(null);
    const [selectedShiftRequest, setSelectedShiftRequest] = useState<string | null>(null);
    const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<string | null>(null);

    const shiftOptions = shift_slots.map((slot) => slot.short_title)
    // console.log(shiftOptions)

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

    //loop data 所有結果並集成 shift_slot
    const shift_slot = [
        ...shift_slots.map((shift_slot) => ({
            id: shift_slot.id,
            branch_id: shift_slot.branch_id,
            title: shift_slot.title,
            short_title: shift_slot.short_title,
            start_time: shift_slot.start_time,
            end_time: shift_slot.end_time,
            work_hour: shift_slot.work_hour,
        })),
    ]

    //改users data 做staff 方便睇
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

    //loop data shifts所有結果入落table
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

    // Get shiftRequests result
    const generateShiftRequestsStatus = (
        shiftRequests: any[],
        staff: any[],
        daysInMonth: number,
        filterFn: (shiftRequest: any) => boolean
    ) => {
        return staff.reduce((acc, member) => {
            acc[member.id] = Array(daysInMonth).fill(null);
            shiftRequests.forEach((shiftRequest) => {
                if (shiftRequest.user_id === member.id && filterFn(shiftRequest)) {
                    const day = new Date(shiftRequest.date).getDate();
                    acc[member.id][day - 1] = shiftRequest.slot_short_title;
                }
            });
            return acc;
        }, {} as Record<number, string[]>);
    };

    // shiftRequests result all result
    const shiftRequestsStatus = generateShiftRequestsStatus(
        shiftRequests,
        staff,
        daysInMonth,
        () => true
    );

    // shiftRequests result "approve" result
    const shiftRequestsConfirmed = generateShiftRequestsStatus(
        shiftRequests,
        staff,
        daysInMonth,
        (shiftRequest) => shiftRequest.status === "approve"
    );

    // shiftRequests result "pending" result
    const shiftRequestsPending = generateShiftRequestsStatus(
        shiftRequests,
        staff,
        daysInMonth,
        (shiftRequest) => shiftRequest.status === "pending"
    );

    // Get leaveRequests result
    const generateLeaveRequestsStatus = (
        leaveRequests: any[],
        staff: any[],
        daysInMonth: number,
        filterFn: (leaveRequest: any) => boolean
    ) => {
        return staff.reduce((acc, member) => {
            acc[member.id] = Array(daysInMonth).fill("");
            leaveRequests.forEach((leaveRequest) => {
                if (leaveRequest.user_id === member.id && filterFn(leaveRequest)) {
                    const startDay = new Date(leaveRequest.start_date).getDate();
                    const endDay = new Date(leaveRequest.end_date).getDate();
                    for (let d = startDay; d <= endDay; d++) {
                        acc[member.id][d - 1] = leaveRequest.leave_type_short_name;
                    }
                }
            });
            return acc;
        }, {} as Record<number, string[]>);
    };

    // leaveRequests all result
    const leaveRequestsStatus = generateLeaveRequestsStatus(
        leaveRequests,
        staff,
        daysInMonth,
        () => true
    );

    // leaveRequests "approve" result
    const leaveRequestsConfirmed = generateLeaveRequestsStatus(
        leaveRequests,
        staff,
        daysInMonth,
        (leaveRequest) => leaveRequest.status === "approve"
    );

    // leaveRequests "pending" result
    const leaveRequestsPending = generateLeaveRequestsStatus(
        leaveRequests,
        staff,
        daysInMonth,
        (leaveRequest) => leaveRequest.status === "pending"
    );

    // Click for open EditWindow
    const handleCellClick = (day: number, memberId: number, memberName: string) => {
        setSelectedDay(day);
        setSelectedMemberId(memberId);
        setSelectedNickname(memberName);
        setSelectedMonth(`${year}-${String(month).padStart(2, "0")}`);

        // search shift, shiftRequest, leaveRequest by user id
        const shift = shiftsStatus[memberId]?.[day - 1] || null;
        const shiftRequest = shiftRequestsStatus[memberId]?.[day - 1] || null;
        const leaveRequest = leaveRequestsStatus[memberId]?.[day - 1] || null;

        setSelectedShift(shift);
        setSelectedShiftRequest(shiftRequest);
        setSelectedLeaveRequest(leaveRequest);

        setShowEditRoster(true);
    };

    // 狀態用於存儲選中的 shift, shiftRequest, 和 leaveRequest


    // Close EditWindow
    const closeEditRoster = () => {
        setShowEditRoster(false);
        setSelectedDay(null);
        setSelectedMemberId(null);
        setSelectedMonth("");
        setSelectedShift(null); // 重置 shift
        setSelectedShiftRequest(null); // 重置 shiftRequest
        setSelectedLeaveRequest(null); // 重置 leaveRequest
        router.refresh()
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
                                        "W&H"
                                    ) : (
                                        `${member.rest_day}`
                                    )}
                                </td>
                                {Array.from({ length: daysInMonth }, (_, i) => {
                                    const date = new Date(yearNum, monthNum - 1, i + 1);
                                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                                    const isHoliday = publicHolidays.has(i + 1);
                                    const shift = shiftsStatus[member.id]?.[i] || "";
                                    const shiftRequestConfirmed = shiftRequestsConfirmed[member.id]?.[i] || "";
                                    const shiftRequestPending = shiftRequestsPending[member.id]?.[i] || "";
                                    const leaveRequestConfirmed = leaveRequestsConfirmed[member.id]?.[i] || "";
                                    const leaveRequestPending = leaveRequestsPending[member.id]?.[i] || "";
                                    const showTheDay =
                                        leaveRequestConfirmed || leaveRequestPending ||
                                        shiftRequestConfirmed || shift || shiftRequestPending;
                                    const cellClassName = `
                                        ${styles.clickableCell}
                                        ${leaveRequestConfirmed ? styles.requestConfirmed
                                            : leaveRequestPending ? styles.request
                                                : shiftRequestConfirmed ? styles.requestConfirmed
                                                    : shift ? styles.confirmed
                                                        : shiftRequestPending ? styles.request
                                                            : ""
                                        }
                                        ${isWeekend ? styles.weekend
                                            : ""}
                                        ${isHoliday ? styles.holiday
                                            : ""}`;

                                    return (
                                        <td
                                            key={i + 1}
                                            onClick={() => handleCellClick(i + 1, member.id, member.name)}
                                            className={cellClassName}
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
            {showEditRoster && selectedDay !== null && selectedMemberId !== null && (
                <EditRoster
                    day={selectedDay}
                    memberId={selectedMemberId}
                    nickname={selectedNickname}
                    month={selectedMonth}
                    shift={selectedShift}
                    shiftRequest={selectedShiftRequest}
                    leaveRequest={selectedLeaveRequest}
                    onClose={closeEditRoster}
                    shiftOptions={shiftOptions}
                />
            )}
        </div>
    );
}

export default MonthlyRosterForm