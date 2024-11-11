import { pgClient } from './pgClient'
import { User } from './models'
import { Pool, PoolClient } from 'pg'

const db = pgClient.connect()

const pool = new Pool(pgClient)

async function getClient(): Promise<PoolClient> {
  return await pool.connect()
}

export async function updateOtp(phone: string, otp: string): Promise<User | null> {
  const client = await getClient()
  try {
    await client.query('BEGIN')
    const updateQuery = `
      UPDATE users
      SET otp = $1, status = 'otp_pending', updated_at = NOW()
      WHERE phone = $2
      RETURNING id, phone, status
    `
    const result = await client.query(updateQuery, [otp, phone])
    await client.query('COMMIT')

    if (result.rows.length > 0) {
      return result.rows[0] as User
    }
    return null
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error updating OTP:', error)
    throw error
  } finally {
    client.release()
  }
}

export async function verifyOtp(phone: string, otp: string): Promise<User | null> {
  const client = await getClient()
  try {
    await client.query('BEGIN')
    const verifyQuery = `
      SELECT id FROM users
      WHERE phone = $1 AND otp = $2
    `
    const verifyResult = await client.query(verifyQuery, [phone, otp])

    if (verifyResult.rows.length === 0) {
      await client.query('COMMIT')
      return null
    }

    const userId = verifyResult.rows[0].id
    const updateQuery = `
      UPDATE users
      SET status = 'otp_verified', updated_at = NOW()
      WHERE id = $1
      RETURNING id, phone, status
    `
    const updateResult = await client.query(updateQuery, [userId])
    await client.query('COMMIT')

    if (updateResult.rows.length > 0) {
      return updateResult.rows[0] as User
    }
    return null
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error verifying OTP:', error)
    throw error
  } finally {
    client.release()
  }
}