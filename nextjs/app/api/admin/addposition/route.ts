import { NextRequest, NextResponse } from "next/server";
import { branchService } from "@/services/admin/BranchService";

export async function POST(req: NextRequest) {
    try {
        const {
            name,
            grade_id,
            type,
            part_time_hour_wage,
            full_time_wage,
            weekend_restDay,
            restDay_per_week,
            restDay_countBy
        } = await req.json()

        console.log("We will fetch the data to Database",
            "name:", name,
            "grade_id:", grade_id,
            "type:", type,
            "part_time_hour_wage:", part_time_hour_wage,
            "full_time_wage:", full_time_wage,
            "weekend_restDa", weekend_restDay,
            "restDay_per_week", restDay_per_week,
            "restDay_countBy", restDay_countBy
        )

        await branchService.addPosition(
            name,
            grade_id,
            type,
            part_time_hour_wage,
            full_time_wage,
            weekend_restDay,
            restDay_per_week,
            restDay_countBy
        )

        return NextResponse.json(
            { success: true, message: "Position added successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding Position:", error);

        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}