import React from 'react';

interface Props {
  onSubmit: (courseName: string, trainerName: string, dateTime: string, fees: string, capacity: number) => void;
}

const BookingForm: React.FC<Props> = ({ onSubmit }) => {
  const [courseName, setCourseName] = React.useState('');
  const [trainerName, setTrainerName] = React.useState('');
  const [dateTime, setDateTime] = React.useState('');
  const [fees, setFees] = React.useState('');
  const [capacity, setCapacity] = React.useState(10);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(courseName, trainerName, dateTime, fees, capacity);
    setCourseName('');
    setTrainerName('');
    setDateTime('');
    setFees('');
    setCapacity(10);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">📚 Course Name</label>
          <input 
            className="form-control" 
            placeholder="e.g., Fullstack Development" 
            value={courseName} 
            onChange={e => setCourseName(e.target.value)} 
            required 
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">👨‍🏫 Trainer Name</label>
          <input 
            className="form-control" 
            placeholder="e.g., Ms. Sarah" 
            value={trainerName} 
            onChange={e => setTrainerName(e.target.value)} 
            required 
          />
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">📅 Date & Time</label>
          <input 
            className="form-control" 
            type="datetime-local" 
            value={dateTime} 
            onChange={e => setDateTime(e.target.value)} 
            required 
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">💰 Fees</label>
          <input 
            className="form-control" 
            placeholder="e.g., Completely Free or $50" 
            value={fees} 
            onChange={e => setFees(e.target.value)} 
            required 
          />
        </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">💺 Capacity</label>
        <input 
          className="form-control" 
          type="number" 
          min={1} 
          max={100} 
          value={capacity} 
          onChange={e => setCapacity(Number(e.target.value))} 
          required 
        />
        <div className="form-text">Maximum number of students for this class</div>
      </div>
      
      <button className="btn btn-success w-100" type="submit">
        ➕ Create New Class
      </button>
    </form>
  );
};

export default BookingForm;

