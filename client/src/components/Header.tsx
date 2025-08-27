import { useState } from "react";
import { Users, User, Settings, LogOut, Home } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onDiscoverClick: () => void;
}

export default function Header({ onDiscoverClick }: HeaderProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
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
                <div className="profile-menu-item">
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

      {/* Hero Section */}
      <header className="header pt-24 relative z-10">
        <div className="container max-w-6xl mx-auto px-5">
          <div className="gdgoc-banner">
            <h3>
              <Users className="w-6 h-6" />
              GDGoC FPTU HCMC Club
            </h3>
            <p>Google Developer Groups on Campus</p>
          </div>
          <h1 className="hero-title">Career Compass</h1>
          <p className="hero-subtitle">
            Discover your ideal career path with AI-powered guidance tailored for FPTU students
          </p>
          <button 
            className="discover-btn relative z-10" 
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
