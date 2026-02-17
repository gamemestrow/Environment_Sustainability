"use client";

type Report = {
    location: string;
    images: string[];
    status: "Pending" | "Resolved";
    date: string;
    user: string;
};

type Props = {
    report: Report;
};

import { redirect } from "next/navigation";
import { useState } from "react";

export default function ReportForm() {
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const base64Images = await Promise.all(
            images.map(async (file) => {
                const buffer = await file.arrayBuffer();
                const base64 = btoa(
                    String.fromCharCode(...new Uint8Array(buffer)),
                );
                return `data:${file.type};base64,${base64}`;
            }),
        );

        const payload = {
            location,
            description,
            images: base64Images,
        };

        console.log("SENDING:", payload);

        await fetch("/api/report/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-zinc-900 border border-green-700/40 rounded-2xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                <h2 className="text-2xl font-bold text-green-500 mb-1">
                    Report Garbage Issue
                </h2>
                <p className="text-gray-400 mb-6">
                    Your report helps keep the city clean and safe.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Location */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Street / Landmark / Area"
                            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white
                         focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the garbage issue..."
                            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white
                         focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Upload Images
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                                setImages(
                                    e.target.files
                                        ? Array.from(e.target.files)
                                        : [],
                                )
                            }
                            className="block w-full text-sm text-gray-400
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:bg-green-600 file:text-black
                         hover:file:bg-green-500"
                        />
                        {images.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                                {images.length} image(s) selected
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-black font-semibold py-2.5 rounded-lg
                       hover:bg-green-500 transition shadow-lg"
                    >
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
}
