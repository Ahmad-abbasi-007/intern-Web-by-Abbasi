import { PortfolioData } from "./types";

export const defaultPortfolioData: PortfolioData = {
  fullName: "Ahmad Raza",
  title: "Full-Stack Software Engineer",
  bioHeader: "COMSATS Finalist | Building modern web architectures, fluent layout systems, and secure full-stack components.",
  bioDetailed: "I am a dedicated software builder and final semester Computer Science student at COMSATS. I am passionate about crafting optimal user experiences, efficient full-stack logic, and modular, bulletproof frontend systems.\n\nThrough my professional software engineering internship at Fentix Tech, I've gained hands-on experience designing reactive interfaces in React, implementing robust backend REST APIs, and styling pixel-perfect websites. My focus is on writing neat, type-safe code that delivers fast load times and clean system architectures.",
  skills: [
    { name: "TypeScript / JavaScript", category: "Frontend", level: 92 },
    { name: "React (Vite / NextJS)", category: "Frontend", level: 90 },
    { name: "Tailwind CSS & Bootstrap", category: "Frontend", level: 94 },
    { name: "HTML5 & CSS3 Layouts", category: "Frontend", level: 95 },
    { name: "Node.js (Express)", category: "Backend", level: 85 },
    { name: "MongoDB & PostgreSQL", category: "Backend", level: 82 },
    { name: "RESTful API Integration", category: "Backend", level: 88 },
    { name: "Git & Collaborative Workflows", category: "Tools/Other", level: 90 },
    { name: "Docker & Webpack", category: "Tools/Other", level: 78 }
  ],
  projects: [
    {
      id: "project-1",
      title: "Fentix Portal: Client Interface Node",
      shortDescription: "A highly responsive layout module designed to manage enterprise tasks and telemetry feedback systems.",
      detailedDescription: "Spearheaded frontend performance optimizations for the Fentix agency client portal relative to component asset lifecycle hooks. Implemented dynamic grid filtering, asynchronous forms with instant validation, and customized dark theme toggles which boosted user experience parameters.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Bootstrap", "REST API"],
      projectType: "Frontend / Agency",
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com"
    },
    {
      id: "project-2",
      title: "COMSATS Portal Organiser Hub",
      shortDescription: "A smart, browser-based student scheduler, GPA forecaster, and unified portal helper with local synchronization.",
      detailedDescription: "Designed and built an modular dashboard helper tool tailored for the academic workflows at COMSATS. Features intuitive semester course tracks, responsive timetables, instant grade-point average estimators, and a persistent notes tracker that works fully offline.",
      techStack: ["React", "CSS Grid", "localStorage", "lucide-react"],
      projectType: "Full Stack / Academic",
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com"
    },
    {
      id: "project-3",
      title: "SyncFlow: Multi-Tenant Team Workspace",
      shortDescription: "An interactive, socket-driven collaboration board allowing concurrent sticky tags and agile column lanes.",
      detailedDescription: "Developed the state engine and visual updates for a real-time scrum collaboration board. Designed the custom database schemas and Express controller routes to securely authenticate and persist user workspaces with zero downtime.",
      techStack: ["Node.js", "Express", "MongoDB", "React", "Tailwind"],
      projectType: "Full Stack",
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com"
    }
  ],
  experience: [
    {
      role: "Software Development Intern",
      company: "Fentix Tech",
      period: "2025 - Present",
      achievements: [
        "Crafted robust components rendering seamless dashboard views and integrated secure asynchronous form fields with the central API.",
        "Contributed actively with senior engineers to refactor critical product assets, saving 22% in initial webpage payload sizes and loading speeds."
      ]
    },
    {
      role: "Class Academic Project Lead",
      company: "COMSATS University Islamabad",
      period: "2022 - 2026",
      achievements: [
        "Guided a team of 4 peers to design and code production-grade software prototypes supporting university curriculum deadlines.",
        "Authored database design diagrams, architectural documentation, and API integration paths for final term deliverables, achieving A-grade evaluations."
      ]
    }
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      institution: "COMSATS University Islamabad",
      period: "2022 - 2026 (Final Semester)"
    }
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "ar3359499@gmail.com",
    location: "Pakistan"
  }
};
