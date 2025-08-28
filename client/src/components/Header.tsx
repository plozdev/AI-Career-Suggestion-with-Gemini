import { useState, useEffect } from "react";
import { Users, User, Settings, LogOut, Home, Moon, Sun, Globe, LogIn } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onDiscoverClick: () => void;
}

export default function Header({ onDiscoverClick }: HeaderProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`navbar ${isHeaderVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="container max-w-6xl mx-auto px-5 flex justify-between items-center">
          {/* Logo and Brand */}
          <Link href="/" className="navbar-brand">
            <Users className="w-6 h-6" />
            <span>Career Compass</span>
          </Link>

          {/* Navigation Menu */}
          <div className="navbar-menu">
            <Link href="/" className="navbar-link" data-testid="nav-home">
              Home
            </Link>
            <Link href="/about" className="navbar-link" data-testid="nav-about">
              About Us
            </Link>
            <Link href="/offer" className="navbar-link" data-testid="nav-offer">
              Offer
            </Link>
            <Link href="/contact" className="navbar-link" data-testid="nav-contact">
              Contact Us
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="profile-dropdown">
            <button
              className="profile-btn"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              data-testid="profile-button"
            >
              <User className="w-5 h-5" />
            </button>
            {isProfileDropdownOpen && (
              <div className="profile-menu" data-testid="profile-menu">
                <div className="profile-menu-item">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </div>
                <div 
                  className="profile-menu-item"
                  onClick={() => {
                    setIsSettingsOpen(true);
                    setIsProfileDropdownOpen(false);
                  }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </div>
                <div className="profile-menu-divider"></div>
                <div className="profile-menu-item">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="settings-modal" data-testid="settings-modal">
          <div className="settings-content">
            <div className="settings-header">
              <h3>Settings</h3>
              <button 
                className="settings-close"
                onClick={() => setIsSettingsOpen(false)}
                data-testid="settings-close"
              >
                ×
              </button>
            </div>
            <div className="settings-body">
              <div className="settings-section">
                <h4><Sun className="w-4 h-4" /> Theme</h4>
                <div className="settings-options">
                  <label className="settings-option">
                    <input type="radio" name="theme" value="light" defaultChecked />
                    <span>Light Mode</span>
                  </label>
                  <label className="settings-option">
                    <input type="radio" name="theme" value="dark" />
                    <span>Dark Mode</span>
                  </label>
                  <label className="settings-option">
                    <input type="radio" name="theme" value="auto" />
                    <span>Auto (System)</span>
                  </label>
                </div>
              </div>
              <div className="settings-section">
                <h4><Globe className="w-4 h-4" /> Language</h4>
                <div className="settings-options">
                  <label className="settings-option">
                    <input type="radio" name="language" value="en" defaultChecked />
                    <span>English</span>
                  </label>
                  <label className="settings-option">
                    <input type="radio" name="language" value="vi" />
                    <span>Tiếng Việt</span>
                  </label>
                </div>
              </div>
              <div className="settings-section">
                <h4><User className="w-4 h-4" /> Account</h4>
                <div className="settings-options">
                  <button className="settings-btn login-btn">
                    <LogIn className="w-4 h-4" />
                    Sign In with Google
                  </button>
                  <button className="settings-btn logout-btn">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Background */}
      <header className="header-with-bg pt-24 relative z-10">
        <div className="header-bg-overlay"></div>
        <div className="container max-w-6xl mx-auto px-5 relative z-20">
          {/* <div className="gdgoc-banner absolute">
            <h3>
              <Users className="w-6 h-6" />
              GDGoC FPTU HCMC Club
            </h3>
            <p>Google Developer Groups on Campus</p>
          </div> */}
          <h1 className="hero-title">Career Compass</h1>
          <p className="hero-subtitle">
            Discover your ideal career path with AI-powered guidance tailored for FPTU students
          </p>
          <button 
            className="discover-btn z-10" 
            onClick={onDiscoverClick}
            data-testid="button-discover-path"
          >
            <i className="fas fa-compass mr-2"></i>
            Discover Your Path
          </button>
        </div>
      </header>
    </>
  );
}
