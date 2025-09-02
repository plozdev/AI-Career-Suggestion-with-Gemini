export default function Footer() {
  return (
    <footer className="footer">
      <div className="container max-w-6xl mx-auto px-5">
        <p><strong>GDGoC FPTU HCMC</strong> - Empowering students through technology</p>
        <p>Join our community of developers, designers, and innovators!</p>
        <div className="social-links">
          <a 
            href="https://www.facebook.com/gdg.fptu.hcmc" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook" 
            data-testid="link-facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a 
            href="https://gdg.community.dev/gdg-on-campus-fpt-university-ho-chi-minh-city-vietnam/" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GDG Community" 
            data-testid="link-gdg"
          >
            <i className="fab fa-google"></i>
          </a>
          <a 
            href="https://www.linkedin.com/company/gdg-fptu-hcmc/posts/?feedView=all&viewAsMember=true" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn" 
            data-testid="link-linkedin"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href="https://github.com/gdgocfptuhcmc" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub" 
            data-testid="link-github"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <p style={{ marginTop: '20px', opacity: '0.8' }}>
          © 2025 GDGoC FPTU HCMC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
