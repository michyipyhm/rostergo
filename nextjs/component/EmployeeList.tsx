
"use client"
import { useState, useEffect } from "react"
import styles from "./EmployeeList.module.scss"
import type { Employee } from "@/lib/models"
import { formatYYYYMMDD, formatYYYYMMDDHHMM } from "@/lib/dateFormatters"
import AddEmployeeModal from "@/component/AddEmployee"
import EditEmployeeModal from "@/component/EditEmployee"
import { Plus, Edit } from "lucide-react"

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No token found")
      }

      const response = await fetch("/api/admin/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setEmployees(data)
    } catch (err) {
      console.error("Error fetching employees:", err)
    }
  }

  const formatResignDate = (date: string | null) => {
    if (!date || date === "1970-01-01") return "-"
    return formatYYYYMMDD(date)
  }

  const handleEmployeeAdded = () => {
    fetchEmployees()
    setShowAddModal(false)
  }

  const handleEditClick = (employeeId: string) => {
    setSelectedEmployeeId(employeeId)
    setShowEditModal(true)
  }

  const handleEditComplete = () => {
    fetchEmployees()
    setShowEditModal(false)
    setSelectedEmployeeId(null)
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>Employee List</h1>
        <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Add Employee
        </button>
      </div>
      <div className={styles.employeeList}>
        <table className={styles.employeeTable}>
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
              <th>Action</th>
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
                <td>
                  <button className={styles.editButton} onClick={() => handleEditClick(employee.id.toString())}>
                    <Edit size={16} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddEmployeeModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />
      {showEditModal && selectedEmployeeId && (
        <EditEmployeeModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          employeeId={selectedEmployeeId}
          onEditComplete={handleEditComplete}
        />
      )}
    </div>
  )
}

export default EmployeeList

