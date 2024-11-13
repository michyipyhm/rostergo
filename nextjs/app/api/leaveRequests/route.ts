import { getLeaveRequestlistByUserId } from "@/services/leaveRequests";
import { error } from "console";

export async function GET() {
    const userId = 2;

    let data = await getLeaveRequestlistByUserId(userId);

// console.log(users)
    return Response.json({ "data": data, "error": 10001 });
    // return Response.json({ "abc": "123" });
}