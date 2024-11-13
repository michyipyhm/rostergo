import { getLeaveRequestlistByUserId } from "@/services/leaveRequests";
import { error } from "console";
import app from "next/app";
import { NextResponse } from "next/server";


export async function GET() {
    const userId = 2; // Example user ID

    try {
        // Fetch the leave request list for the specified user
        const data = await getLeaveRequestlistByUserId(userId);

        // Return a JSON response with the data
        return NextResponse.json({ data, error: null });
    } catch (err) {
        console.error(err); // Log the error for debugging

        // Return a JSON response with an error message
        return NextResponse.json({ data: null, error: "Failed to fetch leave requests" });
    }
}

// export async function GET(req: Request) {
//     const headers = new Headers();
//     headers.append('Access-Control-Allow-Origin', '*');
//     headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     headers.append('Access-Control-Allow-Headers', 'Content-Type');

//     const userId = 2;
//     let data = await getLeaveRequestlistByUserId(userId);

//     return new Response(JSON.stringify({ data, error: 10001 }), {
//         headers: headers,
//     });
// }
