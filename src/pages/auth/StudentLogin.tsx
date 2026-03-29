import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { useAuth } from '../../context/AuthContext';
import { mockStudents } from '../../data/mockData';
import { GraduationCap, ArrowLeft, Info } from 'lucide-react';

export default function StudentLogin() {
  const [matricNumber, setMatricNumber] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const student = mockStudents.find((s) => s.matricNumber === matricNumber);

    if (student) {
      login({
        identifier: matricNumber,
        type: 'student'
      });
      navigate('/student/dashboard');
      console.log('Signed in successfully');
    } else {
      alert('Invalid matric number. Try: CS/2021/001');
      console.log('Signed in failed');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900 relative overflow-hidden flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto! max-w-md relative px-4!">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6! group"
        >
          <ArrowLeft className="w-4 group-hover:w-4 h-4 group-hover:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to home</span>
        </Link>

        <Card className="border-2 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto! w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl mb-2!">Student Portal</CardTitle>
              <CardDescription className="text-base">Enter your matric number to access your dashboard</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="matricNumber" className="text-sm font-medium">Matric Number</Label>
                <Input
                  id="matricNumber"
                  placeholder="e.g., CS/2021/001"
                  value={matricNumber}
                  onChange={(e) => setMatricNumber(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              {/* Demo credentials info */}
              <div className="flex items-start gap-3 p-4! my-3! rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5!" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-1!">Demo Credentials</p>
                  <p className="text-blue-700 dark:text-blue-300">CS/2021/001, CS/2021/002, or PHY/2022/015</p>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 cursor-pointer transition-colors duration-300">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6! text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Secure student access portal
          </p>
        </div>
      </div>
    </div>
  );
}