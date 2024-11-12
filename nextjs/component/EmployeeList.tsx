'use client'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './EmployeeList.module.scss';
import { Employee } from '@/services/models'
import { Button } from "react-bootstrap";
import Link from "next/link"
import { formatYYYYMMDD, formatYYYYMMDDHHMM } from '@/lib/dateFormatters'


function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch('/api/employee')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setEmployees(data)
      } catch (err) {
        console.error('Error fetching employees:', error)
      } 
    }
      fetchEmployees()
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
          <th>ID</th>
          <th>Nickname</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Position</th>
          <th>Grade</th>
          <th>Employee Type</th>
          <th>AL</th>
          <th>Status</th>
          <th>Joining Date</th>
          <th>Updated At</th>
        </tr>
       </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.nickname}</td>
            <td>{employee.gender}</td>
            <td>{employee.phone}</td>
            <td>{employee.position}</td>
            <td>{employee.grade}</td>
            <td>{employee.employee_type}</td>
            <td>{employee.annual_leave}</td>
            <td>{employee.status}</td>
            <td>{formatYYYYMMDD(employee.joining_date)}</td>
            <td>{formatYYYYMMDDHHMM(employee.updated_at)}</td>
            <td><Link 
                  href={`/employee/edit?id=${employee.id}`}
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