import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { useAuth } from '../../context/AuthContext';
import { mockLecturers } from '../../data/mockData';
import { BookOpen, ArrowLeft, Info } from 'lucide-react';

export default function LecturerLogin() {
  const [staffId, setStaffId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const lecturer = mockLecturers.find(
      (l) => l.staffId === staffId && l.verificationCode === verificationCode
    );

    if (lecturer) {
      const success = await login({
        identifier: verificationCode,
        type: 'lecturer'
      });
      if (success) {
        navigate('/lecturer/dashboard');
      }
    } else {
      alert('Invalid credentials. Try: STAFF001 / A1B2C3D4');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-green-50/30 to-gray-50 dark:from-gray-900 dark:via-green-950/20 dark:to-gray-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/10 dark:bg-green-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/10 dark:bg-emerald-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </Link>

        <Card className="border-2 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl mb-2">Lecturer Portal</CardTitle>
              <CardDescription className="text-base">Enter your credentials to access your dashboard</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="staffId" className="text-sm font-medium">Staff ID</Label>
                <Input
                  id="staffId"
                  placeholder="STAFF001"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verificationCode" className="text-sm font-medium">Verification Code</Label>
                <Input
                  id="verificationCode"
                  placeholder="A1B2C3D4"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              {/* Demo credentials info */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <Info className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">Demo Credentials</p>
                  <p className="text-green-700 dark:text-green-300">STAFF001 / A1B2C3D4 or STAFF003 / I9J0K1L2</p>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transition-colors duration-300 shadow-green-500/25 cursor-pointer">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Secure lecturer access portal
          </p>
        </div>
      </div>
    </div>
  );
}