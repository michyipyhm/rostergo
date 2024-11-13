import { NextRequest, NextResponse } from 'next/server'
import { loginService } from '@/services/loginService'
import { sessionStore } from '@/lib/sessionStore'

export async function POST(req: NextRequest) {
  try {
    const session = await sessionStore.get()
    
    if (!session.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const success = await loginService.changePassword(session.id, currentPassword, newPassword)

    if (success) {
      await sessionStore.clear() // Clear the session after password change
      return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Failed to change password' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error in changePassword route:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}