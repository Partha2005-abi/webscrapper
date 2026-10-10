import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box card">
        <button className="modal-close-btn" onClick={onCancel} disabled={isLoading}>
          <X size={20} />
        </button>

        <div className="modal-content">
          <div className="modal-icon-wrapper">
            <AlertTriangle size={32} className="warning-icon" />
          </div>
          <h3 className="modal-title">{title || 'Confirm Deletion'}</h3>
          <p className="modal-message">{message || 'Are you sure you want to delete this record? This action cannot be undone.'}</p>
          
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onCancel} disabled={isLoading}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner" style={{ width: '1rem', height: '1rem' }}></span>
                  Deleting...
                </>
              ) : (
                'Delete Record'
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-box {
          position: relative;
          max-width: 440px;
          width: 100%;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-xl);
        }

        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: 50%;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close-btn:hover {
          background: #F1F5F9;
          color: var(--text-primary);
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .modal-icon-wrapper {
          background: #FEF2F2;
          padding: 0.85rem;
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        .warning-icon {
          color: #EF4444;
        }

        .modal-title {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .modal-message {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .modal-actions {
          display: flex;
          gap: 0.75rem;
          width: 100%;
          justify-content: flex-end;
        }

        .modal-actions .btn {
          flex: 1;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
