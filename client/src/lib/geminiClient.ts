import { GoogleGenerativeAI } from "@google/generative-ai";

// Sử dụng API key từ environment
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyD4iwSXR0rmjhebyAaQqHPIrY3cs8HD--A";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getCareerAdviceFromGemini(data: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI career advisor. Based on the comprehensive profile below, suggest a suitable career path:

    STUDENT PROFILE:
    - Major: ${data.major}
    - Top Skills: ${data.skills.join(", ")}
    - Preferred Work Environment: ${data.workEnvironment}
    - Career Motivation: ${data.motivation} 
    - Core Interest: ${data.coreInterest}
    - Problem-Solving Style: ${data.problemSolving}
    - Personality Type: ${data.personality}

    Please provide:
    1. A specific career path recommendation that aligns with their profile
    2. 2-3 compelling reasons why this career fits them perfectly
    3. A practical personal project they can start to develop relevant skills

    Answer in a concise, friendly, encouraging tone using English.

    Please respond in JSON format with the following structure:
    {
      "careerPaths": [
        {
          "title": "specific career title",
          "description": "why this career fits the person",
          "requiredSkills": ["skill1", "skill2", "skill3", "skill4"],
          "nextSteps": ["step1", "step2", "step3"],
          "outlook": "career outlook and growth potential"
        }
      ],
      "generalAdvice": "overall advice and encouragement",
      "suggestedProject": "detailed project description with actionable steps"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response:', text);

    // Tìm JSON trong response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

export async function getMarketAnalysisFromGemini(careerPath: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Market analysis error:', error);
    throw error;
  }
}
