"use client"

import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Employee } from '@/lib/models'


interface AddEmployeeModalProps {
  show: boolean
  onHide: () => void
  onEmployeeAdded: () => void
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ show, onHide, onEmployeeAdded }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<Employee | null>(null)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    try {
      setError('')
      setSearchResult(null)

      const response = await fetch(`/api/admin/employee/search?term=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to search employee')
      }

      if (data) {
        setSearchResult(data)
      } else {
        setError('No employee found')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  const handleAdd = async () => {
    const token = localStorage.getItem('token'); // Ensure this is how you're storing the token
    if (!token) {
      console.error('No token found');
      return;
    }
    
    try {
      if (!searchResult) return

      const response = await fetch('/api/admin/employee/update-branch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ employeeId: searchResult.id }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to add employee')
      }

      onEmployeeAdded()
      onHide()
      setSearchTerm('')
      setSearchResult(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add employee')
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter nickname or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        
        <Button variant="primary" onClick={handleSearch} className="mb-3">
          Search
        </Button>

        {searchResult && (
          <div className="border rounded p-3 mb-3">
            <p><strong>ID:</strong> {searchResult.id}</p>
            <p><strong>Nickname:</strong> {searchResult.nickname}</p>
            <p><strong>Phone:</strong> {searchResult.phone}</p>
            <p><strong>Branch ID:</strong> {searchResult.branch_id}</p>
            <Button variant="success" onClick={handleAdd}>
              Add
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default AddEmployeeModal