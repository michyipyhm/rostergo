"use client"

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import EmployeeList from '@/component/EmployeeList'
import AddEmployeeModal from '@/component/AddEmployee'
import styles from '@/app/page.module.scss'


export default function EmployeeListPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  const handleEmployeeAdded = () => {
    // Refresh the employee list
    window.location.reload()
  }

  return (
    <>
    <div className={styles.addButton}>
       <Button onClick={() => setShowAddModal(true)} className="mb-3">
        Add
      </Button>
    </div>

      <EmployeeList />

      <AddEmployeeModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </>
  )
}