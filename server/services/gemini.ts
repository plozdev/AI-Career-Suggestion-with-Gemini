import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    // Try to extract JSON from the response
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

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    // Try to extract JSON from the response
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
