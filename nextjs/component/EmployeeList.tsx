"use client";
import { useState, useEffect } from "react";
import styles from "./EmployeeList.module.scss";
import { Employee } from "@/lib/models";
import Link from "next/link";
import { formatYYYYMMDD, formatYYYYMMDDHHMM } from "@/lib/dateFormatters";

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("/api/admin/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    }
    fetchEmployees();
  }, []);

  const formatResignDate = (date: string | null) => {
    if (!date || date === "1970-01-01") return "-";
    return formatYYYYMMDD(date);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.employeeList}>
        <div className={styles.headerRow}>
          <div className={styles.headerCell}>ID</div>
          <div className={styles.headerCell}>Nickname</div>
          <div className={styles.headerCell}>Gender</div>
          <div className={styles.headerCell}>Phone</div>
          <div className={styles.headerCell}>Position</div>
          <div className={styles.headerCell}>Grade</div>
          <div className={styles.headerCell}>Employee Type</div>
          <div className={styles.headerCell}>AL</div>
          <div className={styles.headerCell}>Status</div>
          <div className={styles.headerCell}>Join Date</div>
          <div className={styles.headerCell}>Resign Date</div>
          <div className={styles.headerCell}>Updated At</div>
          <div className={styles.headerCell}>Action</div>
        </div>

        {employees.map((employee) => (
          <div key={employee.id} className={styles.employeeRow}>
            <div className={styles.employeeCell}>{employee.id}</div>
            <div className={styles.employeeCell}>{employee.nickname}</div>
            <div className={styles.employeeCell}>{employee.gender}</div>
            <div className={styles.employeeCell}>{employee.phone}</div>
            <div className={styles.employeeCell}>{employee.position}</div>
            <div className={styles.employeeCell}>{employee.grade}</div>
            <div className={styles.employeeCell}>{employee.employee_type}</div>
            <div className={styles.employeeCell}>{employee.annual_leave}</div>
            <div className={styles.employeeCell}>{employee.status}</div>
            <div className={styles.employeeCell}>
              {formatYYYYMMDD(employee.join_date)}
            </div>
            <div className={styles.employeeCell}>
              {formatResignDate(employee.resign_date)}
            </div>
            <div className={styles.employeeCell}>
              {formatYYYYMMDDHHMM(employee.updated_at)}
            </div>
            <div className={styles.employeeCell}>
              <Link href={`/employee/edit?id=${employee.id}`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
