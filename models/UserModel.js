import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        name: String,
        clerkUserId: { type: String, unique: true },
        role: { type: String, default: "user" },
        reports: [],
    },
    { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
