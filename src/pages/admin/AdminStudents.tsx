import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/Dialog';
import { Textarea } from '../../components/ui/TextArea';
import { mockStudents } from '../../data/mockData';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminStudents() {
  const [students, setStudents] = useState(mockStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvData, setCsvData] = useState('');

  const handleImport = () => {
    // Parse CSV data (simplified)
    const lines = csvData.trim().split('\n');
    if (lines.length > 1) {
      const newStudents = lines.slice(1).map((line, index) => {
        const [name, matricNumber, department, yearOfStudy, faculty] = line.split(',');
        return {
          id: String(Date.now() + index),
          name: name?.trim() || '',
          matricNumber: matricNumber?.trim() || '',
          department: department?.trim() || '',
          yearOfStudy: parseInt(yearOfStudy?.trim() || '1'),
          faculty: faculty?.trim() || ''
        };
      });
      setStudents([...students, ...newStudents]);
      toast.success(`${newStudents.length} students imported successfully`);
      setIsModalOpen(false);
      setCsvData('');
    }
  };

  return (
    <DashboardLayout>
      <AppHeader title="Students Management" />
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Students</CardTitle>
            <Button onClick={() => setIsModalOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Matric Number</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year of Study</TableHead>
                  <TableHead>Faculty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.matricNumber}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>Year {student.yearOfStudy}</TableCell>
                    <TableCell>{student.faculty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* CSV Import Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Students from CSV</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Paste CSV data with the following format:
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block">
                Name,Matric Number,Department,Year of Study,Faculty
              </code>
            </div>
            <Textarea
              placeholder="John Doe,CS/2023/001,Computer Science,1,Engineering"
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              rows={10}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleImport}>Import</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
