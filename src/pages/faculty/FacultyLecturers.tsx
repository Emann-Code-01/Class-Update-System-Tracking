import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { mockLecturers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import type { FacultyAdmin } from '../../types';

export default function FacultyLecturers() {
  const { user: authUser } = useAuth();
  const user = authUser as FacultyAdmin | null;
  const facultyLecturers = mockLecturers.filter((l) => l.faculty === user?.faculty);

  return (
    <DashboardLayout>
      <AppHeader title="Lecturers" />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Lecturers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyLecturers.map((lecturer) => (
                  <TableRow key={lecturer.id}>
                    <TableCell className="font-medium">{lecturer.name}</TableCell>
                    <TableCell>{lecturer.email}</TableCell>
                    <TableCell>{lecturer.position}</TableCell>
                    <TableCell>{lecturer.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
