import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secretKey = new TextEncoder().encode("your-secret-key"); // Replace with your secret key

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define paths for user and admin
  const isUserPath = pathname.startsWith("/api/user");
  const isAdminPath = pathname.startsWith("/api/admin");

  // Extract token from cookies or headers
  const token =
    req.cookies.get("authToken")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.redirect(new URL("/api/unauthorized", req.url));
  }

  try {
    // Verify the token and extract the payload
    const { payload } = await jwtVerify(token, secretKey);

    // Check the role in the token payload
    const userRole = payload.role as string;

    if (isUserPath && userRole !== "user") {
      return NextResponse.redirect(new URL("/api/unauthorized", req.url));
    }

    if (isAdminPath && userRole !== "admin") {
      return NextResponse.redirect(new URL("/api/unauthorized", req.url));
    }

    // Store payload in a custom header for downstream use
    const res = NextResponse.next();
    res.headers.set("x-jwt-payload", JSON.stringify(payload)); // Attach payload to the header
    return res;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/api/unauthorized", req.url));
  }
}

export const config = {
  matcher: ["/api/user/:path*", "/api/admin/:path*"], // Guard specific paths
};
