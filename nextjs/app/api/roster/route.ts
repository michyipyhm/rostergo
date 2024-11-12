import { NextRequest, NextResponse } from "next/server";
import { monthlyRosterService } from "@/services/monthlyRosterService";

export async function GET(req: NextRequest) {
    const date = req.nextUrl.searchParams.get("date")

    if (!date) {
        return NextResponse.json({ error: "Invalid date parameter" }, { status: 400 })
    }

    try {
        const data = await monthlyRosterService.getMonthlyRoster(date)
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.error("Service error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}