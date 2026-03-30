import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import RoleSelector from './pages/RoleSelector';
import LecturerLogin from './pages/auth/LecturerLogin';
import FacultyLogin from './pages/auth/FacultyLogin';
import AdminLogin from './pages/auth/AdminLogin';

// Student Pages
import StudentLogin from './pages/auth/StudentLogin';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';

// Lecturer Pages
import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import LecturerProfile from './pages/lecturer/LecturerProfile';

// Faculty Pages
import FacultyVenues from './pages/faculty/FacultyVenues';
import FacultyLecturers from './pages/faculty/FacultyLecturers';
import FacultyCourses from './pages/faculty/FacultyCourses';

// Admin Pages
// import AdminVenues from './pages/admin/AdminVenues';
// import AdminStudents from './pages/admin/AdminStudents';
// import AdminLecturers from './pages/admin/AdminLecturers';
// import AdminCourses from './pages/admin/AdminCourses';
// import AdminSessions from './pages/admin/AdminSessions';
// import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<RoleSelector />} />

            {/* Auth Routes */}
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/lecturer" element={<LecturerLogin />} />
            <Route path="/login/faculty" element={<FacultyLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />

            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/profile"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />

            {/* Lecturer Routes */}
            <Route
              path="/lecturer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <LecturerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lecturer/profile"
              element={
                <ProtectedRoute allowedRoles={['lecturer']}>
                  <LecturerProfile />
                </ProtectedRoute>
              }
            />

            {/* Faculty Routes */}
            <Route
              path="/faculty/venues"
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <FacultyVenues />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/lecturers"
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <FacultyLecturers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/courses"
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <FacultyCourses />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            {/* <Route
                path="/admin/venues"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminVenues />
                  </ProtectedRoute>
                }
              /> */}
            {/* <Route
                path="/admin/students"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminStudents />
                  </ProtectedRoute>
                }
              /> */}
            {/* <Route
                path="/admin/lecturers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLecturers />
                  </ProtectedRoute>
                }
              /> */}
            {/* <Route
                path="/admin/courses"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminCourses />
                  </ProtectedRoute>
                }
              /> */}
            {/* <Route
                path="/admin/sessions"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminSessions />
                  </ProtectedRoute>
                }
              /> */}
            {/* <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              /> */}

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
