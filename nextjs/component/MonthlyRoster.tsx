"use client";
import React from "react"
import { useSearchParams, notFound } from "next/navigation"
import styles from './MonthlyRoster.module.scss';

function MonthlyRosterForm() {
    const staff = [
        {
            name: "Admin",
            POS: "Manager",
            Type: "Full Time",
        }
    ]

    const searchParams = useSearchParams()
    const date = searchParams.get("date")

    if (!date) {
        return <div className={styles.chooseMonthMessage}>Please choose a month which you looking for.</div>;
    }

    const isValidDate = date && /^\d{4}-\d{2}$/.test(date)

    let year, month;
    if (isValidDate) {
        [year, month] = date.split("-");
        const monthNum = Number(month);
        const yearNum = Number(year);

        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 2
        const maxYear = currentYear + 1

        if (yearNum < minYear || yearNum > maxYear || monthNum < 1 || monthNum > 12) {
            notFound()
        }
    } else {
        notFound()
    }

    const daysInMonth = year && month ? new Date(Number(year), Number(month), 0).getDate() : 0;

    return (
        <div>
            <div>
                <p>Year: {year}</p>
                <p>Month: {month}</p>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.rosterTable}>

                    <thead>
                        <tr>
                            <th className={styles.rosterCell}>Name</th>
                            <th className={styles.rosterCell}>Position</th>
                            <th className={styles.rosterCell}>Type</th>
                            {Array.from({ length: daysInMonth }, (_, i) => (
                                <td key={i + 1} className={styles.rosterCell}>{i + 1}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((member, index) => (
                            <tr key={index}>
                                <td className={styles.rosterCell}>{member.name}</td>
                                <td className={styles.rosterCell}>{member.POS}</td>
                                <td className={styles.rosterCell}>{member.Type}</td>
                                {Array.from({ length: daysInMonth }, (_, i) => (
                                    <td key={i + 1} className={styles.rosterCell}></td>
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