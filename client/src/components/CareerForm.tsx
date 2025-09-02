import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import CareerLoadingDialog from "@/components/CareerLoadingDialog";
import type { CareerAssessment, CareerAdvice } from "@shared/schema";

interface CareerFormProps {
  onSuccess: (advice: CareerAdvice) => void;
}

const MAJORS = [
  "Information Technology",
  // "Software Engineering", 
  "Business Administration",
  "Marketing",
  "Graphic Design",
  "Digital Media",
  "International Business",
  "Finance"
];

const ALL_SKILLS = [
  // Technical Skills
  "Web Programming",
  "Mobile Development", 
  "Game Development",
  "Data Analysis",
  "UI/UX Design",
  "Machine Learning",
  "Database Management",
  "System Administration",
  "Cybersecurity",
  
  // Creative Skills
  "Graphic Design",
  "Content Writing",
  "Video Production",
  "Photography",
  "Drawing/Illustration",
  "Music Production",
  "3D Modeling",
  
  // Communication Skills
  "Public Speaking",
  "Teaching/Training",
  "Sales/Persuasion",
  "Customer Service",
  "Language Translation",
  "Social Media Management",
  
  // Analytical Skills
  "Problem Solving",
  "Research & Analysis",
  "Financial Planning",
  "Market Research",
  "Quality Assurance",
  "Strategic Planning",
  
  // Interpersonal Skills
  "Team Leadership",
  "Project Management",
  "Counseling/Mentoring",
  "Event Planning",
  "Negotiation",
  "Networking",
  
  // Organizational Skills
  "Time Management",
  "Process Improvement",
  "Documentation",
  "Resource Management",
  "Logistics Coordination"
];

const MAJOR_SKILLS_MAPPING: Record<string, string[]> = {
  "Information Technology": [
    "Web Programming",
    "Mobile Development",
    "Game Development",
    "Database Management",
    "System Administration",
    "Cybersecurity",
    "Data Analysis",
    "Machine Learning",
    "Problem Solving",
    "Project Management",
    "Quality Assurance",
    "Documentation",
    "Process Improvement"
  ],
  // "Software Engineering": [
  //   "Web Programming",
  //   "Mobile Development",
  //   "Database Management",
  //   "System Administration",
  //   "Problem Solving",
  //   "Quality Assurance",
  //   "Project Management",
  //   "Documentation",
  //   "Process Improvement",
  //   "Team Leadership",
  //   "Strategic Planning"
  // ],
  "Business Administration": [
    "Strategic Planning",
    "Project Management",
    "Team Leadership",
    "Financial Planning",
    "Market Research",
    "Public Speaking",
    "Negotiation",
    "Networking",
    "Process Improvement",
    "Resource Management",
    "Sales/Persuasion"
  ],
  "Marketing": [
    "Social Media Management",
    "Content Writing",
    "Market Research",
    "Graphic Design",
    "Public Speaking",
    "Sales/Persuasion",
    "Photography",
    "Video Production",
    "Event Planning",
    "Data Analysis",
    "Networking"
  ],
  "Graphic Design": [
    "Graphic Design",
    "UI/UX Design",
    "Drawing/Illustration",
    "3D Modeling",
    "Photography",
    "Video Production",
    "Content Writing",
    "Social Media Management",
    "Project Management",
    "Time Management"
  ],
  "Digital Media": [
    "Video Production",
    "Photography",
    "Graphic Design",
    "Social Media Management",
    "Content Writing",
    "UI/UX Design",
    "Music Production",
    "3D Modeling",
    "Project Management",
    "Event Planning"
  ],
  "International Business": [
    "Language Translation",
    "Negotiation",
    "Strategic Planning",
    "Market Research",
    "Financial Planning",
    "Public Speaking",
    "Networking",
    "Project Management",
    "Sales/Persuasion",
    "Research & Analysis"
  ],
  "Finance": [
    "Financial Planning",
    "Data Analysis",
    "Research & Analysis",
    "Strategic Planning",
    "Problem Solving",
    "Market Research",
    "Negotiation",
    "Project Management",
    "Quality Assurance",
    "Documentation"
  ]
};

const WORK_ENVIRONMENTS = [
  {
    id: "team-focused",
    label: "Team-Focused",
    description: "Working closely with colleagues on projects",
    icon: "fas fa-users"
  },
  {
    id: "independent",
    label: "Independent Work",
    description: "Working alone with minimal supervision",
    icon: "fas fa-user"
  },
  {
    id: "hybrid",
    label: "Hybrid Environment",
    description: "Mix of teamwork and independent work",
    icon: "fas fa-handshake"
  },
  {
    id: "remote",
    label: "Remote/Home Office",
    description: "Working from home or anywhere",
    icon: "fas fa-home"
  },
  {
    id: "office",
    label: "Traditional Office",
    description: "Professional office environment",
    icon: "fas fa-building"
  },
  {
    id: "outdoor",
    label: "Outdoor/Field Work",
    description: "Working outside or traveling frequently",
    icon: "fas fa-tree"
  }
];

const MOTIVATIONS = [
  {
    id: "high-salary",
    label: "High Salary & Financial Growth",
    description: "Maximizing earning potential and financial success",
    icon: "fas fa-dollar-sign"
  },
  {
    id: "work-life-balance",
    label: "Work-Life Balance",
    description: "Having time for family, hobbies, and personal life",
    icon: "fas fa-balance-scale"
  },
  {
    id: "helping-others",
    label: "Helping Others",
    description: "Making a positive impact on people's lives",
    icon: "fas fa-heart"
  },
  {
    id: "creative-freedom",
    label: "Creative Freedom",
    description: "Having autonomy to innovate and express creativity",
    icon: "fas fa-palette"
  },
  {
    id: "career-growth",
    label: "Career Advancement",
    description: "Building skills and climbing the career ladder",
    icon: "fas fa-chart-line"
  },
  {
    id: "job-security",
    label: "Job Security & Stability",
    description: "Having a stable, predictable career path",
    icon: "fas fa-shield-alt"
  }
];

const CORE_INTERESTS = [
  {
    id: "technology",
    label: "Technology & Innovation",
    description: "Software, AI, gadgets, digital trends",
    icon: "fas fa-laptop-code"
  },
  {
    id: "business",
    label: "Business & Entrepreneurship",
    description: "Startups, management, strategy, economics",
    icon: "fas fa-briefcase"
  },
  {
    id: "health",
    label: "Health & Medicine",
    description: "Healthcare, fitness, nutrition, psychology",
    icon: "fas fa-heartbeat"
  },
  {
    id: "education",
    label: "Education & Learning",
    description: "Teaching, training, knowledge sharing",
    icon: "fas fa-graduation-cap"
  },
  {
    id: "arts",
    label: "Arts & Culture",
    description: "Design, music, literature, entertainment",
    icon: "fas fa-paint-brush"
  },
  {
    id: "science",
    label: "Science & Research",
    description: "Discovery, experimentation, analysis",
    icon: "fas fa-flask"
  },
  {
    id: "finance",
    label: "Finance & Investment",
    description: "Money management, markets, banking",
    icon: "fas fa-chart-bar"
  },
  {
    id: "social-issues",
    label: "Social Issues & Activism",
    description: "Community service, advocacy, social change",
    icon: "fas fa-hands-helping"
  }
];

const PROBLEM_SOLVING = [
  {
    id: "technical",
    label: "Technical Problems",
    description: "Debugging code, fixing systems, engineering challenges",
    icon: "fas fa-cog"
  },
  {
    id: "people",
    label: "People Problems",
    description: "Resolving conflicts, improving relationships, team issues",
    icon: "fas fa-users-cog"
  },
  {
    id: "creative",
    label: "Creative Challenges",
    description: "Design problems, artistic expression, innovative solutions",
    icon: "fas fa-lightbulb"
  },
  {
    id: "strategic",
    label: "Strategic Puzzles",
    description: "Planning, optimization, business strategy, long-term thinking",
    icon: "fas fa-chess"
  },
  {
    id: "analytical",
    label: "Data & Research Problems",
    description: "Analyzing information, finding patterns, research challenges",
    icon: "fas fa-search"
  },
  {
    id: "practical",
    label: "Practical Everyday Problems",
    description: "Organizing, improving processes, making things work better",
    icon: "fas fa-tools"
  }
];

const PERSONALITIES = [
  {
    id: "Introverted",
    label: "Introverted",
    description: "Prefer working alone, deep focus",
    icon: "fas fa-book"
  },
  {
    id: "Extroverted", 
    label: "Extroverted",
    description: "Love networking and presentations",
    icon: "fas fa-users"
  },
  {
    id: "Team-Oriented",
    label: "Team-Oriented", 
    description: "Thrive in collaborative environments",
    icon: "fas fa-handshake"
  }
];

export default function CareerForm({ onSuccess }: CareerFormProps) {
  const [major, setMajor] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [workEnvironment, setWorkEnvironment] = useState("");
  const [motivation, setMotivation] = useState("");
  const [coreInterest, setCoreInterest] = useState("");
  const [problemSolving, setProblemSolving] = useState("");
  const [personality, setPersonality] = useState("");
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const { toast } = useToast();

  const careerMutation = useMutation({
    mutationFn: async (data: CareerAssessment) => {
      const response = await apiRequest("/api/career-advice", {
        method: "POST",
        body: JSON.stringify(data),
      });
      
      // Handle different API response formats
      if (response.advice) {
        // Try to parse JSON from advice string
        try {
          const jsonMatch = response.advice.match(/```json\n([\s\S]*?)\n```/);
          if (jsonMatch) {
            const parsedAdvice = JSON.parse(jsonMatch[1]);
            return parsedAdvice;
          }
        } catch (e) {
          console.log('Could not parse JSON from advice, using raw text');
        }
        
        // Return raw advice if parsing fails
        return { rawAdvice: response.advice };
      }
      
      return response;
    },
    onMutate: () => {
      // Show loading dialog when mutation starts
      setShowLoadingDialog(true);
    },
    onSuccess: (data) => {
      // Hide loading dialog and show results
      setShowLoadingDialog(false);
      onSuccess(data);
    },
    onError: (error) => {
      // Hide loading dialog on error
      setShowLoadingDialog(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get career advice",
        variant: "destructive",
      });
    },
  });

  const [showAllSkills, setShowAllSkills] = useState(false);

  const getFilteredSkills = () => {
    if (!major || showAllSkills) {
      return ALL_SKILLS;
    }
    return MAJOR_SKILLS_MAPPING[major] || ALL_SKILLS;
  };

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleMajorChange = (selectedMajor: string) => {
    setMajor(selectedMajor);
    // Reset selected skills when major changes
    setSelectedSkills([]);
    // Reset show all skills toggle
    setShowAllSkills(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!major || selectedSkills.length === 0 || !workEnvironment || !motivation || !coreInterest || !problemSolving || !personality) {
      toast({
        title: "Incomplete Form", 
        description: "Please answer all questions to get personalized career advice.",
        variant: "destructive",
      });
      return;
    }

    careerMutation.mutate({
      major,
      skills: selectedSkills,
      workEnvironment,
      motivation,
      coreInterest,
      problemSolving,
      personality,
    });
  };

  return (
    <section id="career-form-section" className="section">
      <h2 className="section-title">Tell Us About Yourself</h2>
      <div className="career-form">
        <form onSubmit={handleSubmit}>
          {/* Question 1: Main Major */}
          <div className="form-group">
            <label className="form-label" htmlFor="major">
              <i className="fas fa-graduation-cap mr-2" style={{ color: 'var(--google-blue)' }}></i>
              1. What's your main major?
            </label>
            <select
              id="major"
              className="form-select"
              value={major}
              onChange={(e) => handleMajorChange(e.target.value)}
              required
              data-testid="select-major"
            >
              <option value="">Select your major</option>
              {MAJORS.map((majorOption) => (
                <option key={majorOption} value={majorOption}>
                  {majorOption}
                </option>
              ))}
            </select>
          </div>

          {/* Question 2: Skills */}
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-star mr-2" style={{ color: 'var(--google-red)' }}></i>
              2. Your favorite skills: What are you naturally good at? (Select up to 3)
            </label>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
              {major ? `Skills relevant to ${major}:` : 'Choose skills you enjoy using or would like to develop further'}
            </p>
            {major && (
              <div style={{ marginBottom: '15px' }}>
                <button
                  type="button"
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--google-blue)',
                    color: 'var(--google-blue)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  data-testid="toggle-all-skills"
                >
                  {showAllSkills ? 'Show relevant skills only' : 'Show all skills'}
                </button>
              </div>
            )}
            <div className="skill-tags">
              {getFilteredSkills().map((skill) => (
                <div
                  key={skill}
                  className={`skill-tag ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => handleSkillToggle(skill)}
                  data-testid={`skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Question 3: Work Environment */}
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-building mr-2" style={{ color: 'var(--google-orange)' }}></i>
              3. Your ideal work environment: How do you prefer to work?
            </label>
            <div className="personality-options">
              {WORK_ENVIRONMENTS.map((env) => (
                <div
                  key={env.id}
                  className={`personality-option ${workEnvironment === env.id ? 'selected' : ''}`}
                  onClick={() => setWorkEnvironment(env.id)}
                  data-testid={`work-env-${env.id}`}
                >
                  <i className={`${env.icon} text-2xl mb-2`} style={{ color: 'var(--google-blue)' }}></i>
                  <h4>{env.label}</h4>
                  <p>{env.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Question 4: Motivation */}
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-rocket mr-2" style={{ color: 'var(--google-green)' }}></i>
              4. Your motivation: What do you want most from a career?
            </label>
            <div className="personality-options">
              {MOTIVATIONS.map((motiv) => (
                <div
                  key={motiv.id}
                  className={`personality-option ${motivation === motiv.id ? 'selected' : ''}`}
                  onClick={() => setMotivation(motiv.id)}
                  data-testid={`motivation-${motiv.id}`}
                >
                  <i className={`${motiv.icon} text-2xl mb-2`} style={{ color: 'var(--google-green)' }}></i>
                  <h4>{motiv.label}</h4>
                  <p>{motiv.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Question 5: Core Interest */}
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-lightbulb mr-2" style={{ color: 'var(--google-red)' }}></i>
              5. Your core interest: What subject could you learn about all day?
            </label>
            <div className="personality-options">
              {CORE_INTERESTS.map((interest) => (
                <div
                  key={interest.id}
                  className={`personality-option ${coreInterest === interest.id ? 'selected' : ''}`}
                  onClick={() => setCoreInterest(interest.id)}
                  data-testid={`interest-${interest.id}`}
                >
                  <i className={`${interest.icon} text-2xl mb-2`} style={{ color: 'var(--google-red)' }}></i>
                  <h4>{interest.label}</h4>
                  <p>{interest.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Question 6: Problem Solving */}
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-puzzle-piece mr-2" style={{ color: 'var(--google-orange)' }}></i>
              6. Your biggest challenge: What kind of problems do you enjoy solving?
            </label>
            <div className="personality-options">
              {PROBLEM_SOLVING.map((problem) => (
                <div
                  key={problem.id}
                  className={`personality-option ${problemSolving === problem.id ? 'selected' : ''}`}
                  onClick={() => setProblemSolving(problem.id)}
                  data-testid={`problem-solving-${problem.id}`}
                >
                  <i className={`${problem.icon} text-2xl mb-2`} style={{ color: 'var(--google-orange)' }}></i>
                  <h4>{problem.label}</h4>
                  <p>{problem.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Question 7: Personality Type */}
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-heart mr-2" style={{ color: 'var(--google-blue)' }}></i>
              7. Personality type: Which describes you best?
            </label>
            <div className="personality-options">
              {PERSONALITIES.map((personalityOption) => (
                <div
                  key={personalityOption.id}
                  className={`personality-option ${personality === personalityOption.id ? 'selected' : ''}`}
                  onClick={() => setPersonality(personalityOption.id)}
                  data-testid={`personality-${personalityOption.id.toLowerCase()}`}
                >
                  <i className={`${personalityOption.icon} text-2xl mb-2`} style={{ color: 'var(--google-blue)' }}></i>
                  <h4>{personalityOption.label}</h4>
                  <p>{personalityOption.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={careerMutation.isPending}
            data-testid="button-submit-career"
          >
            <i className="fas fa-magic mr-2"></i>
            {careerMutation.isPending ? "Analyzing..." : "Get My Career Direction"}
          </button>
        </form>
      </div>

      {/* Loading Dialog */}
      <CareerLoadingDialog 
        isOpen={showLoadingDialog}
        onOpenChange={setShowLoadingDialog}
      />
    </section>
  );
}
