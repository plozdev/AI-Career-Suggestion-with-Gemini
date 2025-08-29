import { BarChart3 } from "lucide-react";
import type { MarketAnalysis } from "@shared/schema";

interface MarketAnalysisProps {
  analysis: MarketAnalysis | null;
  isLoading: boolean;
  isVisible: boolean;
}

export default function MarketAnalysis({ analysis, isLoading, isVisible }: MarketAnalysisProps) {
  if (!isVisible) return null;

  return (
    <section id="market-results" className="results-section visible">
      <div className="market-result">
        <div className="result-header">
          <div className="result-icon">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="result-title">Job Market Analysis</h3>
        </div>
        <div className="result-content" data-testid="market-analysis-content">
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing job market trends...</p>
            </div>
          ) : analysis ? (
            <div data-testid="market-analysis-text">
              {/* Handle different response formats from API */}
              {analysis.growthPotential ? (
                <>
                  <h4>📈 Growth Potential in Vietnam</h4>
                  <p>{analysis.growthPotential}</p>
                  
                  <h4>🛠️ Key Required Skills</h4>
                  <ul>
                    {(analysis.requiredSkills || []).map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>

                  {analysis.salaryRange && (
                    <>
                      <h4>💰 Average Salary Range for New Graduates</h4>
                      <ul>
                        <li><strong>Junior Developer:</strong> {analysis.salaryRange.junior}</li>
                        <li><strong>Mid-level (2-3 years):</strong> {analysis.salaryRange.midLevel}</li>
                        <li><strong>Senior Level (4+ years):</strong> {analysis.salaryRange.senior}</li>
                        <li><strong>Tech Lead/Architect:</strong> {analysis.salaryRange.techLead}</li>
                      </ul>
                    </>
                  )}

                  <h4>🏢 Top Companies in This Field</h4>
                  <ul>
                    {(analysis.topCompanies || []).map((company, index) => (
                      <li key={index}>{company}</li>
                    ))}
                  </ul>
                </>
              ) : (
                // Fallback for different API response format
                <div>
                  <h4>📊 Market Analysis Generated</h4>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
