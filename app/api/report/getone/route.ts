import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ReportModel from "@/models/ReportModel";

export async function GET(req: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
        return Response.json(
            { error: "Unauthorized", success: false },
            { status: 401 },
        );

    const report = await ReportModel.findOne({ _id: id });
    if (!report) {
        return Response.json(
            { error: "Please create a user profile", success: false },
            { status: 403 },
        );
    }

    return NextResponse.json({
        success: true,
        report,
    });
}
