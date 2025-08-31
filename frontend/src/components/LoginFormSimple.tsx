import React from 'react';
import { useNavigate } from 'react-router-dom';
const loginImage = '../components/assets/business-people-illustration_23-2148490914.avif';
 

interface Props {
  onLogin: (email: string, password: string) => void;
}

const LoginFormSimple: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onLogin(email, password);
      navigate('/student');
    }
  }

  return (
    <div className="d-flex vh-100">
      {/* Left side - Form */}
      <div className="d-flex align-items-center justify-content-center w-50">
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white" style={{ minWidth: '350px' }}>
          <h3 className="text-center mb-4">Welcome to LMS!</h3>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              required
            />
          </div>
          <button className="btn btn-warning w-100 text-white" type="submit">
            Login
          </button>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="w-50 d-flex align-items-center justify-content-center bg-light">
        <img src={loginImage} alt="Login Illustration" className="img-fluid" style={{ maxHeight: '80%', objectFit: 'contain' }} />
      </div>
    </div>
  );
};

export default LoginFormSimple;
