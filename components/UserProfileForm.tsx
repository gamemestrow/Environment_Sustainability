"use client";
import React, { useState } from "react";

const UserProfileForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/profile/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data?.message || "Failed to create profile");
            } else {
                alert(data?.message || "Profile created");
                // Clear form after success
                setName("");
                setPhone("");
            }
        } catch (err) {
            console.error(err);
            alert("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0f0f0f] border border-green-600 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-green-500 text-center mb-6">
                    Create Your Profile
                </h2>

                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >
                    {/* Name */}
                    <div>
                        <label className="block text-sm text-green-400 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 bg-black border border-green-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm text-green-400 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 bg-black border border-green-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-black font-semibold py-2 rounded-md transition duration-200 disabled:opacity-60"
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfileForm;
