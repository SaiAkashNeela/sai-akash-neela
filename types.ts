export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  x: string;
  medium: string;
  resume: string;
  location?: string;
}

export interface Job {
  company: string;
  role: string;
  description: string;
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  status: string;
  tech: string[];
  icon: string; // Can be a Lucide icon name OR a URL to an image/favicon
  link?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface BlogPost {
  title: string;
  date: string;
  content: string; // Supports basic HTML or newlines
  image?: string;
  externalLink?: {
    text: string;
    url: string;
  };
}

export interface Contribution {
  date: string;
  count: number;
}

export interface ResumeData {
  name: string;
  fullName: string;
  title: string;
  contact: ContactInfo;
  summary: string;
  experience: Job[];
  skills: Record<string, string[]>;
  indieKit: string[];
  projects: Project[];
  education: EducationItem[];
  certifications: Certification[];
  publications: { title: string; source: string; id: string }[];
  blogPosts: BlogPost[];
  gitHistory: Contribution[];
}