import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY);

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'No token provided' }, { status: 400 });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      // const decoded = jwt.verify(token, SECRET_KEY);
      await jose.jwtVerify(token, SECRET_KEY);

      // Here you could add the token to a blacklist if you want to invalidate it server-side
      // For example: await addToBlacklist(token);

      return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}