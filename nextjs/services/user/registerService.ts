import { mobileRegisterResult } from "@/lib/models";
import { pgClient } from "@/lib/pgClient";

export async function mobileRegister(
  phone: string,
  nickname: string,
  password: string,
  gender: "male" | "female"
): Promise<mobileRegisterResult> {
  try {
    const query = `
    UPDATE users 
    SET nickname = $1, password = $2, gender = $3, status = 'active'
    WHERE phone = $4
    RETURNING id
  `;

    const result = await pgClient.query(query, [
      nickname,
      password,
      gender,
      phone,
    ]);

    if (result.rows.length > 0) {
      return {
        success: true,
        message: "User registered successfully",
        userId: result.rows[0].id,
      };
    } else {
      return {
        success: false,
        message: "Failed to register user",
      };
    }
  } catch (error) {
    console.error("Error in mobileRegister:", error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
}
