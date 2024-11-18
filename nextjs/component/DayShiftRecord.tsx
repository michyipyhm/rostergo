'use client'
import React from 'react';
import Table from 'react-bootstrap/Table';
import styles from './DayShiftRecord.module.scss';
import { Shift } from "@/lib/models";

interface DayShiftRecordProps {
  shifts: Shift[];
}

function DayShiftRecord({ shifts }: DayShiftRecordProps) {
  return (
    <div className={styles.manpowerTable}>
      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Shift Slot</th>
            <th>Check in</th>
            <th>Check out</th>
            <th>Over Time</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id}>
              <td>{shift.user_nickname}</td>
              <td>{shift.slot_title}</td>
              <td>{shift.checkin_time}</td>
              <td>{shift.checkout_time}</td>
              <td>{shift.minute_over_time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DayShiftRecord;