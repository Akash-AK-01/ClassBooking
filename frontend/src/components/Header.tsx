import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  user: { email: string; role: string; name?: string } | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div className="container-fluid">
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
        {user && (
          <div className="navbar-nav me-auto">
            <span className="navbar-text text-white">
              <i className="bi bi-person-circle me-1"></i>
              Welcome, {user.name || user.email} ({user.role})
            </span>
          </div>
        )}
        
        <div className="navbar-nav ms-auto d-none d-lg-flex">
          {user ? (
            <>
              {user.role === 'admin' && (
                <>
                  <Link className="nav-link text-white fw-semibold" to="/admin">
                    Admin Dashboard
                  </Link>
                  <Link className="nav-link text-white fw-semibold" to="/admin/students">
                    Students
                  </Link>
                  <Link className="nav-link text-white fw-semibold" to="/admin/trainers">
                    Trainers
                  </Link>
                </>
              )}
              {user.role === 'student' && (
                <Link className="nav-link text-white fw-semibold" to="/student">
                  My Classes
                </Link>
              )}
              <button className="btn btn-outline-light btn-sm ms-2" onClick={onLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-light btn-sm" to="/login">
              <i className="bi bi-box-arrow-in-right me-1"></i>Login
            </Link>
          )}
        </div>
        
        {/* Mobile Menu */}
        <div className="navbar-nav ms-auto d-lg-none">
          {user && (
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white fw-semibold" href="#" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-list"></i> Menu
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {user.role === 'admin' && (
                  <>
                    <li><Link className="dropdown-item" to="/admin">Admin Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/admin/students">Students</Link></li>
                    <li><Link className="dropdown-item" to="/admin/trainers">Trainers</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                {user.role === 'student' && (
                  <>
                    <li><Link className="dropdown-item" to="/student">My Classes</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                <li><button className="dropdown-item" onClick={onLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
);

export default Header;

