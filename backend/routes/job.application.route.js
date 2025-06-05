import express from "express"
import { applyToJob, getApplicationByRecruiter, getApplicationByUser, updateApplicationStatus } from "../controllers/job.application.controller.js"
import { protectRoute, recruiterRoute } from "../middleware/auth.middleware.js"
import upload from "../middleware/upload.js";
 

const router = express.Router()

router.post('/apply', protectRoute, upload.single('resume'), applyToJob);
router.get("/myapplications",protectRoute, getApplicationByUser)
router.get("/recruiterapplicants/:jobId",protectRoute,recruiterRoute, getApplicationByRecruiter)
router.put('/applications/:applicationId/status', updateApplicationStatus);


export default router