"use client"
import { useEffect, useState } from "react"
import type React from "react"

import styles from "./EditEmployee.module.scss"
import type { Employee } from "@/lib/models"
import { formatYYYYMMDD } from "@/lib/dateFormatters"
import { Calendar, Save, X } from "lucide-react"

interface EditEmployeeModalProps {
  show: boolean
  onHide: () => void
  employeeId: string
  onEditComplete: () => void
}

export default function EditEmployeeModal({ show, onHide, employeeId, onEditComplete }: EditEmployeeModalProps) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (show) {
      fetchEmployee()
    }
  }, [show])

  async function fetchEmployee() {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No token found")
      }

      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/admin/employee/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const editPageData = await response.json()
      const data = editPageData[0]
      setEmployee(data)
    } catch (err) {
      console.error("Error fetching employee:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch employee data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!employee) return

    setIsSaving(true)
    setError(null)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/employee/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: employee.phone,
          position: employee.position,
          status: employee.status,
          resign_date: employee.resign_date,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedEmployee = await response.json()
      setEmployee(updatedEmployee)
      onEditComplete()
    } catch (err) {
      console.error("Error updating employee:", err)
      setError(err instanceof Error ? err.message : "Failed to update employee data")
    } finally {
      setIsSaving(false)
    }
  }

  const handleResignDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (employee) {
      setEmployee({
        ...employee,
        resign_date: e.target.value,
      })
    }
  }

  const isResignDateEditable = () => {
    return !employee?.resign_date || employee.resign_date === "1970-01-01"
  }

  if (!show) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Edit Employee</h2>
          <button className={styles.closeButton} onClick={onHide}>
            <X size={20} />
          </button>
        </div>
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>Error: {error}</div>
        ) : !employee ? (
          <div className={styles.error}>No employee data found</div>
        ) : (
          <form className={styles.form}>
            {/* Form fields */}
            <div className={styles.formGroup}>
              <label htmlFor="nickname">Nickname</label>
              <input id="nickname" type="text" value={employee.nickname} disabled />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gender">Gender</label>
              <input id="gender" type="text" value={employee.gender} disabled />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                value={employee.phone}
                onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="position">Position</label>
              <select
                id="position"
                value={employee.position}
                onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
              >
                <option value="Manager">Manager</option>
                <option value="Salesperson1">Salesperson1</option>
                <option value="Salesperson2">Salesperson2</option>
                <option value="Salesperson(PT)">Salesperson(PT)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="grade">Grade</label>
              <input id="grade" type="text" value={employee.grade} disabled />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="employeeType">Employee Type</label>
              <input id="employeeType" type="text" value={employee.employee_type} disabled />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="annualLeave">Annual Leave</label>
              <input id="annualLeave" type="number" value={employee.annual_leave} disabled />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={employee.status}
                onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="resigned">Resigned</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="joinDate">Join Date</label>
              <input id="joinDate" type="text" value={formatYYYYMMDD(employee.join_date)} disabled />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="resignDate">Resign Date</label>
              {isResignDateEditable() ? (
                <div className={styles.datePickerWrapper}>
                  <Calendar className={styles.calendarIcon} size={20} />
                  <input
                    id="resignDate"
                    type="date"
                    value={employee.resign_date !== "1970-01-01" ? employee.resign_date : ""}
                    onChange={handleResignDateChange}
                  />
                </div>
              ) : (
                <input id="resignDate" type="text" value={formatYYYYMMDD(employee.resign_date)} disabled />
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button type="button" className={styles.saveButton} onClick={handleSave} disabled={isSaving}>
                <Save size={20} />
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
