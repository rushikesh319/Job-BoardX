import axios from "../lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useJobApplicationStore = create((set,get) => ({
  jobs: [],
  applicants : [],
  setJobs: (jobs) => set({ jobs }),

    //  keep track of currentJobId when fetching applicants:
  currentJobId: null,
  setCurrentJobId: (jobId) => set({ currentJobId: jobId }),

  getApplicationsByUser: async () => {
    try {
      const res = await axios.get(`/applications/myapplications`);
      set({ jobs: res.data.jobs}); // Make sure your API sends jobs array in data
    } catch (error) {
      toast.error(error.response?.data?.message || "An Error Occurred");
    }
  },

applyToJob: async (formData) => {
  try {
    const res = await axios.post('/applications/apply', formData);
    const newApplication = res.data.application; // or adjust based on your API response
    set((state) => ({ jobs: [newApplication, ...state.jobs] }));
    toast.success("Application submitted successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
  }
},

  
  
  getApplicationsByRecruiter: async (jobId) => {
    try {
      const res = await axios.get(`/applications/recruiterapplicants/${jobId}`);
      set({ applicants: res.data.applications }); // or `applications` if you're storing them separately
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch recruiter applications");
  
    }
  },
  
   updateApplicationStatus: async (applicationId, status) => {
    try {
      await axios.put(`/applications/applications/${applicationId}/status`,{ status });
      // After update, refresh the applicants list
      const jobId = get().currentJobId; // or pass jobId as param if you have it stored
      if (jobId) {
        get().getApplicationsByRecruiter(jobId);
      }
    } catch (error) {
      console.error("Error updating application status", error);
    }
  },

 
  
}));
