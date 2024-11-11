"use client"
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

export default function About() {
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)

    const yearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(Number(event.target.value));
    };

    const monthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(Number(event.target.value));
    };

    return (
        <div>
            <div>
                Choose a year: 
                <select value={year} onChange={yearChange}>
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
                month:
                <select value={month} onChange={monthChange}>
                    {months.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                [Roster]
            </div>

            <div>
                <div>
                    [Shift List]
                </div>

                <div>
                    [Save]
                </div>

                <div>
                    Last updated at:[]
                </div>
            </div>
        </div>
    );
}