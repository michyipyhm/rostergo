'use client'

import { useSearchParams } from 'next/navigation'
import EditEmployee from '@/component/EditEmployee'

export default function EditEmployeePage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  if (!id) {
    return <div>Error: No employee ID provided</div>
  }

  return <EditEmployee id={id} />
}