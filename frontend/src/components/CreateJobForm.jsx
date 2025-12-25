
import  { useEffect } from "react";
import {motion} from 'framer-motion'

import {z} from 'zod'
import {
  Tag,
  Building,
  MapPin,
  FileText,
  Briefcase,
  Wallet,
  BadgeInfo,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useJobStore } from "../store/useJobStore";

const jobPostSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  companyName: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  
  jobType: z.enum(["full-time", "part-time", "contract", "internship"], {
    errorMap: () => ({ message: "Select a valid job type" }),
  }),
  
  salaryRange: z.number().positive("Salary must be a positive number"),

  experienceLevel: z.enum(["entry-level", "mid-level", "senior-level"], {
    errorMap: () => ({ message: "Select a valid experience level" }),
  }),

  skillsRequired: z
    .array(z.string().min(1))
    .min(1, "At least one skill is required"),

  isRemote: z.boolean(),

  description: z.string().min(10, "Job description must be at least 10 characters"),
});


function CreateJobForm({isEdit = false ,jobData ={} , onClose}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salaryRange: "",
    skillsRequired: "",
    companyName: "",
    experienceLevel: "",
    isRemote: false,
  });
  
  const [errors,setErrors] = useState({})


  useEffect(()=> {
    if(isEdit && jobData){
      setFormData(jobData);
    }
  },[isEdit ,jobData]);

  const { updateJob,createJob } = useJobStore();
  

  const handleFormSubmit = (e) => {
    e.preventDefault();

    
     
     const transformedData = {
  ...formData,
  salaryRange: Number(formData.salaryRange), // convert to number
  skillsRequired: Array.isArray(formData.skillsRequired)
  ? formData.skillsRequired
  : formData.skillsRequired
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0),

};
 
 

  const result = jobPostSchema.safeParse(transformedData)
     if(!result.success){
      const fieldError = result.error.flatten().fieldErrors;
      setErrors(fieldError)
      return;
     }
     setErrors({})

if (isEdit) {
  updateJob(formData._id, transformedData);
  onClose();
} else {
  createJob(transformedData);
}


      setFormData({
   title: "",
    description: "",
    location: "",
    jobType: "",
    salaryRange: "",
    skillsRequired: "",
    companyName: "",
    experienceLevel: "",
    isRemote: false,
});
  
  }
  return (
  <div className="flex flex-col md:flex-row h-full w-full">
  {/* Sidebar placeholder for spacing on desktop */}
  <div className="hidden md:block md:w-[30%]"></div>

  {/* Form container */}
  <div className="flex-1 flex justify-center items-center p-4 md:p-8 min-h-[calc(100vh-64px)]">
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-4 text-center md:text-left">
        {isEdit ? "Update Job" : "Create Job"}
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">

        {/* Job Title */}
        <div>
          <label className="text-sm md:text-md">Job Title :</label>
          <input
            type="text"
            className="border-2 border-blue-950 w-full rounded-md h-8 px-3 md:px-8"
            placeholder="Software Developer"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
        </div>

        {/* Company Name + Location */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <div className="w-full md:w-1/2">
            <label className="text-sm md:text-md">Company Name :</label>
            <input
              type="text"
              className="border-2 border-blue-950 w-full rounded-md h-8 px-3 md:px-8"
              placeholder="Google, Amazon"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName[0]}</p>}
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm md:text-md">Location :</label>
            <input
              type="text"
              className="border-2 border-blue-950 w-full rounded-md h-8 px-3 md:px-8"
              placeholder="Chicago, USA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location[0]}</p>}
          </div>
        </div>

        {/* Job Type + Salary */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <div className="w-full md:w-1/2">
            <label className="text-sm md:text-md">Job Type :</label>
            <select
              className="border-2 border-blue-950 w-full rounded-md h-8 px-3 md:px-8"
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              required
            >
              <option value="">Select role</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType[0]}</p>}
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm md:text-md">Salary :</label>
            <input
              type="number"
              className="border-2 border-blue-950 w-full rounded-md h-8 px-3 md:px-8"
              placeholder="12,000"
              value={formData.salaryRange}
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
              required
            />
            {errors.salaryRange && <p className="text-red-500 text-sm">{errors.salaryRange[0]}</p>}
          </div>
        </div>

        {/* Experience + Remote */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <div className="w-full md:w-4/5">
            <label className="text-sm md:text-md">Experience Level :</label>
            <select
              className="border-2 border-blue-950 w-full rounded-md h-8 px-3 md:px-8"
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              required
            >
              <option value="">Select level</option>
              <option value="entry-level">Entry-Level</option>
              <option value="mid-level">Mid-Level</option>
              <option value="senior-level">Senior-Level</option>
            </select>
            {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel[0]}</p>}
          </div>

          <div className="w-full md:w-1/5 flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isRemote}
              onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
              className="h-5 w-5"
            />
            <label className="text-sm md:text-md">Remote</label>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="text-sm md:text-md">Required Skills :</label>
          <input
            type="text"
            className="border-2 border-blue-950 w-full rounded-md h-8 px-3 md:px-8"
            placeholder="JavaScript, React"
            value={formData.skillsRequired}
            onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
            required
          />
          {errors.skillsRequired && <p className="text-red-500 text-sm">{errors.skillsRequired[0]}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm md:text-md">Description :</label>
          <textarea
            className="border-2 border-blue-950 w-full rounded-md px-3 md:px-8 py-2 md:py-3"
            rows="4"
            placeholder="Describe the job..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-cyan-500 w-full p-3 rounded-md text-md font-bold text-white hover:bg-sky-600 duration-300"
        >
          {isEdit ? "Update Job" : "Create Job"}
        </button>

      </form>
    </div>
  </div>
</div>


  );
}

export default CreateJobForm;
