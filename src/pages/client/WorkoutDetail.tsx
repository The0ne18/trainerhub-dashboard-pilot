
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import {
  Dumbbell,
  Clock,
  CheckCircle,
  ArrowLeft,
  Play,
  Pause,
  RotateCw,
  ChevronRight,
} from 'lucide-react';

// Exercise interface
interface Exercise {
  name: string;
  sets: number;
  reps?: number;
  weight?: string;
  duration?: string;
  completed?: boolean;
}

// Workout interface
interface Workout {
  id: number;
  name: string;
  type: string;
  assignedDate: string;
  dueDate: string;
  progress: number;
  exercises: Exercise[];
}

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [activeExercise, setActiveExercise] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [restTimer, setRestTimer] = useState<number>(60); // 60 seconds rest by default
  const [isResting, setIsResting] = useState(false);

  // Mock workout data - in a real app, this would come from an API call
  const mockWorkout = {
    id: 1,
    name: "Full Body Strength",
    type: "Strength",
    assignedDate: "2025-04-25",
    dueDate: "2025-05-02",
    progress: 0,
    exercises: [
      { name: "Squats", sets: 3, reps: 12, weight: "Body weight", completed: false },
      { name: "Push-ups", sets: 3, reps: 15, weight: "Body weight", completed: false },
      { name: "Lunges", sets: 3, reps: 10, weight: "Body weight", completed: false },
      { name: "Plank", sets: 3, duration: "30 seconds", completed: false }
    ]
  };
  
  useEffect(() => {
    // Simulate API call to get workout details
    setTimeout(() => {
      if (id) {
        setWorkout(mockWorkout);
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  // Handle timer functionality
  useEffect(() => {
    let interval: number | undefined;
    
    if (isResting && restTimer > 0 && isTimerActive) {
      interval = window.setInterval(() => {
        setRestTimer(prevTime => prevTime - 1);
      }, 1000);
    } else if (isResting && restTimer === 0) {
      setIsResting(false);
      setRestTimer(60); // Reset rest timer
      toast.success("Rest complete! Ready for next set");
      setIsTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isResting, restTimer, isTimerActive]);
  
  const handleCompleteSet = () => {
    toast.success("Set completed!");
    setIsResting(true);
    setIsTimerActive(true);
  };
  
  const handleToggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };
  
  const handleResetTimer = () => {
    setRestTimer(60);
  };
  
  const handleCompleteExercise = () => {
    if (!workout) return;
    
    const updatedExercises = [...workout.exercises];
    updatedExercises[activeExercise] = {
      ...updatedExercises[activeExercise],
      completed: true
    };
    
    setWorkout({
      ...workout,
      exercises: updatedExercises,
      progress: Math.round(((updatedExercises.filter(e => e.completed).length) / updatedExercises.length) * 100)
    });
    
    toast.success(`${workout.exercises[activeExercise].name} completed!`);
    
    // Move to next exercise if available
    if (activeExercise < workout.exercises.length - 1) {
      setActiveExercise(activeExercise + 1);
      setIsResting(false);
      setRestTimer(60);
      setIsTimerActive(false);
    } else {
      // All exercises completed
      toast.success("Workout completed! Great job!");
    }
  };
  
  const handleBackToWorkouts = () => {
    navigate('/client/workouts');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-8 w-48 bg-slate-200 rounded"></div>
        <Card className="animate-pulse">
          <CardHeader className="bg-slate-200 h-16"></CardHeader>
          <CardContent className="p-6">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="h-16 bg-slate-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleBackToWorkouts} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Workout not found</h2>
          <p className="text-muted-foreground mt-2">The workout you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBackToWorkouts} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {workout.type}
        </Badge>
      </div>
      
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold">{workout.name}</h1>
        <div className="flex items-center mt-2">
          <Progress value={workout.progress} className="w-full mr-4" />
          <span className="text-sm font-medium whitespace-nowrap">{workout.progress}% Complete</span>
        </div>
      </div>
      
      {/* Current Exercise */}
      <Card className="overflow-hidden border-2 border-blue-200">
        <CardHeader className="bg-blue-500 text-white">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Dumbbell className="mr-2 h-5 w-5" />
              Current Exercise
            </div>
            {workout.exercises[activeExercise].completed && (
              <Badge className="bg-green-600">Completed</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{workout.exercises[activeExercise].name}</h2>
            <div className="text-lg text-muted-foreground">
              {workout.exercises[activeExercise].sets} sets × {
                workout.exercises[activeExercise].reps 
                  ? `${workout.exercises[activeExercise].reps} reps` 
                  : workout.exercises[activeExercise].duration
              }
              {workout.exercises[activeExercise].weight && 
                ` • ${workout.exercises[activeExercise].weight}`
              }
            </div>
          </div>
          
          {/* Rest timer */}
          {isResting && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6 text-center">
              <h3 className="font-semibold text-blue-700 mb-2">Rest Time</h3>
              <div className="text-3xl font-mono font-bold mb-4">{formatTime(restTimer)}</div>
              <div className="flex justify-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleToggleTimer}
                  className="flex items-center"
                >
                  {isTimerActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                  {isTimerActive ? "Pause" : "Resume"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleResetTimer}
                  className="flex items-center"
                >
                  <RotateCw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isResting && !workout.exercises[activeExercise].completed && (
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleCompleteSet}
              >
                Complete Set & Rest
              </Button>
            )}
            <Button 
              className={`${workout.exercises[activeExercise].completed ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white`}
              onClick={handleCompleteExercise}
              disabled={workout.exercises[activeExercise].completed}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {workout.exercises[activeExercise].completed ? "Exercise Completed" : "Mark Exercise Complete"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Exercise List */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">Workout Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {workout.exercises.map((exercise, index) => (
              <li 
                key={index}
                className={`p-3 rounded-md flex justify-between items-center transition-all ${
                  index === activeExercise ? "bg-blue-100 border border-blue-200" : 
                  exercise.completed ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  {exercise.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  ) : (
                    <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-3">
                      {index + 1}
                    </span>
                  )}
                  <span className={exercise.completed ? "line-through text-muted-foreground" : ""}>
                    {exercise.name}
                  </span>
                </div>
                {index === activeExercise && (
                  <Badge className="bg-blue-500">Current</Badge>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="bg-gray-50 flex justify-between">
          <div className="text-sm text-muted-foreground">
            {workout.exercises.filter(e => e.completed).length} of {workout.exercises.length} exercises completed
          </div>
          {workout.progress === 100 && (
            <Button 
              variant="ghost" 
              className="text-green-600" 
              onClick={handleBackToWorkouts}
            >
              All Exercises Complete <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkoutDetail;
