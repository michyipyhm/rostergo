import { getLeaveRequestDetailByUserId } from '@/services/leaveRequestsDetail';
import { NextResponse, NextRequest } from 'next/server';

import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('your-secret-key'); // 替换为你的密钥

export async function GET(req) {
  
  const authHeader = req.headers.get('Authorization');
  let userId;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // 提取 Bearer token

    try {
      // 使用 jose 验证 token
      const { payload } = await jwtVerify(token, SECRET_KEY);
      userId = payload.userId; // 假设你在 token 的 payload 中存储了 userId
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  if (!userId) {
    // 如果未找到用户 ID，返回未授权
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userPayload = req.nextUrl.searchParams.get("user");
  console.log(userPayload);

  const data = await getLeaveRequestDetailByUserId(userId);

  return NextResponse.json({ data, userPayload });
}