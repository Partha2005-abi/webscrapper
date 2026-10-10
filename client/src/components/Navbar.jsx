import React from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, History, HelpCircle, Code2 } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <NavLink to="/" className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Globe className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Web Scraper</span>
            <span className="brand-badge">MERN Minor</span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Globe size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/history" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <History size={18} />
            <span>History</span>
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <HelpCircle size={18} />
            <span>About/Help</span>
          </NavLink>
        </nav>
      </div>

      <style>{`
        .navbar-header {
          background-color: var(--navy-dark);
          background: linear-gradient(90deg, #0B192C 0%, #1E3A8A 100%);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.85rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #ffffff;
          text-decoration: none;
        }

        .brand-icon-wrapper {
          background: rgba(255, 255, 255, 0.15);
          padding: 0.5rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        .brand-icon {
          color: #60A5FA;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .brand-badge {
          font-size: 0.65rem;
          color: #93C5FD;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1.1rem;
          color: #93C5FD;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          text-decoration: none;
        }

        .nav-link.active {
          color: #ffffff;
          background: var(--primary-blue);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .navbar-container {
            padding: 0.75rem 1rem;
          }

          .brand-badge {
            display: none;
          }

          .nav-link span {
            display: none;
          }

          .nav-link {
            padding: 0.55rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
