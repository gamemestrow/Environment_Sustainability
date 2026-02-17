import AccessDenied from "@/components/AccessDenied";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReportListItem from "@/components/ReportListItem";
import ReportModel from "@/models/ReportModel";
import UserModel from "@/models/UserModel";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
    const { userId } = await auth();

    if (!userId)
        return (
            <AccessDenied/>
        );

    const user = await UserModel.findOne({ clerkUserId: userId });
    if (!user) {
        return (
            <AccessDenied/>
        );
    }

    let allreports;
    if(user.role == "admin"){
        allreports = await ReportModel.find({});
    } else {
        allreports = await ReportModel.find({user: userId});
    }
    
    return (
        <div className="min-h-screen flex items-center flex-col bg-black text-green-400">
            <Navbar />
            <div className="flex-1 w-1/2">
                {allreports.map((report, index) => (
                    <ReportListItem
                        key={index}
                        report={{
                            id: report._id.toString(),
                            location: report.location,
                            description: report.description,
                            status: report.status,
                            date: report.date,
                            images: report.images,
                        }}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default page;