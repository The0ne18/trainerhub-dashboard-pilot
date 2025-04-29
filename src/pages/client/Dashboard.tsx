
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  CalendarDays, 
  Activity, 
  CheckCircle, 
  TrendingUp, 
  Target, 
  Award, 
  Flame, 
  Clock, 
  Dumbbell, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const ClientDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();
  
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
    },
    goals: [
      { name: "Weight Goal", current: 182, target: 175, unit: "lbs", progress: 62 },
      { name: "Weekly Workouts", current: 3, target: 4, unit: "sessions", progress: 75 },
      { name: "Running Distance", current: 12, target: 20, unit: "km/week", progress: 60 }
    ],
    recentActivities: [
      { date: "2025-04-28", name: "Upper Body Strength", completion: 100, duration: 45 },
      { date: "2025-04-26", name: "HIIT Cardio", completion: 100, duration: 30 },
      { date: "2025-04-24", name: "Core Stability", completion: 85, duration: 40 }
    ],
    weightData: [
      { date: "Week 1", weight: 190 },
      { date: "Week 2", weight: 188 },
      { date: "Week 3", weight: 185 },
      { date: "Week 4", weight: 184 },
      { date: "Week 5", weight: 182 },
      { date: "Week 6", weight: 182 }
    ],
    achievements: [
      { name: "First Milestone", description: "Completed 10 workouts", icon: "Award", date: "2025-03-15" },
      { name: "Consistency", description: "10-day workout streak", icon: "Flame", date: "2025-04-10" },
      { name: "Personal Best", description: "New bench press record", icon: "TrendingUp", date: "2025-04-22" }
    ]
  };
  
  const today = new Date();
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
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
  
  // Navigate to workouts page
  const goToWorkouts = () => {
    navigate('/client/workouts');
  };
  
  const nextSession = formatSessionDate(clientData.nextSession.date);
  const chartConfig = {
    weight: {
      label: "Weight",
      color: "#7c3aed"
    }
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold">
          {greeting}, {clientData.name}
        </h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your fitness journey.</p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Button 
              variant="ghost" 
              className="w-full h-full flex flex-col items-center justify-center py-6"
              onClick={goToWorkouts}
            >
              <Dumbbell className="h-8 w-8 mb-2 text-blue-500" />
              <span className="font-medium">Start Workout</span>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-center py-6">
              <Flame className="h-8 w-8 mb-2 text-orange-500 mx-auto" />
              <p className="font-medium">Current Streak</p>
              <p className="text-2xl font-bold mt-1">{clientData.progress.streakDays} days</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-center py-6">
              <CheckCircle className="h-8 w-8 mb-2 text-green-500 mx-auto" />
              <p className="font-medium">Sessions Completed</p>
              <p className="text-2xl font-bold mt-1">{clientData.progress.sessionsCompleted}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-center py-6">
              <Award className="h-8 w-8 mb-2 text-purple-500 mx-auto" />
              <p className="font-medium">Achievements</p>
              <p className="text-2xl font-bold mt-1">{clientData.progress.achievements}</p>
            </div>
          </CardContent>
        </Card>
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
      
      {/* Goals Tracking */}
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-400 text-white pb-4">
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Your Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {clientData.goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">({goal.current} / {goal.target} {goal.unit})</span>
                    </div>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-2">
                View All Goals
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Recent Activity & Weight Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-400 text-white">
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Workouts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {clientData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Dumbbell className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {activity.duration} min
                        </p>
                      </div>
                    </div>
                    <Badge variant={activity.completion === 100 ? "default" : "outline"}>
                      {activity.completion === 100 ? "Completed" : `${activity.completion}%`}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" onClick={goToWorkouts}>
                  View All Workouts
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-white">
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Weight Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="h-48 bg-slate-100 rounded animate-pulse"></div>
            ) : (
              <div className="h-48">
                <ChartContainer config={chartConfig}>
                  <LineChart data={clientData.weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                    <ChartTooltip
                      content={(props) => (
                        <ChartTooltipContent
                          className="bg-white shadow-lg border text-black"
                          {...props}
                        />
                      )}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#7c3aed" 
                      strokeWidth={2}
                      name="weight"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 2 }} 
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Achievements */}
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white">
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-shrink-0 w-48 h-32 bg-slate-100 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {clientData.achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-48 bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 border border-indigo-100 shadow-sm"
                >
                  <div className="flex justify-center mb-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <Award className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <h4 className="font-medium text-center mb-1">{achievement.name}</h4>
                  <p className="text-xs text-center text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-center mt-2 text-indigo-600 font-medium">
                    {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Calendar */}
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="tips">Fitness Tips</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Monthly Calendar</CardTitle>
              <CardDescription>Your scheduled sessions and completed workouts</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-6">
              <Calendar
                mode="single"
                selected={today}
                className="border rounded-md p-2"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tips">
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Fitness Tips</CardTitle>
              <CardDescription>Advice to help you reach your goals</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-lg mb-1">Hydration Matters</h4>
                  <p className="text-muted-foreground">Aim to drink at least 8 glasses of water per day, especially on workout days.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-medium text-lg mb-1">Rest & Recovery</h4>
                  <p className="text-muted-foreground">Make sure to get 7-9 hours of sleep for optimal muscle recovery and performance.</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="font-medium text-lg mb-1">Protein Intake</h4>
                  <p className="text-muted-foreground">Consume 1.6-2.2g of protein per kg of body weight to support muscle growth.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
