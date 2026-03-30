import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { AppHeader } from '../../components/AppHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/Dialog';
import { mockSessions, mockVenues } from '../../data/mockData';
import { Clock, MapPin, User, RefreshCw, Calendar } from 'lucide-react';

export default function StudentDashboard() {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState(new Date());

  const todaySessions = mockSessions.filter((s) => s.date === '2026-03-25');
  const venue = mockVenues.find((v) => v.id === selectedVenue);

  const handleSync = () => {
    setLastSync(new Date());
  };

  return (
    <DashboardLayout>
      <AppHeader title="Today's Schedule">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs">Last sync: {lastSync.toLocaleTimeString()}</span>
          </Badge>
          <Button variant="outline" size="sm" onClick={handleSync} className="gap-2 cursor-pointer">
            <RefreshCw className="w-4 h-4" />
            Sync Now
          </Button>
        </div>
      </AppHeader>

      <div className="p-6 space-y-6">
        {/* Date badge */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Wednesday, March 25, 2026
          </h2>
        </div>

        <div className="grid gap-4">
          {todaySessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 flex-wrap">
                      <Badge className="bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-sm">
                        {session.courseCode}
                      </Badge>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {session.courseTitle}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{session.lecturerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{session.startTime} – {session.endTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedVenue(session.venueId)}
                    className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    {session.venueName}
                  </Button>
                </div>
                {session.note && (
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm">
                    <strong className="text-amber-900 dark:text-amber-100">Note:</strong>{' '}
                    <span className="text-amber-800 dark:text-amber-200">{session.note}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Venue Modal */}
      <Dialog open={!!selectedVenue} onOpenChange={() => setSelectedVenue(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{venue?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {venue?.hasMap && venue.mapUrl ? (
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-inner">
                <img
                  src={venue.mapUrl}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Location Details</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{venue?.description}</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Faculty</p>
                <p className="font-medium text-gray-900 dark:text-white">{venue?.faculty}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                <p className="font-medium text-gray-900 dark:text-white">{venue?.capacity} students</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}