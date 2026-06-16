import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Content Generation for Portfolio
  app.post("/api/generate-portfolio-ai", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in your secrets. Please add it via the Settings > Secrets configuration panel." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are an expert tech recruiter and elite portfolio writer. 
Generate a professional, compelling, and fully fleshed-out human-looking portfolio profile based on the user's brief input.
Return a structured JSON output with appropriate fields. Make the projects, experience bullet points, and details sound authentic, highly modern, and impressive. Do not use generic, lazy placeholder lines like 'Lorem ipsum' or 'Briefly describe your project'. All bullets, descriptions, and achievements must be fully drafted and extremely realistic.`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          fullName: { type: Type.STRING, description: "Professional full name, e.g., Alexander Mercer" },
          title: { type: Type.STRING, description: "A catchy professional headline, e.g., Senior Full-Stack Engineer" },
          bioHeader: { type: Type.STRING, description: "A high-impact 1-sentence introduction hook" },
          bioDetailed: { type: Type.STRING, description: "A detailed 2-paragraph professional bio outlining passion, expertise, and background" },
          skills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Skill name, e.g., TypeScript, Node.js, AWS Cloud, Docker" },
                category: { type: Type.STRING, description: "Must be exactly one of: Frontend, Backend, Tools/Other" },
                level: { type: Type.INTEGER, description: "Proficiency percentage from 65 to 100" }
              },
              required: ["name", "category", "level"]
            },
            description: "A list of 6-10 major technical skills with a balanced mix of Frontend, Backend, and Tools/Other"
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "Shorthand lowercase id, e.g., project-1, project-2" },
                title: { type: Type.STRING, description: "Impressive project title" },
                shortDescription: { type: Type.STRING, description: "1-sentence descriptive snippet" },
                detailedDescription: { type: Type.STRING, description: "3-sentence detailed description of problem solved, engineering challenges, and technical stack" },
                techStack: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "List of 3-5 tech keywords"
                },
                projectType: { type: Type.STRING, description: "A general category like 'Full Stack', 'Cloud Native Architecture', 'Systems/API', 'AI/Data Model'" },
                githubUrl: { type: Type.STRING, description: "Simulated GitHub repository link" },
                liveUrl: { type: Type.STRING, description: "Simulated live deployment link" }
              },
              required: ["id", "title", "shortDescription", "detailedDescription", "techStack", "projectType", "githubUrl", "liveUrl"]
            },
            description: "A list of exactly 4 major projects"
          },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING, description: "Role e.g., Senior Software Developer" },
                company: { type: Type.STRING, description: "Company Name e.g., NovaTech Solutions" },
                period: { type: Type.STRING, description: "Period e.g., 2024 - Present" },
                achievements: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "2-3 high-impact professional metrics-driven bullet points of achievements"
                }
              },
              required: ["role", "company", "period", "achievements"]
            },
            description: "List of 2-3 previous software developer roles"
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                degree: { type: Type.STRING, description: "Degree e.g., B.S. Science in Computer Engineering" },
                institution: { type: Type.STRING, description: "Institution e.g., University of California" },
                period: { type: Type.STRING, description: "Period of study e.g., 2020 - 2024" }
              },
              required: ["degree", "institution", "period"]
            },
            description: "List of 1-2 degrees or educations"
          }
        },
        required: ["fullName", "title", "bioHeader", "bioDetailed", "skills", "projects", "experience", "education"]
      };

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Create structured professional portfolio details based on this input message: "${prompt}". Ensure that all fields are fully written with high quality descriptions. No shorthand ellipses or summaries.`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema
        }
      });

      const responseText = result.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }

      const parsedData = JSON.parse(responseText);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI portfolio content" });
    }
  });

  // API Route: AI Contact auto-reply generator
  app.post("/api/contact-reply", async (req, res) => {
    try {
      const { senderName, senderEmail, senderMessage, portfolioOwnerName, portfolioOwnerTitle } = req.body;
      if (!senderName || !senderMessage) {
        return res.status(400).json({ error: "Name and Message are required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: `Hi ${senderName},\n\nThank you for reaching out! I've received your message regarding details like: "${senderMessage.substring(0, 50)}...".\n\nI am currently operating in offline-preview mode, but I would love to connect with you regarding opportunities. I have saved your inquiry and will respond as soon as possible.\n\nBest regards,\n${portfolioOwnerName || "Developer"}`
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Write a professional, warm, and highly personalized auto-reply email from a Software Developer named "${portfolioOwnerName || "John Doe"}" (${portfolioOwnerTitle || "Developer"}) to an inquirer named "${senderName}" (${senderEmail || "No Email"}), who sent this message: "${senderMessage}". Keep it brief (under 150 words), and make it sound authentic and interested. Do not include template placeholders or bracketed text.`;

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional software engineer answering personal website contact requests. Write in the first person. Be warm, professional, authentic, and direct. Do not write a subject line - only write the email body itself.",
          temperature: 0.8
        }
      });

      res.json({ reply: result.text || "Thank you for reaching out!" });
    } catch (error: any) {
      console.error("Gemini API Error during auto-reply:", error);
      res.status(500).json({ error: error.message || "Failed to generate reply" });
    }
  });

  // Serve static assets in production or integrate Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
