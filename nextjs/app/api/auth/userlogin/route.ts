import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { mobileLoginService } from "@/services/user/loginService";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

async function generateJWT(payload: any) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);
}

export async function POST(request: NextRequest) {
  const { nickname, password } = await request.json();

  try {
    if (!nickname || !password) {
      return NextResponse.json(
        { message: "Nickname and password are required" },
        { status: 400 }
      );
    }

    const result = await mobileLoginService.authenticateUser(
      nickname,
      password
    );

    // Check for successful authentication
    if (result.success && result.user) {
      // Create JWT payload
      const payload = {
        id: result.user.id,
        nickname: result.user.nickname,
        admin: result.user.admin,
        type: result.user.type,
      };

      const token = await generateJWT(payload);
      console.log("user login TOKEN:", token);
      console.log("user login PAYLOAD:", payload)

      return NextResponse.json(
        { message: "Login successful", token, payload },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: result.message || "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { message: "An error occurred during authentication" },
      { status: 500 }
    );
  }
}
