import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      jobType,
      salaryRange,
      skillsRequired,
      companyName,
      experienceLevel,
      isRemote,
    } = req.body;
    
    if (
      !title ||
      !description ||
      !location ||
      !jobType ||
      !salaryRange ||
      !skillsRequired ||
      !companyName ||
      !experienceLevel ||
      typeof isRemote !== "boolean"
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }

    const post = await Job.create({
      title,
      description,
      location,
      jobType,
      salaryRange,
      skillsRequired,
      companyName,
      experienceLevel,
      isRemote,
      postedBy: req.user._id, // 👈 track who posted it
    });

    res.status(201).json({ post });
  } catch (error) {
    console.log("Error in createPost Controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


export const getAllJobs = async(req,res) => {
  try {
    const jobs = await Job.find({})
    res.json({jobs})
  } catch (error) {
    console.log("error in getAllJobs controller",error.message)
    res.status(500).json({message:"internal server error",error:error.message})
  }
}

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.log("Error in getJobById controller:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getJobsByRecruiter = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    if (!recruiterId) {
      return res.status(400).json({ message: "No ID provided" });
    }

    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied: Not a recruiter" });
    }

    const jobs = await Job.find({ postedBy: recruiterId });

    res.json({ jobs });
  } catch (error) {
    console.log("error in getJobsByRecruiter controller", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true, // returns updated doc
      runValidators: true, // to validate inputs
    });

    res.json(updatedJob);

  } catch (error) {
    console.log("Error in updateJob controller", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const deleteJob = async(req,res)=> {
  try {
    const {id} = req.params;
    const job = await Job.findById(id)
    if(job.postedBy.toString() !== req.user._id.toString()){
      return res.status(403).json({ message: "You are not authorized to update this job" });
    }
    await Job.findByIdAndDelete(id)
    res.json({message:"job deleted successfully"})
  } catch (error) {
    console.log("Error in delete controller", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
    
  }
}





export const searchJobs = async(req,res)=> {
  try {
    
    const {keyword,location,jobType,isRemote,companyName,experienceLevel,salaryRange} = req.query
    let filter = {}

    if(keyword){
      filter.$or = [
        {title : {$regex : keyword , $options : "i" }},
        {description : {$regex : keyword , $options : "i" }},
        { skillsRequired: { $regex: keyword, $options: "i" } }
      ]
    }

    if(location) {
      filter.location =  { $regex: location, $options: "i" };
    }

    if(jobType){
      filter.jobType =  { $regex: jobType, $options: "i" }
    }
    
    if(salaryRange){
       const [min,max] = salaryRange.split('-').map(Number)
       if(!isNaN(min) && !isNaN(max)) {
         filter.salaryRange = {$gte : min , $lte : max }
       }
    }

    if(companyName){
      filter.companyName = { $regex: companyName, $options: "i" }
    }
    if(experienceLevel){
      filter.experienceLevel =  { $regex: experienceLevel, $options: "i" };

    }
    
    if(isRemote){
      filter.isRemote = isRemote === "true"
    }
    
    const jobs = await Job.find(filter);
    res.json(jobs);

  } catch (error) {
    console.log("error in searchjob controller",error.message)
    res.status(500).json({message:"Internal Server Error",error:error.message})
  }
}