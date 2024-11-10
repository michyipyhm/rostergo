
'use client'

import Table from 'react-bootstrap/Table';
import styles from './EmployeeList.module.scss';

function EmployeeList() {
  
  return (
    <div className={styles.manpowerTable}>
                <Table striped bordered hover className={styles.table}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Position</th>
                            <th>Joining date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        </tr>
                    </tbody>
                </Table>
            </div>
      )
    }

export default EmployeeList