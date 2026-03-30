import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { User, Hash, Building2, GraduationCap, BookOpen, Lock } from 'lucide-react';
import type { Student } from '../../types';

export function StudentProfile() {
  const { user: authUser } = useAuth();
  const user = authUser as Student | null;

  const profileFields = [
    { label: 'Name', value: user?.name, icon: <User className="w-5 h-5" /> },
    { label: 'Matric Number', value: user?.matricNumber, icon: <Hash className="w-5 h-5" /> },
    { label: 'Department', value: user?.department, icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Year of Study', value: user?.yearOfStudy ? `Year ${user.yearOfStudy}` : '-', icon: <GraduationCap className="w-5 h-5" /> },
    { label: 'Faculty', value: user?.faculty, icon: <Building2 className="w-5 h-5" /> }
  ];

  return (
    <DashboardLayout>
      <AppHeader title="My Profile" />
      <div className="p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile header card */}
          <Card className="bg-linear-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-blue-100 mt-1">{user?.matricNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information card */}
          <Card className="shadow-lg border-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {profileFields.map((field) => (
                <div key={field.label} className="grid grid-cols-3 gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600 dark:text-blue-400">{field.icon}</span>
                    {field.label}
                  </div>
                  <span className="col-span-2 text-gray-900 dark:text-white font-medium">
                    {field.value || '-'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notice card */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Read-Only Information
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Personal information cannot be edited directly. Please contact the administration office for any updates to your profile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}