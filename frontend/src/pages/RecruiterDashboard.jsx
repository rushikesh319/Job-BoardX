import React, { useState } from 'react'
import CreateJob from '../components/CreateJob'
import PostedJobs from '../components/PostedJobs'
import clsx from 'clsx'

function RecruiterDashboard() {

  const [activeTab,setActiveTab] = useState("createJob")
   
   
   
  return (
   <div className="w-full flex flex-col md:flex-row h-screen overflow-hidden">
  {/* Sidebar */}
  <div className="w-full md:w-[30%] bg-cyan-400 md:h-full flex flex-col items-center pt-4 md:pt-10 md:fixed md:left-0 md:top-0 md:bottom-0 z-10 md:overflow-hidden sm:h-[100px] sm:justify-center">
    <button
      onClick={() => setActiveTab("createJob")}
      className={clsx(
        'flex justify-center items-center h-12 w-full cursor-pointer text-lg md:text-xl font-bold',
        activeTab === "createJob" ? "bg-white text-cyan-500" : "bg-cyan-400 text-white"
      )}
    >
      Create Job
    </button>

    <button
      onClick={() => setActiveTab("postedJobs")}
      className={clsx(
        'flex justify-center items-center h-12 w-full cursor-pointer text-lg md:text-xl font-bold',
        activeTab === "postedJobs" ? "bg-white text-cyan-500" : "bg-cyan-400 text-white"
      )}
    >
      Jobs Posted
    </button>
  </div>

  {/* Right Panel */}
  <div className="md:ml-[30%] w-full h-full overflow-y-auto">
    {activeTab === "createJob" && <CreateJob />}
    {activeTab === "postedJobs" && <PostedJobs />}
  </div>
</div>


  )
}

export default RecruiterDashboard