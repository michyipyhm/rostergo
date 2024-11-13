import { NextRequest, NextResponse } from 'next/server'
import { pgClient } from '@/services/pgClient'
import { sessionStore } from '@/lib/sessionStore'

export async function POST(req: NextRequest) {
  try {
    const session = await sessionStore.get()
    if (!session.branch_id) {
      return NextResponse.json(
        { message: 'No branch associated with current session' },
        { status: 401 }
      )
    }

    const { employeeId } = await req.json()
    if (!employeeId) {
      return NextResponse.json(
        { message: 'Employee ID is required' },
        { status: 400 }
      )
    }

    const sql = `
      UPDATE users 
      SET branch_id = $1, 
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 
      RETURNING *
    `
    const result = await pgClient.query(sql, [session.branch_id, employeeId])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Employee not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result.rows[0], { status: 200 })
  } catch (error) {
    console.error('Update branch error:', error)
    return NextResponse.json(
      { message: 'An error occurred while updating branch' },
      { status: 500 }
    )
  }
}