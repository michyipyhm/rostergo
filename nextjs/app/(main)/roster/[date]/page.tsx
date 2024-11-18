import MonthlyRosterForm from '@/component/MonthlyRoster';
import MonthlyRosterSelector from '@/component/MonthlyRosterSelector';
import React from 'react'
import { monthlyRosterService } from "@/services/monthlyRosterService"
import { notFound } from "next/navigation"
import { Params } from "@/lib/models";
import ShiftSlot from '@/component/ShiftSlot';

interface MonthlyRosterPageProps {
    searchParams: URLSearchParams;
}

export default async function MonthlyRoster({ params }: { params: Params }) {

    const { date } = await params
    const datePattern = /^\d{4}-\d{2}$/
    if (!datePattern.test(date)) {
      notFound()
    }
    if (!date) {
        notFound()
    }
    const result = await monthlyRosterService.getMonthlyRoster(date)

    return (
        <div>

            <div>
                <MonthlyRosterSelector />
                <MonthlyRosterForm data={result} />
            </div>

            <div>
                <br></br>
                <div>
                    <ShiftSlot />
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