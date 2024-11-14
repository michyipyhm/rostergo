import { NextRequest, NextResponse } from "next/server";
import { sessionStore } from "./lib/sessionStore";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_KEY; // Make sure to set your secret key in environment variables

const isRouteWithoutMiddleware = (path: string) => {
  const excludedPrefix = [
    "/login",
    "/api/login",
    "/_next/static",
    "/favicon.ico",
  ];
  return excludedPrefix.some((prefix) => path.startsWith(prefix));
};

export async function middleware(request: NextRequest) {
  // Retrieve the token from the Authorization header
  const authHeader = request.headers.get("Authorization");
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract the token
  }

  const res = NextResponse.next();

  // Decode the token if it exists
  let decodedPayload = null;
  if (token) {
    try {
      decodedPayload = jwt.decode(token); // Verify and decode the token
    } catch (err) {
      console.error("Token verification failed:", err);
      return NextResponse.error(); // Return an error response if verification fails
    }
  }

  // Add CORS headers to the response
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*"); // Replace with your actual origin
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return res; // Respond with CORS headers for preflight request
  }

  const pathname = request.nextUrl.pathname;
  if (isRouteWithoutMiddleware(pathname)) {
    return NextResponse.next();
  }

  request.nextUrl.searchParams.set("user", JSON.stringify(decodedPayload));
  const data = request.nextUrl.searchParams.get("user");
  console.log(data);
  return res; // Return the response with CORS headers
}

export const config = {
  matcher: "/api/:path*",
};
