import React from 'react';
import { useNavigate } from 'react-router-dom';
import businessPeopleImage from '../components/assets/business-people-illustration_23-2148490914.avif';
import './LoginPage.css';
import { loginUser, registerUser } from '../../Api';

// Error type for API responses
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface Props {
  onLogin: (email: string, password: string, role: 'student' | 'admin', name: string, dateOfBirth?: string) => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [dateOfBirth, setDateOfBirth] = React.useState<string>('');
  const [role, setRole] = React.useState<'student' | 'admin'>('student');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const navigate = useNavigate();

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // 1. Try to register first
    await registerUser({
      email,
      password,
      name,
      role: role.toUpperCase(), // backend expects STUDENT or ADMIN
    });

    // 2. Registration successful -> login
    const loginResponse = await loginUser({ email, password });
    console.log('Login response:', loginResponse);

    if (loginResponse.data) {
      onLogin(email, password, role, name, role === 'student' ? dateOfBirth : undefined);
      if (role === 'admin') navigate('/admin');
      else navigate('/student');
    }
  } catch (err: unknown) {
    // 3. If email already exists, fallback to login
    const apiError = err as ApiError;
    if (apiError?.response) {
      try {
        const loginResponse = await loginUser({ email, password });
        console.log('Login response:', loginResponse);

        if (loginResponse.data) {
          onLogin(email, password, role, name, role === 'student' ? dateOfBirth : undefined);
          if (role === 'admin') navigate('/admin');
          else navigate('/student');
        }
      } catch (loginError: unknown) {
        const loginApiError = loginError as ApiError;
        setError(loginApiError?.response?.data?.message || 'Login failed');
      }
    } else {
      setError(apiError?.response?.data?.message || 'Registration failed');
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="login-page">
      <div className="login-image">
        <img src={businessPeopleImage} alt="Business Illustration" />
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="welcome-title">Welcome to LMS!</h1>
          
          {/* Role selection */}
          <div className="user-type-icons">
            <div className={`user-type-icon ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>
              <div className="icon-circle"><span className="icon">👨‍🎓</span></div>
              <span className="icon-label">Student</span>
            </div>
            <div className={`user-type-icon ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>
              <div className="icon-circle"><span className="icon">👨‍💼</span></div>
              <span className="icon-label">Admin</span>
            </div>
          </div>

          {/* Inputs */}
          <div className="form-group">
            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="form-input" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="form-input" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="form-input" />
          </div>
          {role === 'student' && (
            <div className="form-group">
              <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required className="form-input" />
            </div>
          )}

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Processing...' : 'Login / Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;