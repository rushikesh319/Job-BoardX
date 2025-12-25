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
<div className="min-h-screen w-full bg-gray-50 font-sans text-gray-900 pt-30 px-6 sm:px-12">
  {/* pt-24 prevents navbar overlap (adjust if navbar height differs) */}

  {/* Page Container */}
  <div className="max-w-7xl mx-auto">

    {/* Header Section */}
    <header className="border-b pb-8 space-y-4">

     {/* Company Name (Primary) */}
  <h1 className="text-4xl  text-cyan-600 sm:text-5xl font-extrabold tracking-tight">
    {job.companyName}
  </h1>

    

  {/* Job Meta */}
  <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm sm:text-base text-gray-500 pt-2">

   <span>
      <span className="font-semibold text-gray-700">Role:</span>{' '}
      {job.title}
    </span>

    <span>
      <span className="font-semibold text-gray-700">Location:</span>{' '}
      {job.location}
    </span>

    <span>
      <span className="font-semibold text-gray-700">Job Type:</span>{' '}
      {job.jobType}
    </span>

    <span>
      <span className="font-semibold text-gray-700">Work Mode:</span>{' '}
      {job.isRemote ? 'Remote Available' : 'On-site'}
    </span>
  </div>

    </header>

    {/* Main Layout */}
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-14 mt-10">

      {/* Left Content */}
      <section className="lg:col-span-2 space-y-10">

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            About the Position
          </h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            {job.description}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Required Skills
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            {job.skillsRequired}
          </p>
        </div>

      </section>

      {/* Right Sidebar */}
      <aside className="space-y-8">

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Salary Range
          </p>
          <p className="text-lg font-semibold">
            {job.salaryRange}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Experience Level
          </p>
          <p className="text-lg font-semibold">
            {job.experienceLevel}
          </p>
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
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 text-lg font-semibold rounded-md transition"
        >
          Apply Now
        </button>

      </aside>
    </main>

  </div>
 
   
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
