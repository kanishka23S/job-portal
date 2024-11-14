import mongoose from "mongoose";

export interface Candidates {
  candidateName: string
  mailId: string
  phoneNumber: string
  address: string
  jobRole: string
  nationality: string
  contractType: string
  education: Education[]
  workExperience: WorkExperience[]
  atsScore: string
  missingKeywords: any[]
  profileSummary: string
}

export interface Education {
  degree: string
  institution: string
  duration: string
}

export interface WorkExperience {
  company: string
  position: string
  duration: string
  keyResponsibilities: string[]
}

// schema

const Schema = mongoose.Schema;

// Education schema
const EducationSchema = new Schema({
  degree: {
      type: String,
  },
  institution: {
      type: String,
  },
  duration: {
      type: String,
  }
});

// WorkExperience schema
const WorkExperienceSchema = new Schema({
  company: {
      type: String,
  },
  position: {
      type: String,
  },
  duration: {
      type: String,
  },
  keyResponsibilities: {
      type: [String],  // Array of strings
  }
});

// Candidates schema
const candidateSchema = new Schema({
  candidateName: {
      type: String,
  },
  mailId: {
      type: String,
  },
  phoneNumber: {
      type: String,
  },
  address: {
      type: String,
  },
  jobRole: {
      type: String,
  },
  nationality: {
      type: String,
  },
  contractType: {
  },
  education: {
      type: [EducationSchema],  // Array of Education
  },
  workExperience: {
      type: [WorkExperienceSchema],  // Array of WorkExperience
  },
  atsScore: {
      type: String,
  },
  missingKeywords: {
      type: [String],  // Array of strings
  },
  profileSummary: {
      type: String,
  }
});

export const candidatesModel = mongoose.model<Candidates>('candidates', candidateSchema);