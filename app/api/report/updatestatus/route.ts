import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ReportModel from "@/models/ReportModel";

export async function PATCH(req: NextRequest) {
    await dbConnect();

    const data = await req.json();

    if (!data.id)
        return Response.json(
            { error: "Unauthorized", success: false },
            { status: 401 },
        );

    const report = await ReportModel.findOneAndUpdate(
        { _id: data.id },
        { status: data.status },
    );

    return NextResponse.json({
        success: true,
        report
    });
}
