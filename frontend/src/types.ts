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
  role: 'admin' | 'student';
  name?: string;
  password?: string;
  dateOfBirth?: string;
}

export interface Student {
  id: string;
  email: string;
  name: string;
  phone: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: 'admin' | 'student') => Promise<void>;
  isLoading: boolean;
}
