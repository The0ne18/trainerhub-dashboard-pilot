
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  CalendarCheck, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter,
  Clock
} from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from "sonner";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');
  const [isLoading, setIsLoading] = useState(true);
  
  // Demo data - would come from API in real app
  const sessions = [
    { id: 1, client: 'Emma Thompson', type: 'Strength Training', date: new Date(), time: '09:00 AM', duration: 60, color: 'bg-blue-100 text-blue-800', avatar: 'https://i.pravatar.cc/150?u=emma' },
    { id: 2, client: 'Michael Chen', type: 'Cardio', date: new Date(), time: '11:30 AM', duration: 45, color: 'bg-green-100 text-green-800', avatar: 'https://i.pravatar.cc/150?u=michael' },
    { id: 3, client: 'Sarah Johnson', type: 'HIIT', date: addDays(new Date(), 1), time: '10:00 AM', duration: 30, color: 'bg-purple-100 text-purple-800', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 4, client: 'David Wilson', type: 'Flexibility', date: addDays(new Date(), 2), time: '2:00 PM', duration: 45, color: 'bg-orange-100 text-orange-800', avatar: 'https://i.pravatar.cc/150?u=david' },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter sessions for the selected date
  const sessionsForSelectedDate = sessions.filter(session => 
    isSameDay(session.date, selectedDate)
  );

  const handleNewSession = () => {
    toast.success("New session dialog would open here");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      toast.info(`Selected ${format(date, 'MMMM d, yyyy')}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage your training schedule</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            className="transition-all hover:shadow-md"
            onClick={handleNewSession}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="col-span-1 lg:col-span-2 card-shadow hover:shadow-lg transition-all overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-trainer-purple to-trainer-light-purple"></div>
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle>Schedule</CardTitle>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCalendarView('month')}
                  className={cn(calendarView === 'month' && 'bg-primary text-primary-foreground')}
                >
                  Month
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCalendarView('week')}
                  className={cn(calendarView === 'week' && 'bg-primary text-primary-foreground')}
                >
                  Week
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="border rounded-md p-4 bg-card">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={handleDateSelect} 
                className="pointer-events-auto"
                modifiers={{
                  hasSession: sessions.map(session => session.date)
                }}
                modifiersStyles={{
                  hasSession: {
                    fontWeight: 'bold',
                    borderBottom: '2px solid var(--trainer-purple, #7c3aed)'
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Sessions for selected day */}
        <TooltipProvider>
          <Card className="card-shadow hover:shadow-lg transition-all overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-trainer-purple to-trainer-light-purple"></div>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center">
                <CalendarCheck className="h-5 w-5 mr-2 text-trainer-purple" />
                {format(selectedDate, 'MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((index) => (
                    <div key={index} className="flex animate-pulse items-center justify-between p-3 bg-trainer-gray/50 rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div className="ml-3">
                          <div className="h-4 w-24 bg-gray-300 rounded"></div>
                          <div className="h-3 w-16 bg-gray-300 rounded mt-2"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 w-16 bg-gray-300 rounded"></div>
                        <div className="h-3 w-12 bg-gray-300 rounded mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sessionsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {sessionsForSelectedDate.map((session) => (
                    <Tooltip key={session.id} delayDuration={300}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between p-3 bg-trainer-gray rounded-md hover:bg-trainer-gray/80 transition-all cursor-pointer">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={session.avatar} alt={session.client} />
                              <AvatarFallback>{session.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{session.client}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${session.color}`}>{session.type}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {session.time}
                            </p>
                            <p className="text-xs text-muted-foreground">{session.duration} min</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <p><strong>Client:</strong> {session.client}</p>
                          <p><strong>Session:</strong> {session.type}</p>
                          <p><strong>Time:</strong> {session.time} ({session.duration} min)</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 animate-fade-in">
                  <div className="bg-trainer-gray/50 p-6 rounded-lg">
                    <p className="text-muted-foreground">No sessions scheduled for this day</p>
                    <Button variant="outline" className="mt-4 transition-all hover:bg-primary hover:text-white" onClick={handleNewSession}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Session
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CalendarPage;
