import React from 'react';
import { useBookings } from '../hooks/useBookings';
import BookingForm from '../components/BookingForm';
import ClassCard from '../components/ClassCard';
import EditClassModal from '../components/EditClassModal';
import { Student, ClassSession } from '../types';

const AdminDashboard: React.FC = () => {
  const { classes, bookings, setClasses } = useBookings();
    const [students] = React.useState<Student[]>([
      { id: '1', email: 'john.doe@email.com', name: 'John Doe', phone: '+1234567890', password: 'password123' },
      { id: '2', email: 'jane.smith@email.com', name: 'Jane Smith', phone: '+1234567891', password: 'password456' },
      { id: '3', email: 'mike.wilson@email.com', name: 'Mike Wilson', phone: '+1234567892', password: 'password789' },
      { id: '4', email: 'sarah.johnson@email.com', name: 'Sarah Johnson', phone: '+1234567893', password: 'password321' }
    ]);
  
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [editingClass, setEditingClass] = React.useState<ClassSession | null>(null);

  function handleCreate(courseName: string, trainerName: string, dateTime: string, fees: string, capacity: number) {
    setClasses([
      ...classes,
      {
        id: Date.now().toString(),
        courseName,
        trainerName,
        dateTime,
        fees,
        capacity,
        booked: 0,
      },
    ]);
  }

  function handleDelete(classId: string) {
    const classToDelete = classes.find(c => c.id === classId);
    if (classToDelete && window.confirm(`Are you sure you want to delete "${classToDelete.courseName}"?`)) {
      setClasses(classes.filter(c => c.id !== classId));
    }
  }

  function handleEdit(classId: string) {
    const classToEdit = classes.find(c => c.id === classId);
    if (classToEdit) {
      setEditingClass(classToEdit);
    }
  }

  function handleSaveEdit(updatedClass: ClassSession) {
    setClasses(classes.map(c => c.id === updatedClass.id ? updatedClass : c));
    setEditingClass(null);
  }


  function showStudentDetails(studentEmail: string) {
    const student = students.find(s => s.email === studentEmail);
    if (student) {
      setSelectedStudent(student);
    }
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary mb-2">👨‍💼 Admin Dashboard</h1>
            <p className="lead text-muted">Manage classes, students, and bookings</p>
          </div>
          
          {/* Stats Cards */}
          <div className="row g-4 mb-5">
            <div className="col-xl-4 col-lg-6 col-md-12">
              <div className="card h-100 shadow border-0" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '16px'
              }}>
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-chalkboard-teacher fa-3x opacity-75"></i>
                  </div>
                  <h5 className="card-title fw-bold mb-2">Total Classes</h5>
                  <h1 className="display-4 fw-bold mb-0">{classes.length}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12">
              <div className="card h-100 shadow border-0" style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                borderRadius: '16px'
              }}>
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-calendar-check fa-3x opacity-75"></i>
                  </div>
                  <h5 className="card-title fw-bold mb-2">Total Bookings</h5>
                  <h1 className="display-4 fw-bold mb-0">{bookings.length}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-12">
              <div className="card h-100 shadow border-0" style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                borderRadius: '16px'
              }}>
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-users fa-3x opacity-75"></i>
                  </div>
                  <h5 className="card-title fw-bold mb-2">Total Students</h5>
                  <h1 className="display-4 fw-bold mb-0">{students.length}</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Create New Class */}
          <div className="card mb-5 shadow border-0" style={{ borderRadius: '16px' }}>
            <div className="card-header text-center py-4" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '16px 16px 0 0'
            }}>
              <h4 className="mb-0 fw-bold">➕ Create New Class</h4>
            </div>
            <div className="card-body p-4" style={{ backgroundColor: '#f8f9fa' }}>
              <BookingForm onSubmit={handleCreate} />
            </div>
          </div>

          {/* All Classes */}
          <div className="card mb-5 shadow-sm border-0">
            <div className="card-header bg-light text-center py-3 border-bottom">
              <h4 className="mb-0 fw-bold text-dark">📚 All Classes ({classes.length})</h4>
            </div>
            <div className="card-body p-4">
              {classes.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-chalkboard fa-3x text-muted mb-3"></i>
                  <p className="text-muted fs-5">No classes created yet.</p>
                </div>
              ) : (
                <div className="row g-3">
                  {classes.map(session => (
                    <div key={session.id} className="col-12">
                      <ClassCard 
                        session={session} 
                        isAdmin={true}
                        onEdit={() => handleEdit(session.id)}
                        onDelete={() => handleDelete(session.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* All Bookings */}
          <div className="card mb-5 shadow-sm border-0">
            <div className="card-header bg-light text-center py-3 border-bottom">
              <h4 className="mb-0 fw-bold text-dark">📋 All Bookings ({bookings.length})</h4>
            </div>
            <div className="card-body p-4">
              {bookings.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                  <p className="text-muted fs-5">No bookings yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-dark">
                      <tr className="text-center">
                        <th className="fw-bold">🆔 Booking ID</th>
                        <th className="fw-bold">📚 Class</th>
                        <th className="fw-bold">👤 Student Name</th>
                        <th className="fw-bold">⏰ Booking Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => {
                        const classInfo = classes.find(c => c.id === b.classId);
                        return (
                          <tr key={b.id} className="text-center">
                            <td className="fw-semibold">{b.id}</td>
                            <td className="fw-semibold text-primary">{classInfo?.courseName || 'Unknown Class'}</td>
                            <td>
                              {(() => {
                                const student = students.find(s => s.email === b.studentEmail);
                                return (
                                  <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => showStudentDetails(b.studentEmail)}
                                    style={{ 
                                      fontWeight: '600',
                                      borderRadius: '12px',
                                      padding: '6px 12px',
                                      boxShadow: '0 2px 6px rgba(59, 130, 246, 0.2)',
                                      transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-1px)';
                                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)';
                                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(59, 130, 246, 0.2)';
                                    }}
                                  >
                                    {student?.name || b.studentEmail.split('@')[0]}
                                  </button>
                                );
                              })()}
                            </td>
                            <td className="text-muted">{new Date().toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">👤 Student Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setSelectedStudent(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                    <p><strong>Password:</strong> ••••••••</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {editingClass && (
        <EditClassModal 
          classSession={editingClass} 
          onSave={handleSaveEdit} 
          onClose={() => setEditingClass(null)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
