import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Heading, Link2, ShoppingBag, Layers, CheckCircle, Database } from 'lucide-react';

const ResultsPage = ({ currentResult }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine source state or current result
  const resultData = location.state?.resultData || currentResult;
  const fromHistory = location.state?.fromHistory || false;

  const [activeTab, setActiveTab] = useState('headings');

  if (!resultData) {
    return (
      <div className="results-empty card">
        <h2>No Scraping Data Found</h2>
        <p>Please enter a URL on the homepage to view scraped website results.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={18} />
          <span>Go to Home</span>
        </Link>
      </div>
    );
  }

  const {
    url,
    pageTitle,
    scrapedDate,
    headings = [],
    links = [],
    products = [],
    isSampleData = true
  } = resultData;

  const formattedDate = new Date(scrapedDate || Date.now()).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="results-container">
      {/* Top Header Navigation Controls */}
      <div className="results-top-nav">
        {fromHistory ? (
          <button className="btn btn-secondary" onClick={() => navigate('/history')}>
            <ArrowLeft size={18} />
            <span>Back to History</span>
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
        )}

        <div className="mode-badge">
          <Database size={14} />
          <span>Sample Demonstration Data</span>
        </div>
      </div>

      {/* Main Results Details Header Card */}
      <div className="card details-header-card">
        <h1 className="results-main-heading">Scraped Website Details</h1>

        <div className="meta-grid">
          <div className="meta-item">
            <span className="meta-label">Website URL</span>
            <a href={url} target="_blank" rel="noopener noreferrer" className="meta-url-link">
              <span>{url}</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="meta-item">
            <span className="meta-label">Page Title</span>
            <p className="meta-value-title">{pageTitle}</p>
          </div>

          <div className="meta-item">
            <span className="meta-label">Scraped Date & Time</span>
            <p className="meta-value-date">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs matching PDF UI Screenshot */}
      <div className="results-tabs-wrapper">
        <button
          className={`tab-btn ${activeTab === 'headings' ? 'active' : ''}`}
          onClick={() => setActiveTab('headings')}
        >
          <Heading size={16} />
          <span>Headings</span>
          <span className="tab-count">{headings.length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'links' ? 'active' : ''}`}
          onClick={() => setActiveTab('links')}
        >
          <Link2 size={16} />
          <span>Links</span>
          <span className="tab-count">{links.length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <ShoppingBag size={16} />
          <span>Products (Sample)</span>
          <span className="tab-count">{products.length}</span>
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="tab-content card">
        {/* Headings Tab */}
        {activeTab === 'headings' && (
          <div className="headings-section">
            <h3 className="section-title">Website Headings Hierarchy</h3>
            {headings && headings.length > 0 ? (
              <div className="headings-list">
                {headings.map((h, index) => (
                  <div key={index} className="heading-item">
                    <span className={`heading-tag tag-${h.level?.toLowerCase()}`}>
                      {h.level}
                    </span>
                    <span className="heading-text">{h.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-tab-text">No headings were extracted from this website.</p>
            )}
          </div>
        )}

        {/* Links Tab */}
        {activeTab === 'links' && (
          <div className="links-section">
            <h3 className="section-title">Extracted Web Links (Sample)</h3>
            {links && links.length > 0 ? (
              <ul className="links-list">
                {links.map((link, index) => (
                  <li key={index} className="link-item">
                    <span className="link-bullet"></span>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="extracted-link">
                      {link.label || link.href}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-tab-text">No hyperlinks were found on this website.</p>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="products-section">
            <h3 className="section-title">Scraped Products (Sample Catalog)</h3>
            {products && products.length > 0 ? (
              <div className="products-grid">
                {products.map((prod, index) => (
                  <div key={index} className="product-card">
                    <div className="product-badge-row">
                      <span className="badge badge-blue">{prod.category || 'General'}</span>
                      {prod.rating && <span className="product-rating">{prod.rating}</span>}
                    </div>
                    <h4 className="product-name">{prod.name}</h4>
                    <p className="product-price">{prod.price}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-tab-box">
                <p className="empty-tab-text">No e-commerce product data available for this standard domain.</p>
                <p className="empty-sub-text">Try scraping <code>https://www.amazon.in</code> or <code>https://www.flipkart.com</code> to view product catalog data.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .results-container {
          max-width: 950px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .results-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mode-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #EFF6FF;
          color: #1D4ED8;
          border: 1px solid #BFDBFE;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .details-header-card {
          border-left: 5px solid var(--primary-blue);
        }

        .results-main-heading {
          font-size: 1.5rem;
          color: var(--navy-dark);
          margin-bottom: 1.25rem;
        }

        .meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .meta-label {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .meta-url-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
          word-break: break-all;
        }

        .meta-value-title {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .meta-value-date {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        /* Tabs Navigation */
        .results-tabs-wrapper {
          display: flex;
          gap: 0.5rem;
          border-bottom: 2px solid var(--border-light);
          padding-bottom: 0.5rem;
        }

        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border: none;
          background: #F1F5F9;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          background: #E2E8F0;
          color: var(--text-primary);
        }

        .tab-btn.active {
          background: var(--primary-blue);
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
        }

        .tab-count {
          background: rgba(0, 0, 0, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }

        .tab-btn.active .tab-count {
          background: rgba(255, 255, 255, 0.25);
        }

        .section-title {
          font-size: 1.1rem;
          margin-bottom: 1.25rem;
          color: var(--navy-dark);
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 0.5rem;
        }

        /* Headings List */
        .headings-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .heading-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: #F8FAFC;
          padding: 0.65rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
        }

        .heading-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .tag-h1 { background: #DBEAFE; color: #1E40AF; }
        .tag-h2 { background: #E0E7FF; color: #3730A3; }
        .tag-h3 { background: #F3E8FF; color: #6B21A8; }

        .heading-text {
          font-size: 0.95rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        /* Links List */
        .links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .link-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          transition: background 0.15s ease;
        }

        .link-item:hover {
          background: #F1F5F9;
        }

        .link-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-blue);
          flex-shrink: 0;
        }

        .extracted-link {
          font-size: 0.95rem;
          word-break: break-all;
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
        }

        .product-card {
          background: #F8FAFC;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-blue);
        }

        .product-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-rating {
          font-size: 0.8rem;
          font-weight: 600;
          color: #D97706;
          background: #FEF3C7;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }

        .product-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .product-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary-blue);
          margin-top: auto;
        }

        .empty-tab-box {
          text-align: center;
          padding: 2rem 1rem;
        }

        .empty-tab-text {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .empty-sub-text {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .results-empty {
          text-align: center;
          padding: 3rem 1.5rem;
          max-width: 600px;
          margin: 2rem auto;
        }

        @media (max-width: 640px) {
          .meta-grid {
            grid-template-columns: 1fr;
          }

          .results-tabs-wrapper {
            flex-wrap: wrap;
          }

          .tab-btn {
            flex: 1;
            padding: 0.5rem 0.75rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;
