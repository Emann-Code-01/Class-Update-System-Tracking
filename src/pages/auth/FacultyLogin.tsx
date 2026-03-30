import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { useAuth } from '../../context/AuthContext';
import { mockFacultyAdmins } from '../../data/mockData';
import { Building, ArrowLeft, Info } from 'lucide-react';

export default function FacultyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const admin = mockFacultyAdmins.find(
      (a) => a.email === email && a.password === password
    );

    if (admin) {
      const success = await login({
        identifier: email,
        password: password,
        type: 'faculty',
      });
      if (success) {
        navigate('/faculty/venues');
      }
    } else {
      alert('Invalid credentials. Try: r.taylor@university.edu / faculty123');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </Link>

        <Card className="border-2 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Building className="w-10 h-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl mb-2">Faculty Admin Portal</CardTitle>
              <CardDescription className="text-base">Enter your credentials to access the faculty dashboard</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="r.taylor@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="faculty123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              {/* Demo credentials info */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-purple-900 dark:text-purple-100 mb-1">Demo Credentials</p>
                  <p className="text-purple-700 dark:text-purple-300">r.taylor@university.edu / faculty123</p>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg shadow-purple-500/25 cursor-pointer transition-colors duration-300">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Secure faculty administration portal
          </p>
        </div>
      </div>
    </div>
  );
}