import { NextRequest, NextResponse } from 'next/server'
import { pgClient } from '@/lib/pgClient'
import * as jose from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY);

export async function POST(req: NextRequest) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Verify the JWT token
    let payload;
    try {
      const { payload: verifiedPayload } = await jose.jwtVerify(token, SECRET_KEY);
      payload = verifiedPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // const session = await sessionStore.get()
    if (!payload.branch_id) {
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
    const result = await pgClient.query(sql, [payload.branch_id, employeeId])

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