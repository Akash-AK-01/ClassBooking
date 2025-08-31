import React from 'react';
import { useBookings } from '../hooks/useBookings';
import BookingForm from '../components/BookingForm';
import ClassCard from '../components/ClassCard';
import StudentForm from '../components/StudentForm';
import EditClassModal from '../components/EditClassModal';
import { Student, ClassSession } from '../types';

const AdminDashboard: React.FC = () => {
  const { classes, bookings, setClasses } = useBookings();
  const [students, setStudents] = React.useState<Student[]>([]);
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

  function handleAddStudent(email: string, name: string, phone: string, password: string) {
    if (students.some(s => s.email === email)) {
      alert('Student with this email already exists!');
      return;
    }
    setStudents([...students, { id: Date.now().toString(), email, name, phone, password }]);
  }

  function handleDeleteStudent(studentId: string) {
    const studentToDelete = students.find(s => s.id === studentId);
    if (studentToDelete && window.confirm(`Are you sure you want to delete student "${studentToDelete.name}"?`)) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  }

  function showStudentDetails(studentEmail: string) {
    const student = students.find(s => s.email === studentEmail);
    if (student) {
      setSelectedStudent(student);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">👨‍💼 Admin Dashboard</h2>
          
          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Classes</h5>
                  <h2>{classes.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Bookings</h5>
                  <h2>{bookings.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Students</h5>
                  <h2>{students.length}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Create New Class */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">➕ Create New Class</h5>
            </div>
            <div className="card-body">
              <BookingForm onSubmit={handleCreate} />
            </div>
          </div>

          {/* Student Management */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">👥 Student Management</h5>
            </div>
            <div className="card-body">
              <StudentForm onSubmit={handleAddStudent} />
              
              <h6 className="mt-3">Registered Students ({students.length})</h6>
              {students.length === 0 ? (
                <p className="text-muted">No students registered yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.phone}</td>
                          <td>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteStudent(student.id)}
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

          {/* All Classes */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">📚 All Classes ({classes.length})</h5>
            </div>
            <div className="card-body">
              {classes.length === 0 ? (
                <p className="text-muted text-center">No classes created yet.</p>
              ) : (
                classes.map(session => (
                  <ClassCard 
                    key={session.id} 
                    session={session} 
                    isAdmin={true}
                    onEdit={() => handleEdit(session.id)}
                    onDelete={() => handleDelete(session.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* All Bookings */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">📋 All Bookings ({bookings.length})</h5>
            </div>
            <div className="card-body">
              {bookings.length === 0 ? (
                <p className="text-muted text-center">No bookings yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Class</th>
                        <th>Student</th>
                        <th>Booking Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => {
                        const classInfo = classes.find(c => c.id === b.classId);
                        const student = students.find(s => s.email === b.studentEmail);
                        return (
                          <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{classInfo?.courseName || 'Unknown Class'}</td>
                            <td>
                              {student ? (
                                <button
                                  className="btn btn-link p-0 text-decoration-none"
                                  onClick={() => showStudentDetails(b.studentEmail)}
                                  style={{ color: '#3b82f6', fontWeight: '500' }}
                                >
                                  {student.name}
                                </button>
                              ) : (
                                b.studentEmail
                              )}
                            </td>
                            <td>{new Date().toLocaleString()}</td>
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
