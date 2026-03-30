import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { mockVenues } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Map } from 'lucide-react';
import type { FacultyAdmin } from '../../types';

export default function FacultyVenues() {
  const { user: authUser } = useAuth();
  const user = authUser as FacultyAdmin | null;
  const facultyVenues = mockVenues.filter((v) => v.faculty === user?.faculty);

  return (
    <DashboardLayout>
      <AppHeader title="Venues" />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Venues</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Venue Name</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Map</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyVenues.map((venue) => (
                  <TableRow key={venue.id}>
                    <TableCell className="font-medium">{venue.name}</TableCell>
                    <TableCell>{venue.faculty}</TableCell>
                    <TableCell>{venue.capacity}</TableCell>
                    <TableCell>
                      {venue.hasMap ? (
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <Map className="w-3 h-3" />
                          Available
                        </Badge>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{venue.description}</TableCell>
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
