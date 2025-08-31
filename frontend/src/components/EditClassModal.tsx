import React from 'react';
import { ClassSession } from '../types';

interface Props {
  classSession: ClassSession | null;
  onSave: (updatedClass: ClassSession) => void;
  onClose: () => void;
}

const EditClassModal: React.FC<Props> = ({ classSession, onSave, onClose }) => {
  const [courseName, setCourseName] = React.useState(classSession?.courseName || '');
  const [trainerName, setTrainerName] = React.useState(classSession?.trainerName || '');
  const [fees, setFees] = React.useState(classSession?.fees || '');
  const [capacity, setCapacity] = React.useState(classSession?.capacity.toString() || '');

  React.useEffect(() => {
    if (classSession) {
      setCourseName(classSession.courseName);
      setTrainerName(classSession.trainerName);
      setFees(classSession.fees);
      setCapacity(classSession.capacity.toString());
    }
  }, [classSession]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (classSession && courseName.trim() && trainerName.trim() && fees.trim() && capacity.trim()) {
      const updatedClass: ClassSession = {
        ...classSession,
        courseName,
        trainerName,
        fees,
        capacity: parseInt(capacity),
      };
      onSave(updatedClass);
      onClose();
    }
  };

  if (!classSession) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
          <div className="modal-header" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '10px 10px 0 0' }}>
            <h5 className="modal-title">✏️ Edit Class Details</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">📚 Course Name</label>
                  <input
                    className="form-control"
                    placeholder="Enter course name"
                    value={courseName}
                    onChange={e => setCourseName(e.target.value)}
                    required
                    style={{ borderColor: '#007bff' }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">👨‍🏫 Trainer Name</label>
                  <input
                    className="form-control"
                    placeholder="Enter trainer name"
                    value={trainerName}
                    onChange={e => setTrainerName(e.target.value)}
                    required
                    style={{ borderColor: '#007bff' }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">💰 Fees</label>
                  <input
                    className="form-control"
                    placeholder="Enter fees"
                    value={fees}
                    onChange={e => setFees(e.target.value)}
                    required
                    style={{ borderColor: '#007bff' }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">👥 Capacity</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter capacity"
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    required
                    style={{ borderColor: '#007bff' }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ backgroundColor: '#f8f9fa', borderRadius: '0 0 10px 10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                style={{ borderRadius: '5px' }}
              >
                ❌ Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ borderRadius: '5px', backgroundColor: '#28a745', borderColor: '#28a745' }}
              >
                💾 Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClassModal;
