
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const ClientSchedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock schedule data
  const schedule = [
    {
      id: 1,
      title: "Strength Training",
      trainer: "Sarah Johnson",
      trainerAvatar: "https://i.pravatar.cc/150?u=sarah",
      date: "2025-05-01",
      startTime: "10:00",
      endTime: "11:00",
      location: "Main Gym",
      notes: "Focus on upper body"
    },
    {
      id: 2,
      title: "Cardio Session",
      trainer: "Mike Rodriguez",
      trainerAvatar: "https://i.pravatar.cc/150?u=mike",
      date: "2025-05-03",
      startTime: "14:00",
      endTime: "15:00",
      location: "Cardio Room",
      notes: "HIIT training"
    },
    {
      id: 3,
      title: "Flexibility & Recovery",
      trainer: "Emma Wilson",
      trainerAvatar: "https://i.pravatar.cc/150?u=emma",
      date: "2025-05-05",
      startTime: "16:30",
      endTime: "17:30",
      location: "Studio 2",
      notes: "Bring yoga mat"
    },
    {
      id: 4,
      title: "Nutrition Consultation",
      trainer: "Sarah Johnson",
      trainerAvatar: "https://i.pravatar.cc/150?u=sarah",
      date: "2025-05-07",
      startTime: "11:00",
      endTime: "12:00",
      location: "Office 3",
      notes: "Bring food diary"
    }
  ];
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString);
  };
  
  // Get sessions for selected date
  const getSessionsForDate = () => {
    if (!selectedDate) return [];
    
    const dateString = selectedDate.toISOString().split('T')[0];
    return schedule.filter(session => session.date === dateString);
  };

  // Highlight dates with sessions on the calendar
  const highlightedDates = schedule.map(session => formatDate(session.date));
  
  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold">My Schedule</h1>
        <p className="text-muted-foreground mt-1">View your upcoming training sessions and appointments.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-2"
              modifiers={{
                highlighted: highlightedDates
              }}
              modifiersClassNames={{
                highlighted: "bg-blue-100 text-blue-900 font-bold"
              }}
            />
          </CardContent>
        </Card>
        
        {/* Sessions for selected date */}
        <Card className="md:col-span-2">
          <CardHeader className="bg-blue-50">
            <CardTitle>
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              Array(2).fill(0).map((_, idx) => (
                <div key={idx} className="animate-pulse mb-4 p-4 border rounded-lg">
                  <div className="flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {getSessionsForDate().length > 0 ? (
                  <div className="space-y-4">
                    {getSessionsForDate().map(session => (
                      <div key={session.id} className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12 border-2 border-blue-100">
                              <AvatarImage src={session.trainerAvatar} alt={session.trainer} />
                              <AvatarFallback>{session.trainer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">with {session.trainer}</p>
                              
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                  <span>{session.startTime} - {session.endTime}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                                  <span>{session.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Badge>{session.title}</Badge>
                        </div>
                        
                        {session.notes && (
                          <div className="mt-4 border-t pt-2">
                            <p className="text-sm italic">Note: {session.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No sessions scheduled for this date.</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientSchedule;
