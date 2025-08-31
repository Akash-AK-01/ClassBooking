import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import StudentPortal from './pages/StudentPortal';
import AdminDashboard from './pages/AdminDashboard';
import StudentsPage from './pages/StudentsPage';
import TrainersPage from './pages/TrainersPage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <Router>
      {user && <Header user={user} onLogout={logout} />}
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={(email, password, role, name, dateOfBirth) => login(email, password, role, name, dateOfBirth)} />} />
        <Route
          path="/student"
          element={user && user.role === 'student' ? <StudentPortal user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/students"
          element={user && user.role === 'admin' ? <StudentsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/trainers"
          element={user && user.role === 'admin' ? <TrainersPage /> : <Navigate to="/login" />}
        />
        <Route 
          path="/" 
          element={
            user 
              ? user.role === 'admin' 
                ? <Navigate to="/admin" /> 
                : <Navigate to="/student" />
              : <Navigate to="/login" />
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

