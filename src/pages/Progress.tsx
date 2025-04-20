
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarDays, ChevronDown, Download, User } from 'lucide-react';

// Dummy data for charts
const weightData = [
  { date: 'Jan', weight: 185, goal: 175 },
  { date: 'Feb', weight: 182, goal: 175 },
  { date: 'Mar', weight: 180, goal: 175 },
  { date: 'Apr', weight: 178, goal: 175 },
  { date: 'May', weight: 177, goal: 175 },
  { date: 'Jun', weight: 176, goal: 175 },
];

const sessionsData = [
  { month: 'Jan', completed: 12, canceled: 2 },
  { month: 'Feb', completed: 14, canceled: 1 },
  { month: 'Mar', completed: 10, canceled: 3 },
  { month: 'Apr', completed: 15, canceled: 0 },
  { month: 'May', completed: 16, canceled: 1 },
  { month: 'Jun', completed: 18, canceled: 0 },
];

const goalMetrics = [
  { name: 'Weight', value: 96 },
  { name: 'Strength', value: 82 },
  { name: 'Endurance', value: 74 },
  { name: 'Flexibility', value: 65 },
];

const Progress = () => {
  const [selectedClient, setSelectedClient] = useState("emma");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Progress Tracking</h1>
          <p className="text-muted-foreground mt-1">Monitor your clients' fitness journey</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[200px]">
              <User className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="emma">Emma Thompson</SelectItem>
              <SelectItem value="michael">Michael Chen</SelectItem>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="3months">
            <SelectTrigger className="w-[160px]">
              <CalendarDays className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weight Tracking */}
            <Card className="card-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Weight Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weightData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="goal" stroke="#82ca9d" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Session Attendance */}
            <Card className="card-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Session Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sessionsData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#7c3aed" />
                      <Bar dataKey="canceled" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Goal Metrics */}
            <Card className="card-shadow lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {goalMetrics.map(metric => (
                    <div key={metric.name} className="flex flex-col items-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e9ecef"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#7c3aed"
                            strokeWidth="3"
                            strokeDasharray={`${metric.value}, 100`}
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <div className="text-2xl font-bold">{metric.value}%</div>
                        </div>
                      </div>
                      <p className="mt-2 font-medium">{metric.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="measurements" className="pt-4">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-8">
                Detailed measurement tracking will be available in this tab.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance" className="pt-4">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-8">
                Detailed attendance records will be available in this tab.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="pt-4">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-8">
                Detailed goal tracking will be available in this tab.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progress;
