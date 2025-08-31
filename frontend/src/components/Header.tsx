import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  user: { email: string; role: string; name?: string } | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div className="container">
      <Link className="navbar-brand fw-bold fs-4" to="/">
        <i className="bi bi-building me-2"></i>🏫 ClassBookings
      </Link>
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {user ? (
            <>
                             <li className="nav-item">
                 <span className="navbar-text text-white me-3">
                   <i className="bi bi-person-circle me-1"></i>
                   Welcome, {user.name || user.email} ({user.role})
                 </span>
               </li>
              {user.role === 'student' && (
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-light btn-sm me-2" to="/student">
                    <i className="bi bi-book me-1"></i>My Classes
                  </Link>
                </li>
              )}
              {user.role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-outline-light btn-sm me-2" to="/admin">
                      <i className="bi bi-speedometer2 me-1"></i>Admin Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-outline-light btn-sm me-2" to="/admin/students">
                      <i className="bi bi-people me-1"></i>Students
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-outline-light btn-sm me-2" to="/admin/trainers">
                      <i className="bi bi-person-badge me-1"></i>Trainers
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                  <i className="bi bi-box-arrow-right me-1"></i>Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="btn btn-outline-light btn-sm" to="/login">
                <i className="bi bi-box-arrow-in-right me-1"></i>Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;

