import express from "express"
import { createJob, deleteJob, getAllJobs, getJobById, getJobsByRecruiter, searchJobs, updateJob } from "../controllers/job.controller.js"
import { protectRoute, recruiterRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/jobs',protectRoute ,recruiterRoute,createJob)
router.get("/jobs/search", searchJobs);
router.get("/jobs",getAllJobs)
router.get("/jobs/:id",getJobById)
router.get("/recruiter/jobs",protectRoute,recruiterRoute,getJobsByRecruiter)
router.put("/jobs/:id",protectRoute,recruiterRoute,updateJob)
router.delete("/jobs/:id",protectRoute,recruiterRoute,deleteJob)
 


export default router 