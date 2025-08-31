import React from 'react';
import { useBookings } from '../hooks/useBookings';
import ClassCard from '../components/ClassCard';

interface Props {
  user: { email: string };
}

const StudentPortal: React.FC<Props> = ({ user }) => {
  const { classes, bookings, bookSeat, cancelBooking } = useBookings();

  const myBookings = bookings.filter(b => b.studentEmail === user.email);
  const myClasses = classes.filter(session => 
    myBookings.some(b => b.classId === session.id)
  );

  return (
    <div className="container">
      <h2 className="mb-4">👨‍🎓 Student Portal</h2>
      
      {/* My Bookings Summary */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">My Bookings</h5>
              <h2>{myBookings.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Available Classes</h5>
              <h2>{classes.filter(c => c.booked < c.capacity).length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* My Booked Classes */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">✅ My Classes ({myClasses.length})</h5>
        </div>
        <div className="card-body">
          {myClasses.length === 0 ? (
            <p className="text-muted text-center">You haven't booked any classes yet.</p>
          ) : (
            myClasses.map(session => (
              <ClassCard
                key={session.id}
                session={session}
                booked={true}
                isFull={false}
                onCancel={() => cancelBooking(session.id, user.email)}
              />
            ))
          )}
        </div>
      </div>

      {/* Available Classes */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">📚 Available Classes</h5>
        </div>
        <div className="card-body">
          {classes.length === 0 ? (
            <p className="text-muted text-center">No classes available.</p>
          ) : (
            classes.map(session => {
              const booked = bookings.some(b => b.classId === session.id && b.studentEmail === user.email);
              const isFull = session.booked >= session.capacity;
              return (
                <ClassCard
                  key={session.id}
                  session={session}
                  booked={booked}
                  isFull={isFull}
                  onBook={() => bookSeat(session.id, user.email)}
                  onCancel={() => cancelBooking(session.id, user.email)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;