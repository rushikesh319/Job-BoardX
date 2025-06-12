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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {jobs.length === 0 ? (
      <p className="text-center text-gray-400 col-span-full">No jobs posted yet.</p>
    ) : (
      jobs.map((job) => (

         <motion.div
          variants={itemVariants}
             key={job._id}
        >   <JobPost
          key={job._id}
          job={job}
          onEditClick={() => {
            setSelectedJob(job);
            setIsModalOpen(true);
          }}
        />
        </motion.div>

      ))
    )}
  </div>

  {/* Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 ">
      <div className="bg-white  h-full rounded-lg w-[90%] max-w-2xl overflow-y-auto ">
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
  )}
</motion.div>

  );
}

export default PostedJobs;
