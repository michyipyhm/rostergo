import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import * as jose from 'jose';
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY); // Make sure to set your secret key in environment variables

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
  const res = NextResponse.next();

  // Decode the token if it exists
  // let decodedPayload = null;
  // if (token) {
  //   try {
  //     decodedPayload = jwt.decode(token); // Verify and decode the token
  //   } catch (err) {
  //     console.error("Token verification failed:", err);
  //     return NextResponse.error(); // Return an error response if verification fails
  //   }
  // }

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
    return res;
    // return NextResponse.next();
  }

  // Retrieve the token from the Authorization header
  const authHeader = request.headers.get("Authorization");
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract the token
  }

  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }


  try {
    const { payload} = await jose.jwtVerify(token, SECRET_KEY);
    // const decodedPayload = jwt.verify(token, SECRET_KEY);
    // Add the decoded payload to the request headers
    const requestWithUser = request.clone();
    requestWithUser.headers.set("x-user-data", JSON.stringify(payload));
    
    return NextResponse.next({
      request: requestWithUser,
    });
  } catch (err) {
      console.error("Token verification failed:", err);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    } 
  }

  // request.nextUrl.searchParams.set("user", JSON.stringify(decodedPayload));
  // const data = request.nextUrl.searchParams.get("user");
  // console.log(data);
  // return res; // Return the response with CORS headers

export const config = {
  matcher: "/api/login",
};
