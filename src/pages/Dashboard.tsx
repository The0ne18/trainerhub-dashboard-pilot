import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Users, CalendarDays, BarChart, Plus, TrendingUp } from 'lucide-react';
import { ScheduleSessionDialog } from "@/components/sessions/ScheduleSessionDialog";
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import MagazineFeatures from '@/components/dashboard/MagazineFeatures';
import { AddClientDialog } from '@/components/clients/AddClientDialog';

const Dashboard = () => {
  const stats = [
    { 
      label: 'Active Clients', 
      value: '24', 
      icon: Users, 
      gradient: 'from-blue-500 to-blue-400', 
      trend: '+3 this month',
      trendDirection: 'up',
      className: 'col-span-2' // Expand to 2 columns
    },
    { 
      label: 'Upcoming Sessions', 
      value: '12', 
      icon: CalendarDays, 
      gradient: 'from-green-500 to-green-400', 
      trend: 'Today: 4',
      trendDirection: 'neutral',
      className: 'col-span-2' // Expand to 2 columns
    }
  ];
  
  const topClients = [
    { 
      name: 'Emma Thompson', 
      sessions: 24, 
      progress: 95,
      avatar: 'https://i.pravatar.cc/150?u=emma', 
      trend: 'up' 
    },
    { 
      name: 'Michael Chen', 
      sessions: 20, 
      progress: 88,
      avatar: 'https://i.pravatar.cc/150?u=michael', 
      trend: 'up' 
    },
    { 
      name: 'Sarah Johnson', 
      sessions: 18, 
      progress: 82,
      avatar: 'https://i.pravatar.cc/150?u=sarah', 
      trend: 'neutral' 
    },
  ];
  
  const sessionsData = [
    {
      id: 1,
      client: 'Michael Chen',
      type: 'Strength Training',
      time: '10:00 AM',
      duration: 45,
      avatar: 'https://i.pravatar.cc/150?u=michael',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      client: 'Sarah Johnson',
      type: 'HIIT Session',
      time: '2:30 PM',
      duration: 60,
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  const today = new Date();

  const handleRefresh = () => {
    toast.success("Dashboard refreshed successfully");
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your clients today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <ScheduleSessionDialog />
          <Button 
            className="inline-flex items-center justify-center rounded-lg 
              bg-purple-600 text-white px-4 py-2 
              hover:bg-purple-700 transition-colors 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              text-sm font-medium"
            onClick={() => {
              const addClientDialog = document.querySelector('[data-add-client-dialog-trigger]');
              if (addClientDialog instanceof HTMLElement) {
                addClientDialog.click();
              }
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
          <AddClientDialog />
        </div>
      </div>
      
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat.label} 
            className={cn(
              "card-shadow overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1", 
              stat.className
            )}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${stat.gradient}`}></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center mt-1 text-xs">
                    {stat.trendDirection === 'up' && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
                    <span className={cn(
                      "text-muted-foreground",
                      stat.trendDirection === 'up' && "text-green-500"
                    )}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-full text-white`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <MagazineFeatures />
      
      <TooltipProvider>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="col-span-1 lg:col-span-2 card-shadow overflow-hidden hover:shadow-lg transition-all">
            <div className="h-1 w-full bg-gradient-to-r from-trainer-purple to-trainer-light-purple"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Upcoming Sessions</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="transition-all hover:bg-primary hover:text-white"
                  onClick={handleRefresh}
                >
                  View Calendar
                </Button>
              </div>
              <div className="border rounded-md p-4 bg-card">
                <Calendar mode="single" selected={today} />
              </div>
              <div className="mt-6 space-y-3">
                {sessionsData.map((session) => (
                  <Tooltip key={session.id} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 bg-trainer-gray rounded-md transition-all hover:bg-trainer-gray/80 cursor-pointer">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={session.avatar} alt={session.client} />
                            <AvatarFallback>{session.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.client}</p>
                            <div className="flex items-center">
                              <span className={`text-xs px-2 py-1 rounded-full mr-2 ${session.color}`}>{session.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{session.time}</p>
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
            </CardContent>
          </Card>
          
          {/* Top Clients */}
          <Card className="card-shadow overflow-hidden hover:shadow-lg transition-all">
            <div className="h-1 w-full bg-gradient-to-r from-trainer-purple to-trainer-light-purple"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Top Performing Clients</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-trainer-purple transition-all hover:bg-trainer-purple/10"
                >
                  <BarChart className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </div>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={client.name} className="flex items-center space-x-4 transition-all hover:bg-gray-50 p-2 rounded-md">
                    <Avatar className="h-10 w-10 border-2 border-trainer-gray">
                      <AvatarImage src={client.avatar} alt={client.name} />
                      <AvatarFallback>{index + 1}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="font-medium">{client.name}</p>
                        {client.trend === 'up' && (
                          <TrendingUp className="h-3 w-3 text-green-500 ml-2" />
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-trainer-purple to-trainer-light-purple h-2 rounded-full transition-all duration-1000" 
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
      </TooltipProvider>
    </div>
  );
};

export default Dashboard;
