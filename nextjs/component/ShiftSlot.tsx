import React from "react"
import styles from './ShiftSlot.module.scss'
import { monthlyRosterService } from '@/services/monthlyRosterService'

async function ShiftSlot() {

    const data = await monthlyRosterService.getShiftSlot()
    const shiftSlots = data.shift_slots
    const leaveTypes = data.leave_types

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    }

    return (
        <div className={styles.explainCard}>
            <div className={styles.slotList}>
                {shiftSlots.map((slot) => (
                    <div key={`shift-${slot.id}`} className={styles.slot}>
                        <div className={styles.explainBox}>
                            {slot.short_title}
                        </div>
                        <div className={styles.explainTime}>
                            <span>: {slot.title}</span>
                            <span> ({formatTime(slot.start_time)} - {formatTime(slot.end_time)})</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.slotList}>
                {leaveTypes.map((leaveType) => (
                    <div key={`leave-${leaveType.id}`} className={styles.slot}>
                        <div className={styles.explainBox}>
                            {leaveType.short_name}
                        </div>
                        <div className={styles.explainTime}>
                            <span>: {leaveType.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShiftSlot;