import { AcSubmissionNum, RecentSubmission } from "leetcode-query";

export interface Resume {
    education: Education[];
    experience: WorkExperience[];
    projects: Project[];
    skills: Skill[];
}

export interface Person {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github
}

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string; // Optional URL to the project if applicable
    completedDate: string; // Format as "YYYY-MM-DD"
}

export interface WorkExperience {
    id: string;
    companyName: string;
    jobTitle: string;
    location: string;
    startDate: string; // Format as "YYYY-MM-DD"
    endDate?: string; // Format as "YYYY-MM-DD", optional if current job
    description: string[];
    projects?: Project[]; // Optional array of projects if you list projects under work experience
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    startDate?: string;
    graduationDate: string;
    honors?: string[];
}

export interface Skill {
    id: string;
    skillName: string;
    href?: string;
}

export interface Certification {
    id: string;
    name: string;
    issuedBy: string;
    issueDate: string; // Format as "YYYY-MM-DD"
    expires?: string; // Format as "YYYY-MM-DD", optional if certification expires
}


export interface Stats {
  recentSubmissionList: RecentSubmission[] | null;
  submitStats: AcSubmissionNum[];
  ranking: number;
}