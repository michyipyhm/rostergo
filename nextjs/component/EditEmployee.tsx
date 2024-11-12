'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Employee } from '@/services/models';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import styles from './EditEmployee.module.scss';
import { formatYYYYMMDD, formatYYYYMMDDHHMM } from '@/lib/dateFormatters'


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
        // console.log('Fetching employee with ID:', id)
        
        const response = await fetch(`/api/employee/${id}`)
        // console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        // console.log('Received employee data:', data)
        
        // if (!data) {
        //   throw new Error('No data received')
        // }
        
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
      const response = await fetch(`/api/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position: employee.position,
          grade: employee.grade,
          employee_type: employee.employee_type,
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
              <Form.Select
                value={employee.employee_type}
                onChange={(e) => setEmployee({ ...employee, employee_type: e.target.value })}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </Form.Select>
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
                <option value="otp_pending">Otp Pending</option>
                <option value="otp_verified">Otp Verified</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="text"
                value={formatYYYYMMDD(employee.joining_date)}
                disabled
              />
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

