import React, { useState } from 'react'
import CreateJob from '../components/CreateJob'
import PostedJobs from '../components/PostedJobs'
import clsx from 'clsx'

function RecruiterDashboard() {

  const [activeTab,setActiveTab] = useState("createJob")
   
   
   
  return (
<div className="flex flex-col  h-full">

  {/* Top Navigation for Mobile */}
  <div className="md:hidden flex  w-full bg-cyan-500 shadow-md">
    <button
      onClick={() => setActiveTab("createJob")}
      className={clsx(
        "w-1/2 py-3 text-center text-sm font-bold",
        activeTab === "createJob" ? "bg-white text-cyan-500" : "text-white"
      )}
    >
      Create Job
    </button>
    <button
      onClick={() => setActiveTab("postedJobs")}
      className={clsx(
        "w-1/2 py-3 text-center text-sm font-bold",
        activeTab === "postedJobs" ? "bg-white text-cyan-500" : "text-white"
      )}
    >
      Jobs Posted
    </button>
  </div>

  <div className="flex flex-1 h-full">

    {/* Sidebar (Desktop Only) */}
    <div className="hidden md:flex md:flex-col justify-center w-[30%] bg-cyan-400 pt-10 fixed top-0 left-0 bottom-0 z-10">
      <button
        onClick={() => setActiveTab("createJob")}
        className={clsx(
          "h-12 w-full text-center text-xl font-bold cursor-pointer",
          activeTab === "createJob" ? "bg-white text-cyan-500" : "text-white"
        )}
      >
        Create Job
      </button>
      <button
        onClick={() => setActiveTab("postedJobs")}
        className={clsx(
          "h-12 w-full text-center text-xl font-bold cursor-pointer",
          activeTab === "postedJobs" ? "bg-white text-cyan-500" : "text-white"
        )}
      >
        Jobs Posted
      </button>
    </div>

    {/* Main Content */}
    <div className="flex-1 overflow-y-auto md:ml-[30%] p-4">
      {activeTab === "createJob" && <CreateJob />}
      {activeTab === "postedJobs" && <PostedJobs />}
    </div>

  </div>
</div>



  )
}

export default RecruiterDashboard