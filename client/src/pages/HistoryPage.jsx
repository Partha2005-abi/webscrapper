import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Eye, Trash2, ExternalLink, RefreshCw, AlertCircle, Database, CheckCircle2 } from 'lucide-react';
import { getHistory, deleteHistory } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const HistoryPage = ({ setCurrentResult }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dataSource, setDataSource] = useState('');
  
  // Deletion Modal State
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  const navigate = useNavigate();

  const fetchRecords = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getHistory();
      if (response.success) {
        setRecords(response.data || []);
        setDataSource(response.source || 'MongoDB (webscraper)');
      } else {
        setError(response.message || 'Could not fetch history.');
      }
    } catch (err) {
      setError(err.message || 'Error connecting to backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleView = (record) => {
    setCurrentResult(record);
    navigate('/results', { state: { resultData: record, fromHistory: true } });
  };

  const openDeleteModal = (id) => {
    setSelectedRecordId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRecordId) return;
    setIsDeleting(true);
    setActionNotice('');
    try {
      const response = await deleteHistory(selectedRecordId);
      if (response.success) {
        setActionNotice('Record successfully deleted.');
        setRecords(records.filter(r => r._id !== selectedRecordId));
        setTimeout(() => setActionNotice(''), 3000);
      } else {
        setError(response.message || 'Failed to delete record.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred during deletion.');
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setSelectedRecordId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="history-container">
      {/* Header Bar */}
      <div className="history-header card">
        <div className="header-left">
          <div className="history-icon-box">
            <History size={26} className="history-icon" />
          </div>
          <div>
            <h1 className="history-title">Scraping History</h1>
            <p className="history-subtitle">View previously scraped website records stored in database.</p>
          </div>
        </div>

        <div className="header-right">
          <button className="btn btn-secondary btn-refresh" onClick={fetchRecords} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spinner-blue' : ''} />
            <span>Refresh List</span>
          </button>
        </div>
      </div>

      {/* Action Banner Alerts */}
      {actionNotice && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{actionNotice}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Table View */}
      <div className="card table-card">
        <div className="table-meta-bar">
          <span className="count-label">Total Saved Records: <strong>{records.length}</strong></span>
          {dataSource && (
            <span className="source-label">
              <Database size={13} />
              <span>Source: {dataSource}</span>
            </span>
          )}
        </div>

        {loading ? (
          <div className="loading-box">
            <span className="spinner spinner-blue" style={{ width: '2rem', height: '2rem' }}></span>
            <p>Loading scraping history from MongoDB...</p>
          </div>
        ) : records.length > 0 ? (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>#</th>
                  <th>Website URL</th>
                  <th>Page Title</th>
                  <th>Scraped On</th>
                  <th style={{ width: '160px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item, index) => (
                  <tr key={item._id || index}>
                    <td><strong>{index + 1}</strong></td>
                    <td>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="table-url-link">
                        <span>{item.url}</span>
                        <ExternalLink size={12} />
                      </a>
                    </td>
                    <td>
                      <span className="table-page-title">{item.pageTitle}</span>
                    </td>
                    <td>
                      <span className="table-date">{formatDate(item.scrapedDate)}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-view"
                          onClick={() => handleView(item)}
                          title="View Details"
                        >
                          <Eye size={15} />
                          <span>View</span>
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => openDeleteModal(item._id)}
                          title="Delete Record"
                        >
                          <Trash2 size={15} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-history-box">
            <History size={48} className="empty-icon" />
            <h3>No Scraping History Available</h3>
            <p>You have not scraped any websites yet. Enter a URL on the homepage to start recording data.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
              Scrape Your First Website
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete History Record"
        message="Are you sure you want to delete this scraped website record from MongoDB? This action is permanent."
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isDeleting}
      />

      <style>{`
        .history-container {
          max-width: 1050px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .history-icon-box {
          background: #DBEAFE;
          color: var(--primary-blue);
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .history-title {
          font-size: 1.5rem;
          color: var(--navy-dark);
          line-height: 1.2;
        }

        .history-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .table-card {
          padding: 1.5rem;
        }

        .table-meta-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .source-label {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #F1F5F9;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .table-url-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 500;
          color: var(--primary-blue);
          max-width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .table-page-title {
          font-weight: 500;
          color: var(--text-primary);
          max-width: 300px;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .table-date {
          font-size: 0.85rem;
          color: var(--text-muted);
          white-space: nowrap;
        }

        /* Action Buttons matching reference screenshot */
        .action-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.8rem;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-view {
          background: var(--primary-blue);
          color: #ffffff;
        }

        .btn-view:hover {
          background: var(--primary-hover);
        }

        .btn-delete {
          background: #FEF2F2;
          color: #EF4444;
          border: 1px solid #FCA5A5;
        }

        .btn-delete:hover {
          background: #EF4444;
          color: #ffffff;
        }

        .loading-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 3rem 1rem;
          color: var(--text-muted);
        }

        .empty-history-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3.5rem 1.5rem;
          text-align: center;
          color: var(--text-secondary);
        }

        .empty-icon {
          color: #94A3B8;
          margin-bottom: 1rem;
        }

        @media (max-width: 640px) {
          .history-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .header-right {
            width: 100%;
          }

          .btn-refresh {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default HistoryPage;
