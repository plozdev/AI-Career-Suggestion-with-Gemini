import { Lightbulb } from "lucide-react";
import type { CareerAdvice } from "@shared/schema";

interface CareerResultsProps {
  advice: CareerAdvice | any | null; // Allow flexible types for different API responses
  isLoading: boolean;
  onAnalyzeMarket: () => void;
}

export default function CareerResults({ advice, isLoading, onAnalyzeMarket }: CareerResultsProps) {
  if (!isLoading && !advice) return null;

  return (
    <section id="career-results" className="results-section visible">
      <div className="career-result">
        <div className="result-header">
          <div className="result-icon">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="result-title">Your Ideal Career Path</h3>
        </div>
        <div className="result-content" data-testid="career-advice-content">
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>AI is analyzing your profile...</p>
            </div>
          ) : advice ? (
            <div data-testid="career-advice-text">
              {/* Handle different response formats from API */}
              {advice.careerPaths ? (
                // New API format with careerPaths array
                <div>
                  <h4>🎯 Top 4 Career Recommendations</h4>
                  <div className="career-recommendations-grid">
                    {advice.careerPaths.slice(0, 4).map((career: any, index: number) => (
                      <div key={index} className="career-recommendation-card">
                        <div className="career-rank">#{index + 1}</div>
                        <h5 className="career-title">
                          {career.title}
                        </h5>
                        <p className="career-description">{career.description}</p>
                        
                        <div className="career-details">
                          <div className="detail-section">
                            <strong>💼 Required Skills:</strong>
                            <ul className="skills-list">
                              {(career.requiredSkills || []).slice(0, 5).map((skill: string, skillIndex: number) => (
                                <li key={skillIndex}>{skill}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="detail-section">
                            <strong>🚀 Next Steps:</strong>
                            <ul className="steps-list">
                              {(career.nextSteps || []).slice(0, 3).map((step: string, stepIndex: number) => (
                                <li key={stepIndex}>{step}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="career-outlook">
                            <strong>📈 Outlook:</strong> <span>{career.outlook}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {advice.generalAdvice && (
                    <div className="general-advice-section">
                      <h5>💡 General Career Advice</h5>
                      <p>{advice.generalAdvice}</p>
                    </div>
                  )}
                </div>
              ) : advice.careerPath ? (
                // Old API format
                <>
                  <h4>🎯 Recommended Career: {advice.careerPath}</h4>
                  <p><strong>Why this path suits you:</strong></p>
                  <ul>
                    {(advice.reasons || []).map((reason: string, index: number) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                  {advice.suggestedProject && (
                    <>
                      <h4>🚀 Suggested Personal Project</h4>
                      <p>{advice.suggestedProject}</p>
                    </>
                  )}
                </>
              ) : advice.rawAdvice ? (
                // Raw text format
                <div>
                  <h4>🎯 Career Advice</h4>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: '1.6' }}>
                    {advice.rawAdvice}
                  </pre>
                </div>
              ) : (
                // Complete fallback
                <div>
                  <h4>🎯 Career Advice Generated</h4>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {typeof advice === 'string' ? advice : JSON.stringify(advice, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : null}
        </div>
        {false && advice && !isLoading && ( //Hiding market analysis 
          <button 
            className="analyze-btn" 
            onClick={onAnalyzeMarket}
            data-testid="button-analyze-market"
          >
            <i className="fas fa-chart-line mr-2"></i>
            Analyze Job Market
          </button>
        )}
      </div>
    </section>
  );
}
