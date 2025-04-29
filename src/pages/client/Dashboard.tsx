
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Activity, CheckCircle } from 'lucide-react';

const ClientDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock client data
  const clientData = {
    name: "Alex Smith",
    trainer: "Sarah Johnson",
    trainerAvatar: "https://i.pravatar.cc/150?u=sarah",
    nextSession: {
      date: "2025-05-01T10:00:00",
      type: "Strength Training",
      duration: 60
    },
    progress: {
      sessionsCompleted: 24,
      streakDays: 14,
      achievements: 5
    }
  };
  
  const today = new Date();
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Format date to display day, month, and time
  const formatSessionDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };
  
  const nextSession = formatSessionDate(clientData.nextSession.date);

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {clientData.name}</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your fitness journey.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Training Session */}
        <Card className="md:col-span-2 overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Next Training Session
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="animate-pulse flex space-x-4 w-full">
                  <div className="rounded-full bg-slate-200 h-14 w-14"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="flex-shrink-0 mr-4">
                    <Avatar className="h-14 w-14 border-2 border-blue-100">
                      <AvatarImage src={clientData.trainerAvatar} alt={clientData.trainer} />
                      <AvatarFallback>{clientData.trainer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your trainer</p>
                    <p className="font-medium text-lg">{clientData.trainer}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-center md:text-right">
                  <div className="text-blue-800 font-semibold text-xl">{nextSession.day}</div>
                  <div className="text-2xl font-bold">{nextSession.date}, {nextSession.time}</div>
                  <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {clientData.nextSession.type} ({clientData.nextSession.duration} min)
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Progress Summary */}
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-400 text-white">
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Sessions completed</span>
                  <span className="font-bold text-xl">{clientData.progress.sessionsCompleted}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Current streak</span>
                  <span className="font-bold text-xl">{clientData.progress.streakDays} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Achievements</span>
                  <span className="font-bold text-xl flex items-center">
                    {clientData.progress.achievements}
                    <CheckCircle className="ml-1 h-4 w-4 text-green-500" />
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Calendar */}
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Monthly Calendar</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <Calendar
            mode="single"
            selected={today}
            className="border rounded-md p-2"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
