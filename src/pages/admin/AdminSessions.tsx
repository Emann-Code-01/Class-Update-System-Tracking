import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { mockSessions } from '../../data/mockData';

export default function AdminSessions() {
  return (
    <DashboardLayout>
      <AppHeader title="Sessions Management" />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Lecturer</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">
                      {session.courseCode}
                      <div className="text-sm text-gray-500">{session.courseTitle}</div>
                    </TableCell>
                    <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {session.startTime} – {session.endTime}
                    </TableCell>
                    <TableCell>{session.venueName}</TableCell>
                    <TableCell>{session.lecturerName}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {session.note || <span className="text-gray-400">-</span>}
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
