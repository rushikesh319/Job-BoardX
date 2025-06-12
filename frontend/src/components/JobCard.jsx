 import React from 'react'
 import { Link } from 'react-router-dom'
 function JobCard({job}) {
   return (<> 
     
     <div className="flex flex-col shadow-lg p-4 sm:p-5 md:p-6 justify-center gap-4 sm:gap-5 md:gap-6 text-base sm:text-lg md:text-xl rounded-2xl  ease-in-out  hover:-translate-y-2 hover:scale-105 hover:shadow-xl duration-300">
  <p className="uppercase mx-auto text-md sm:text-2xl font-bold text-gray-500">
    {job.title}
  </p>

  <p className="uppercase border-b-2 border-b-gray-300 p-2 relative text-gray-800  text-sm sm:text-xl">
    {job.companyName}
    <span className="text-gray-600 lowercase italic font-normal absolute right-2 top-1/2 -translate-y-1/2 text-sm sm:text-base">
      - company-name
    </span>
  </p>

  <p className="uppercase border-b-2 border-b-gray-300 p-2 relative text-sm sm:text-xl">
    {job.jobType}
    <span className="text-gray-600 lowercase italic font-normal absolute right-2 top-1/2 -translate-y-1/2 text-sm sm:text-base">
      - job-type
    </span>
  </p>

  <p className="uppercase border-b-2 border-b-gray-300 p-2 relative text-sm sm:text-xl">
    ${job.salaryRange}
    <span className="text-gray-600 lowercase italic font-normal absolute right-2 top-1/2 -translate-y-1/2 text-sm sm:text-base">
      - salary
    </span>
  </p>

  <Link
    to={`/jobdetail/${job._id}`}
    className="hover:bg-sky-600 hover:text-white duration-300 rounded-md border border-cyan-500 flex justify-center p-2 text-sm sm:text-base cursor-pointer"
  >
    View Details
  </Link>
</div>

  
     </>
   )
 } 
 export default JobCard
 