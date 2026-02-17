"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfileExistsPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const res = await fetch("/api/protected/user", {
                    method: "POST",
                });

                const data = await res.json();
                if (data.success) {
                    redirect("/profile/create");
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkAccess();
    });

    const handleDelete = async () => {
        const confirmDelete = confirm(
            "Are you sure you want to delete your profile? This action cannot be undone.",
        );

        if (!confirmDelete) return;

        try {
            setLoading(true);

            const res = await fetch("/api/profile/delete", {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                alert("Profile deleted successfully.");
                router.push("/"); // redirect to home
            } else {
                alert("Failed to delete profile.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center flex-col p-6">
            <Navbar />
            <div className=" flex-1">
                <div className="max-w-md w-full border border-red-500 rounded-xl p-8 space-y-6 text-center text-gray-200">
                    <h1 className="text-2xl font-bold text-red-400">
                        Profile Already Exists
                    </h1>

                    <p className="text-gray-400">
                        You already have a profile in our system.
                        <br />
                        If you want to remove it, you can delete it below.
                    </p>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete Profile"}
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
