import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p className="footer-title">Web Scraper MERN Application — Minor Project</p>
          <p className="footer-sub">B.Tech CSIT 5th Semester | AY 2026–2027 | Web Application Projects with React (CSE 3395)</p>
        </div>
        <div className="footer-meta">
          <span className="tech-tag">React.js + Vite</span>
          <span className="tech-tag">Node.js / Express</span>
          <span className="tech-tag">MongoDB (webscraper)</span>
          <span className="tech-tag">Docker Compose</span>
        </div>
      </div>

      <style>{`
        .footer {
          background: #0F172A;
          color: #94A3B8;
          padding: 1.5rem 1rem;
          border-top: 1px solid #1E293B;
          margin-top: auto;
          font-size: 0.85rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          text-align: center;
        }

        .footer-title {
          color: #E2E8F0;
          font-weight: 600;
        }

        .footer-sub {
          font-size: 0.8rem;
          color: #64748B;
        }

        .footer-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        .tech-tag {
          background: #1E293B;
          color: #38BDF8;
          padding: 0.15rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
