import ThemeToggle from '../components/ThemeToggle';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Building, Shield, ArrowRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const roles = [
  {
    title: 'Student',
    description: 'Access your schedule, view class updates, and manage your academic profile',
    icon: <GraduationCap className="w-8 h-8" />,
    path: '/login/student',
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'blue-500',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    title: 'Lecturer',
    description: 'Manage teaching sessions, update schedules, and communicate with students',
    icon: <BookOpen className="w-8 h-8" />,
    path: '/login/lecturer',
    gradient: 'from-green-500 to-emerald-600',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    border: 'emerald-400',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'Faculty Admin',
    description: 'Oversee faculty operations, manage resources, and coordinate scheduling',
    icon: <Building className="w-8 h-8" />,
    path: '/login/faculty',
    gradient: 'from-purple-500 to-purple-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    border: 'purple-600',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    title: 'School Admin',
    description: 'Full system administration, oversight, and comprehensive management access',
    icon: <Shield className="w-8 h-8" />,
    path: '/login/admin',
    gradient: 'from-red-500 to-rose-600',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    border: 'red-600',
    iconColor: 'text-red-600 dark:text-red-400'
  }
];

export default function RoleSelector() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="container mx-auto! px-4! pt-6!">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto! px-4! py-16! md:py-24!">
          <div className="text-center max-w-3xl mx-auto! mb-16!">
            <div className="inline-flex items-center gap-2 px-4! py-2! rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6!">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Academic Portal
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6! leading-tight">
              University Class
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Update System
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Streamlined access to schedules, updates, and academic resources.
              <span className="block mt-2!">Choose your role to get started.</span>
            </p>
          </div>

          {/* Role Cards */}
          <div className="max-w-6xl mx-auto!">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {roles.map((role, index) => (
                <Link
                  key={role.path}
                  to={role.path}
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className={`h-full hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 border-2 hover:border-${role.border} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden relative`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-linear-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                    <CardHeader className="relative">
                      <div className="flex items-start justify-between mb-4!">
                        <div className={`${role.iconBg} ${role.iconColor} p-4! rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                          {role.icon}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <div className={`p-2! rounded-full bg-linear-to-br ${role.gradient} text-white`}>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <CardTitle className="text-2xl mb-2! group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {role.title}
                      </CardTitle>

                      <CardDescription className="text-base leading-relaxed">
                        {role.description}
                      </CardDescription>
                    </CardHeader>

                    {/* Bottom accent bar */}
                    <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-linear-to-r ${role.gradient}`}></div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16! text-center">
            <div className="inline-flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>System Online</span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
              <span>Secure Access</span>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}