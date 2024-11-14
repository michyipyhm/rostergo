import { NextRequest, NextResponse } from "next/server";
import { loginService } from "@/services/loginService";
import jwt from "jsonwebtoken";

const KEY = process.env.JWT_KEY;

async function generateJWT(payload: any) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      KEY,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        console.log("err: ", err);
        console.log("token: ", token);
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}
export async function POST(request: NextRequest) {
  const { nickname, password } = await request.json();
  console.log("KEY: ", KEY);
  try {
    if (!nickname || !password) {
      return NextResponse.json(
        { message: "nickname and password are required" },
        { status: 400 }
      );
    }

    const result = await loginService.authenticateAdmin(nickname, password);
    if (result.success && result.admin) {
      /* Sign token */
      const payload = {
        id: result.admin.id,
        nickname: result.admin.nickname,
        admin: result.admin.admin,
        branch_id: result.admin.branch_id,
      };

      const token = await generateJWT(payload);
      console.log("TOKEN: ", token);
      return NextResponse.json(
        { message: "Login successful", token },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: result.message }, { status: 401 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}

// export async function DELETE() {
//   await sessionStore.clear()
//   return NextResponse.json({ success: true })
// }
