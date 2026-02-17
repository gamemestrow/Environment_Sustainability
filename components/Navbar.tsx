"use client";

import Link from "next/link";
import { BarChart2 } from "lucide-react";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

import { useEffect, useState } from "react";

const fetchIsAdmin = async () => {
    const data = await fetch("http://localhost:3000/api/protected/admin", {
        method: "POST",
        credentials: "include",
    }).then((res) => res.json());
    return data.success;
};

export default function Navbar() {
    const [profileExist, setprofileExist] = useState<boolean>(false);

    useEffect(() => {
        fetchIsAdmin().then(setprofileExist);
    }, []);

    return (
        <nav className="w-full bg-zinc-950 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-green-500 tracking-wide hover:text-green-400 transition"
                >
                    GreenSite
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-zinc-300 hover:text-green-400 transition font-medium"
                    >
                        Home
                    </Link>

                    <Link
                        href="/reports"
                        className="flex items-center gap-1 text-zinc-300 hover:text-green-400 transition font-medium"
                    >
                        <BarChart2 size={18} />
                        Reports
                    </Link>
                    <Link
                        href={"/makereport"}
                        className="flex items-center gap-1 text-zinc-300 hover:text-green-400 transition font-medium"
                    >
                        <BarChart2 size={18} />
                        Make Report
                    </Link>

                    {/*profile */}
                    <Link
                        href={"/profile/create"}
                        className="flex items-center gap-1 text-zinc-300 hover:text-green-400 transition font-medium"
                    >
                        <BarChart2 size={18} />
                        Profile
                    </Link>

                    <header className="flex justify-end items-center p-4 gap-4 h-16">
                        {/* Show the sign-in and sign-up buttons when the user is signed out */}
                        <SignedOut>
                            <SignInButton />
                            <SignUpButton>
                                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        {/* Show the user button when the user is signed in */}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </header>
                </div>
            </div>
        </nav>
    );
}
