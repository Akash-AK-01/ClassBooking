import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLogin: (email: string, password: string, role: 'student' | 'admin', name: string, dateOfBirth?: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [dateOfBirth, setDateOfBirth] = React.useState<string>('');
  const [role, setRole] = React.useState<'student' | 'admin'>('student');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim() && password.trim() && name.trim()) {
      onLogin(email, password, role, name, role === 'student' ? dateOfBirth : undefined);
      // Automatically redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit(e as React.FormEvent);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          className="form-control"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
      </div>
      {role === 'student' && (
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            className="form-control"
            type="date"
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="form-label">Login As</label>
        <select
          className="form-select"
          value={role}
          onChange={e => setRole(e.target.value as 'student' | 'admin')}
        >
          <option value="student">👨‍🎓 Student</option>
          <option value="admin">👨‍💼 Admin</option>
        </select>
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;

