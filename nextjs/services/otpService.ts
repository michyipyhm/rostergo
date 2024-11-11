import { pgClient } from './pgClient'
import { User } from './models'

export async function updateOtp(phone: string, otp: string): Promise<User | null> {
  try {
    await pgClient.query('BEGIN')
    const insertQuery = `
      INSERT INTO users (phone, otp, status, created_at, updated_at)
      VALUES ($1, $2, 'otp_pending', NOW(), NOW())
      RETURNING id, phone, status, otp
    `
    const result = await pgClient.query(insertQuery, [phone, otp])
    await pgClient.query('COMMIT')

    if (result.rows.length > 0) {
      return result.rows[0] as User
    }
    return null
  } catch (error) {
    await pgClient.query('ROLLBACK')
    console.error('Error updating OTP:', error)
    throw error
  }
}

export async function verifyOtp(phone: string, otp: string): Promise<User | null> {
  try {
    // await pgClient.query('BEGIN')
    const verifyQuery = `
      SELECT id FROM users
      WHERE phone = $1 AND otp = $2
    `
    const verifyResult = await pgClient.query(verifyQuery, [phone, otp])

    if (verifyResult.rows.length === 0) {
      await pgClient.query('COMMIT')
      return null
    }

    const userId = verifyResult.rows[0].id
    const updateQuery = `
      UPDATE users
      SET status = 'otp_verified', updated_at = NOW()
      WHERE id = $1
      RETURNING id, phone, status
    `
    const updateResult = await pgClient.query(updateQuery, [userId])
    // await pgClient.query('COMMIT')

    if (updateResult.rows.length > 0) {
      return updateResult.rows[0] as User
    }
    return null
  } catch (error) {
    // await pgClient.query('ROLLBACK')
    console.error('Error verifying OTP:', error)
    throw error
  }
}