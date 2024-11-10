
'use client'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './EmployeeList.module.scss';
import { Employee } from '@/services/models'


function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    fetch('/api/employee')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
   }, []);

  
  return (
    <div className={styles.manpowerTable}>
      <Table striped bordered hover className={styles.table}>
        <thead>
         <tr>
          <th>Nickname</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>Position</th>
          <th>Joining date</th>
        </tr>
       </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.nickname}</td>
            <td>{employee.gender}</td>
            <td>{employee.phone}</td>
            <td>{employee.position}</td>
            <td>{new Date(employee.joining_date).toLocaleDateString()}</td>
          </tr>
         ))}
       </tbody>
      </Table>
     </div>
    )
  }

export default EmployeeList