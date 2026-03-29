export const mockVenues = [
  {
    id: '1',
    name: 'LT1 - Main Lecture Theatre',
    faculty: 'Engineering',
    capacity: 200,
    hasMap: true,
    mapUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    description: 'Located in the Engineering building, ground floor. Main entrance through the west corridor.'
  },
  {
    id: '2',
    name: 'LT2 - Science Auditorium',
    faculty: 'Science',
    capacity: 150,
    hasMap: true,
    mapUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800',
    description: 'Science faculty building, 2nd floor. Accessible via main staircase.'
  },
  {
    id: '3',
    name: 'CR101 - Computer Lab 1',
    faculty: 'Engineering',
    capacity: 50,
    hasMap: false,
    description: 'Engineering complex, Block A, Room 101. Equipped with 50 desktop computers.'
  },
  {
    id: '4',
    name: 'TR01 - Tutorial Room 1',
    faculty: 'Arts',
    capacity: 30,
    hasMap: false,
    description: 'Arts building, 1st floor. Small classroom for tutorials and seminars.'
  }
];

export const mockStudents = [
  {
    id: '1',
    name: 'Alice Johnson',
    matricNumber: 'CS/2021/001',
    department: 'Computer Science',
    yearOfStudy: 3,
    faculty: 'Engineering'
  },
  {
    id: '2',
    name: 'Bob Smith',
    matricNumber: 'CS/2021/002',
    department: 'Computer Science',
    yearOfStudy: 3,
    faculty: 'Engineering'
  },
  {
    id: '3',
    name: 'Carol Williams',
    matricNumber: 'PHY/2022/015',
    department: 'Physics',
    yearOfStudy: 2,
    faculty: 'Science'
  }
];

export const mockLecturers = [
  {
    id: '1',
    name: 'Dr. James Anderson',
    staffId: 'STAFF001',
    email: 'j.anderson@university.edu',
    position: 'Senior Lecturer',
    faculty: 'Engineering',
    department: 'Computer Science',
    verificationCode: 'A1B2C3D4'
  },
  {
    id: '2',
    name: 'Prof. Sarah Mitchell',
    staffId: 'STAFF002',
    email: 's.mitchell@university.edu',
    position: 'Professor',
    faculty: 'Science',
    department: 'Physics',
    verificationCode: 'E5F6G7H8'
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    staffId: 'STAFF003',
    email: 'm.chen@university.edu',
    position: 'Lecturer',
    faculty: 'Engineering',
    department: 'Computer Science',
    verificationCode: 'I9J0K1L2'
  }
];

export const mockCourses = [
  {
    id: '1',
    code: 'CSC301',
    title: 'Data Structures and Algorithms',
    level: 300,
    department: 'Computer Science',
    faculty: 'Engineering',
    lecturerId: '1',
    lecturerName: 'Dr. James Anderson'
  },
  {
    id: '2',
    code: 'CSC302',
    title: 'Database Systems',
    level: 300,
    department: 'Computer Science',
    faculty: 'Engineering',
    lecturerId: '3',
    lecturerName: 'Dr. Michael Chen'
  },
  {
    id: '3',
    code: 'PHY201',
    title: 'Quantum Mechanics',
    level: 200,
    department: 'Physics',
    faculty: 'Science',
    lecturerId: '2',
    lecturerName: 'Prof. Sarah Mitchell'
  },
  {
    id: '4',
    code: 'CSC401',
    title: 'Artificial Intelligence',
    level: 400,
    department: 'Computer Science',
    faculty: 'Engineering',
    lecturerId: null,
    lecturerName: null
  }
];

export const mockSessions = [
  {
    id: '1',
    courseCode: 'CSC301',
    courseTitle: 'Data Structures and Algorithms',
    lecturerName: 'Dr. James Anderson',
    lecturerId: '1',
    date: '2026-03-25',
    startTime: '10:00',
    endTime: '12:00',
    venueId: '1',
    venueName: 'LT1 - Main Lecture Theatre',
    note: 'Midterm exam preparation'
  },
  {
    id: '2',
    courseCode: 'CSC302',
    courseTitle: 'Database Systems',
    lecturerName: 'Dr. Michael Chen',
    lecturerId: '3',
    date: '2026-03-25',
    startTime: '14:00',
    endTime: '16:00',
    venueId: '3',
    venueName: 'CR101 - Computer Lab 1',
    note: 'SQL practical session'
  },
  {
    id: '3',
    courseCode: 'PHY201',
    courseTitle: 'Quantum Mechanics',
    lecturerName: 'Prof. Sarah Mitchell',
    lecturerId: '2',
    date: '2026-03-26',
    startTime: '09:00',
    endTime: '11:00',
    venueId: '2',
    venueName: 'LT2 - Science Auditorium',
    note: ''
  },
  {
    id: '4',
    courseCode: 'CSC301',
    courseTitle: 'Data Structures and Algorithms',
    lecturerName: 'Dr. James Anderson',
    lecturerId: '1',
    date: '2026-03-27',
    startTime: '13:00',
    endTime: '15:00',
    venueId: '1',
    venueName: 'LT1 - Main Lecture Theatre',
    note: ''
  }
];

export const mockFacultyAdmins = [
  {
    id: '1',
    name: 'Dr. Robert Taylor',
    email: 'r.taylor@university.edu',
    faculty: 'Engineering',
    password: 'faculty123'
  },
  {
    id: '2',
    name: 'Dr. Emily Davis',
    email: 'e.davis@university.edu',
    faculty: 'Science',
    password: 'faculty456'
  }
];

export const mockSchoolAdmin = {
  id: '1',
  name: 'Administrator',
  email: 'admin@university.edu',
  password: 'admin123'
};
