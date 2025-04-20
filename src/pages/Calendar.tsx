
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarCheck, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addDays } from 'date-fns';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');
  
  // Demo data - would come from API in real app
  const sessions = [
    { id: 1, client: 'Emma Thompson', type: 'Strength Training', date: new Date(), time: '09:00 AM', duration: 60 },
    { id: 2, client: 'Michael Chen', type: 'Cardio', date: new Date(), time: '11:30 AM', duration: 45 },
    { id: 3, client: 'Sarah Johnson', type: 'HIIT', date: addDays(new Date(), 1), time: '10:00 AM', duration: 30 },
    { id: 4, client: 'David Wilson', type: 'Flexibility', date: addDays(new Date(), 2), time: '2:00 PM', duration: 45 },
  ];

  // Filter sessions for the selected date
  const sessionsForSelectedDate = sessions.filter(session => 
    session.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage your training schedule</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="col-span-1 lg:col-span-2 card-shadow">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle>Schedule</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setCalendarView('month')}>Month</Button>
                <Button variant="outline" size="sm" onClick={() => setCalendarView('week')}>Week</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="border rounded-md p-4">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={(date) => date && setSelectedDate(date)} 
                className="pointer-events-auto"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Sessions for selected day */}
        <Card className="card-shadow">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center">
              <CalendarCheck className="h-5 w-5 mr-2" />
              {format(selectedDate, 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {sessionsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {sessionsForSelectedDate.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-trainer-gray rounded-md">
                    <div>
                      <p className="font-medium">{session.client}</p>
                      <p className="text-sm text-muted-foreground">{session.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{session.time}</p>
                      <p className="text-sm text-muted-foreground">{session.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No sessions scheduled for this day</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
