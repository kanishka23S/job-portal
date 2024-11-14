import express from "express";
import { createJob, deleteAllJobs, deleteJob, getAllJobs, getJobById, getJobStatuses, updateJobById } from "../controllers/job-controller";
//import { jobValidationSchema } from "../middlewares/validations";
// import{authenticateUser} from "../middlewares/authmiddleware";

const router = express.Router();

router.get("/job-statuses", getJobStatuses);
//router.get("/activejobs", getActiveJobs);
router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.delete("/:id", deleteJob);
router.delete("/", deleteAllJobs);
router.put("/:id",  updateJobById);

export default router;