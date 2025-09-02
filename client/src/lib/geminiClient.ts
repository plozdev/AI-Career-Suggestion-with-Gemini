import { GoogleGenerativeAI } from "@google/generative-ai";

// Sử dụng API key từ environment
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyD4iwSXR0rmjhebyAaQqHPIrY3cs8HD--A";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getCareerAdviceFromGemini(data: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI career advisor. Based on the comprehensive profile below, suggest EXACTLY 4 career paths that best match this person:

    STUDENT PROFILE:
    - Major: ${data.major}
    - Top Skills: ${data.skills.join(", ")}
    - Preferred Work Environment: ${data.workEnvironment}
    - Career Motivation: ${data.motivation} 
    - Core Interest: ${data.coreInterest}
    - Problem-Solving Style: ${data.problemSolving}
    - Personality Type: ${data.personality}

    IMPORTANT: You must provide EXACTLY 4 career recommendations ranked from best to good fit.

    For each career path, provide:
    1. A specific career title that aligns with their profile
    2. Compelling reasons why this career fits them
    3. Required skills to succeed in this field
    4. Practical next steps to pursue this career
    5. Career outlook and growth potential

    Answer in a concise, friendly, encouraging tone using English.

    Please respond in JSON format with the following structure:
    {
      "careerPaths": [
        {
          "title": "Best Match Career Title",
          "description": "detailed explanation of why this career perfectly fits the person based on their profile",
          "requiredSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
          "nextSteps": ["actionable step1", "actionable step2", "actionable step3"],
          "outlook": "comprehensive career outlook, growth potential, and market demand"
        },
        {
          "title": "Second Choice Career Title",
          "description": "detailed explanation of why this career is a good fit for the person",
          "requiredSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
          "nextSteps": ["actionable step1", "actionable step2", "actionable step3"],
          "outlook": "comprehensive career outlook, growth potential, and market demand"
        },
        {
          "title": "Third Option Career Title",
          "description": "detailed explanation of why this career could work for the person",
          "requiredSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
          "nextSteps": ["actionable step1", "actionable step2", "actionable step3"],
          "outlook": "comprehensive career outlook, growth potential, and market demand"
        },
        {
          "title": "Fourth Choice Career Title",
          "description": "detailed explanation of why this career is a good fit for the person",
          "requiredSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
          "nextSteps": ["actionable step1", "actionable step2", "actionable step3"],
          "outlook": "comprehensive career outlook, growth potential, and market demand"
        }
      ],
      "generalAdvice": "overall career advice, development tips, and encouragement tailored to their profile"
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
