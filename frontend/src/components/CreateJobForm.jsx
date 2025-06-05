
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
   <motion.div initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
   className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl p-4 gap-2 flex flex-col items-center"  >
  <h2 className="text-2xl font-bold text-gray-600">{isEdit ? "Update Job " : "Create Job"}</h2>
  <div className="p-4 rounded-2xl w-full">
    <form onSubmit={handleFormSubmit} className="space-y-4">
      
      {/* Title */}
      <div>
        <label className="text-md">Job Title :</label>
        <div className="mt-1 relative h-10 px-2 py-1">
          <div className="absolute pointer-events-none px-2 py-3">
            <Tag className="h-3 text-gray-800" />
          </div>
          <input
            type="text"
            className="border-2 border-blue-950 w-full rounded-md h-8 px-8"
            placeholder="Software Developer"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
        </div>
      </div>

      {/* Company Name + Location */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label className="text-md">Company Name :</label>
          <div className="mt-1 relative h-10 px-2 py-1">
            <div className="absolute pointer-events-none px-2 py-3">
              <Building className="h-3 text-gray-800" />
            </div>
            <input
              type="text"
              className="border-2 border-blue-950 w-full rounded-md h-8 px-8"
              placeholder="Google, Amazon"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
            {errors.companyName && <p className="text-red-500">{errors.companyName[0]}</p>}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <label className="text-md">Location :</label>
          <div className="mt-1 relative h-10 px-2 py-1">
            <div className="absolute pointer-events-none px-2 py-3">
              <MapPin className="h-3 text-gray-800" />
            </div>
            <input
              type="text"
              className="border-2 border-blue-950 w-full rounded-md h-8 px-8"
              placeholder="Chicago, USA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            {errors.location && <p className="text-red-500">{errors.location[0]}</p>}
          </div>
        </div>
      </div>

      {/* Job Type + Salary */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label className="text-md">Job Type :</label>
          <div className="mt-1 relative h-10 px-2 py-1">
            <div className="absolute pointer-events-none px-2 py-3">
              <Briefcase className="h-3 text-gray-800" />
            </div>
            <select
              className="border-2 border-blue-950 w-full rounded-md h-8 px-8"
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
            {errors.jobType && <p className="text-red-500">{errors.jobType[0]}</p>}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <label className="text-md">Salary :</label>
          <div className="mt-1 relative h-10 px-2 py-1">
            <div className="absolute pointer-events-none px-2 py-3">
              <Wallet className="h-3 text-gray-800" />
            </div>
            <input
              type="number"
              className="border-2 border-blue-950 w-full rounded-md h-8 px-8"
              placeholder="12,000"
              value={formData.salaryRange}
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
              required
            />
            {errors.salaryRange && <p className="text-red-500">{errors.salaryRange[0]}</p>}
          </div>
        </div>
      </div>

      {/* Experience + Remote */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[80%]">
          <label className="text-md">Experience Level :</label>
          <div className="mt-1 relative h-10 px-2 py-1">
            <div className="absolute pointer-events-none px-2 py-3">
              <BadgeInfo className="h-3 text-gray-800" />
            </div>
            <select
              className="border-2 border-blue-950 w-full rounded-md h-8 px-8"
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              required
            >
              <option value="">Select role</option>
              <option value="entry-level">Entry-Level</option>
              <option value="mid-level">Mid-Level</option>
              <option value="senior-level">Senior-Level</option>
            </select>
            {errors.experienceLevel && <p className="text-red-500">{errors.experienceLevel[0]}</p>}
          </div>
        </div>

        <div className="w-full md:w-[20%] flex flex-col justify-end">
          <label className="text-md">Remote :</label>
          <input
            type="checkbox"
            className="border-2 border-blue-950 h-8 mt-2"
            checked={formData.isRemote}
            onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
          />
          {errors.isRemote && <p className="text-red-500">{errors.isRemote[0]}</p>}
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="text-md">Required Skills :</label>
        <div className="mt-1 relative h-10 px-2 py-1">
          <div className="absolute pointer-events-none px-2 py-3">
            <Settings className="h-3 text-gray-800" />
          </div>
          <input
            type="text"
            className="border-2 border-blue-950 w-full rounded-md h-8 px-8"
            placeholder="JavaScript, React"
            value={formData.skillsRequired}
            onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
            required
          />
          {errors.skillsRequired && <p className="text-red-500">{errors.skillsRequired[0]}</p>}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-md">Description :</label>
        <div className="mt-1 relative h-auto px-2 py-1">
          <div className="absolute pointer-events-none px-2 py-3">
            <FileText className="h-5 text-gray-800" />
          </div>
          <textarea
            className="border-2 border-blue-950 w-full rounded-md pt-2 px-8"
            rows="4"
            placeholder="Describe the job..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          {errors.description && <p className="text-red-500">{errors.description[0]}</p>}
        </div>
      </div>

      {/* Buttons */}
      <button
        type="submit"
        className="bg-cyan-500 w-full p-3 mt-3 rounded-md text-md font-bold text-white hover:bg-sky-600 duration-300 cursor-pointer"
      >
        {isEdit ? "Update Job" : "Create Job"}
      </button>
      {isEdit && (
        <button type="button" onClick={onClose} className="ml-2 text-gray-700 cursor-pointer">
          Cancel
        </button>
      )}
    </form>
  </div>
</motion.div>

  );
}

export default CreateJobForm;
