import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: [
      {
        type: String, // store image URLs (Cloudinary / S3 / local)
      },
    ],

    date: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in Next.js
export default mongoose.models.Report ||
  mongoose.model("Report", ReportSchema);
