'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Employee } from '@/services/models';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import styles from './EditEmployee.module.scss';


export default function EditEmployee({ id }: { id: string }) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchEmployee() {
      try {
        setIsLoading(true)
        setError(null)
        console.log('Fetching employee with ID:', id)
        
        const response = await fetch(`/api/employee/${id}`)
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Received employee data:', data)
        
        if (!data) {
          throw new Error('No data received')
        }
        
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
                value={employee!.nickname}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={employee!.gender}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Select
                value={employee!.position}
                onChange={(e) => setEmployee(prev => prev ? { ...prev, position: e.target.value } : null)}
              >
                <option value="Manager">Manager</option>
                <option value="Salesperson">Salesperson</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Select
                value={employee!.grade}
                onChange={(e) => setEmployee(prev => prev ? { ...prev, grade: e.target.value } : null)}
              >
                <option value="Manager">Manager</option>
                <option value="Assistant Manager">Assistant Manager</option>
                <option value="Senior">Senior</option>
                <option value="Junior">Junior</option>
                <option value="Part-time">Part Time</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Employee Type</Form.Label>
              <Form.Select
                value={employee!.employee_type}
                onChange={(e) => setEmployee(prev => prev ? { ...prev, employee_type: e.target.value } : null)}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Annual Leave</Form.Label>
              <Form.Control
                type="number"
                value={employee!.annual_leave}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="text"
                value={employee!.joining_date ? new Date(employee!.joining_date).toLocaleDateString() : ''}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <div className={styles.buttonGroup}>
          <Button variant="danger" className="me-2">
            Resign
          </Button>
          <Button variant="primary" className="me-2">
            Save
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </Form>
    </Container>
  )
}

