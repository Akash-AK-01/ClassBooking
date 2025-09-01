import React from 'react';
import { useBookings } from '../hooks/useBookings';
import ClassCard from '../components/ClassCard';

interface Props {
  user: { email: string };
}

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  workExperience: string;
}

const StudentPortal: React.FC<Props> = ({ user }) => {
  const { classes, bookings, bookSeat, cancelBooking } = useBookings();
  const [selectedTrainer, setSelectedTrainer] = React.useState<Trainer | null>(null);
  
  const trainers: Trainer[] = [
    { id: '1', name: 'Ms. Sarah', email: 'sarah@example.com', phone: '+1234567890', specialization: 'Full Stack Development', workExperience: '5 years' },
    { id: '2', name: 'Mr. John', email: 'john@example.com', phone: '+1234567891', specialization: 'Python Programming', workExperience: '3 years' },
    { id: '3', name: 'Mr. David', email: 'david@example.com', phone: '+1234567892', specialization: 'Database Management', workExperience: '7 years' },
    { id: '4', name: 'Ms. Lisa', email: 'lisa@example.com', phone: '+1234567893', specialization: 'Java Development', workExperience: '4 years' }
  ];
  
  function showTrainerDetails(trainerName: string) {
    const trainer = trainers.find(t => t.name === trainerName);
    if (trainer) {
      setSelectedTrainer(trainer);
    }
  }

  const myBookings = bookings.filter(b => b.studentEmail === user.email);
  const myClasses = classes.filter(session => 
    myBookings.some(b => b.classId === session.id)
  );

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary mb-2">👨‍🎓 Student Portal</h1>
            <p className="lead text-muted">Welcome back! Manage your class bookings</p>
          </div>
          
          {/* My Bookings Summary */}
          <div className="row g-4 mb-5 justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card h-100 shadow-sm border-0" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-bookmark fa-3x opacity-75"></i>
                  </div>
                  <h5 className="card-title fw-bold mb-2">My Bookings</h5>
                  <h1 className="display-4 fw-bold mb-0">{myBookings.length}</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-8">
              <div className="card h-100 shadow-sm border-0" style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white'
              }}>
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-chalkboard fa-3x opacity-75"></i>
                  </div>
                  <h5 className="card-title fw-bold mb-2">Available Classes</h5>
                  <h1 className="display-4 fw-bold mb-0">{classes.filter(c => c.booked < c.capacity).length}</h1>
                </div>
              </div>
            </div>
          </div>

          {/* My Booked Classes */}
          <div className="card mb-5 shadow-sm border-0">
            <div className="card-header bg-light text-center py-3 border-bottom">
              <h4 className="mb-0 fw-bold text-dark">✅ My Classes ({myClasses.length})</h4>
            </div>
            <div className="card-body p-4">
              {myClasses.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-calendar-plus fa-3x text-muted mb-3"></i>
                  <p className="text-muted fs-5">You haven't booked any classes yet.</p>
                  <p className="text-muted">Browse available classes below to get started!</p>
                </div>
              ) : (
                <div className="row g-3">
                  {myClasses.map(session => (
                    <div key={session.id} className="col-12">
                      <ClassCard
                        session={session}
                        booked={true}
                        isFull={false}
                        onCancel={() => cancelBooking(session.id, user.email)}
                        onTrainerClick={() => showTrainerDetails(session.trainerName)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Available Classes */}
          <div className="card mb-5 shadow-sm border-0">
            <div className="card-header bg-light text-center py-3 border-bottom">
              <h4 className="mb-0 fw-bold text-dark">📚 Available Classes</h4>
            </div>
            <div className="card-body p-4">
              {classes.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-chalkboard fa-3x text-muted mb-3"></i>
                  <p className="text-muted fs-5">No classes available.</p>
                </div>
              ) : (
                <div className="row g-3">
                  {classes.map(session => {
                    const booked = bookings.some(b => b.classId === session.id && b.studentEmail === user.email);
                    const isFull = session.booked >= session.capacity;
                    return (
                      <div key={session.id} className="col-12">
                        <ClassCard
                          session={session}
                          booked={booked}
                          isFull={isFull}
                          onBook={() => bookSeat(session.id, user.email)}
                          onCancel={() => cancelBooking(session.id, user.email)}
                          onTrainerClick={() => showTrainerDetails(session.trainerName)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Trainer Details Modal */}
      {selectedTrainer && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">👨‍💼 Trainer Details</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setSelectedTrainer(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title text-primary">📝 Personal Information</h6>
                        <p><strong>Name:</strong> {selectedTrainer.name}</p>
                        <p><strong>Email:</strong> {selectedTrainer.email}</p>
                        <p><strong>Phone:</strong> {selectedTrainer.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title text-primary">🎓 Professional Details</h6>
                        <p><strong>Specialization:</strong> {selectedTrainer.specialization}</p>
                        <p><strong>Work Experience:</strong> {selectedTrainer.workExperience}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setSelectedTrainer(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;