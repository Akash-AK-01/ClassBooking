import React from 'react';

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  workExperience: string;
}

const TrainersPage: React.FC = () => {
  const [trainers, setTrainers] = React.useState<Trainer[]>([
    { id: '1', name: 'Ms. Sarah', email: 'sarah@example.com', phone: '+1234567890', specialization: 'Full Stack Development', workExperience: '5 years' },
    { id: '2', name: 'Mr. John', email: 'john@example.com', phone: '+1234567891', specialization: 'Python Programming', workExperience: '3 years' },
    { id: '3', name: 'Mr. David', email: 'david@example.com', phone: '+1234567892', specialization: 'Database Management', workExperience: '7 years' },
    { id: '4', name: 'Ms. Lisa', email: 'lisa@example.com', phone: '+1234567893', specialization: 'Java Development', workExperience: '4 years' }
  ]);
  const [newTrainer, setNewTrainer] = React.useState({ name: '', email: '', phone: '', specialization: '', workExperience: '' });

  function handleAddTrainer(e: React.FormEvent) {
    e.preventDefault();
    if (trainers.some(t => t.email === newTrainer.email)) {
      alert('Trainer with this email already exists!');
      return;
    }
    setTrainers([...trainers, { ...newTrainer, id: Date.now().toString() }]);
    setNewTrainer({ name: '', email: '', phone: '', specialization: '', workExperience: '' });
  }

  function handleDeleteTrainer(trainerId: string) {
    const trainerToDelete = trainers.find(t => t.id === trainerId);
    if (trainerToDelete && window.confirm(`Are you sure you want to delete trainer "${trainerToDelete.name}"?`)) {
      setTrainers(trainers.filter(t => t.id !== trainerId));
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">👨‍💼 Trainers Management</h2>
          
          {/* Add Trainer Form */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">➕ Add New Trainer</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddTrainer}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Trainer Name"
                      value={newTrainer.name}
                      onChange={e => setNewTrainer({...newTrainer, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={newTrainer.email}
                      onChange={e => setNewTrainer({...newTrainer, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      value={newTrainer.phone}
                      onChange={e => setNewTrainer({...newTrainer, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Specialization"
                      value={newTrainer.specialization}
                      onChange={e => setNewTrainer({...newTrainer, specialization: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Work Experience (e.g., 5 years)"
                      value={newTrainer.workExperience}
                      onChange={e => setNewTrainer({...newTrainer, workExperience: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontWeight: '500'
                      }}
                    >
                      Add Trainer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Trainers List */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">📋 All Trainers ({trainers.length})</h5>
            </div>
            <div className="card-body">
              {trainers.length === 0 ? (
                <p className="text-muted">No trainers registered yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.map(trainer => (
                        <tr key={trainer.id}>
                          <td>{trainer.name}</td>
                          <td>{trainer.email}</td>
                          <td>{trainer.phone}</td>
                          <td>{trainer.specialization}</td>
                          <td>{trainer.workExperience}</td>
                          <td>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteTrainer(trainer.id)}
                              style={{
                                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 107, 107, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainersPage;
