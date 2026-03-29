import { Home, User, MapPin, Users, BookOpen, Calendar, UserCog, Menu, X, GraduationCap, BookOpen as BookOpenIcon, Building, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import type { UserRole } from '../types';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const roleNavigation: Record<UserRole, NavItem[]> = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Profile', path: '/student/profile', icon: <User className="w-5 h-5" /> }
  ],
  lecturer: [
    { label: 'Dashboard', path: '/lecturer/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Profile', path: '/lecturer/profile', icon: <User className="w-5 h-5" /> }
  ],
  faculty: [
    { label: 'Venues', path: '/faculty/venues', icon: <MapPin className="w-5 h-5" /> },
    { label: 'Lecturers', path: '/faculty/lecturers', icon: <Users className="w-5 h-5" /> },
    { label: 'Courses', path: '/faculty/courses', icon: <BookOpen className="w-5 h-5" /> }
  ],
  admin: [
    { label: 'Venues', path: '/admin/venues', icon: <MapPin className="w-5 h-5" /> },
    { label: 'Students', path: '/admin/students', icon: <Users className="w-5 h-5" /> },
    { label: 'Lecturers', path: '/admin/lecturers', icon: <UserCog className="w-5 h-5" /> },
    { label: 'Courses', path: '/admin/courses', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Sessions', path: '/admin/sessions', icon: <Calendar className="w-5 h-5" /> },
    { label: 'Users', path: '/admin/users', icon: <Users className="w-5 h-5" /> }
  ]
};

const roleConfig = {
  student: {
    title: 'Student Portal',
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  lecturer: {
    title: 'Lecturer Portal',
    icon: <BookOpenIcon className="w-6 h-6" />,
    gradient: 'from-green-500 to-emerald-600',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  faculty: {
    title: 'Faculty Admin',
    icon: <Building className="w-6 h-6" />,
    gradient: 'from-purple-500 to-purple-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  admin: {
    title: 'School Admin',
    icon: <Shield className="w-6 h-6" />,
    gradient: 'from-red-500 to-rose-600',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400'
  }
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const navigation = roleNavigation[user.role];
  const config = roleConfig[user.role];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className={`${config.iconBg} ${config.iconColor} p-2.5 rounded-xl`}>
            {config.icon}
          </div>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
            {config.title}
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 ml-12">{user.name}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                ? `bg-linear-to-r ${config.gradient} text-white shadow-lg`
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
          className="w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-800"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}