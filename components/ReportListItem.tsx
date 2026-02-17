"use client";

import Image from "next/image";
import { redirect } from "next/navigation";

type Report = {
  id: string;
  location: string;
  description: string;
  images: string[];
  status: "Pending" | "Resolved";
  date: string;
};

type Props = {
  report: Report;
};

const ReportListItem = ({ report }: Props) => {
  return (
    <div className="flex gap-4 bg-black mt-5 border border-green-600 rounded-xl p-4 hover:border-green-400 transition"onClick={()=>redirect(`/reports/${report.id}`)}>
      
      {/* Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-green-900 shrink-0">
        <Image
        width={100}
        height={100}
          src={report.images?.[0] || "/placeholder.jpg"}
          alt="Report"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold text-green-400">
          {report.location}
        </h3>
        <p className="text-sm text-gray-300">{report.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>
            📅 {new Date(report.date).toLocaleDateString()}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
              ${
                report.status === "Resolved"
                  ? "bg-green-700 text-green-200"
                  : "bg-yellow-700 text-yellow-200"
              }`}
          >
            {report.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportListItem;
