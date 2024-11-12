import { pgClient } from '@/services/pgClient'
import { checkPassword } from '../lib/bcrypt'
import { sessionStore } from '@/lib/sessionStore'

class LoginService {
  constructor() {}

  async authenticateAdmin(nickname: string, password: string) {
    try {
      const sql = `SELECT * from users where nickname = $1 AND admin = true`
      const result = await pgClient.query(sql, [nickname])

      if (result.rows.length === 0) {
        return { success: false, message: 'No such admin'}
      }

      const admin = result.rows[0]
      const isPasswordValid =  await checkPassword(password, admin.password)

      if (!isPasswordValid)
        return {success: false, message: 'Invalid password'}

      return {
        success: true,
        admin: {
          id: admin.id,
          nickname: admin.nickname,
          admin: admin.admin
          // Add any other user details you want to return, but NOT the password
        }
      }
    } catch (error) {
      console.error('Error during admin authentication:', error)
      return { success: false, message: 'An error occurred during authentication' }
    }
  }

  async verifySession() {
    try {
      const session = await sessionStore.get()
      if (!session.id) {
        return { success: false, message: 'No active session' }
      }

      const sql = 'SELECT * FROM users WHERE id = $1 AND admin = true'
      const result = await pgClient.query(sql, [session.id])

      if (result.rows.length === 0) {
        await sessionStore.clear() // Clear invalid session
        return { success: false, message: 'Invalid session' }
      }

      return { success: true, user: result.rows[0] }
    } catch (error) {
      console.error('Error verifying session:', error)
      return { success: false, message: 'An error occurred while verifying the session' }
    }
  }
}

export const loginService = new LoginService();
   