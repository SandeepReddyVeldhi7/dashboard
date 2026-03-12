import { Info, MoreVertical, IdCard, Copy, MapPin, Mail, Share2, Link, QrCode, CloudUpload } from "lucide-react";
import type { Job } from "@/data/jobs";

interface JobDetailsProps {
  job: Job;
}

const JobDetails = ({ job }: JobDetailsProps) => {
  const candidate = job.candidates[0];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <input type="checkbox" className="accent-purple-600 shrink-0" />
          <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Info className="w-4 h-4 text-purple-600 cursor-pointer" />
          <MoreVertical className="w-4 h-4 text-purple-600 cursor-pointer" />
        </div>
      </div>

      <hr className="my-2 border-purple-600" />

      {/* Meta */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
        <IdCard className="w-3.5 h-3.5 text-purple-600" />
        <span>{job.id}</span>
        <Copy className="w-3.5 h-3.5 text-purple-600 ml-1" />
        <span>{job.status}</span>
        <MapPin className="w-3.5 h-3.5 text-purple-600 ml-1" />
        <span>{job.location}</span>
      </div>

      {/* Candidates count */}
      {candidate && (
        <>
          <div className="flex flex-col items-center mt-4">
            <span className="text-4xl font-bold text-indigo-600">{candidate.totalCandidates}</span>
            <span className="text-sm text-indigo-600">Candidates</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-1 mt-4 text-center">
            {[
              { label: "Resume Screened", value: candidate.resumeScreened },
              { label: "In Progress", value: candidate.inProgress },
              { label: "Hired", value: candidate.hired },
              { label: "Rejected", value: candidate.rejected },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center px-1 ${i > 0 ? "border-l border-gray-300" : ""}`}>
                <span className="text-2xl font-semibold text-gray-500">{stat.value}</span>
                <span className="text-[10px] text-gray-500 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Action icons */}
      <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-gray-200">
        {[Mail, Share2, Link, QrCode, CloudUpload].map((Icon, i) => (
          <Icon key={i} className="w-5 h-5 text-indigo-600 cursor-pointer hover:opacity-70 transition-opacity" />
        ))}
      </div>
    </div>
  );
};

export default JobDetails;
