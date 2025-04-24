import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Users, CalendarDays, BarChart, Plus } from 'lucide-react';
import { ScheduleSessionDialog } from "@/components/sessions/ScheduleSessionDialog";

const Dashboard = () => {
  // Demo data - would come from API in real app
  const stats = [
    { 
      label: 'Active Clients', 
      value: '24', 
      icon: Users, 
      color: 'bg-blue-500', 
      trend: '+3 this month',
      className: 'col-span-2' // Expand to 2 columns
    },
    { 
      label: 'Upcoming Sessions', 
      value: '12', 
      icon: CalendarDays, 
      color: 'bg-green-500', 
      trend: 'Today: 4',
      className: 'col-span-2' // Expand to 2 columns
    }
  ];
  
  const topClients = [
    { name: 'Emma Thompson', sessions: 24, progress: 95 },
    { name: 'Michael Chen', sessions: 20, progress: 88 },
    { name: 'Sarah Johnson', sessions: 18, progress: 82 },
  ];
  
  const today = new Date();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your clients today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <ScheduleSessionDialog />
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Client
          </Button>
        </div>
      </div>
      
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={`card-shadow ${stat.className}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="col-span-1 lg:col-span-2 card-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Upcoming Sessions</h2>
              <Button variant="outline" size="sm">View Calendar</Button>
            </div>
            <div className="border rounded-md p-4">
              <Calendar mode="single" selected={today} />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-3 bg-trainer-gray rounded-md">
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Strength Training</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">10:00 AM</p>
                  <p className="text-sm text-muted-foreground">45 min</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-trainer-gray rounded-md">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">HIIT Session</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2:30 PM</p>
                  <p className="text-sm text-muted-foreground">60 min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Top Clients */}
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Top Performing Clients</h2>
              <Button variant="ghost" size="sm" className="text-trainer-purple">
                <BarChart className="h-4 w-4 mr-1" />
                Details
              </Button>
            </div>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={client.name} className="flex items-center space-x-4">
                  <div className="bg-trainer-gray rounded-full h-10 w-10 flex items-center justify-center font-medium text-trainer-dark-gray">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{client.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-trainer-purple h-2 rounded-full" 
                        style={{ width: `${client.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{client.sessions}</p>
                    <p className="text-xs text-muted-foreground">sessions</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
