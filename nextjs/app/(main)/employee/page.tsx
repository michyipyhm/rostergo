"use client"

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import EmployeeList from '@/component/EmployeeList'
import AddEmployeeModal from '@/component/AddEmployee'
import styles from '@/app/page.module.scss'


export default function EmployeeListPage() {
  return <EmployeeList />
}
