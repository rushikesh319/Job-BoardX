import Application from "../models/job.application.model.js";
import Job from "../models/job.model.js";
 


export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    if (!jobId || !req.file) {
      return res.status(400).json({ message: "Job ID and resume are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = await Application.findOne({ jobId, userId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    const newApplication = await Application.create({
      jobId,
      userId,
      resume: `/uploads/${req.file.filename}`, //  this is now frontend-accessible
    });

    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error in applyToJob:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const getApplicationByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const jobs = await Application.find({ userId })
      .populate("jobId") 
      .sort({ createdAt: -1 });  


    res.json({jobs});
  } catch (error) {
    console.log("error in getApplicationByUser controller", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const getApplicationByRecruiter = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if the logged-in recruiter owns the job
    const job = await Job.findOne({ _id: jobId, postedBy: req.user._id });
    if (!job) {
      return res.status(403).json({ message: "Unauthorized access to this job" });
    }

    const applications = await Application.find({ jobId })
      .populate("userId", "-password")
      .populate("jobId");

    res.json({ applications });
  } catch (error) {
    console.error("Error in getApplicationsForJob:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


 

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body; // expected to be 'pending'  'shortlisted'  'rejected'

    const validStatuses = ['pending', 'shortlisted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.applicationStatus = status;
    await application.save();

    res.json({ message: "Application status updated", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
