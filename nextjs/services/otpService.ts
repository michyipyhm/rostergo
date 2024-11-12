import { pgClient } from "./pgClient";
import { LoginUser, verifyNumberResult } from "./models";

export async function verifyNumber(phone: string): Promise<verifyNumberResult> {
  try {
    // const generateOtp = () => {
    //   return Math.floor(100000 + Math.random() * 900000).toString();
    // };
    // const otp = generateOtp();

    const checkQuery = `
    SELECT id, status, phone FROM users
    WHERE phone = $1
  `;

    const checkResult = await pgClient.query(checkQuery, [phone]);

    if (checkResult.rows.length > 0) {
      const existingUser = checkResult.rows[0] as LoginUser;
      if (existingUser.status === "active") {
        return { user: existingUser, message: "active user", redirectToLogin: true, redirectToVerifyOtp: false
        };

      } else if (existingUser.status === "resigned") {
        return {
          user: null,
          message:
            "Sorry, your account has been resigned. Please contact admin for more information.",
          redirectToLogin: false,
          redirectToVerifyOtp: false,
        };

      } else  {
        return {
          user: existingUser,
          message: "phone numver already exists, pending verification",
          redirectToLogin: false,
          redirectToVerifyOtp: true,
        };
      }

      }
     else {
      const insertQuery = `
  INSERT INTO users (phone, status)
  VALUES ($1, 'null')
  RETURNING id, phone, status
`;
      const insertResult = await pgClient.query(insertQuery, [phone]);
      return {
        user: insertResult.rows[0] as LoginUser,
        message: "new user",
        redirectToLogin: false,
        redirectToVerifyOtp: true,

      };
    }
  } catch (error) {
    console.error("Error verifying number:", error);
    return {
      user: null,
      message: "error occurred",
      redirectToLogin: false,
      redirectToVerifyOtp: false,
    };
  }
}

// export async function updateOtp(phone: string, otp: string): Promise<OtpUpdateResult> {
//   try {
//     await pgClient.query('BEGIN')

//     // Check if the phone number already exists
//     const checkQuery = `
//       SELECT id, status, phone FROM users
//       WHERE phone = $1
//     `
//     const checkResult = await pgClient.query(checkQuery, [phone])

//     if (checkResult.rows.length > 0) {
//       // Phone number exists, check the status
//       const existingUser = checkResult.rows[0] as LoginUser
//       if (existingUser.status === 'active') {
//         // User is already active, don't update OTP and redirect to login
//         await pgClient.query('COMMIT')
//         return { user: existingUser, redirectToLogin: true, redirectToRegister: false, redirectToVerifyOtp: false }
//       } else if (existingUser.status === 'otp_verified') {
//         // User is verified but not active, don't update OTP
//         await pgClient.query('COMMIT')
//         return { user: existingUser, redirectToLogin: false, redirectToRegister: true, redirectToVerifyOtp: false }
//       } else {
//         // Update OTP for existing user with other status (e.g., 'otp_pending')
//         const updateQuery = `
//           UPDATE users
//           SET otp = $1, status = 'otp_verify_pending', updated_at = NOW()
//           WHERE id = $2
//           RETURNING id, phone, status, otp
//         `
//         const updateResult = await pgClient.query(updateQuery, [otp, existingUser.id])
//         await pgClient.query('COMMIT')
//         return { user: updateResult.rows[0] as LoginUser, redirectToLogin: false, redirectToRegister: false, redirectToVerifyOtp: true }
//       }
//     } else {
//       // Phone number doesn't exist, insert new user
//       const insertQuery = `
//         INSERT INTO users (phone, otp, status, created_at, updated_at)
//         VALUES ($1, $2, 'otp_verify_pending', NOW(), NOW())
//         RETURNING id, phone, status, otp
//       `
//       const insertResult = await pgClient.query(insertQuery, [phone, otp])
//       await pgClient.query('COMMIT')
//       return { user: insertResult.rows[0] as LoginUser, redirectToLogin: false, redirectToRegister: false, redirectToVerifyOtp: true }
//     }
//   } catch (error) {
//     await pgClient.query('ROLLBACK')
//     console.error('Error updating OTP:', error)
//     throw error
//   }
// }

// export async function verifyOtp(phone: string, otp: string): Promise<LoginUser | null> {
//   try {
//     // await pgClient.query('BEGIN')
//     const verifyQuery = `
//       SELECT id FROM users
//       WHERE phone = $1 AND otp = $2
//     `
//     const verifyResult = await pgClient.query(verifyQuery, [phone, otp])

//     if (verifyResult.rows.length === 0) {
//       await pgClient.query('COMMIT')
//       return null
//     }

//     const userId = verifyResult.rows[0].id
//     const updateQuery = `
//       UPDATE users
//       SET status = 'otp_verified', updated_at = NOW()
//       WHERE id = $1
//       RETURNING id, phone, status
//     `
//     const updateResult = await pgClient.query(updateQuery, [userId])
//     // await pgClient.query('COMMIT')

//     if (updateResult.rows.length > 0) {
//       return updateResult.rows[0] as LoginUser
//     }
//     return null
//   } catch (error) {
//     // await pgClient.query('ROLLBACK')
//     console.error('Error verifying OTP:', error)
//     throw error
//   }
// }
