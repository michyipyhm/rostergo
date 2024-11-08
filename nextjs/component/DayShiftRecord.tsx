'use client'
import Table from 'react-bootstrap/Table';
import styles from './DayShiftRecord.module.scss';

function DayShiftRecord() {

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
                        <tr>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

export default DayShiftRecord