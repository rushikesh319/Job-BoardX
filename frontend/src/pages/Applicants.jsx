import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJobApplicationStore } from "../store/useJobApplicationStore";

function Applicants() {
  const { applicants, getApplicationsByRecruiter, updateApplicationStatus, setCurrentJobId } = useJobApplicationStore();
  const { jobId } = useParams();

  useEffect(() => {
    if (jobId) {
      setCurrentJobId(jobId);  // save current jobId in store
      getApplicationsByRecruiter(jobId);
    }
  }, [jobId]);

  const handleUpdateStatus = (applicationId, status) => {
    updateApplicationStatus(applicationId, status);
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">Applicants for This Job</h1>
      {applicants.length === 0 ? (
        <p className="text-gray-400">No applicants yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {applicants.map((application) => (
            <div key={application._id} className="p-6 rounded-xl shadow-xl/20 bg-white text-black">
              <div className="mb-2">
                <p className="text-lg font-semibold">Job: {application.jobId.title}</p>
                <p className="text-sm text-gray-500">Company: {application.jobId.companyName}</p>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="font-medium">Applicant Info:</p>
                <p>Name: {application.userId.name}</p>
                <p>Email: {application.userId.email}</p>

                {application.resume && (
                  <a
                    href={`http://localhost:5000/${application.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 font-semibold mt-2 inline-block hover:text-cyan-800"
                  >
                    View Resume
                  </a>
                )}

                <p className="mt-2">
                  <strong>Status: </strong>
                  <span
                    className={
                      application.applicationStatus === "pending"
                        ? "text-yellow-600"
                        : application.applicationStatus === "shortlisted"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {application.applicationStatus}
                  </span>
                </p>

                {/* Add buttons */}
                {application.applicationStatus === "pending" && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleUpdateStatus(application._id, "shortlisted")}
                      className="mr-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(application._id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applicants;
