import React, { useState } from 'react'
import CreateJob from '../components/CreateJob'
import PostedJobs from '../components/PostedJobs'
import clsx from 'clsx'

function RecruiterDashboard() {

  const [activeTab,setActiveTab] = useState("createJob")
   
   
   
  return (
<div className="flex h-screen w-full bg-gray-50">

  {/* Sidebar for Desktop */}
  <div className="hidden md:flex flex-col justify-start w-1/4 bg-cyan-600 pt-20 fixed top-0 left-0 bottom-0 z-20 shadow-lg">
    <div className="flex flex-col space-y-4 px-4">
      <button
        onClick={() => setActiveTab("createJob")}
        className={clsx(
          "py-3 rounded-lg text-lg font-semibold transition-colors duration-200 hover:bg-cyan-100 hover:text-cyan-600",
          activeTab === "createJob" ? "bg-white text-cyan-600" : "text-white"
        )}
      >
        Create Job
      </button>
      <button
        onClick={() => setActiveTab("postedJobs")}
        className={clsx(
          "py-3 rounded-lg text-lg font-semibold transition-colors duration-200 hover:bg-cyan-100 hover:text-cyan-600",
          activeTab === "postedJobs" ? "bg-white text-cyan-600" : "text-white"
        )}
      >
        Jobs Posted
      </button>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex-1 md:ml-1/4 p-4 md:p-8 overflow-y-auto">
    {/* Mobile Tabs */}
    <div className="md:hidden flex fixed top-16 left-0 right-0 bg-cyan-500 z-30 shadow-md">
      <button
        onClick={() => setActiveTab("createJob")}
        className={clsx(
          "flex-1 py-3 text-center text-sm font-bold transition-colors duration-200",
          activeTab === "createJob" ? "bg-white text-cyan-500" : "text-white"
        )}
      >
        Create Job
      </button>
      <button
        onClick={() => setActiveTab("postedJobs")}
        className={clsx(
          "flex-1 py-3 text-center text-sm font-bold transition-colors duration-200",
          activeTab === "postedJobs" ? "bg-white text-cyan-500" : "text-white"
        )}
      >
        Jobs Posted
      </button>
    </div>

    {/* Content below mobile tabs */}
    <div className="mt-20 md:mt-0">
      {activeTab === "createJob" && <CreateJob />}
      {activeTab === "postedJobs" && <PostedJobs />}
    </div>
  </div>
</div>



  )
}

export default RecruiterDashboard