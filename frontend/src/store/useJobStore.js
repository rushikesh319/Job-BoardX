import axios from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
export const useJobStore = create((set) => ({
  job: null,
  setJob: (job) => set({ job: job }),

  jobs:[],
    searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  setJobs: (jobs) => set({ jobs }),

  delete : () => set({job:null}),

  getAllJobs: async () => {
    try {
      const res = await axios.get("/job/jobs");
      set({ jobs: res.data.jobs });
    } catch (error) {
      toast.error(error.response?.data?.message || "an Error Occured");
    }
  },

  getJobById : async(id) => {
    try {
      const res = await axios.get(`/job/jobs/${id}`)
      set({job:res.data})
    } catch (error) {
      toast.error(error.response?.data?.message || "an Error Occured");
    }

  },

  getJobsByRecruiter : async() => {
    try {
       const res = await axios.get("/job/recruiter/jobs")
       set({jobs:res.data.jobs})
    } catch (error) {
      toast.error(error.response?.data?.message || "an Error Occured")
    }
  },

  createJob: async ({
    title,
    description,
    location,
    jobType,
    salaryRange,
    skillsRequired,
    companyName,
    experienceLevel,
    isRemote 
  }) => {
    try {
      const res = await axios.post(
        "/job/jobs",{
        title,
        description,
        location,
        jobType,
        salaryRange,
        skillsRequired,
        companyName,
        experienceLevel,
        isRemote }
      );
      set({ job: res.data.post });
      toast.success("Job Created Successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "an Error Occured");
    }
  },

  deleteJob : async (jobId) => {
    try {
      const res = await axios.delete(`/job/jobs/${jobId}`)
      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== jobId),
      }));
      toast.success("Job Deleted")

    } catch (error) {
      toast.error(error.response?.data?.message || "an Error Occured")
    }
  },

  updateJob: async (id, updatedJobData) => {
  try {
    const res = await axios.put(`/job/jobs/${id}`, updatedJobData);
    const updatedJob = res.data;

    set((state) => ({
      job: updatedJob,
      jobs: state.jobs.map((job) =>
        job._id === id ? updatedJob : job
      ),
    }));

    toast.success("Job Updated Successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "An Error Occurred");
  }
},
searchJobs: async (query) => {
    try {
      const response = await axios.get('/job/jobs/search', {
        params: { keyword: query },
      });
      set({ jobs: response.data });
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  },


}));
