import { Users, Target, Award, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function About() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background-secondary">
        {/* Navigation Bar Placeholder */}
        <div style={{ height: '80px' }}></div>
      
      <main className="main-content">
        <div className="container max-w-6xl mx-auto px-5">
          <section className="section">
            <h1 className="section-title">About Us</h1>
            
            <div className="about-content">
              <div className="about-hero">
                <div className="about-card">
                  <div className="result-header">
                    <div className="result-icon">
                      <Users className="w-6 h-6" />
                    </div>
                    <h2 className="result-title">GDGoC FPTU HCMC</h2>
                  </div>
                  <div className="result-content">
                    <p>
                      Google Developer Groups on Campus (GDGoC) FPTU HCMC is a vibrant community of passionate students 
                      and developers at FPT University Ho Chi Minh City. We are dedicated to fostering innovation, 
                      learning, and collaboration in the field of technology.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-grid">
                <div className="about-card">
                  <div className="result-header">
                    <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-red), var(--google-orange))' }}>
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="result-title">Our Mission</h3>
                  </div>
                  <div className="result-content">
                    <p>
                      To empower FPTU students with cutting-edge technology knowledge, practical skills, 
                      and real-world experience through workshops, events, and collaborative projects using Google technologies.
                    </p>
                  </div>
                </div>

                <div className="about-card">
                  <div className="result-header">
                    <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-blue), var(--google-green))' }}>
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="result-title">What We Do</h3>
                  </div>
                  <div className="result-content">
                    <ul>
                      <li>🚀 Hands-on workshops on Google technologies</li>
                      <li>🎯 Career guidance and mentorship programs</li>
                      <li>💡 Innovation challenges and hackathons</li>
                      <li>🤝 Networking events with industry professionals</li>
                      <li>📚 Study groups and peer learning sessions</li>
                    </ul>
                  </div>
                </div>

                <div className="about-card">
                  <div className="result-header">
                    <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-green), var(--google-orange))' }}>
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="result-title">Why Join Us?</h3>
                  </div>
                  <div className="result-content">
                    <ul>
                      <li>🌟 Access to exclusive Google resources and certifications</li>
                      <li>🔗 Connect with like-minded tech enthusiasts</li>
                      <li>💼 Improve your career prospects with practical skills</li>
                      <li>🏆 Participate in competitions and win exciting prizes</li>
                      <li>👨‍💻 Learn from experienced developers and Google experts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      </div>
    </>
  );
}