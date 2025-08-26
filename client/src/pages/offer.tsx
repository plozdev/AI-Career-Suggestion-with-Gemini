import { Code, Users, Trophy, BookOpen, Briefcase, Star } from "lucide-react";

export default function Offer() {
  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Navigation Bar Placeholder */}
      <div style={{ height: '80px' }}></div>
      
      <main className="main-content">
        <div className="container max-w-6xl mx-auto px-5">
          <section className="section">
            <h1 className="section-title">What We Offer</h1>
            
            <div className="offers-grid">
              <div className="offer-card">
                <div className="result-header">
                  <div className="result-icon">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="result-title">Technical Workshops</h3>
                </div>
                <div className="result-content">
                  <h4>🔧 Hands-on Learning</h4>
                  <ul>
                    <li>Google Cloud Platform (GCP) fundamentals</li>
                    <li>Android development with Kotlin</li>
                    <li>Web development with Firebase</li>
                    <li>Machine Learning with TensorFlow</li>
                    <li>Flutter mobile app development</li>
                  </ul>
                  <p><strong>Schedule:</strong> Every weekend</p>
                  <p><strong>Duration:</strong> 2-3 hours per session</p>
                </div>
              </div>

              <div className="offer-card">
                <div className="result-header">
                  <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-red), var(--google-orange))' }}>
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="result-title">Career Development</h3>
                </div>
                <div className="result-content">
                  <h4>💼 Professional Growth</h4>
                  <ul>
                    <li>Resume building and review sessions</li>
                    <li>Mock interviews with industry experts</li>
                    <li>LinkedIn profile optimization</li>
                    <li>Soft skills development workshops</li>
                    <li>Internship and job placement assistance</li>
                  </ul>
                  <p><strong>Benefit:</strong> 80% of members get internships</p>
                </div>
              </div>

              <div className="offer-card">
                <div className="result-header">
                  <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-green), var(--google-blue))' }}>
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="result-title">Community Events</h3>
                </div>
                <div className="result-content">
                  <h4>🤝 Network & Connect</h4>
                  <ul>
                    <li>Monthly tech talks by Google developers</li>
                    <li>Networking sessions with alumni</li>
                    <li>Company visit programs</li>
                    <li>Collaboration projects with other universities</li>
                    <li>Social events and team building activities</li>
                  </ul>
                  <p><strong>Network:</strong> 500+ active members</p>
                </div>
              </div>

              <div className="offer-card">
                <div className="result-header">
                  <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-orange), var(--google-red))' }}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="result-title">Competitions & Hackathons</h3>
                </div>
                <div className="result-content">
                  <h4>🏆 Compete & Win</h4>
                  <ul>
                    <li>Google Code-in and Summer of Code prep</li>
                    <li>Internal hackathons with cash prizes</li>
                    <li>Team formations for external competitions</li>
                    <li>Project showcases and demo days</li>
                    <li>Innovation challenges with real-world problems</li>
                  </ul>
                  <p><strong>Prize Pool:</strong> Up to $5,000 per year</p>
                </div>
              </div>

              <div className="offer-card">
                <div className="result-header">
                  <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-blue), var(--google-green))' }}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="result-title">Learning Resources</h3>
                </div>
                <div className="result-content">
                  <h4>📚 Exclusive Access</h4>
                  <ul>
                    <li>Google Cloud credits worth $300/member</li>
                    <li>Free access to premium courses on Coursera</li>
                    <li>Google certification exam vouchers</li>
                    <li>Early access to new Google products/features</li>
                    <li>Mentorship from Google employees</li>
                  </ul>
                  <p><strong>Value:</strong> $1,000+ worth of resources</p>
                </div>
              </div>

              <div className="offer-card">
                <div className="result-header">
                  <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-red), var(--google-blue))' }}>
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="result-title">Recognition & Certificates</h3>
                </div>
                <div className="result-content">
                  <h4>⭐ Achievement Recognition</h4>
                  <ul>
                    <li>Official GDGoC membership certificates</li>
                    <li>Completion certificates for workshops</li>
                    <li>Leadership positions and responsibilities</li>
                    <li>Recommendation letters from organizers</li>
                    <li>Portfolio building assistance</li>
                  </ul>
                  <p><strong>Recognition:</strong> Enhance your resume</p>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <div className="cta-card">
                <h2>Ready to Join Our Tech Community?</h2>
                <p>Don't miss out on these amazing opportunities to grow your tech career!</p>
                <button className="discover-btn" data-testid="join-now-button">
                  <i className="fas fa-rocket mr-2"></i>
                  Join Now - It's Free!
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}