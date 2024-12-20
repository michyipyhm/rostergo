'use client'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './EmployeeList.module.scss';
import { Employee } from '@/lib/models'
import Link from "next/link"
import { formatYYYYMMDD, formatYYYYMMDDHHMM } from '@/lib/dateFormatters'


function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/admin/employee', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setEmployees(data)
      } catch (err) {
        console.error('Error fetching employees:', err)
      } 
    }
      fetchEmployees()
   }, []);

   const formatResignDate = (date: string | null) => {
    if (!date || date === '1970-01-01') return '-';
    return formatYYYYMMDD(date);
  };

  
  return (
    <div className='mainContainer'> 
  
    <div className={styles.employeeList}>
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
          <th>Join Date</th>
          <th>Resign Date</th>
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
            <td>{formatYYYYMMDD(employee.join_date)}</td>
            <td>{formatResignDate(employee.resign_date)}</td>
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