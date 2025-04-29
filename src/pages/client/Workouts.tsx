
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Calendar, CheckCircle, Clock, ChevronRight, PlayCircle } from 'lucide-react';

// Format date to display month and day
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ClientWorkouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock workout data
  const workouts = [
    {
      id: 1,
      name: "Full Body Strength",
      type: "Strength",
      assignedDate: "2025-04-25",
      dueDate: "2025-05-02",
      progress: 0,
      exercises: [
        { name: "Squats", sets: 3, reps: 12, weight: "Body weight" },
        { name: "Push-ups", sets: 3, reps: 15, weight: "Body weight" },
        { name: "Lunges", sets: 3, reps: 10, weight: "Body weight" },
        { name: "Plank", sets: 3, duration: "30 seconds" }
      ]
    },
    {
      id: 2,
      name: "Core Stability",
      type: "Core",
      assignedDate: "2025-04-22",
      dueDate: "2025-04-29",
      progress: 75,
      exercises: [
        { name: "Bicycle Crunches", sets: 3, reps: 20 },
        { name: "Russian Twists", sets: 3, reps: 15, weight: "4kg" },
        { name: "Leg Raises", sets: 3, reps: 12 },
        { name: "Side Planks", sets: 3, duration: "30 seconds per side" }
      ]
    },
    {
      id: 3,
      name: "Upper Body Focus",
      type: "Strength",
      assignedDate: "2025-04-20",
      dueDate: "2025-04-27",
      progress: 100,
      exercises: [
        { name: "Dumbbell Press", sets: 4, reps: 10, weight: "8kg" },
        { name: "Bent-over Rows", sets: 4, reps: 12, weight: "6kg" },
        { name: "Tricep Dips", sets: 3, reps: 15 },
        { name: "Shoulder Press", sets: 3, reps: 12, weight: "5kg" }
      ]
    }
  ];
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold">My Workouts</h1>
        <p className="text-muted-foreground mt-1">View and track your assigned workout programs.</p>
      </div>
      
      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4">
          {isLoading ? (
            Array(2).fill(0).map((_, idx) => (
              <Card key={idx} className="animate-pulse">
                <CardHeader className="bg-slate-200 h-16"></CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            workouts.filter(workout => workout.progress < 100).map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {isLoading ? (
            <Card className="animate-pulse">
              <CardHeader className="bg-slate-200 h-16"></CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ) : (
            workouts.filter(workout => workout.progress === 100).map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, idx) => (
              <Card key={idx} className="animate-pulse">
                <CardHeader className="bg-slate-200 h-16"></CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface WorkoutCardProps {
  workout: {
    id: number;
    name: string;
    type: string;
    assignedDate: string;
    dueDate: string;
    progress: number;
    exercises: Array<{
      name: string;
      sets: number;
      reps?: number;
      weight?: string;
      duration?: string;
    }>;
  };
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className={`
        ${workout.progress === 100 ? 'bg-green-500' : 'bg-blue-500'} 
        text-white p-4 flex flex-row justify-between items-center
      `}>
        <CardTitle className="flex items-center">
          <Dumbbell className="mr-2 h-5 w-5" /> 
          {workout.name}
        </CardTitle>
        <Badge className={`
          ${workout.progress === 100 ? 'bg-green-700' : 'bg-blue-700'}
          hover:${workout.progress === 100 ? 'bg-green-800' : 'bg-blue-800'}
        `}>
          {workout.type}
        </Badge>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center mb-2 md:mb-0">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Assigned: <span className="font-medium">{formatDate(workout.assignedDate)}</span>
              {' · '}
              Due: <span className="font-medium">{formatDate(workout.dueDate)}</span>
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">{workout.progress}% Complete</span>
            <Progress value={workout.progress} className="w-24" />
          </div>
        </div>
        
        {expanded && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-3">Exercises:</h3>
            <ul className="space-y-3">
              {workout.exercises.map((exercise, idx) => (
                <li key={idx} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{exercise.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : exercise.duration}
                    {exercise.weight && ` • ${exercise.weight}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-4 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Hide Details' : 'View Details'}
            <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </Button>
          
          {workout.progress < 100 ? (
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
              <PlayCircle className="mr-1 h-4 w-4" />
              Start Workout
            </Button>
          ) : (
            <Button size="sm" variant="ghost" className="text-green-600" disabled>
              <CheckCircle className="mr-1 h-4 w-4" />
              Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientWorkouts;
