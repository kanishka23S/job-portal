import mongoose, { model } from "mongoose";

export type JobType = {
    title: string;
    description: string;
    requirements: string[];
    location: string;
    salaryRange: string;
    domain: string;
    experience: string;
    status: string;
};

const allowedStatuses = ["Open", "Closed", "Filled", "On Hold", "Cancelled", "Reopened", "Pending Approval"];

const JobSchema = new mongoose.Schema<JobType>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        requirements: {
            type: [String],
            required: [true, "At least one requirement is required"],
            validate: {
                validator: function (value: string[]) {
                    return value.length > 0; // Must have at least one requirement
                },
                message: "There must be at least one requirement",
            },
        },
        location: { type: String, required: true },
        salaryRange: { type: String, required: true },
        domain: { type: String, required: true },
        experience: { type: String, required: true },
        status: { 
            type: String, 
            enum: allowedStatuses, 
            required: true,
            default: "Pending Approval" 
        },
    },
    { timestamps: true }
);

export const jobModel = model<JobType>("jobs", JobSchema);
