import { auth } from "@clerk/nextjs/server";
import User from "@/models/UserModel";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
    await dbConnect();
    const { userId } = await auth();
    if (!userId)
        return Response.json(
            { error: "Unauthorized", success: false },
            { status: 401 },
        );

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) {
        return Response.json(
            { error: "Please create a user profile", success: false },
            { status: 403 },
        );
    }

    return Response.json({ success: true });
}
