import React from 'react';
import Table from 'react-bootstrap/Table';
import styles from './ManpowerTable.module.scss';
import { Shift } from "@/services/models";

interface ManpowerTableProps {
  shifts: Shift[];
}

function ManpowerTable({ shifts }: ManpowerTableProps) {

  const calculateStaffEachHour = () => {
    const hourStaffCount: Record<string, number> = {};

    // table for each hour
    for (let hour = 6; hour < 30; hour++) {
      const time = (hour % 24).toString().padStart(2, '0') + ':00';
      hourStaffCount[time] = 0;
    }

    // manpower calculate for each hour
    shifts.forEach((shift) => {
      const startHour = parseInt(shift.checkin_time.split(':')[0]);
      const endHour = parseInt(shift.checkout_time.split(':')[0]);

      for (let hour = startHour; hour < endHour; hour++) {
        const time = hour.toString().padStart(2, '0') + ':00';
        if (hourStaffCount[time] !== undefined) {
          hourStaffCount[time] += 1;
        }
      }
    });

    // if manpower is 0, show ""
    return Object.entries(hourStaffCount).map(([time, count]) => (
      <tr key={time}>
        <td>{time}</td>
        <td>{count === 0 ? "" : count}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.manpowerTable}>
      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Number of Staff</th>
          </tr>
        </thead>
        <tbody>{calculateStaffEachHour()}</tbody>
      </Table>
    </div>
  );
}

export default ManpowerTable;