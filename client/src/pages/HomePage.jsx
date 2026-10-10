import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCcw, Globe, Info, AlertCircle, CheckCircle2, Database, Laptop, Code } from 'lucide-react';
import { scrapeWebsite, checkHealth } from '../services/api';

const HomePage = ({ setCurrentResult }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [dbStatus, setDbStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check backend health on mount
    const fetchHealth = async () => {
      const health = await checkHealth();
      setDbStatus(health.database);
    };
    fetchHealth();
  }, []);

  const validateUrl = (inputUrl) => {
    if (!inputUrl || inputUrl.trim() === '') {
      return 'Please enter a website URL.';
    }
    const trimmed = inputUrl.trim();
    // Validate basic URL regex format
    const pattern = /^(https?:\/\/)?([\w.-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/i;
    if (!pattern.test(trimmed)) {
      return 'Please enter a valid HTTP or HTTPS URL (e.g. https://www.example.com).';
    }
    return null;
  };

  const handleScrape = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const result = await scrapeWebsite(url);
      setLoading(false);
      
      if (result.success && result.data) {
        setSuccessMsg('Website parsed successfully! Redirecting to details view...');
        setCurrentResult(result.data);
        
        setTimeout(() => {
          navigate('/results', { state: { resultData: result.data, fromHistory: false } });
        }, 800);
      } else {
        setError(result.message || 'Failed to process website data.');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error communicating with backend server.');
    }
  };

  const handleClear = () => {
    setUrl('');
    setError('');
    setSuccessMsg('');
  };

  const setPresetUrl = (sampleUrl) => {
    setUrl(sampleUrl);
    setError('');
  };

  return (
    <div className="home-container">
      {/* DB Status Badge Banner */}
      <div className="db-banner-wrapper">
        {dbStatus && dbStatus.connected ? (
          <div className="db-status-badge db-online">
            <Database size={14} />
            <span>MongoDB Connected: Database <code>webscraper</code> active</span>
          </div>
        ) : (
          <div className="db-status-badge db-offline">
            <Info size={14} />
            <span>Sample Mode Active (Connect Docker / MongoDB to persist to <code>scraped_data</code>)</span>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="hero-card card">
        <div className="hero-content">
          <div className="hero-text-col">
            <h1 className="hero-title">Web Scraper</h1>
            <p className="hero-description">
              Extract valuable data from any website. Enter a website URL, scrape useful information, and save it for later analysis.
            </p>
            <div className="demo-notice">
              <Info size={16} className="notice-icon" />
              <span><strong>Assignment Note:</strong> Actual backend scraping is simulated using realistic static sample datasets as per minor project guidelines.</span>
            </div>
          </div>

          <div className="hero-graphic-col">
            <div className="graphic-container">
              <div className="graphic-screen">
                <Globe size={40} className="globe-icon" />
                <div className="code-badge">
                  <Code size={20} />
                  <span>&lt;/&gt;</span>
                </div>
              </div>
              <div className="graphic-cloud"></div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleScrape} className="scraper-form">
          <div className="form-group">
            <label htmlFor="url-input" className="form-label">
              Website URL
            </label>
            <div className="input-wrapper">
              <Globe className="input-icon" size={20} />
              <input
                id="url-input"
                type="text"
                className={`url-input ${error ? 'input-error' : ''}`}
                placeholder="https://www.amazon.in"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Quick Preset Shortcuts */}
          <div className="preset-shortcuts">
            <span className="preset-label">Try sample URLs:</span>
            <button type="button" className="preset-chip" onClick={() => setPresetUrl('https://www.example.com')}>
              example.com
            </button>
            <button type="button" className="preset-chip" onClick={() => setPresetUrl('https://www.amazon.in')}>
              amazon.in
            </button>
            <button type="button" className="preset-chip" onClick={() => setPresetUrl('https://www.flipkart.com')}>
              flipkart.com
            </button>
            <button type="button" className="preset-chip" onClick={() => setPresetUrl('https://www.wikipedia.org')}>
              wikipedia.org
            </button>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {successMsg && (
            <div className="alert alert-success">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-scrape" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Scraping Website...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>Scrape Website</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-clear"
              onClick={handleClear}
              disabled={loading || !url}
            >
              <RotateCcw size={18} />
              <span>Clear</span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .home-container {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .db-banner-wrapper {
          display: flex;
          justify-content: flex-end;
        }

        .db-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .db-online {
          background: #DCFCE7;
          color: #15803D;
          border: 1px solid #86EFAC;
        }

        .db-offline {
          background: #EFF6FF;
          color: #1D4ED8;
          border: 1px solid #BFDBFE;
        }

        .hero-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--border-light);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 2rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 2.2rem;
          color: var(--navy-dark);
          margin-bottom: 0.5rem;
          font-weight: 800;
        }

        .hero-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        .demo-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          background: #F0F9FF;
          border: 1px solid #BAE6FD;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: #0369A1;
        }

        .notice-icon {
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Graphic Vector Box */
        .hero-graphic-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .graphic-container {
          position: relative;
          width: 180px;
          height: 130px;
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
          border-radius: 12px;
          border: 2px solid #BFDBFE;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.12);
        }

        .graphic-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .globe-icon {
          color: #2563EB;
        }

        .code-badge {
          background: #2563EB;
          color: #ffffff;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Form Controls */
        .scraper-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
        }

        .url-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          font-size: 1rem;
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          outline: none;
          transition: all 0.2s ease;
          background: #FAFAFA;
        }

        .url-input:focus {
          border-color: var(--primary-blue);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
        }

        .input-error {
          border-color: #EF4444 !important;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
        }

        /* Preset Chips */
        .preset-shortcuts {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
        }

        .preset-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .preset-chip {
          background: #F1F5F9;
          border: 1px solid var(--border-light);
          color: var(--primary-blue);
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .preset-chip:hover {
          background: #DBEAFE;
          border-color: #93C5FD;
        }

        /* Alerts */
        .alert {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .alert-danger {
          background: #FEF2F2;
          color: #991B1B;
          border: 1px solid #FCA5A5;
        }

        .alert-success {
          background: #F0FDF4;
          color: #166534;
          border: 1px solid #86EFAC;
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-scrape {
          flex: 2;
          padding: 0.9rem;
          font-size: 1rem;
        }

        .btn-clear {
          flex: 1;
        }

        @media (max-width: 768px) {
          .hero-card {
            padding: 1.5rem;
          }

          .hero-content {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .hero-graphic-col {
            display: none;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
