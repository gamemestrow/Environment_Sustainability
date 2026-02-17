import Navbar from "@/components/Navbar";
import ReportForm from "../../components/ReportForm";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/UserModel";

const page = async () => {

    const { userId } = await auth();

    if (!userId)
        return (
            <div className="min-h-screen flex items-center flex-col bg-black text-green-400">
                <Navbar />
                <h1 className="text-3xl">Access Denied</h1>
            </div>
        );

    const user = await User.findOne({ clerkUserId: userId });
    if (!user) {
        return (
            <div className="min-h-screen flex items-center flex-col bg-black text-green-400">
                <Navbar />
                <h1 className="text-3xl">Access Denied</h1>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <ReportForm />
        </div>
    );
};

export default page;
