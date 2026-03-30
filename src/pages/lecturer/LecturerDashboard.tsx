import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/Dialog';
import { mockCourses, mockVenues, mockSessions } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Pencil, Trash2, Calendar, Clock, MapPin } from 'lucide-react';

interface SessionFormData {
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  venueId: string;
  note: string;
}

export default function LecturerDashboard() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<SessionFormData>({
    courseId: '',
    date: '',
    startTime: '',
    endTime: '',
    venueId: '',
    note: ''
  });
  const [conflictMessage, setConflictMessage] = useState('');
  const [sessions, setSessions] = useState(mockSessions.filter((s) => s.lecturerId === user?.id));

  const lecturerCourses = mockCourses.filter((c) => c.lecturerId === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for venue conflicts
    const conflict = sessions.find(
      (s) =>
        s.venueId === formData.venueId &&
        s.date === formData.date &&
        ((formData.startTime >= s.startTime && formData.startTime < s.endTime) ||
          (formData.endTime > s.startTime && formData.endTime <= s.endTime))
    );

    if (conflict) {
      setConflictMessage(
        `Venue occupied by ${conflict.courseCode} from ${conflict.startTime} to ${conflict.endTime}`
      );
      return;
    }

    const course = lecturerCourses.find((c) => c.id === formData.courseId);
    const venue = mockVenues.find((v) => v.id === formData.venueId);

    if (course && venue) {
      const newSession = {
        id: String(Date.now()),
        courseCode: course.code,
        courseTitle: course.title,
        lecturerName: user?.name || '',
        lecturerId: user?.id || '',
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        venueId: formData.venueId,
        venueName: venue.name,
        note: formData.note
      };

      setSessions([...sessions, newSession]);
      setFormData({
        courseId: '',
        date: '',
        startTime: '',
        endTime: '',
        venueId: '',
        note: ''
      });
    }
  };

  const handleDelete = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const upcomingSessions = sessions.filter((s) => new Date(s.date) >= new Date('2026-03-25')).sort(
    (a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime()
  );

  return (
    <DashboardLayout>
      <AppHeader title="Lecturer Dashboard" />
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Add Session Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add Session</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {lecturerCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.code} - {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Select value={formData.venueId} onValueChange={(value) => setFormData({ ...formData, venueId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVenues.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id}>
                          {venue.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Textarea
                    id="note"
                    placeholder="Add any additional information..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                  Add Session
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No upcoming sessions
                </p>
              ) : (
                upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{session.courseCode}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{session.courseTitle}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(session.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.startTime} – {session.endTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {session.venueName}
                      </div>
                    </div>
                    {session.note && (
                      <p className="text-sm bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                        {session.note}
                      </p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Conflict Modal */}
      <Dialog open={!!conflictMessage} onOpenChange={() => setConflictMessage('')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Venue Conflict</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{conflictMessage}</p>
            <Button onClick={() => setConflictMessage('')} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
