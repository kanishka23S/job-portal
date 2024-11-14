import { Request, Response } from "express"
import { JobType, jobModel } from "../models/job-model";

const allowedStatuses = ["Open", "Closed", "Filled", "On Hold", "Cancelled", "Reopened", "Pending Approval"];

export const createJob = async (req: Request, res: Response):Promise <Response> => {
    try {
        const { title, description, location, requirements, salaryRange, experience, domain, status } = req.body as JobType;

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid job status. Allowed statuses are: " + allowedStatuses.join(", ") });
        }

        const job = new jobModel({
            title,
            description,
            location,
            requirements,
            salaryRange,
            experience,
            domain,
            status 
        });

        await job.save();
        return res.status(201).json({ message: "Job created successfully" });
    } catch (error: any) {
        
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getJobStatuses = (req: Request, res: Response) => {
    const allowedStatuses = ["Open", "Closed", "Filled", "On Hold", "Cancelled", "Reopened", "Pending Approval"];
    res.status(200).json({ statuses: allowedStatuses });
};


export const getAllJobs = async (req: Request, res: Response) => {
    try {
        
        
        const jobs = await jobModel.find();
        
       
        return res.status(200).send(jobs);
    } catch (error: any) {
       
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getJobById = async (req: Request, res: Response) => {
    try {
        const jobId = req.params.id.trim();
       

        const job = await jobModel.findOne({ _id: jobId });

        if (!job) {
            
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).send(job);
    } catch (error: any) {
        
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const jobId = req.params.id;
        

        const result = await jobModel.deleteOne({ _id: jobId });

        if (result.deletedCount === 0) {
           
            return res.status(404).json({ message: "Job not found" });
        }

        
        return res.status(200).send({ message: "Job deletion successful" });
    } catch (error: any) {
        
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteAllJobs = async (_req: Request, res: Response) => {
    try {
      

        const result = await jobModel.deleteMany({});
        
        return res.status(200).send({ message: "All job deletions successful" });
    } catch (error: any) {
    
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateJobById = async (req: Request, res: Response) => {
    try {
        const jobId = req.params.id.trim();
       ;

        const job = await jobModel.findById(jobId);

        if (!job) {
           
            return res.status(404).json({ message: "Job not found" });
        }

        await jobModel.findByIdAndUpdate(jobId, req.body, { new: true });
       

        return res.status(200).json({ message: "Job updated successfully" });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};