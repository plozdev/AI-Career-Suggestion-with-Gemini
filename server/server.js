import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests from GitHub Pages and localhost
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://plozdev.github.io'
    ];
    
    // Allow GitHub Pages subdirectories
    if (!origin || allowedOrigins.includes(origin) || 
        (origin && origin.startsWith('https://plozdev.github.io'))) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoints
app.get('/', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Career Compass API',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});

// Career advice endpoint
app.post('/api/career-advice', async (req, res) => {
  try {
    const { major, skills, interests, experience } = req.body;
    
    if (!major && !skills?.length) {
      return res.status(400).json({ 
        error: 'Please provide at least major or skills' 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `As a career counselor, provide personalized career advice for someone with:
- Major/Field: ${major || 'Not specified'}
- Skills: ${skills?.join(', ') || 'Not specified'}
- Interests: ${interests?.join(', ') || 'Not specified'}
- Experience Level: ${experience || 'Not specified'}

Please provide:
1. 3-5 suitable career paths
2. Skills to develop for each path
3. Next steps and actionable advice
4. Industry outlook

Keep the response practical and encouraging. Format as JSON with this structure:
{
  "careerPaths": [
    {
      "title": "Career Title",
      "description": "Brief description",
      "requiredSkills": ["skill1", "skill2"],
      "nextSteps": ["step1", "step2"],
      "outlook": "Industry outlook"
    }
  ],
  "generalAdvice": "Overall advice and encouragement"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse as JSON, fallback to plain text
    try {
      const jsonResponse = JSON.parse(text);
      res.json(jsonResponse);
    } catch {
      res.json({ 
        advice: text,
        message: "Generated advice (text format)"
      });
    }
    
  } catch (error) {
    console.error('Career advice error:', error);
    res.status(500).json({ 
      error: 'Failed to generate career advice',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Market analysis endpoint
app.post('/api/market-analysis', async (req, res) => {
  try {
    const { field, location } = req.body;
    
    if (!field) {
      return res.status(400).json({ 
        error: 'Please provide a field for analysis' 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Provide market analysis for ${field} ${location ? `in ${location}` : 'globally'}:

1. Current market demand and trends
2. Salary ranges and compensation
3. Growth opportunities
4. Key companies and employers
5. Skills in high demand
6. Future outlook (next 3-5 years)

Format as JSON:
{
  "field": "${field}",
  "location": "${location || 'Global'}",
  "demand": "High/Medium/Low with explanation",
  "salaryRange": "Salary information",
  "trends": ["trend1", "trend2"],
  "topEmployers": ["company1", "company2"],
  "inDemandSkills": ["skill1", "skill2"],
  "outlook": "Future outlook",
  "recommendations": "Advice for entering this field"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonResponse = JSON.parse(text);
      res.json(jsonResponse);
    } catch {
      res.json({ 
        analysis: text,
        message: "Generated analysis (text format)"
      });
    }
    
  } catch (error) {
    console.error('Market analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to generate market analysis',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.originalUrl 
  });
});

app.listen(port, () => {
  console.log(`🚀 Career Compass API running on port ${port}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 Gemini API: ${process.env.GEMINI_API_KEY ? 'configured' : 'missing'}`);
});
