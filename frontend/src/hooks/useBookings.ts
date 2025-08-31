import { useState } from 'react';
import { Booking, ClassSession } from '../types';
import { mockBookings, mockClasses } from '../utils/mockData';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [classes, setClasses] = useState<ClassSession[]>(mockClasses);

  function bookSeat(classId: string, studentEmail: string) {
    if (bookings.some(b => b.classId === classId && b.studentEmail === studentEmail)) return;
    setBookings([...bookings, { id: Date.now().toString(), classId, studentEmail }]);
    setClasses(classes.map(cls => cls.id === classId ? { ...cls, booked: cls.booked + 1 } : cls));
  }

  function cancelBooking(classId: string, studentEmail: string) {
    setBookings(bookings.filter(b => !(b.classId === classId && b.studentEmail === studentEmail)));
    setClasses(classes.map(cls => cls.id === classId ? { ...cls, booked: cls.booked - 1 } : cls));
  }

  return { bookings, classes, bookSeat, cancelBooking, setClasses };
}

