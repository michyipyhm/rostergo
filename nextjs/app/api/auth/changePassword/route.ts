import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose';
import { adminLoginService } from '@/services/admin/adminLoginService';
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY);

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let payload;
    try {
      const { payload: verifiedPayload } = await jose.jwtVerify(token, SECRET_KEY);
      payload = verifiedPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const success = await adminLoginService.changePassword(payload.id as number, currentPassword, newPassword);

    if (success) {
      return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Failed to change password' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in changePassword route:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}