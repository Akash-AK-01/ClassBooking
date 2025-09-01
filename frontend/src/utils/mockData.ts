import { ClassSession, Booking } from '../types';

export const mockClasses: ClassSession[] = [
  {
    id: '1',
    courseName: 'Fullstack Development',
    trainerName: 'Ms. Sarah',
    dateTime: '2025-09-10T10:00',
    fees: 'Completely Free',
    capacity: 30,
    booked: 12,
  },
  {
    id: '2',
    courseName: 'Python',
    trainerName: 'Mr. John',
    dateTime: '2025-09-12T14:00',
    fees: '$50',
    capacity: 25,
    booked: 25,
  },
  {
    id: '3',
    courseName: 'SQL',
    trainerName: 'Mr. David',
    dateTime: '2025-09-15T11:00',
    fees: 'Free',
    capacity: 20,
    booked: 8,
  },
  {
    id: '4',
    courseName: 'Java',
    trainerName: 'Ms. Lisa',
    dateTime: '2025-09-18T09:00',
    fees: 'Free',
    capacity: 35,
    booked: 15,
  },
];

export const mockBookings: Booking[] = [
  { id: 'b1', classId: '1', studentEmail: 'student1@email.com' },
];