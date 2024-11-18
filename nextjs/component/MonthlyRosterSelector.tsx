"use client";
import React, { useState } from "react"
import styles from './MonthlyRosterSelector.module.scss'
import { Button } from "react-bootstrap"
import { useRouter } from 'next/navigation'

function MonthlyRosterSelector() {
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 4 }, (_, i) => currentYear - 2 + i)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)

    const router = useRouter()

    const yearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(Number(event.target.value))
    }

    const monthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(Number(event.target.value))
    }

    const handleSubmit = () => {
        const formattedDate = `${year}-${String(month).padStart(2, '0')}`
        router.push(`/roster/${formattedDate}`)
    }

    return (
        <div className={styles.monthlyRosterContainer}>
            <div className={styles.dateSelectCard}>
                <div className={styles.rosterDateFont}>Choose Year and Month</div>

                <div className={styles.rosterDateSelector}>
                    <label className={styles.selectorLabel}>
                        <select value={year} onChange={yearChange} className={styles.dateSelect}>
                            {years.map((y) => (
                                <option key={y} value={y} className={styles.rosterDateOption}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.selectorLabel}>

                        <select value={month} onChange={monthChange} className={styles.dateSelect}>
                            {months.map((m) => (
                                <option key={m} value={m} className={styles.rosterDateOption}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </label>
                    <Button variant="outline-primary" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>

            <div className={styles.explainCard}>
                <div className={styles.explainText}>
                    <div className={`${styles.explainBoxForText} ${styles.confirmed}`}>
                        A
                    </div><span className={styles.explainBoxFont}>:Shift / Leave / Request Confirmed</span>

                    <div className={styles.explainBoxForText}><span style={{ color: 'rgba(0, 0, 0, 0.3)' }}>
                        A
                    </span></div><span className={styles.explainBoxFont}>:Request Not Confirm</span>
                </div>

                <div className={styles.explainColor}>
                    <div className={`${styles.explainBoxForColor} ${styles.confirmed}`}>

                    </div><span className={styles.explainBoxFont}>:Rest Day</span>
                    <div className={`${styles.explainBoxForColor} ${styles.restday}`}>

                    </div><span className={styles.explainBoxFont}>:Weekends & Holidays(W&H)</span>
                    <div className={`${styles.explainBoxForColor} ${styles.request}`}><span style={{ color: 'rgba(0, 0, 0, 0.3)' }}>
                    
                    </span></div><span className={styles.explainBoxFont}>:Request day</span>
                </div>

            </div>
        </div>
    )
}

export default MonthlyRosterSelector;