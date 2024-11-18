import MonthlyRosterForm from '@/component/MonthlyRoster';
import MonthlyRosterSelector from '@/component/MonthlyRosterSelector';
import React from 'react'
import { monthlyRosterService } from "@/services/admin/monthlyRosterService"
import { notFound } from "next/navigation"
import { Params } from "@/lib/models";
import ShiftSlot from '@/component/ShiftSlot';
import LeaveRequest from '@/component/LeaveRequest';

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
                <div>
                    <ShiftSlot />
                </div>
                <div>
                    <LeaveRequest date={date} />
                </div>
            </div>

        </div>
    );
}