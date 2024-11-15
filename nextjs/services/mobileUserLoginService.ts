
import { pgClient } from '@/services/pgClient'
import { checkPassword, hashPassword } from '../lib/bcrypt'

class LoginService {
  constructor() {}

  async authenticateUser(nickname: string, password: string) {
    try {
      const sql = `SELECT * from users where nickname = $1`
      const result = await pgClient.query(sql, [nickname])

      if (result.rows.length === 0) {
        return { success: false, message: 'No such user'}
      }

      const userData = result.rows[0]
      const isPasswordValid =  await checkPassword(password, userData.password)

      if (!isPasswordValid)
        return {success: false, message: 'Invalid password'}

      return {
        success: true,
        user: {
          id: userData.id,
          nickname: userData.nickname,
         
        }
      }
    } catch (error) {
      console.error('Error during user authentication:', error)
      return { success: false, message: 'An error occurred during authentication' }
    }
  }

//   async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean> {
//     try {
//       const sql = 'SELECT * FROM users where id = $1'
//       const result = await pgClient.query(sql, [userId])

//       if (result.rows.length === 0) {
//         console.log('user not found')
//         return false
//       }
      
//       const user = (result.rows[0])
//       const isCurrentPasswordValid = await checkPassword(currentPassword, user.password)

//       if(!isCurrentPasswordValid) {
//         return false;
//       }

//       const hashedNewPassword = await hashPassword(newPassword)

//       // Update the password in the database
//       const updateSql = 'UPDATE users SET password = $1 WHERE id = $2'
//       await pgClient.query(updateSql, [hashedNewPassword, userId])

//       // Optionally, you might want to invalidate all existing sessions for this user
//       await sessionStore.deleteAllUserSessions(userId)

//       return true
//     } catch (error) {
//       console.error('Error changing password:', error)
//       return false
//     }
//   }
}

export const loginService = new LoginService();
   