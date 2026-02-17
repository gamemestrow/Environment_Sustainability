"use client";

import Navbar from "@/components/Navbar";
import ReportModel from "@/models/ReportModel";
import { useParams } from "next/navigation";
import { report } from "process";
import React, { useEffect, useState } from "react";

interface report {
    reportedBy: string;
    location: string;
    description: string;
    images?: string[];
    status:string;
}

const ReportDetail = () => {
    const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
    const [detail, setdetail] = useState<report | null>();

    const params = useParams<{ id: string }>();
    console.log(params.id);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const res = await fetch("/api/protected/admin", {
                    method: "POST",
                });

                const data = await res.json();
                setIsAllowed(data.success);
            } catch (error) {
                setIsAllowed(false);
            }
        };

        const getreportdata = async () => {
            try {
                const res = await fetch(`/api/report/getone?id=${params.id}`, {
                    method: "GET",
                });
                const data = await res.json();
                setdetail(data.report);
            } catch (error) {
                console.log(error, "detail not found");
            }
        };
        getreportdata();
        checkAccess();
    }, []);

    const updateStatus = async (status: string) => {
        const res = await fetch(`/api/report/updatestatus`, {
            method: "PATCH", // ✅ correct
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: params.id, status }),
        });

        const data = await res.json();
        console.log(data.report)
        setdetail(data.report);
    };

    return (
        <div className="min-h-screen bg-black text-gray-200 p-6">
            <div className="max-w-4xl mx-auto border border-green-500 rounded-xl p-6 space-y-6">
                <div className="border-b border-green-500 pb-4">
                    <h1 className="text-2xl font-bold text-green-400">
                        Garbage Report Details
                    </h1>
                </div>

                <div>
                    <p className="text-sm text-gray-400">Reported by</p>
                    <p className="text-lg text-green-300 font-medium">
                        {detail?.reportedBy || "Anonymous User"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-lg">
                        📍 {detail?.location || "Unknown location"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">Description</p>
                    <p className="text-base leading-relaxed">
                        {detail?.description || "No description provided."}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-400 mb-2">Images</p>

                    {detail?.images?.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {detail?.images?.map((img, index) => (
                                <div
                                    key={index}
                                    className="border border-green-600 rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={img}
                                        alt={`report-${index}`}
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-green-700 rounded-lg p-6 text-center text-gray-400">
                            No images uploaded
                        </div>
                    )}
                </div>

                {isAllowed && detail?.status == "Resolved" ? <button
                        className="middle none center mr-4 rounded-lg bg-red-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                        onClick={() => updateStatus("Pending")}
                    >
                        Cancle
                    </button> : isAllowed ? (
                    <button
                        className="middle none center mr-4 rounded-lg bg-green-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                        onClick={() => updateStatus("Resolved")}
                    >
                        Resolved
                    </button>
                ) : <></>}
            </div>
        </div>
    );
};

export default ReportDetail;
