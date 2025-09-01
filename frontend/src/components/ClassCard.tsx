import React from 'react';
import { ClassSession } from '../types';

interface Props {
  session: ClassSession;
  onBook?: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onTrainerClick?: () => void;
  booked?: boolean;
  isFull?: boolean;
  isAdmin?: boolean;
}

const ClassCard: React.FC<Props> = ({ session, onBook, onCancel, onEdit, onDelete, onTrainerClick, booked, isFull, isAdmin }) => {
  const availableSeats = session.capacity - session.booked;
  const isAlmostFull = availableSeats <= 3 && availableSeats > 0;
  
  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title mb-0 text-primary">{session.courseName}</h5>
          <div>
            {booked && <span className="badge bg-success">✅ Booked</span>}
            {isFull && !booked && <span className="badge bg-danger">❌ Full</span>}
            {isAlmostFull && !booked && <span className="badge bg-warning text-dark">⚠️ Almost Full</span>}
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-8">
            <p className="card-text">
              <strong>👨‍💼 Trainer:</strong> 
              {onTrainerClick ? (
                <button
                  className="btn btn-link p-0 text-decoration-none fw-semibold"
                  onClick={onTrainerClick}
                  style={{ 
                    color: '#3b82f6',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1d4ed8';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#3b82f6';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {session.trainerName}
                </button>
              ) : (
                session.trainerName
              )}<br />
              <strong>📅 Date & Time:</strong> {new Date(session.dateTime).toLocaleString()}<br />
              <strong>💺 Seats:</strong> {session.booked}/{session.capacity} 
              <span className="text-muted"> ({availableSeats} available)</span>
            </p>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-end">
            <div className="d-grid gap-2 w-100">
              {isAdmin && (
                <>
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={onEdit}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={onDelete}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    🗑️ Delete
                  </button>
                </>
              )}
              {onBook && !booked && !isFull && !isAdmin && (
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to book a seat in "${session.courseName}"?`)) {
                      onBook();
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 20px',
                    fontWeight: '600',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  📚 Book Seat
                </button>
              )}
              {onCancel && booked && !isAdmin && (
                <button 
                  className="btn btn-outline-warning" 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to cancel your booking for "${session.courseName}"?`)) {
                      onCancel();
                    }
                  }}
                  style={{
                    borderRadius: '12px',
                    padding: '10px 20px',
                    fontWeight: '600',
                    boxShadow: '0 2px 8px rgba(255, 193, 7, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 193, 7, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 193, 7, 0.3)';
                  }}
                >
                  ❌ Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;

