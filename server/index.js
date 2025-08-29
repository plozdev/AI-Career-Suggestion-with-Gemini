// index.ts
import express2 from "express";

// routes.ts
import { createServer } from "http";
import { z as z2 } from "zod";

// ../shared/schema.ts
import { z } from "zod";
var careerAssessmentSchema = z.object({
  major: z.string().min(1, "Major is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required").max(3, "Maximum 3 skills allowed"),
  workEnvironment: z.string().min(1, "Work environment preference is required"),
  motivation: z.string().min(1, "Career motivation is required"),
  coreInterest: z.string().min(1, "Core interest is required"),
  problemSolving: z.string().min(1, "Problem solving preference is required"),
  personality: z.string().min(1, "Personality type is required")
});
var careerAdviceSchema = z.object({
  careerPath: z.string(),
  reasons: z.array(z.string()),
  suggestedProject: z.string()
});
var marketAnalysisSchema = z.object({
  growthPotential: z.string(),
  requiredSkills: z.array(z.string()),
  salaryRange: z.object({
    junior: z.string(),
    midLevel: z.string(),
    senior: z.string(),
    techLead: z.string()
  }),
  topCompanies: z.array(z.string())
});

// services/gemini.ts
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
var ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
async function getCareerAdvice(major, skills, workEnvironment, motivation, coreInterest, problemSolving, personality) {
  try {
    const prompt = `You are an AI career advisor. Based on the comprehensive profile below, suggest a suitable career path:

    STUDENT PROFILE:
    - Major: ${major}
    - Top Skills: ${skills.join(", ")}
    - Preferred Work Environment: ${workEnvironment}
    - Career Motivation: ${motivation} 
    - Core Interest: ${coreInterest}
    - Problem-Solving Style: ${problemSolving}
    - Personality Type: ${personality}

    Please provide:
    1. A specific career path recommendation that aligns with their profile
    2. 2-3 compelling reasons why this career fits them perfectly
    3. A practical personal project they can start to develop relevant skills

    Answer in a concise, friendly, encouraging tone using English.

    Please respond in JSON format with the following structure:
    {
      "careerPath": "specific career title",
      "reasons": ["reason 1", "reason 2", "reason 3"],
      "suggestedProject": "detailed project description with actionable steps"
    }`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error getting career advice:", error);
    throw new Error(`Failed to get career advice: ${error}`);
  }
}
async function getMarketAnalysis(careerPath) {
  try {
    const prompt = `You are a labor market analyst. Analyze the current job market for the position '${careerPath}'. Provide insights on: 1) The growth potential of this field in Vietnam. 2) Key required skills. 3) Average salary range for new graduates. 4) Top companies in this field. Answer in a clear, professional tone and use English.

    Please respond in JSON format with the following structure:
    {
      "growthPotential": "detailed growth analysis",
      "requiredSkills": ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5"],
      "salaryRange": {
        "junior": "salary range for junior level",
        "midLevel": "salary range for mid level",
        "senior": "salary range for senior level", 
        "techLead": "salary range for tech lead level"
      },
      "topCompanies": ["company 1", "company 2", "company 3", "company 4"]
    }`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error getting market analysis:", error);
    throw new Error(`Failed to get market analysis: ${error}`);
  }
}

// routes.ts
async function registerRoutes(app2) {
  app2.post("/api/career-advice", async (req, res) => {
    try {
      const { major, skills, workEnvironment, motivation, coreInterest, problemSolving, personality } = careerAssessmentSchema.parse(req.body);
      const advice = await getCareerAdvice(major, skills, workEnvironment, motivation, coreInterest, problemSolving, personality);
      res.json(advice);
    } catch (error) {
      console.error("Error in career advice endpoint:", error);
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          message: "Invalid input data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: error instanceof Error ? error.message : "Failed to generate career advice"
        });
      }
    }
  });
  app2.post("/api/market-analysis", async (req, res) => {
    try {
      const { careerPath } = z2.object({
        careerPath: z2.string().min(1, "Career path is required")
      }).parse(req.body);
      const analysis = await getMarketAnalysis(careerPath);
      res.json(analysis);
    } catch (error) {
      console.error("Error in market analysis endpoint:", error);
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          message: "Invalid input data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: error instanceof Error ? error.message : "Failed to generate market analysis"
        });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// ../vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  base: "/AI-Career-Suggestion-with-Gemini/",
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
});

// vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// index.ts
import dotenv2 from "dotenv";
import cors from "cors";
dotenv2.config();
var app = express2();
var port = process.env.PORT || 8080;
var corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://plozdev.github.io"
    // GitHub Pages domain
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    service: "Career Compass API"
  });
});
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
