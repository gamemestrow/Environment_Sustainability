import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserProfileForm from "@/components/UserProfileForm";
import UserModel from "@/models/UserModel";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
    const { userId } = await auth();

    const user = await UserModel.findOne({ clerkUserId: userId });
    console.log(user);
    if (user) {
        redirect("/profile/delete");
    }

    return (
        <div className="min-h-screen flex items-center flex-col">
            <Navbar />
            <UserProfileForm />
            <Footer />
        </div>
    );
};

export default page;
