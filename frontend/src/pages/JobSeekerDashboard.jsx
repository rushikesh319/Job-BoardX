import React, { useEffect,useState} from 'react'
import { useJobApplicationStore } from '../store/useJobApplicationStore'
import JobApplicationCard from '../components/JobApplicationCard'
import { useUserStore } from '../store/useUserStore'

function JobSeekerDashboard() {
   
  const {user} = useUserStore()
   const {jobs , getApplicationsByUser} = useJobApplicationStore()

 const [loading, setLoading] = useState(true);

useEffect(() => {
  if (user?._id) {
    getApplicationsByUser().finally(() => setLoading(false));
  }
}, [user]);


  return (
    <div className="w-full h-full p-8 pt-30">
    
          <div className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           {loading ? (
  <p className="text-center text-gray-400 col-span-full">Loading your applications...</p>
) : (
  Array.isArray(jobs) && jobs.length === 0 ? (
    <p className="text-center text-gray-400 col-span-full">
      Not Applied for any job yet.
    </p>
  ) : (
    jobs.map((application) => (
      <JobApplicationCard key={application._id} application={application} />
    ))
  )
)}

          </div>
    </div>
  )
}

export default JobSeekerDashboard