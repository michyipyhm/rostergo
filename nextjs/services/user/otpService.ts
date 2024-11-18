import { LoginUser, verifyNumberResult } from "@/lib/models";
import { pgClient } from "@/lib/pgClient";


export async function verifyPhoneNumber(
  phone: string
): Promise<verifyNumberResult> {
  try {
    const checkQuery = `
    SELECT id, status, phone FROM users
    WHERE phone = $1
  `;

    const checkResult = await pgClient.query(checkQuery, [phone]);

    if (checkResult.rows.length > 0) {
      const existingUser = checkResult.rows[0] as LoginUser;
      if (existingUser.status === "active") {
        return {
          user: existingUser,
          message: "active user",
          redirectToLogin: true,
          redirectToVerifyOtp: false,
        };
      } else if (existingUser.status === "resigned") {
        return {
          user: null,
          message:
            "Sorry, your account has been resigned. Please contact admin for more information.",
          redirectToLogin: false,
          redirectToVerifyOtp: false,
        };
      } else {
        return {
          user: existingUser,
          message:
            "phone numver already exists, pending whatsapp otp verification",
          redirectToLogin: false,
          redirectToVerifyOtp: true,
        };
      }
    } else {
      const insertQuery = `
  INSERT INTO users (phone, status)
  VALUES ($1, 'inactive')
  RETURNING id, phone, status
`;
      const insertResult = await pgClient.query(insertQuery, [phone]);
      return {
        user: insertResult.rows[0] as LoginUser,
        message: "new user updated",
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

export async function saveOtpToDB(
  phone: string,
  generatedOtp: string
): Promise<LoginUser | null> {
  try {
    const checkQuery = `
    SELECT id, status, phone FROM users
    WHERE phone = $1
  `;

    const checkResult = await pgClient.query(checkQuery, [phone]);
    if (checkResult.rows.length > 0) {
      const updateQuery = `
      UPDATE users
      SET otp = $2
      WHERE phone = $1
      RETURNING id, phone, otp`;
      const updateResult = await pgClient.query(updateQuery, [
        phone,
        generatedOtp,
      ]);
      return updateResult.rows[0] as LoginUser;
    } else {
      const insertQuery = `
      INSERT INTO users (phone, otp)
      VALUES ($1, $2)
      RETURNING id, phone, otp, status
    `;
      const insertResult = await pgClient.query(insertQuery, [
        phone,
        generatedOtp,
      ]);
      return insertResult.rows[0] as LoginUser;
    }
  } catch (error) {
    console.error("Error saving otp to db:", error);
    return null;
  }
}

export async function verifyOtp(
  phone: string,
  otp: string
): Promise<LoginUser | null> {
  try {
    const verifyQuery = `
     SELECT id, phone FROM users
WHERE phone = $1 AND otp = $2
    `;
    const verifyResult = await pgClient.query(verifyQuery, [phone, otp]);

    if (verifyResult.rows.length === 0) {
      await pgClient.query("COMMIT");
      console.error("OTP verification failed");
      return null;
    }

    if (verifyResult.rows.length > 0) {
      return verifyResult.rows[0] as LoginUser;
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}
