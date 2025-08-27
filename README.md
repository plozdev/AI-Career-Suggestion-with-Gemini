# Career Compass - AI-Powered Career Guidance

## Overview

Career Compass is an interactive web application designed to showcase AI capabilities at the GDGoC FPTU HCMC Club Day event. The application provides personalized career guidance using the Google Gemini AI model, helping students discover suitable career paths based on their academic background, skills, and personality traits. The app features a two-stage AI interaction system that first provides career recommendations and then delivers detailed market analysis for the suggested career paths.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for RESTful API endpoints
- **Language**: TypeScript for full-stack type safety
- **API Structure**: Two main endpoints:
  - `/api/career-advice` - Generates initial career recommendations
  - `/api/market-analysis` - Provides detailed market insights for career paths
- **Validation**: Zod schemas shared between frontend and backend for consistent data validation
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle ORM
- **Database Provider**: Neon Database for serverless PostgreSQL hosting
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **In-Memory Storage**: Fallback MemStorage implementation for development/testing
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage

### Authentication and Authorization
- **Session-Based**: Express sessions with PostgreSQL storage
- **Anonymous Access**: No user registration required for immediate engagement
- **User Management**: Basic user storage schema prepared for future expansion

### AI Integration Architecture
- **AI Provider**: Google Gemini AI (Gemini 2.5 Flash model)
- **API Integration**: Google GenAI SDK for structured JSON responses
- **Prompt Engineering**: Two-stage conversation flow:
  1. Career advisor persona for initial recommendations
  2. Market analyst persona for industry insights
- **Response Validation**: Structured JSON schemas enforce consistent AI output format
- **Error Resilience**: Comprehensive error handling for AI service failures

### Security Considerations
- **API Key Protection**: Environment variable-based configuration for Gemini API key
- **Input Validation**: Multi-layer validation using Zod schemas
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Rate Limiting**: Prepared infrastructure for API rate limiting

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL via Neon Database serverless platform
- **AI Service**: Google Gemini API for natural language processing and career guidance
- **CDN/Fonts**: Google Fonts for typography (Roboto, Open Sans, DM Sans, Fira Code, Geist Mono, Architects Daughter)

### Development and Deployment
- **Hosting Platform**: Configured for Replit deployment with specialized plugins
- **Build Tools**: Vite with React plugin and runtime error overlay for development
- **Package Management**: npm with lockfile for dependency consistency

### UI Component Libraries
- **Design System**: Radix UI primitives for accessible, unstyled components
- **Icons**: Lucide React for consistent iconography
- **Styling Utilities**: Class Variance Authority (CVA) for component variant management
- **Date Handling**: date-fns for date manipulation and formatting

### Monitoring and Development
- **Runtime Monitoring**: Replit-specific error tracking and development tools
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Performance**: TanStack Query for efficient data fetching and caching strategies