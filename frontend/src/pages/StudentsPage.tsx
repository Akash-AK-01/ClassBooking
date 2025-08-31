import React from 'react';
import StudentForm from '../components/StudentForm';
import { Student } from '../types';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

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
          <h2 className="mb-4">👥 Students Management</h2>
          
          {/* Add Student Form */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">➕ Add New Student</h5>
            </div>
            <div className="card-body">
              <StudentForm onSubmit={handleAddStudent} />
            </div>
          </div>

          {/* Students List */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">📋 All Students ({students.length})</h5>
            </div>
            <div className="card-body">
              {students.length === 0 ? (
                <p className="text-muted">No students registered yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>
                            <button
                              className="btn btn-link p-0 text-decoration-none"
                              onClick={() => showStudentDetails(student.email)}
                              style={{ color: '#3b82f6', fontWeight: '500' }}
                            >
                              {student.email}
                            </button>
                          </td>
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
    </div>
  );
};

export default StudentsPage;
