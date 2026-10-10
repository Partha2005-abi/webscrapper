import React from 'react';
import { HelpCircle, Code, Server, Database, Container, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Header Banner */}
      <div className="about-header card">
        <div className="header-icon-badge">
          <HelpCircle size={32} />
        </div>
        <div>
          <h1 className="about-title">About Web Scraper MERN Application</h1>
          <p className="about-subtitle">
            B.Tech CSIT 5th Semester Minor Project | Web Application Projects with React (CSE 3395)
          </p>
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid-2col">
        <div className="card tech-card">
          <h3 className="card-section-title">
            <Code className="icon-blue" size={20} />
            <span>Frontend Architecture</span>
          </h3>
          <ul className="feature-list">
            <li><strong>Framework:</strong> React 18 with Vite build tool</li>
            <li><strong>Routing:</strong> React Router DOM v6</li>
            <li><strong>Icons & UI:</strong> Lucide React + Vanilla CSS design system</li>
            <li><strong>API Service:</strong> Axios HTTP Client</li>
          </ul>
        </div>

        <div className="card tech-card">
          <h3 className="card-section-title">
            <Server className="icon-blue" size={20} />
            <span>Backend & Database Stack</span>
          </h3>
          <ul className="feature-list">
            <li><strong>Runtime & API:</strong> Node.js & Express.js REST API</li>
            <li><strong>Database:</strong> MongoDB (Database: <code>webscraper</code>)</li>
            <li><strong>Collection:</strong> <code>scraped_data</code> via Mongoose ORM</li>
            <li><strong>Containerization:</strong> Docker & Docker Compose</li>
          </ul>
        </div>
      </div>

      {/* Assignment Guidelines & Mode Notice */}
      <div className="card notice-card">
        <h3 className="card-section-title">
          <ShieldCheck className="icon-green" size={22} />
          <span>Academic Compliance & Demonstration Mode</span>
        </h3>
        <p className="notice-body">
          Per the assignment instructions, live web scraping through third-party services or puppeteer overhead is not required. The application implements a transparent, fully documented <strong>Sample Data Demonstration Mode</strong>.
        </p>
        <div className="features-badge-row">
          <span className="badge badge-green"><CheckCircle2 size={13} /> Preset Datasets for Amazon, Flipkart, Wikipedia, Example.com</span>
          <span className="badge badge-blue"><CheckCircle2 size={13} /> Dynamic Structured Generator for Any Custom URL</span>
          <span className="badge badge-amber"><CheckCircle2 size={13} /> Full CRUD Persistence in MongoDB</span>
        </div>
      </div>

      {/* FAQ & Viva Help Section */}
      <div className="card faq-card">
        <h3 className="card-section-title">
          <Terminal className="icon-blue" size={20} />
          <span>Frequently Asked Questions & Viva Guidance</span>
        </h3>

        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. How is data persisted in the application?</h4>
            <p className="faq-answer">
              When a URL is submitted, the Express server formats the payload and saves it as a Mongoose document inside MongoDB under database <code>webscraper</code> and collection <code>scraped_data</code>.
            </p>
          </div>

          <div className="faq-item">
            <h4 className="faq-question">2. How to run MongoDB with Docker Compose?</h4>
            <p className="faq-answer">
              Execute <code>docker-compose up -d</code> in the root directory. This launches a containerized MongoDB service listening on port <code>27017</code> with persistent volume storage.
            </p>
          </div>

          <div className="faq-item">
            <h4 className="faq-question">3. How to verify data with <code>mongosh</code>?</h4>
            <p className="faq-answer">
              Run <code>docker exec -it webscraper-mongodb mongosh</code> then execute <code>use webscraper</code> and <code>db.scraped_data.find().pretty()</code>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-container {
          max-width: 950px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .about-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%);
          color: #ffffff;
        }

        .header-icon-badge {
          background: rgba(255, 255, 255, 0.15);
          padding: 0.85rem;
          border-radius: 12px;
          color: #60A5FA;
        }

        .about-title {
          font-size: 1.6rem;
          color: #ffffff;
        }

        .about-subtitle {
          color: #93C5FD;
          font-size: 0.95rem;
        }

        .grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .card-section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          color: var(--navy-dark);
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 0.5rem;
        }

        .icon-blue { color: var(--primary-blue); }
        .icon-green { color: #16A34A; }

        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .notice-card {
          background: #F0FDF4;
          border: 1px solid #86EFAC;
        }

        .notice-body {
          font-size: 0.95rem;
          color: #166534;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .features-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: #F8FAFC;
          padding: 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
        }

        .faq-question {
          font-size: 0.95rem;
          color: var(--navy-dark);
          margin-bottom: 0.35rem;
        }

        .faq-answer {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .grid-2col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
