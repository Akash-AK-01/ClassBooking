export interface ClassSession {
  id: string;
  courseName: string;
  trainerName: string;
  dateTime: string;
  fees: string;
  capacity: number;
  booked: number;
}

export interface Booking {
  id: string;
  classId: string;
  studentEmail: string;
}

export interface User {
  email: string;
  role: 'student' | 'admin';
  name?: string;
}

export interface Student {
  id: string;
  email: string;
  name: string;
  phone: string;
  password?: string;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  workExperience: string;
  specialization: string;
}

