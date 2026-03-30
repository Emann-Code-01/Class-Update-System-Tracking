import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { mockCourses, mockLecturers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import type { FacultyAdmin } from '../../types';

export default function FacultyCourses() {
  const { user: authUser } = useAuth();
  const user = authUser as FacultyAdmin | null;
  const facultyCourses = mockCourses.filter((c) => c.faculty === user?.faculty);
  const facultyLecturers = mockLecturers.filter((l) => l.faculty === user?.faculty);

  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries(facultyCourses.map((c) => [c.id, c.lecturerId || '']))
  );

  const handleSave = (courseId: string) => {
    const lecturerId = assignments[courseId];
    const lecturer = facultyLecturers.find((l) => l.id === lecturerId);
    const course = facultyCourses.find((c) => c.id === courseId);
    toast.success(
      `Lecturer ${lecturer?.name ?? 'None'} assigned to ${course?.code ?? courseId} successfully`
    );
  };

  return (
    <DashboardLayout>
      <AppHeader title="Courses" />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Assigned Lecturer</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.department}</TableCell>
                    <TableCell>
                      <Select
                        value={assignments[course.id]}
                        onValueChange={(value) =>
                          setAssignments({ ...assignments, [course.id]: value })
                        }
                      >
                        <SelectTrigger className="w-50 cursor-pointer">
                          <SelectValue placeholder="Select lecturer" />
                        </SelectTrigger>
                        <SelectContent>
                          {facultyLecturers.map((lecturer) => (
                            <SelectItem className='cursor-pointer' key={lecturer.id} value={lecturer.id}>
                              {lecturer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button className='cursor-pointer' size="sm" onClick={() => handleSave(course.id)}>
                        Save
                      </Button>
                    </TableCell>
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
