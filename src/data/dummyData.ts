import type { Student, Lecturer, FacultyAdmin, SchoolAdmin, Venue, Course, Session } from '../types';

export const dummyStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Chioma Okonkwo',
    email: 'chioma.okonkwo@student.edu',
    role: 'student',
    matricNumber: 'CSC/2021/001',
    department: 'Computer Science',
    yearOfStudy: 2,
  },
  {
    id: 'STU002',
    name: 'Adebayo Adeyemi',
    email: 'adebayo.adeyemi@student.edu',
    role: 'student',
    matricNumber: 'CSC/2022/002',
    department: 'Computer Science',
    yearOfStudy: 1,
  },
];

export const dummyLecturers: Lecturer[] = [
  {
    id: 'LEC001',
    name: 'Prof. James Adekunle',
    email: 'j.adekunle@university.edu',
    role: 'lecturer',
    staffId: 'L001',
    position: 'Senior Lecturer',
    faculty: 'Science',
    department: 'Computer Science',
    assignedCourses: ['CSC101', 'CSC201'],
  },
  {
    id: 'LEC002',
    name: 'Dr. Ngozi Okoro',
    email: 'n.okoro@university.edu',
    role: 'lecturer',
    staffId: 'L002',
    position: 'Lecturer',
    faculty: 'Science',
    department: 'Computer Science',
    assignedCourses: ['CSC102', 'CSC202'],
  },
];

export const dummyFacultyAdmin: FacultyAdmin = {
  id: 'FAC001',
  name: 'Dr. Adeniyi Falana',
  email: 'faculty@science.edu',
  role: 'faculty',
  faculty: 'Science',
};

export const dummySchoolAdmin: SchoolAdmin = {
  id: 'ADM001',
  name: 'Mr. Seun Okafor',
  email: 'admin@school.edu',
  role: 'admin',
};

export const dummyVenues: Venue[] = [
  {
    id: 'VEN001',
    name: 'Lecture Hall A',
    faculty: 'Science',
    capacity: 150,
    mapImageUrl: 'https://via.placeholder.com/400x300?text=Lecture+Hall+A',
    textDescription: 'Main lecture hall on first floor of Science Building. Equipped with projectors and modern audio system.',
  },
  {
    id: 'VEN002',
    name: 'Lecture Hall B',
    faculty: 'Science',
    capacity: 200,
    mapImageUrl: 'https://via.placeholder.com/400x300?text=Lecture+Hall+B',
    textDescription: 'Large lecture hall with tiered seating on second floor of Science Building.',
  },
  {
    id: 'VEN003',
    name: 'Computer Lab 1',
    faculty: 'Science',
    capacity: 60,
    textDescription: 'Computer laboratory with 40 workstations and server room.',
  },
  {
    id: 'VEN004',
    name: 'Seminar Room C',
    faculty: 'Science',
    capacity: 50,
    textDescription: 'Seminar room suitable for small group discussions and tutorials.',
  },
];

export const dummyCourses: Course[] = [
  {
    id: 'COU001',
    code: 'CSC101',
    title: 'Introduction to Programming',
    level: 100,
    department: 'Computer Science',
    faculty: 'Science',
    assignedLecturer: 'LEC001',
  },
  {
    id: 'COU002',
    code: 'CSC102',
    title: 'Data Structures',
    level: 100,
    department: 'Computer Science',
    faculty: 'Science',
    assignedLecturer: 'LEC002',
  },
  {
    id: 'COU003',
    code: 'CSC201',
    title: 'Database Systems',
    level: 200,
    department: 'Computer Science',
    faculty: 'Science',
    assignedLecturer: 'LEC001',
  },
  {
    id: 'COU004',
    code: 'CSC202',
    title: 'Web Development',
    level: 200,
    department: 'Computer Science',
    faculty: 'Science',
    assignedLecturer: 'LEC002',
  },
];

export const dummySessions: Session[] = [
  {
    id: 'SES001',
    courseCode: 'CSC101',
    courseTitle: 'Introduction to Programming',
    lecturerId: 'LEC001',
    lecturerName: 'Prof. James Adekunle',
    date: '2025-03-25',
    startTime: '09:00',
    endTime: '10:30',
    venueId: 'VEN001',
    venueName: 'Lecture Hall A',
    note: 'Chapter 1-2 revision',
  },
  {
    id: 'SES002',
    courseCode: 'CSC102',
    courseTitle: 'Data Structures',
    lecturerId: 'LEC002',
    lecturerName: 'Dr. Ngozi Okoro',
    date: '2025-03-25',
    startTime: '11:00',
    endTime: '12:30',
    venueId: 'VEN002',
    venueName: 'Lecture Hall B',
  },
  {
    id: 'SES003',
    courseCode: 'CSC201',
    courseTitle: 'Database Systems',
    lecturerId: 'LEC001',
    lecturerName: 'Prof. James Adekunle',
    date: '2025-03-26',
    startTime: '14:00',
    endTime: '15:30',
    venueId: 'VEN003',
    venueName: 'Computer Lab 1',
  },
  // Conflict scenario: same venue, overlapping times
  {
    id: 'SES004',
    courseCode: 'CSC202',
    courseTitle: 'Web Development',
    lecturerId: 'LEC002',
    lecturerName: 'Dr. Ngozi Okoro',
    date: '2025-03-26',
    startTime: '13:30',
    endTime: '14:45',
    venueId: 'VEN003',
    venueName: 'Computer Lab 1',
  },
];
