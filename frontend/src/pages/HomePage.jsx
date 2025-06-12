import React, { useEffect } from 'react';
import { useJobStore } from '../store/useJobStore';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';

function HomePage() {
  const {
    jobs,
    getAllJobs,
    searchQuery,
    setSearchQuery,
    searchJobs
  } = useJobStore();

  useEffect(() => {
    getAllJobs();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      searchJobs(query);
    } else {
      getAllJobs();
    }
  };

  return (
    <>
      <div className="w-full h-full">
        {/* Header Image */}
        <div className="w-full overflow-hidden">
          <img
            src="/header2.jpg"
            alt="Career Header"
            className="w-full object-cover h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]"
          />
        </div>

        {/* Title */}
        <div className="w-full h-[200px] flex justify-center items-center text-2xl sm:text-3xl md:text-4xl p-6 text-cyan-500 italic text-center">
          <p>Start Your Career Journey</p>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-center px-4 mb-4 ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search jobs by title, description or skill..."
            className="w-full sm:w-2/3 md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-12">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">No jobs found.</p>
          ) : (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;
