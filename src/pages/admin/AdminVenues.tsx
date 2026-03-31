import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/Dialog';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { mockVenues } from '../../data/mockData';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface VenueFormData {
  name: string;
  faculty: string;
  capacity: string;
  mapUrl: string;
  description: string;
}

const faculties = ['Engineering', 'Science', 'Arts', 'Medicine', 'Law'];

export default function AdminVenues() {
  const [venues, setVenues] = useState(mockVenues);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<string | null>(null);
  const [formData, setFormData] = useState<VenueFormData>({
    name: '',
    faculty: '',
    capacity: '',
    mapUrl: '',
    description: ''
  });

  const handleOpenModal = (venue?: typeof mockVenues[0]) => {
    if (venue) {
      setEditingVenue(venue.id);
      setFormData({
        name: venue.name,
        faculty: venue.faculty,
        capacity: String(venue.capacity),
        mapUrl: venue.mapUrl || '',
        description: venue.description
      });
    } else {
      setEditingVenue(null);
      setFormData({
        name: '',
        faculty: '',
        capacity: '',
        mapUrl: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingVenue) {
      setVenues(venues.map((v) =>
        v.id === editingVenue
          ? {
            ...v,
            name: formData.name,
            faculty: formData.faculty,
            capacity: parseInt(formData.capacity),
            mapUrl: formData.mapUrl,
            hasMap: !!formData.mapUrl,
            description: formData.description
          }
          : v
      ));
      toast.success('Venue updated successfully');
    } else {
      const newVenue = {
        id: String(Date.now()),
        name: formData.name,
        faculty: formData.faculty,
        capacity: parseInt(formData.capacity),
        mapUrl: formData.mapUrl,
        hasMap: !!formData.mapUrl,
        description: formData.description
      };
      setVenues([...venues, newVenue]);
      toast.success('Venue added successfully');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this venue?')) {
      setVenues(venues.filter((v) => v.id !== id));
      toast.success('Venue deleted successfully');
    }
  };

  return (
    <DashboardLayout>
      <AppHeader title="Venues Management" />
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Venues</CardTitle>
            <Button onClick={() => handleOpenModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Venue
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Venue Name</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Has Map</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {venues.map((venue) => (
                  <TableRow key={venue.id}>
                    <TableCell className="font-medium">{venue.name}</TableCell>
                    <TableCell>{venue.faculty}</TableCell>
                    <TableCell>{venue.capacity}</TableCell>
                    <TableCell>{venue.hasMap ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenModal(venue)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(venue.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Venue Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingVenue ? 'Edit Venue' : 'Add New Venue'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Venue Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty</Label>
              <Select value={formData.faculty} onValueChange={(value) => setFormData({ ...formData, faculty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mapUrl">Map Image URL (Optional)</Label>
              <Input
                id="mapUrl"
                type="url"
                placeholder="https://..."
                value={formData.mapUrl}
                onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingVenue ? 'Update' : 'Add'} Venue</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
