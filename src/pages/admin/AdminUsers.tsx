import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { mockStudents, mockLecturers, mockFacultyAdmins } from '../../data/mockData';

export default function AdminUsers() {
  const allUsers = [
    ...mockStudents.map((s) => ({
      id: s.id,
      name: s.name,
      role: 'Student',
      identifier: s.matricNumber,
      department: s.department
    })),
    ...mockLecturers.map((l) => ({
      id: l.id,
      name: l.name,
      role: 'Lecturer',
      identifier: l.staffId,
      department: l.department
    })),
    ...mockFacultyAdmins.map((f) => ({
      id: f.id,
      name: f.name,
      role: 'Faculty Admin',
      identifier: f.email,
      department: f.faculty
    }))
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Student':
        return 'bg-blue-500';
      case 'Lecturer':
        return 'bg-green-500';
      case 'Faculty Admin':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout>
      <AppHeader title="Users Management" />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Identifier</TableHead>
                  <TableHead>Department/Faculty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.identifier}</TableCell>
                    <TableCell>{user.department}</TableCell>
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
