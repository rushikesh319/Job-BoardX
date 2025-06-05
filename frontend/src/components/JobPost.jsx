import { Pencil, Trash } from 'lucide-react'
import React from 'react'
import { useJobStore } from '../store/useJobStore'
import { Link } from 'react-router-dom'

function JobPost({job , onEditClick}) {


  const {deleteJob} = useJobStore()
  const handleDeleteJob= () => {
     deleteJob(job._id)
  }
  return (
    <div className='bg-white shadow-xl rounded-xl p-4 flex flex-col gap-6  '>
      <div className='flex justify-between p-2'> 
       <p className='text-xl font-bold text-gray-600 capitalize'>{job.title}</p>
      <div className='flex gap-2'>
         <button onClick={onEditClick} className='bg-cyan-800 text-white  rounded-md p-2 ho cursor-pointer '><Pencil/></button>
        <button onClick={handleDeleteJob} className='bg-red-500  rounded-md p-2  text-white cursor-pointer' ><Trash/></button>
        
      </div>
      </div>
          
      <Link to={`/applicants/${job._id}`} className='bg-cyan-400 text-center p-2 rounded-3xl hover:bg-sky-600 text-white duration-300 font-bold'>View Applicants</Link>
    </div>
  )
}

export default JobPost