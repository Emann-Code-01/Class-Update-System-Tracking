import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/Dialog';
import { Textarea } from '../../components/ui/TextArea';
import { mockLecturers } from '../../data/mockData';
import { Upload, Key } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLecturers() {
  const [lecturers, setLecturers] = useState(mockLecturers);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleImport = () => {
    const lines = csvData.trim().split('\n');
    if (lines.length > 1) {
      const newLecturers = lines.slice(1).map((line, index) => {
        const [name, staffId, email, position, faculty, department] = line.split(',');
        return {
          id: String(Date.now() + index),
          name: name?.trim() || '',
          staffId: staffId?.trim() || '',
          email: email?.trim() || '',
          position: position?.trim() || '',
          faculty: faculty?.trim() || '',
          department: department?.trim() || '',
          verificationCode: generateCode()
        };
      });
      setLecturers([...lecturers, ...newLecturers]);
      toast.success(`${newLecturers.length} lecturers imported successfully`);
      setIsUploadModalOpen(false);
      setCsvData('');
    }
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleGenerateCode = (lecturerId: string) => {
    const newCode = generateCode();
    setLecturers(lecturers.map((l) =>
      l.id === lecturerId ? { ...l, verificationCode: newCode } : l
    ));
    setGeneratedCode(newCode);
    setIsCodeModalOpen(true);
  };

  return (
    <DashboardLayout>
      <AppHeader title="Lecturers Management" />
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Lecturers</CardTitle>
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lecturers.map((lecturer) => (
                  <TableRow key={lecturer.id}>
                    <TableCell className="font-medium">{lecturer.name}</TableCell>
                    <TableCell>{lecturer.staffId}</TableCell>
                    <TableCell>{lecturer.email}</TableCell>
                    <TableCell>{lecturer.position}</TableCell>
                    <TableCell>{lecturer.faculty}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateCode(lecturer.id)}
                      >
                        <Key className="w-4 h-4 mr-2" />
                        Generate Code
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* CSV Import Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Lecturers from CSV</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Paste CSV data with the following format:
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block">
                Name,Staff ID,Email,Position,Faculty,Department
              </code>
            </div>
            <Textarea
              placeholder="Dr. Jane Smith,STAFF004,j.smith@university.edu,Lecturer,Engineering,Electrical Engineering"
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              rows={10}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleImport}>Import</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generated Code Modal */}
      <Dialog open={isCodeModalOpen} onOpenChange={setIsCodeModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Code Generated</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                New verification code:
              </p>
              <p className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {generatedCode}
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Share this code with the lecturer for login authentication.
            </p>
            <Button onClick={() => setIsCodeModalOpen(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
