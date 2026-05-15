export type UserRole = "student" | "lecturer" | "faculty" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  
}

export interface Student extends User {
  matricNumber: string;
  department: string;
  faculty: string;
  yearOfStudy: number;
}

export interface Lecturer extends User {
  staffId: string;
  position: string;
  faculty: string;
  department: string;
  assignedCourses: string[];
}

export interface FacultyAdmin extends User {
  faculty: string;
}

export interface SchoolAdmin extends User {
  email: string;
}

export interface Venue {
  id: string;
  name: string;
  faculty: string;
  capacity: number;
  mapImageUrl?: string;
  textDescription?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  level: number;
  department: string;
  faculty: string;
  assignedLecturer?: string;
}

export interface Session {
  id: string;
  courseCode: string;
  courseTitle: string;
  lecturerId: string;
  lecturerName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  venueId: string;
  venueName: string;
  note?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  role: UserRole | null;
}
