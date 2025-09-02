import { QueryClient } from "@tanstack/react-query";
import { getCareerAdviceFromGemini, getMarketAnalysisFromGemini } from "./geminiClient";

// Enhanced mock career advice generator - giống production format
function generateEnhancedMockCareerAdvice(data: any) {
  const careerPathMappings = {
    "Information Technology": {
      path: "Full-Stack Software Developer",
      reasons: [
        "Your technical background in Information Technology provides the perfect foundation for understanding both frontend and backend development",
        "Your problem-solving skills and analytical thinking are essential for debugging complex software issues and designing efficient solutions",
        "The growing demand for digital transformation makes full-stack developers highly sought after in Vietnam's tech industry"
      ],
      project: "Build a complete e-commerce web application with user authentication, product catalog, shopping cart, and payment integration. Use React for the frontend, Node.js/Express for the backend, and MongoDB for the database. Deploy it on cloud platforms like Vercel or Heroku to demonstrate your full-stack capabilities to potential employers."
    },
    "Business Administration": {
      path: "Digital Business Analyst",
      reasons: [
        "Your business administration background gives you deep understanding of organizational processes and strategic thinking",
        "Your analytical and planning skills are crucial for identifying business requirements and translating them into technical solutions",
        "The intersection of business and technology is where most high-impact decisions are made in modern companies"
      ],
      project: "Create a comprehensive business analysis project for a local Vietnamese company. Include market research, competitor analysis, process improvement recommendations, and ROI calculations. Present your findings in a professional dashboard using tools like Power BI or Tableau."
    },
    "Marketing": {
      path: "Growth Marketing Specialist",
      reasons: [
        "Your marketing knowledge combined with data analytics creates powerful growth opportunities for businesses",
        "Digital marketing skills are increasingly valuable as companies shift to online-first strategies",
        "Your creativity and understanding of consumer behavior are essential for developing compelling marketing campaigns"
      ],
      project: "Launch a complete digital marketing campaign for a fictitious product or service. Include market research, target audience analysis, content strategy, social media campaigns, and performance metrics tracking. Document your results and insights in a professional case study."
    },
    "Graphic Design": {
      path: "UX/UI Designer",
      reasons: [
        "Your design background provides the visual skills needed to create beautiful and intuitive user interfaces",
        "Your understanding of user psychology and visual hierarchy is crucial for creating effective user experiences",
        "The demand for digital products continues to grow, making UX/UI design a stable and well-compensated career path"
      ],
      project: "Design and prototype a complete mobile app from concept to final design. Include user research, wireframes, visual design, and interactive prototypes using Figma. Focus on solving a real problem for Vietnamese users and document your design process thoroughly."
    }
  };

  const defaultMapping = {
    path: "Technology Consultant",
    reasons: [
      `Your background in ${data.major} provides valuable domain expertise that technology companies need`,
      `Your combination of skills makes you well-suited for bridging technical and business requirements`,
      `The consulting field offers diverse projects and continuous learning opportunities`
    ],
    project: `Create a technology consulting case study relevant to your field of ${data.major}. Research current challenges in the industry and propose technology solutions that could address these problems.`
  };

  const mapping = careerPathMappings[data.major as keyof typeof careerPathMappings] || defaultMapping;

  // Return in careerPaths format for consistent UI
  return {
    careerPaths: [
      {
        title: mapping.path,
        description: `Based on your background in ${data.major} and your skills in ${data.skills.slice(0, 2).join(' and ')}, this career path offers excellent opportunities for growth and impact.`,
        requiredSkills: [
          ...data.skills.slice(0, 3),
          "Problem-solving",
          "Communication",
          "Continuous learning"
        ],
        nextSteps: [
          "Build a strong portfolio showcasing your skills",
          "Network with professionals in the field",
          "Stay updated with industry trends",
          "Consider relevant certifications"
        ],
        outlook: "Strong growth potential in Vietnam's digital economy with competitive salaries and career advancement opportunities."
      }
    ],
    generalAdvice: `Your unique combination of ${data.major} knowledge and ${data.workEnvironment} work style makes you well-positioned for success in this field. Focus on continuous learning and building practical experience through projects.`,
    suggestedProject: mapping.project
  };
}

// Enhanced mock market analysis
function generateEnhancedMockMarketAnalysis(careerPath: string) {
  const analysisData = {
    "Full-Stack Software Developer": {
      growthPotential: "The full-stack development field in Vietnam is experiencing exceptional growth, with a 35% year-over-year increase in job openings. Vietnam's position as a leading IT outsourcing destination and the government's Digital Transformation Strategy 2025 are driving massive demand for versatile developers who can handle both frontend and backend technologies.",
      requiredSkills: ["JavaScript/TypeScript", "React or Vue.js", "Node.js or Python", "Database Management (SQL/NoSQL)", "Cloud Services (AWS/Azure)", "Git Version Control", "API Development", "Agile Methodologies"],
      salaryRange: {
        junior: "$600 - $1,200/month (Fresher to 1 year)",
        midLevel: "$1,200 - $2,500/month (2-4 years experience)", 
        senior: "$2,500 - $4,500/month (5+ years experience)",
        techLead: "$4,500 - $8,000/month (Team Lead/Architect level)"
      },
      topCompanies: ["FPT Software", "VNG Corporation", "Sendo", "Tiki", "VinGroup Technology", "Sacombank Technology", "CMC Global", "Nash Tech"]
    },
    "Digital Business Analyst": {
      growthPotential: "Business Analysis roles in Vietnam's digital economy are growing at 28% annually as companies undergo digital transformation. The role is becoming increasingly strategic, bridging business needs with technology solutions in sectors like fintech, e-commerce, and digital banking.",
      requiredSkills: ["Data Analysis", "Business Process Modeling", "Requirements Gathering", "SQL and Excel", "Project Management", "Stakeholder Communication", "Market Research", "Digital Tools (JIRA, Confluence)"],
      salaryRange: {
        junior: "$500 - $1,000/month (Entry level)",
        midLevel: "$1,000 - $2,200/month (2-4 years experience)",
        senior: "$2,200 - $4,000/month (Senior Analyst level)",
        techLead: "$4,000 - $7,000/month (Principal/Lead Analyst)"
      },
      topCompanies: ["Vietcombank", "BIDV", "Techcombank", "VinFast", "Grab Vietnam", "Shopee", "Lazada", "MB Bank"]
    }
  };

  return analysisData[careerPath as keyof typeof analysisData] || {
    growthPotential: `The ${careerPath} field shows promising growth in Vietnam's evolving economy, with increasing demand for professionals who can adapt to digital transformation trends.`,
    requiredSkills: ["Problem-solving", "Communication", "Technical proficiency", "Adaptability", "Continuous learning"],
    salaryRange: {
      junior: "$400 - $800/month",
      midLevel: "$800 - $1,500/month", 
      senior: "$1,500 - $3,000/month",
      techLead: "$3,000 - $5,000/month"
    },
    topCompanies: ["FPT Software", "Vingroup Technology", "Sacombank", "Viettel"]
  };
}

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  console.log('API Request:', {
    endpoint,
    method: options.method || 'GET'
  });

  // Tạo promise cho cả Gemini API và timer 5 giây
  const geminiPromise = async () => {
    if (endpoint === '/api/career-advice' && options.method === 'POST') {
      const body = JSON.parse(options.body as string);
      try {
        return await getCareerAdviceFromGemini(body);
      } catch (error) {
        console.log('Gemini failed, using enhanced mock data');
        return generateEnhancedMockCareerAdvice(body);
      }
    }
    
    if (endpoint === '/api/market-analysis' && options.method === 'POST') {
      const body = JSON.parse(options.body as string);
      try {
        return await getMarketAnalysisFromGemini(body.careerPath);
      } catch (error) {
        console.log('Gemini failed, using enhanced mock data');
        return generateEnhancedMockMarketAnalysis(body.careerPath);
      }
    }
    
    throw new Error(`Unsupported endpoint: ${endpoint}`);
  };

  // Promise cho 5 giây loading
  const timerPromise = new Promise(resolve => setTimeout(resolve, 5000));

  try {
    // Chạy đồng thời Gemini và timer, đợi cả 2 hoàn thành
    const [result] = await Promise.all([geminiPromise(), timerPromise]);
    return result;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [endpoint] = queryKey as [string];
        return apiRequest(endpoint);
      },
    },
  },
});

export { apiRequest };
