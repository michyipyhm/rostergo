import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY); // Ensure your secret key is set in environment variables

// Function to check if the route is excluded from middleware
const isRouteWithoutMiddleware = (path: string) => {
  const excludedPrefixes = [
    "/login",
    "/api/login",
    "/api/userLogin",
    "/_next/static",
    "/favicon.ico",

  ];
  return excludedPrefixes.some((prefix) => path.startsWith(prefix));
};

// Middleware function
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  
  // Set CORS headers
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*"); // Replace with your actual origin
  res.headers.append("Access-Control-Allow-Methods", "GET, DELETE, PATCH, POST, PUT");
  res.headers.append("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Content-Type");

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return res; // Respond with CORS headers for preflight requests
  }

  const pathname = request.nextUrl.pathname;

  // Check if the route is excluded from middleware
  if (isRouteWithoutMiddleware(pathname)) {
    return res; // Skip middleware for excluded routes
  }

  // Retrieve the token from the Authorization header
  const authHeader = request.headers.get("Authorization");
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract the token
  }

  // Return error if the token is missing
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  try {
    // Verify the token
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    
    // Log the decoded payload for debugging
    // console.log({ payload });
    const userId = payload.id.toString();

    // Clone the request and add the user payload to the headers
    const requestWithUser = request.clone();
    requestWithUser.headers.set("userId", userId);

    return NextResponse.next({
      request: requestWithUser,
    });
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.json({ message: "Invalid token", error: err.message }, { status: 401 });
  }
}

// Configuration for middleware matcher
export const config = {
  matcher: ["/api/:path*"], // Adjust to match all API routes
};