import React, { useEffect, useState } from "react";
import JobPost from "./JobPost";
import { useJobStore } from "../store/useJobStore";
import CreateJobForm from "./CreateJobForm";
 import {motion} from 'framer-motion'
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // delay between each card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
function PostedJobs() {
  const { jobs, getJobsByRecruiter } = useJobStore();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJob ,setSelectedJob] = useState(null)
  useEffect(() => {
    getJobsByRecruiter();
  }, [getJobsByRecruiter]);
  return (
     <motion.div 
       variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full p-4 md:p-8">
<div className="flex-1 md:ml-[30%] p-4 md:p-8 bg-gray-50 min-h-screen">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Posted Jobs</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {jobs.length === 0 ? (
      <p className="text-center text-gray-400 col-span-full">No jobs posted yet.</p>
    ) : (
      jobs.map((job) => (
        <motion.div key={job._id} variants={itemVariants} initial="hidden" animate="visible">
          <JobPost
            job={job}
            onEditClick={() => {
              setSelectedJob(job);
              setIsModalOpen(true);
            }}
            onDeleteClick={() => handleDeleteJob(job._id)}
          />
        </motion.div>
      ))
    )}
  </div>
</div>



  {/* Modal */}
 {isModalOpen && (
  <div className="fixed inset-0 z-50 bg-black/40 flex justify-center px-3 sm:px-6">

    {/* Modal Wrapper (NAV SAFE) */}
    <div
      className="
        relative
        mt-[72px]               /* pushes modal below navbar */
        w-full
        max-w-3xl
        bg-white
        rounded-2xl
        shadow-2xl
        flex
        flex-col
        max-h-[calc(100vh-96px)] /* prevents bottom overflow */
      "
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Edit Job
          </h2>
          <p className="text-sm text-gray-500">
            Update job details carefully
          </p>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(false);
            setSelectedJob(null);
          }}
          className="h-9 w-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
        >
          ✕
        </button>
      </div>

      {/* ===== Body (SCROLLABLE) ===== */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="max-w-xl mx-auto">
          <CreateJobForm
            isEdit={true}
            jobData={selectedJob}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedJob(null);
            }}
          />
        </div>
      </div>
    </div>
  </div>
)}

</motion.div>

  );
}

export default PostedJobs;
