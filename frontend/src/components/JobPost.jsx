import { Pencil, Trash, MapPin, Briefcase, Wallet, Badge } from 'lucide-react';
import React from 'react'
import { useJobStore } from '../store/useJobStore'
import { Link } from 'react-router-dom'

function JobPost({job , onEditClick}) {


  const {deleteJob} = useJobStore()
  const handleDeleteJob= () => {
     deleteJob(job._id)
  }
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col h-full">

  {/* ===== Header ===== */}
  <div className="mb-4">
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
      {job.title}
    </h3>
    <p className="text-sm text-gray-500 mt-1">
      {job.companyName}
    </p>
  </div>

  {/* ===== Job Info ===== */}
  <div className="flex flex-wrap gap-2 mb-5">
    <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs sm:text-sm px-3 py-1.5 rounded-full">
      <MapPin size={14} />
      {job.location}
    </span>

    <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs sm:text-sm px-3 py-1.5 rounded-full">
      <Briefcase size={14} />
      {job.jobType}
    </span>

    <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs sm:text-sm px-3 py-1.5 rounded-full">
      <Wallet size={14} />
      ${job.salaryRange}
    </span>

    <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs sm:text-sm px-3 py-1.5 rounded-full">
      <Badge size={14} />
      {job.experienceLevel || "N/A"}
    </span>
  </div>

  {/* ===== Divider ===== */}
  <div className="border-t border-gray-200 my-3"></div>

  {/* ===== Footer / Actions ===== */}
  <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

    {/* Admin Actions */}
    <div className="flex gap-2">
      <button
        onClick={onEditClick}
        className="flex items-center justify-center gap-1 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 px-3 py-2 rounded-lg transition"
      >
        <Pencil size={14} />
        <span className="text-sm hidden sm:inline">Edit</span>
      </button>

      <button
        onClick={handleDeleteJob}
        className="flex items-center justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg transition"
      >
        <Trash size={14} />
        <span className="text-sm hidden sm:inline">Delete</span>
      </button>
    </div>

    {/* Primary CTA */}
    <Link
      to={`/applicants/${job._id}`}
      className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm sm:text-base font-medium py-2.5 px-5 rounded-xl text-center transition"
    >
      View Applicants
    </Link>
  </div>
</div>

  )
}

export default JobPost