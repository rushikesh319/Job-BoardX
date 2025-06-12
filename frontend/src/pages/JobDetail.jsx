import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useJobStore } from "../store/useJobStore";
import { useJobApplicationStore } from "../store/useJobApplicationStore";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'
function JobDetail() {

  const navigate =  useNavigate()
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const { job, getJobById } = useJobStore();
  const { applyToJob } = useJobApplicationStore();
  const {user} = useUserStore()
  useEffect(() => {
    if (id) {
      getJobById(id);
    }
  }, [id]);

  if (!job) return <div className="text-center p-8">Loading job...</div>;

  const handleSubmitApplication = async () => {
    if (!resumeFile) {
      alert("Please upload your resume before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", job._id);
    formData.append("resume", resumeFile);

    try {
      await applyToJob(formData);
      setModalOpen(false);
    } catch {
      // error toast handled in store
    }
  };

  return (
<div className="relative w-full min-h-screen overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/detailpage.jpg"
      alt="Detail Background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0  bg-opacity-40" />
  </div>

  {/* Content Card */}
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10"
  >
    <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl w-full max-w-3xl p-6 sm:p-10 space-y-6">
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 capitalize text-center">
        {job.companyName}
      </p>

      <div className="space-y-4 sm:space-y-6 text-gray-800">
        {[
          ['Location', job.location],
          ['Looking For', job.title],
          ['Job Type', job.jobType],
          ['Salary', job.salaryRange],
          ['Experience Needed', job.experienceLevel],
          ['Essential Skills', job.skillsRequired],
          ['Remote', job.isRemote ? 'Available' : 'Not Available'],
        ].map(([label, value], index) => (
          <p key={index} className="text-base sm:text-lg md:text-xl border-b pb-2">
            <span className="uppercase font-semibold">{label}:</span> {value}
          </p>
        ))}

        <div>
          <p className="text-lg sm:text-xl font-semibold mb-1 uppercase">Description:</p>
          <p className="text-sm sm:text-base">{job.description}</p>
        </div>
      </div>

      <button
        onClick={() => {
          if (!user) {
            navigate('/signup');
          } else if (user.role === 'recruiter') {
            toast.error("Recruiters can't apply to the jobs");
          } else {
            setModalOpen(true);
            setResumeFile(null);
          }
        }}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 sm:py-3 text-base sm:text-lg font-bold rounded-md transition"
      >
        Apply
      </button>
    </div>
  </motion.div>
  {/* Modal */}
  {modalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-xl p-6 rounded-lg shadow-xl">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="w-full mb-4 border p-2 rounded"
          required
        />
        <div className="flex justify-end gap-4">
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-md font-bold cursor-pointer"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitApplication}
            className="bg-cyan-500 text-white px-5 py-2 rounded-md font-bold cursor-pointer"
          >
            Submit Resume
          </button>
        </div>
      </div>
    </div>
  )}
</div>
  );
}

export default JobDetail;
