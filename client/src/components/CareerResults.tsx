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
                  <h4>🎯 Career Recommendations</h4>
                  {advice.careerPaths.map((career: any, index: number) => (
                    <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                      <h5 style={{ color: 'var(--google-blue)', marginBottom: '8px' }}>
                        {career.title}
                      </h5>
                      <p style={{ marginBottom: '10px' }}>{career.description}</p>
                      
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Required Skills:</strong>
                        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                          {(career.requiredSkills || []).map((skill: string, skillIndex: number) => (
                            <li key={skillIndex}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Next Steps:</strong>
                        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                          {(career.nextSteps || []).map((step: string, stepIndex: number) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <strong>Outlook:</strong> {career.outlook}
                      </div>
                    </div>
                  ))}
                  
                  {advice.generalAdvice && (
                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                      <h5>💡 General Advice</h5>
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
        {true && advice && !isLoading && (
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
