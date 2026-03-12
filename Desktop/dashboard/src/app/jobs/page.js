"use client"
import { useState } from "react";
import { X } from "lucide-react";
import {jobs} from "../../data/jobs"
import Filters from "../../components/Filters"
import AddJob from "../../components/AddJob"
import JobDetails from "../../components/JobDetails"
const Page= () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 max-w-[1600px] mx-auto">
      <Filters />

      <div className="mt-4">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h1 className="text-2xl font-bold text-gray-900">No jobs found</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            <AddJob onHandle={() => setModalOpen(true)} />
            {jobs.map((job) => (
              <JobDetails job={job} key={job.id} />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add Job</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600">This is a simple modal for adding a new job.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
