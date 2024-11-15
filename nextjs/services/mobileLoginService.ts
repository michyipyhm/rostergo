
import { pgClient } from '@/services/pgClient'
import { checkPassword, hashPassword } from '../lib/bcrypt'

class MobileLoginService {
  constructor() {}

  async authenticateUser(nickname: string, password: string) {
    try {
      // SQL query to fetch user data based on nickname
      const sql = `
        SELECT 
          users.id,
          users.nickname, 
          users.admin, 
          positions.type,
          users.password  -- Ensure to select the password hash for validation
        FROM users
        JOIN positions ON users.position_id = positions.id
        WHERE users.nickname = $1 AND admin = false
      `;
  
      // Execute the query
      const result = await pgClient.query(sql, [nickname]);
  
      // Check if the user exists
      if (result.rows.length === 0) {
        return { success: false, message: 'No such user' };
      }
  
      const userData = result.rows[0];
  
      // Validate the password
      const isPasswordValid = await checkPassword(password, userData.password);
  
      if (!isPasswordValid) {
        return { success: false, message: 'Invalid password' };
      }
  
      // Return user data upon successful authentication
      return {
        success: true,
        user: {
          id: userData.id,
          nickname: userData.nickname,
          admin: userData.admin,
          type: userData.type,
        },
      };
    } catch (error) {
      console.error('Error during user authentication:', error);
      return { success: false, message: 'An error occurred during authentication' };
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

export const mobileLoginService = new MobileLoginService();
   