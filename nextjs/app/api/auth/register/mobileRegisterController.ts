import { mobileRegisterUser } from "@/lib/models";
import { mobileRegister } from "@/services/user/registerService";
import { NextRequest, NextResponse } from "next/server";

export async function createUserResult(
  userData: Omit<mobileRegisterUser, "id">
): Promise<mobileRegisterUser | null> {
  const result = await mobileRegister(
    userData.phone,
    userData.nickname,
    userData.password,
    userData.gender
  );

  console.log("createUserResult result:", result);
  
  if (result.success && result.userId) {
    return { ...userData, id: result.userId };
  }

  return null;
}

export async function handleMobileRegister(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const { phone, nickname, password, gender } = body;

  if (!phone || !nickname || !password || !gender) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const newUser = await createUserResult({
      phone,
      nickname,
      password,
      gender,
    } as mobileRegisterUser);

    if (newUser) {
      return NextResponse.json(
        { message: "User registered successfully", user: newUser },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to register user" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in handleMobileRegister:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}