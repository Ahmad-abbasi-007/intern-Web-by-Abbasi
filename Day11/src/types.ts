export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools/Other";
  level: number; // 0 to 100
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  techStack: string[];
  projectType: string; // e.g., 'Full Stack', 'Cloud Native', 'Mobile App', 'AI/Data Science'
  githubUrl: string;
  liveUrl: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string; // e.g., '2022 - Present'
  achievements: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface PortfolioData {
  fullName: string;
  title: string;
  bioHeader: string;
  bioDetailed: string;
  skills: Skill[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    location: string;
  };
}

export interface ThemeConfig {
  primaryColor: string; // Slate, Emerald, Violet, Orange, Amber, Cyan, Rose
  fontFamily: "Inter" | "Space Grotesk" | "Playfair Display" | "JetBrains Mono";
  visualStyle: "cyber" | "minimal" | "warm" | "dark-cosmic" | "swiss-modern";
}
