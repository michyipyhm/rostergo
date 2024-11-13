"use client"

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import EmployeeList from '@/component/EmployeeList'
import AddEmployeeModal from '@/component/AddEmployee'


export default function EmployeeListPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  const handleEmployeeAdded = () => {
    // Refresh the employee list
    window.location.reload()
  }

  return (
    <div>
       <Button onClick={() => setShowAddModal(true)} className="mb-3">
        Add
      </Button>

      <EmployeeList />

      <AddEmployeeModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </div>
  )
}