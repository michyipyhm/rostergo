"use client";
import React from "react";
import { useSearchParams, notFound } from "next/navigation";
import styles from './MonthlyRoster.module.scss';

function MonthlyRosterForm() {
    const staff = [
        {
            name: "Admin",
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
    ];

    const searchParams = useSearchParams();
    const date = searchParams.get("date");

    if (!date) {
        return <div className={styles.chooseMonthMessage}>Please choose a month which you are looking for.</div>;
    }

    const isValidDate = date && /^\d{4}-\d{2}$/.test(date);

    let year, month;
    if (isValidDate) {
        [year, month] = date.split("-");
        const monthNum = Number(month);
        const yearNum = Number(year);

        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 2;
        const maxYear = currentYear + 1;

        if (yearNum < minYear || yearNum > maxYear || monthNum < 1 || monthNum > 12) {
            notFound();
        }
    } else {
        notFound();
    }

    const daysInMonth = year && month ? new Date(Number(year), Number(month), 0).getDate() : 0;

    // 單擊處理程序
    const handleCellClick = (day: number, memberName: string) => {
        alert(`Clicked on day ${day} for ${memberName}`);
    };

    return (
        <div>
            <div className={styles.selectedMonth}>
                <h5>Year: {year}</h5>
                <h5>Month: {month}</h5>
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
    );
}

export default MonthlyRosterForm;