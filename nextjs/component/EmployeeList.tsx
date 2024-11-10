'use client'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './EmployeeList.module.scss';
import { Employee } from '@/services/models'
import { Button } from "react-bootstrap";
import Link from "next/link"


function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    fetch('/api/employee')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
   }, []);

  
  return (
    <div className='mainContainer'> 
     <div className='button'>
      <Button>Add</Button>
      </div>
    
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
            <td><Link 
                  href={`/employee/${employee.id}`}
                > edit
              </Link>
            </td>
          </tr>
         ))}
       </tbody>
      </Table>
    </div>
  </div>
    )
  }

export default EmployeeList