import { Mail, Phone, MapPin, Clock, Users, Send } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Contact() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background-secondary">
        {/* Navigation Bar Placeholder */}
        <div style={{ height: '80px' }}></div>
      
      <main className="main-content">
        <div className="container max-w-6xl mx-auto px-5">
          <section className="section">
            <h1 className="section-title">Contact Us</h1>
            
            <div className="contact-container">
              <div className="contact-info">
                <div className="contact-card">
                  <div className="result-header">
                    <div className="result-icon">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="result-title">Get in Touch</h3>
                  </div>
                  <div className="result-content">
                    <p>
                      We'd love to hear from you! Whether you have questions about joining, 
                      suggestions for events, or want to collaborate with us, don't hesitate to reach out.
                    </p>
                  </div>
                </div>

                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>gdgoc.fptu.hcmc@gmail.com</p>
                      <p className="contact-note">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4>Phone</h4>
                      <p>+84 (0)28 7300 5588</p>
                      <p className="contact-note">Mon-Fri, 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4>Location</h4>
                      <p>FPT University Ho Chi Minh City</p>
                      <p>Lot E2a-7, D1 Street, Long Thanh My Ward</p>
                      <p>Thu Duc City, Ho Chi Minh City, Vietnam</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4>Office Hours</h4>
                      <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-section">
                <div className="contact-card">
                  <div className="result-header">
                    <div className="result-icon" style={{ background: 'linear-gradient(135deg, var(--google-green), var(--google-blue))' }}>
                      <Send className="w-6 h-6" />
                    </div>
                    <h3 className="result-title">Send Us a Message</h3>
                  </div>
                  <div className="result-content">
                    <form className="contact-form">
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">
                          <i className="fas fa-user mr-2"></i>
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-input"
                          placeholder="Enter your full name"
                          data-testid="input-name"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          <i className="fas fa-envelope mr-2"></i>
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-input"
                          placeholder="Enter your email address"
                          data-testid="input-email"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="student-id">
                          <i className="fas fa-id-card mr-2"></i>
                          Student ID (Optional)
                        </label>
                        <input
                          type="text"
                          id="student-id"
                          className="form-input"
                          placeholder="Enter your FPTU student ID"
                          data-testid="input-student-id"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="subject">
                          <i className="fas fa-tag mr-2"></i>
                          Subject
                        </label>
                        <select
                          id="subject"
                          className="form-select"
                          data-testid="select-subject"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="membership">Join GDGoC</option>
                          <option value="workshop">Workshop Inquiry</option>
                          <option value="collaboration">Partnership/Collaboration</option>
                          <option value="feedback">Feedback</option>
                          <option value="support">Technical Support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="message">
                          <i className="fas fa-comment mr-2"></i>
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="form-input"
                          rows={6}
                          placeholder="Tell us more about your inquiry..."
                          data-testid="textarea-message"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="submit-btn"
                        data-testid="button-send-message"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="social-section">
              <div className="social-card">
                <h3>Follow Us on Social Media</h3>
                <div className="social-links-grid">
                  <a href="#" className="social-link" data-testid="social-facebook">
                    <i className="fab fa-facebook"></i>
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="social-link" data-testid="social-instagram">
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-link" data-testid="social-linkedin">
                    <i className="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="social-link" data-testid="social-discord">
                    <i className="fab fa-discord"></i>
                    <span>Discord</span>
                  </a>
                  <a href="#" className="social-link" data-testid="social-github">
                    <i className="fab fa-github"></i>
                    <span>GitHub</span>
                  </a>
                  <a href="#" className="social-link" data-testid="social-telegram">
                    <i className="fab fa-telegram"></i>
                    <span>Telegram</span>
                  </a>
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