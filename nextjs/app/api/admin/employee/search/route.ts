import { NextRequest, NextResponse } from 'next/server'
import { pgClient } from '@/services/pgClient'

export async function GET(req: NextRequest) {
  try {
    const searchTerm = req.nextUrl.searchParams.get('term')

    if (!searchTerm) {
      return NextResponse.json({ message: 'Search term is required' }, { status: 400 })
    }

    const sql = `
      SELECT id, nickname, phone, branch_id 
      FROM users 
      WHERE nickname = $1 OR phone = $1
      LIMIT 1
    `
    const result = await pgClient.query(sql, [searchTerm])

    if (result.rows.length === 0) {
      return NextResponse.json(null, { status: 200 })
    }

    return NextResponse.json(result.rows[0], { status: 200 })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { message: 'An error occurred while searching' },
      { status: 500 }
    )
  }
}