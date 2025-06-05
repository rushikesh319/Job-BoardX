import React from "react";

function JobApplicationCard({ application }) {
  const { jobId, applicationStatus, appliedAt} = application;

  if (!jobId) return null; // Safety check if jobId didn't populate

  return (
    <div className="bg-white shadow-xl rounded-lg p-6  hover:shadow-lg transition-all">
      <h2 className="text-2xl font-semibold text-cyan-400 mb-2">
        {jobId.title}
      </h2>
      <p className="text-lg text-gray-700">{jobId.companyName}</p>
      <div className="mt-3 text-sm text-gray-600 space-y-1">
        <p><strong>Location:</strong> {jobId.location}</p>
        <p><strong>Salary:</strong> ₹{jobId.salaryRange}</p>
        <p><strong>Job Type:</strong> {jobId.jobType}</p>
        <p><strong>Experience:</strong> {jobId.experienceLevel}</p>
        <p><strong>Status:</strong> <span className={` font-semibold ${applicationStatus === 'pending' ? 'text-yellow-600' : applicationStatus === 'shortlisted' ? 'text-green-600' : 'text-red-500'}`}>{applicationStatus}</span></p>
        <p><strong>Applied:</strong> {new Date(appliedAt).toLocaleDateString()}</p>
      </div>
       
    </div>
  );
}

export default JobApplicationCard;
