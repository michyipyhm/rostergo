import { NextRequest, NextResponse } from 'next/server'
import { loginService } from '@/services/loginService'
import { sessionStore } from '@/lib/sessionStore'


export async function POST(request: NextRequest) {
  const { nickname, password } = await request.json()
  
  try {
    if (!nickname || !password) {
      return NextResponse.json({ message: 'Nickname and password are required' }, { status: 400 })
    }

    const result = await loginService.authenticateAdmin(nickname, password)
    if (result.success && result.admin) {
      await sessionStore.save({
        id: result.admin.id,
        nickname: result.admin.nickname,
        admin: result.admin.admin
      })
      return NextResponse.json({ message: 'Login successful' }, { status: 200 })
    } else {
      return NextResponse.json({ message: result.message }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 })
  }
}

export async function DELETE() {
  await sessionStore.clear()
  return NextResponse.json({ success: true })
}