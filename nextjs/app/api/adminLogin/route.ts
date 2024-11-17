import { NextRequest, NextResponse } from "next/server";
import { adminLoginService } from "@/services/adminLoginService";
import * as jose from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY);

async function generateJWT(payload: any) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(SECRET_KEY);
  }

export async function POST(request: NextRequest) {
  const { nickname, password } = await request.json();

  try {
    if (!nickname || !password) {
      return NextResponse.json(
        { message: "nickname and password are required" },
        { status: 400 }
      );
    }

    const result = await adminLoginService.authenticateAdmin(nickname, password);
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
        { message: "Login successful", token, payload },
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
