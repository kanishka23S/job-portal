import { Request, Response, RequestHandler} from "express";
import FormData from "form-data";

import axios from "axios";
import { candidatesModel } from "../models/candidates-model";

export const parseCandidateResume = async (req: Request, res: Response) => {
    try {

        const files = req.file as Express.Multer.File;

        const formData = new FormData();

        formData.append('file', files.buffer, {
            filename: files.originalname,
            contentType: files.mimetype,
        });

        formData.append("jd", "About the job As a Frontend Engineer Intern specializing in Javascript(React/Ember), you will work closely with the engineering team to develop and maintain our products while contributing to the design, implementation, and maintenance of our web-based applications. You will be responsible for building scalable and efficient frontend systems, ensuring their reliability and performance. This internship offers an excellent opportunity to gain practical experience in frontend development while contributing to real-world projects.  Responsibilities  Collaborate with cross-functional teams to understand project requirements and deliver high-quality frontend solutions  Implement product features writing clean, robust, reusable code with tests  Develop responsive and user-friendly interfaces using HTML, CSS, and JavaScript frameworks  Bring new ideas and best practices to improve the team and quality of frontend features  Requirements  Currently pursuing a degree in Computer Science, Software Engineering, or a related field  Prior Internship Experience Showcasing Frontend Development Is Required  Solid understanding of HTML, CSS, and JavaScript is preferred  Understanding of frontend development concepts, building web applications with javascript frameworks like Ember.js or React.js  Solid understanding of software development principles with knowledge of building single-page web apps and a good understanding of best practices in frontend development  Ability to work effectively in a collaborative team environment  Good verbal and written communication skills and a willingness to learn  Passion to solve complex technical problems and troubleshoot issues  Internship Details  Full-time Paid Internship  Internship duration: 6 months  Mode of work: Work from office (Guindy, Chennai)  Full time opportunity will be available to interns with good performance");

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://intellirecruit.onrender.com/ATS_tracker/evaluate_resume',
            headers: { 
              ...formData.getHeaders()
            },
            data : formData
        };
          
        const parseToJson = await axios.request(config)

        const data = parseToJson.data.map((item: any) => ({
            candidateName: item["Candidate Name"],
            mailId: item["Mail ID"],
            phoneNumber: item["Phone Number"],
            address: item["Address"],
            jobRole: item["Job Role"],
            nationality: item["Nationality"],
            contractType: item["Contract Type"],
            education: item["Education"] ? item["Education"].map((edu: any) => ({
                degree: edu.degree,
                institution: edu.institution,
                duration: edu.duration
            })) : null,
            workExperience: item["Work Experience"] ? item["Work Experience"].map((exp: any) => ({
                company: exp.company,
                position: exp.position,
                duration: exp.duration,
                keyResponsibilities: exp.keyResponsibilities
            })) : null,
            atsScore: item["ATS Score"],
            missingKeywords: item["Missing Keywords"],
            profileSummary: item["Profile Summary"]
        }))


        await candidatesModel.create(data);
        
        return res.status(200).json(data);

    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

export const getAllCandidateDetails: Request = async (req, res) => {
    try {
        const candidates = await candidatesModel.find();
        return res.status(200).json(candidates);
    } catch (error) {
        console.error("Error fetching candidates:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// Get Resumes for a Specific Job
export const getResumesForSpecificJob = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;

        const resumes = await candidatesModel.find(
            { jobRole: jobId },
            { candidateName: 1, mailId: 1, phoneNumber: 1 }
        );

        return res.status(200).json(resumes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch resumes for specific job.' });
    }
};

// Get Resumes by Location
export const getResumesByLocation = async (req: Request, res: Response) => {
    try {
        const { location } = req.params;

        const resumes = await candidatesModel.find(
            { address: location },
            { candidateName: 1, mailId: 1, phoneNumber: 1, address: 1 }
        );

        return res.status(200).json(resumes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch resumes by location.' });
    }
};

// Delete Resume by ID
export const deleteResumeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedResume = await candidatesModel.findByIdAndDelete(id);

        if (!deletedResume) {
            return res.status(404).json({ error: 'Resume not found.' });
        }

        return res.status(200).json({ message: 'Resume deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete resume.' });
    }
};

// Filter Resumes by Experience Level
export const filterResumesByExperience = async (req: Request, res: Response) => {
    try {
        const { experienceLevel } = req.query;

        const resumes = await candidatesModel.find({
            'workExperience.duration': { $regex: experienceLevel, $options: "i" }
        });

        return res.status(200).json(resumes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to filter resumes by experience level.' });
    }
};

// Filter Applicants by Job ID
export const filterApplicantsByJobId = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.query;

        const applicants = await candidatesModel.find({ jobRole: jobId });

        return res.status(200).json(applicants);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to filter applicants by job ID.' });
    }
};

//  Get Applications by Nationality
export const getApplicationsByNationality = async (req: Request, res: Response) => {
    try {
        const { nationality } = req.params;

        const applications = await candidatesModel.find({ nationality });

        return res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch applications by nationality.' });
    }
};

// Get Candidates by Job Role
export const getCandidatesByJobRole = async (req: Request, res: Response) => {
    try {
        const { jobRole } = req.params;

        const candidates = await candidatesModel.find({ jobRole });

        return res.status(200).json(candidates);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch candidates by job role.' });
    }
};