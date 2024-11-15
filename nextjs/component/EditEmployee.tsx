'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Employee } from '@/services/models';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import styles from './EditEmployee.module.scss';
import { formatYYYYMMDD } from '@/lib/dateFormatters'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default function EditEmployee({ id }: { id: string }) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchEmployee() {
      try {
        setIsLoading(true)
        setError(null)
 
        const response = await fetch(`/api/employee/${id}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        setEmployee(data)
      } catch (err) {
        console.error('Error fetching employee:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch employee data')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchEmployee()
    }
  }, [id])

  const handleSave = async () => {
    if (!employee) return

    setIsSaving(true)
    setError(null)

    try {
      // const token = localStorage.getItem('token')
      const response = await fetch(`/api/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          phone: employee.phone,
          position: employee.position,
          status: employee.status,
          resign_date: employee.resign_date
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedEmployee = await response.json()
      setEmployee(updatedEmployee)
      alert('Employee information updated successfully!')
    } catch (err) {
      console.error('Error updating employee:', err)
      setError(err instanceof Error ? err.message : 'Failed to update employee data')
    } finally {
      setIsSaving(false)
    }
  }

  const handleResignDateChange = (date: Date | null) => {
    if (employee) {
      setEmployee({
        ...employee,
        resign_date: date ? formatYYYYMMDD(date.toISOString()) : null
      });
    }
  };

  const isResignDateEditable = () => {
    return !employee?.resign_date || employee.resign_date === '1970-01-01';
  };


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!employee) return <div>No employee data found</div>


  return (
    <Container className={styles.editContainer}>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                value={employee.nickname}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={employee.gender}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={employee.phone}
                onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Select
                value={employee.position}
                onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
              >
                <option value="Manager">Manager</option>
                <option value="Salesperson1">Salesperson1</option>
                <option value="Salesperson2">Salesperson2</option>
                <option value="Salesperson(PT)">Salesperson(PT)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                value={employee.grade}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Employee Type</Form.Label>
              <Form.Control
                value={employee.employee_type}
                disabled
              >
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Annual Leave</Form.Label>
              <Form.Control
                type="number"
                value={employee.annual_leave}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={employee.status}
                onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="resigned">Resigned</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Join Date</Form.Label>
              <Form.Control
                type="text"
                value={formatYYYYMMDD(employee.join_date)}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Resign Date</Form.Label>
              {isResignDateEditable() ? (
            <DatePicker
              selected={employee.resign_date && employee.resign_date !== '1970-01-01' ? new Date(employee.resign_date) : null}
              onChange={handleResignDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          ) : (
              <Form.Control
                type="text"
                value={formatYYYYMMDD(employee.resign_date)}
                disabled
              />
          )}
            </Form.Group>
          </Col>
        </Row>

        

        <div className={styles.buttonGroup}>
          <Button variant="danger" className="me-2">
            Delete
          </Button>
          <Button variant="primary" className="me-2" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </Form>
    </Container>
  )
}

