import { NextRequest, NextResponse } from 'next/server'
import { monthlyRosterService } from '@/services/admin/monthlyRosterService'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, month, day, shift_slot } = body;
        // console.log("Received Request Body:", body)

        if (!id || !month || !day || !shift_slot) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const result = await monthlyRosterService.editDailyShiftSlot(id, month, day, shift_slot);

        return NextResponse.json({ message: result.message }, { status: 200 });
    } catch (error) {
        console.error("Error in editShift controller:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}