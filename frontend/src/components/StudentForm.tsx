import React from 'react';

interface Props {
  onSubmit: (email: string, name: string, phone: string, password: string) => void;
}

const StudentForm: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim() && name.trim() && phone.trim() && password.trim()) {
      onSubmit(email, name, phone, password);
      setEmail('');
      setName('');
      setPhone('');
      setPassword('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row">
        <div className="col-md-4 mb-2">
          <label className="form-label">👤 Student Name</label>
          <input 
            className="form-control" 
            placeholder="Enter student name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label">📧 Email Address</label>
          <input 
            className="form-control" 
            type="email" 
            placeholder="Enter student email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label">📱 Phone Number</label>
          <input 
            className="form-control" 
            type="tel" 
            placeholder="Enter phone number" 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            required 
          />
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label">🔒 Password</label>
          <input 
            className="form-control" 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
      </div>
      <button className="btn btn-success" type="submit">
        ➕ Add Student
      </button>
    </form>
  );
};

export default StudentForm;
