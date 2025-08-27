import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "" 
});

export async function getCareerAdvice(major: string, skills: string[], workEnvironment: string, motivation: string, coreInterest: string, problemSolving: string, personality: string): Promise<any> {
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
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            careerPath: { type: "string" },
            reasons: {
              type: "array",
              items: { type: "string" }
            },
            suggestedProject: { type: "string" }
          },
          required: ["careerPath", "reasons", "suggestedProject"]
        }
      },
      contents: prompt,
    });

    const result = response.text;
    if (!result) {
      throw new Error("Empty response from Gemini API");
    }

    return JSON.parse(result);
  } catch (error) {
    console.error("Error getting career advice:", error);
    throw new Error(`Failed to get career advice: ${error}`);
  }
}

export async function getMarketAnalysis(careerPath: string): Promise<any> {
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
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            growthPotential: { type: "string" },
            requiredSkills: {
              type: "array",
              items: { type: "string" }
            },
            salaryRange: {
              type: "object",
              properties: {
                junior: { type: "string" },
                midLevel: { type: "string" },
                senior: { type: "string" },
                techLead: { type: "string" }
              },
              required: ["junior", "midLevel", "senior", "techLead"]
            },
            topCompanies: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["growthPotential", "requiredSkills", "salaryRange", "topCompanies"]
        }
      },
      contents: prompt,
    });

    const result = response.text;
    if (!result) {
      throw new Error("Empty response from Gemini API");
    }

    return JSON.parse(result);
  } catch (error) {
    console.error("Error getting market analysis:", error);
    throw new Error(`Failed to get market analysis: ${error}`);
  }
}
