import MonthlyRosterForm from '@/component/MonthlyRoster';
import MonthlyRosterSelector from '@/component/MonthlyRosterSelector';
import React from 'react'

export default function MonthlyRoster() {

    return (
        <div>

            <div>
            <MonthlyRosterSelector />
            <MonthlyRosterForm />
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