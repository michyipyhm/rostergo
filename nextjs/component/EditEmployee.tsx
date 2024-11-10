'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './EditEmployee.module.scss';
import { EditEmployee } from '@/services/models'

function EditEmployee({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [employee, setEmployee] = useState<EditEmployee | null>(null);

  useEffect(() => {
    fetch(`/api/employee/${params.id}`)
      .then(res => res.json())
      .then(data => setEmployee(data))
      .catch(error => console.error('Error:', error));
  }, [params.id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100">
      <div className="space-y-4">
        <div className="flex flex-col">
          <label>Nickname:</label>
          <div>{employee.nickname}</div>
        </div>

        <div className="flex flex-col">
          <label>Gender:</label>
          <div>{employee.gender}</div>
        </div>

        <div className="flex flex-col">
          <label>Position:</label>
          <select 
            className="p-2 border rounded"
            value={employee.position}
            disabled
          >
            <option value={employee.position}>{employee.position}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Grade:</label>
          <select 
            className="p-2 border rounded"
            value={employee.grade}
            disabled
          >
            <option value={employee.grade}>{employee.grade}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Employee Type:</label>
          <select 
            className="p-2 border rounded"
            value={employee.employee_type}
            disabled
          >
            <option value={employee.employee_type}>
              {employee.employee_type === 'full_time' ? 'Full Time' : 'Part Time'}
            </option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Annual Leave:</label>
          <div>{employee.annual_leave} days</div>
        </div>

        <div className="flex flex-col">
          <label>Joining date:</label>
          <div>{new Date(employee.joining_date).toLocaleDateString()}</div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              if (confirm('Are you sure you want to resign this employee?')) {
                // Implement resign logic here
              }
            }}
          >
            Resign
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              // Implement save logic here
            }}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee