import express from "express";
//import { uploadPdf } from "../middlewares/handlePdf";
import { getAllCandidateDetails , getResumesForSpecificJob,
 getResumesByLocation, deleteResumeById, filterResumesByExperience, filterApplicantsByJobId,
 getCandidatesByJobRole, getApplicationsByNationality } from "../controllers/candidates-controller";

const router = express.Router();
 
//router.post("/parse-candidates", uploadPdf.single("files"), parseCandidateResume);
router.get("/get-candidates", getAllCandidateDetails);
router.get("/job/:jobId/resumes", getResumesForSpecificJob);
router.get("/location/:location", getResumesByLocation);
router.delete("/:id", deleteResumeById);
router.get("/filter/experience", filterResumesByExperience);
router.get("/filter/job", filterApplicantsByJobId);
router.get("/nationality/:nationality", getApplicationsByNationality);
router.get("/job-role/:jobRole", getCandidatesByJobRole);


export default router;