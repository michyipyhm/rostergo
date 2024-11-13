"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import { useTable, Column } from "react-table"
import styles from './MonthlyRoster.module.scss';
import { MonthlyRosterData } from "@/services/models";


function MonthlyRosterForm({ data }: { data: MonthlyRosterData }) {
    const { shifts, shiftRequests, leaveRequests } = data;

    const params = useParams();
    const date = params?.date;

    if (!date || Array.isArray(date) || !/^\d{4}-\d{2}$/.test(date)) {
        notFound();
    }

    const [year, month] = date.split("-");
    const monthNum = Number(month);
    const yearNum = Number(year);

    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 2;
    const maxYear = currentYear + 1;

    if (yearNum < minYear || yearNum > maxYear || monthNum < 1 || monthNum > 12) {
        notFound();
    }

    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();

    // 創建唯一員工數據
    const staff = Array.from(
        new Map(
            [...shifts, ...shiftRequests, ...leaveRequests].map((item) => [
                item.user_id,
                {
                    user_nickname: item.user_nickname,
                    position_name: item.position_name,
                    position_type: item.position_type,
                },
            ])
        ).values()
    );

    // 創建表格列
    const columns: Column[] = [
        { Header: "Name", accessor: "user_nickname" },
        { Header: "Position", accessor: "position_name" },
        { Header: "Type", accessor: "position_type" },
        ...Array.from({ length: daysInMonth }, (_, i) => ({
            Header: `${i + 1}`,
            accessor: `day${i + 1}`,
            Cell: ({ row }) => {
                const day = i + 1;
                const entry = [...shifts, ...shiftRequests, ...leaveRequests].find(
                    (e) => new Date(e.date).getDate() === day && e.user_nickname === row.original.user_nickname
                );
                return entry ? (
                    <span>{entry.slot_short_title || entry.leave_type_short_name}</span>
                ) : null;
            },
        })),
    ];

    // 準備表格數據
    const tableData = React.useMemo(() => staff, [staff]);

    // 使用 React Table hooks
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: tableData });

    return (
        <div>
            <div className={styles.selectedMonth}>
                Year: <h3>{year}</h3>
                Month: <h3>{month}</h3>
            </div>
            <div className={styles.tableContainer}>
                <table {...getTableProps()} className={styles.rosterTable}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MonthlyRosterForm;