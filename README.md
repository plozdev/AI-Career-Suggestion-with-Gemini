# 🧭 Career Compass - AI-Powered Career Guidance

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.x-teal?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge&logo=google" alt="Gemini AI" />
</div>

## 🎯 Overview

**Career Compass** is a modern web application that helps **FPT University Ho Chi Minh City** students discover their perfect career path using **Google Gemini AI**. Developed by **Google Developer Groups on Campus (GDGoC FPTU HCMC)**, this tool provides personalized career recommendations based on skills, interests, and experience.

### ✨ Key Features

- 🤖 **AI-Powered Analysis** - Leverages Google Gemini for intelligent career matching
- 📊 **4 Career Recommendations** - Provides top 4 ranked career suggestions with detailed insights
- ⚡ **5-Second Processing** - Fast AI analysis with real-time progress tracking
- 🎨 **Modern Google-Inspired UI** - Clean, responsive design following Material Design principles
- 📱 **Mobile-First Responsive** - Optimized for all devices and screen sizes
- 🔒 **Privacy-Focused** - 100% client-side processing, no data storage

## 🚀 Live Demo

🌐 **[Try Career Compass Now!](https://plozdev.github.io/AI-Career-Suggestion-with-Gemini/#/)**

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript** - Modern component-based architecture
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Wouter** - Lightweight client-side routing

### AI Integration
- **Google Gemini API** - Advanced language model for career analysis
- **@google/generative-ai** - Official Google GenAI SDK
- **Structured JSON responses** - Consistent, validated AI outputs

### Development Tools
- **TypeScript Strict Mode** - Enhanced type safety
- **ESLint** + **Prettier** - Code quality and formatting
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
web/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.tsx  # Navigation and branding
│   │   │   ├── CareerForm.tsx       # User input form
│   │   │   ├── CareerResults.tsx    # AI results display
│   │   │   └── CareerLoadingDialog.tsx # Loading UI
│   │   ├── pages/          # Page components
│   │   │   └── home.tsx    # Main application page
│   │   ├── lib/            # Utilities and API clients
│   │   │   ├── geminiClient.ts      # Gemini AI integration
│   │   │   └── queryClient.ts       # API request handling
│   │   ├── types/          # TypeScript definitions
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Application entry point
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets
│   │   ├── logo.jpg        # GDGoC logo
│   │   └── bkg.jpg         # Background image
│   └── package.json        # Frontend dependencies
├── package.json            # Root package configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Google Gemini API Key** (Get on Google AI Studio)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/plozdev/AI-Career-Suggestion-with-Gemini.git
   cd AI-Career-Suggestion-with-Gemini/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in root directory
   echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   cd client && npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🎨 Features Showcase

### 🧠 Intelligent Career Analysis
- **Skills Assessment** - Evaluates technical and soft skills
- **Interest Mapping** - Matches personal interests with career paths
- **Experience Consideration** - Factors in current experience level
- **Market Insights** - Provides industry outlook and salary expectations

### 📊 Comprehensive Results
Each career recommendation includes:
- **Career Path Title** - Clear, specific job roles
- **Match Percentage** - AI confidence score
- **Required Skills** - 5 key skills needed for success
- **Next Steps** - 3 actionable items to pursue the career
- **Industry Outlook** - Market trends and growth potential

### 🎯 User Experience
- **Progressive Form** - Step-by-step input collection
- **Real-time Validation** - Instant feedback on form inputs
- **Loading Animation** - Engaging progress indicator with Gemini branding
- **Responsive Cards** - Beautiful card-based result presentation

## 🌐 Deployment

### GitHub Pages
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `client/dist`
4. Add environment variable: `VITE_GEMINI_API_KEY`

## 🤝 Contributing

We welcome contributions from the GDGoC community!

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push and create a Pull Request**

### Development Guidelines
- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Write clear, descriptive commit messages
- Test your changes across different screen sizes


## 🏫 About GDGoC FPTU HCMC

**Google Developer Groups on Campus FPT University Ho Chi Minh City** is a community of students passionate about Google technologies and software development. We organize events, workshops, and projects to help students learn and grow in the tech industry.

### Connect with Us
- **Email**: [gdsc.fpt.hcm23@gmail.com](mailto:gdsc.fpt.hcm23@gmail.com)
- **Facebook**: [GDGoC FPTU HCMC](https://www.facebook.com/gdg.fptu.hcmc)
- **Google Community**: [GDGoC FPTU HCMC](https://gdg.community.dev/gdg-on-campus-fpt-university-ho-chi-minh-city-vietnam/)
- **LinkedIn**: [GDGoC FPTU HCMC](https://www.linkedin.com/company/gdg-fptu-hcmc/)


## 🙏 Acknowledgments

- **Google Gemini Team** - For providing the amazing AI capabilities
- **FPTU HCMC** - For supporting student innovation
- **React Community** - For the excellent ecosystem
- **Tailwind CSS** - For the beautiful design system

---

<div align="center">
  <p><strong>Made with ❤️ by GDGoC FPTU HCMC</strong></p>
  <p><em>Empowering students to discover their perfect career path</em></p>
</div>