import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
  "*",
  "https://yourdomain.com",
  "https://anotherdomain.com",
]; // Add allowed origins

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Create a response object that will act as request context for downstream
  const nextResponse = NextResponse.next();

  // CORS Preflight Request Handling
  if (req.method === "OPTIONS") {
    nextResponse.headers.set(
      "Access-Control-Allow-Origin",
      allowedOrigins.includes("*")
        ? "*"
        : req.headers.get("Origin") || allowedOrigins[0]
    );
    nextResponse.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    nextResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type"
    );
    nextResponse.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight for 1 day
    return nextResponse;
  }

  const isUserPath = pathname.startsWith("/api/user");
  const isAdminPath = pathname.startsWith("/api/admin");

  // Extract token from cookies or headers
  const token =
    req.cookies.get("authToken")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: Missing token" },
      {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("Origin") || "*",
        },
      }
    );
  }

  try {
    // Verify the token and extract the payload
    const { payload } = await jwtVerify(token, secretKey);

    if (isUserPath && payload.admin) {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions for user api" },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": req.headers.get("Origin") || "*",
          },
        }
      );
    }

    if (isAdminPath && !payload.admin) {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions for admin api" },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": req.headers.get("Origin") || "*",
          },
        }
      );
    }

    // Store payload in a custom header for downstream use
    nextResponse.headers.set("x-jwt-payload", JSON.stringify(payload));
    nextResponse.headers.set(
      "Access-Control-Allow-Origin",
      req.headers.get("Origin") || "*"
    ); // Dynamic origin
    return nextResponse;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json(
      { error: "Unauthorized: Invalid or expired token" },
      {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("Origin") || "*",
        },
      }
    );
  }
}

export const config = {
  matcher: ["/api/user/:path*", "/api/admin/:path*"], // Guard specific paths
};
