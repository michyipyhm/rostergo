import { NextResponse } from "next/server";
import { monthlyRosterService } from "@/services/admin/monthlyRosterService";

export async function POST(req: Request) {
    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json(
                { success: false, message: "Invalid input" },
                { status: 400 }
            );
        }

        const result = await monthlyRosterService.handleLeaveRequest(id, status);

        return NextResponse.json(
            { success: true, message: "Leave request updated successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error handling leave request:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}