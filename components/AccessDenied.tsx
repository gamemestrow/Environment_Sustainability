import React from "react";
import Navbar from "./Navbar";

const AccessDenied = () => {
    return (
        <div className="min-h-screen flex items-center flex-col bg-black text-green-400">
            <Navbar />
            <h1 className="text-3xl">Access Denied</h1>
        </div>
    );
};

export default AccessDenied;
