 import React from 'react'
 import { Link } from 'react-router-dom'
 function JobCard({job}) {
   return (<> 
     
    <div className="h-full bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between transition hover:shadow-lg">

  {/* Top Content */}
  <div className="space-y-3">

    {/* Company */}
    <p className="text-sm text-gray-500 font-medium">
      {job.companyName}
    </p>

    {/* Role */}
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
      {job.title}
    </h3>

    {/* Meta Info */}
    <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-2">
      <span>
        <span className="font-medium text-gray-700">Type:</span>{' '}
        {job.jobType}
      </span>

      <span>
        <span className="font-medium text-gray-700">Salary:</span>{' '}
        {job.salaryRange}
      </span>
    </div>

  </div>

  {/* Action */}
  <Link
    to={`/jobdetail/${job._id}`}
    className="mt-6 inline-flex justify-center items-center rounded-md border border-cyan-600 text-cyan-600 font-semibold py-2 text-sm hover:bg-cyan-600 hover:text-white transition"
  >
    View Details
  </Link>

</div>


  
     </>
   )
 } 
 export default JobCard
 