import React, { useState, useEffect } from 'react';
import { Save, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssignWorkoutDialog } from '@/components/workouts/AssignWorkoutDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { FAB } from '@/components/ui/fab';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter
} from '@/components/ui/drawer';
import { ExerciseLibrary } from '@/components/workouts/ExerciseLibrary';
import { WorkoutSection } from '@/components/workouts/WorkoutSection';

const exerciseCategories = ['All', 'Strength', 'Cardio', 'Flexibility', 'Balance', 'Core'];

const exerciseLibrary = [
  { id: 1, name: 'Barbell Squat', category: 'Strength', bodyPart: 'Legs', difficulty: 'Medium' },
  { id: 2, name: 'Push-Up', category: 'Strength', bodyPart: 'Chest', difficulty: 'Easy' },
  { id: 3, name: 'Deadlift', category: 'Strength', bodyPart: 'Back', difficulty: 'Hard' },
  { id: 4, name: 'Running', category: 'Cardio', bodyPart: 'Full Body', difficulty: 'Medium' },
  { id: 5, name: 'Plank', category: 'Core', bodyPart: 'Core', difficulty: 'Medium' },
  { id: 6, name: 'Downward Dog', category: 'Flexibility', bodyPart: 'Full Body', difficulty: 'Easy' },
  { id: 7, name: 'Bicycle Crunch', category: 'Core', bodyPart: 'Core', difficulty: 'Medium' },
  { id: 8, name: 'Standing Balance', category: 'Balance', bodyPart: 'Legs', difficulty: 'Easy' }
];

const WorkoutBuilder = () => {
  const [workoutName, setWorkoutName] = useState('Strength Training - Intermediate');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [exercises, setExercises] = useState([
    { id: 'ex1', name: 'Barbell Squat', category: 'Strength' },
    { id: 'ex2', name: 'Push-Up', category: 'Strength' },
  ]);
  
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // Load template data if coming from Templates page
  useEffect(() => {
    if (location.state?.template) {
      const template = location.state.template;
      setWorkoutName(template.name);
      // You can extend this to load actual exercise data
    }
  }, [location.state]);

  const filteredExercises = exerciseLibrary.filter(exercise => {
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const handleAddExercise = (exercise) => {
    const newExercise = {
      id: `ex${Date.now()}`,
      name: exercise.name,
      category: exercise.category
    };
    setExercises([...exercises, newExercise]);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  const handleSaveWorkout = () => {
    // Save workout as template
    const newTemplate = {
      id: Date.now().toString(),
      name: workoutName,
      type: 'Custom', // You can determine this based on exercises
      exercises: exercises.length,
      difficulty: 'Intermediate', // You can determine this based on exercises
      createdAt: new Date().toISOString().split('T')[0],
      description: `Custom workout with ${exercises.length} exercises`
    };

    // In a real app, you'd save this to a database
    console.log('Saving template:', newTemplate);
    toast.success(`Template "${workoutName}" saved successfully!`);
    
    // Navigate to templates page
    navigate('/templates');
  };
  
  const ExerciseDrawer = () => (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Exercise Library</DrawerTitle>
          <DrawerDescription>Search for exercises to add to your workout</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-2">
          <ExerciseLibrary
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onCategorySelect={setSelectedCategory}
            onAddExercise={handleAddExercise}
            exerciseCategories={exerciseCategories}
            filteredExercises={filteredExercises}
          />
        </div>
        <DrawerFooter className="pt-2">
          <Button variant="outline" onClick={() => setDrawerOpen(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
  
  const MobileWorkoutBuilder = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workout Builder</h1>
          <p className="text-muted-foreground mt-1">Create custom workouts for your clients</p>
        </div>
        
        <div className="flex justify-between items-center">
          <Input 
            placeholder="Workout Name" 
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="max-w-[200px]"
          />
          <Button variant="outline" size="sm" onClick={handleSaveWorkout}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
      
      <Card className="card-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Workout Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkoutSection
            exercises={exercises}
            onExercisesChange={setExercises}
            onAddClick={() => setDrawerOpen(true)}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <AssignWorkoutDialog 
            workoutName={workoutName} 
            exercises={2} 
            difficulty="Intermediate"
          />
        </CardFooter>
      </Card>
      
      <FAB onClick={() => setDrawerOpen(true)} />
      <ExerciseDrawer />
    </div>
  );
  
  const DesktopWorkoutBuilder = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workout Builder</h1>
          <p className="text-muted-foreground mt-1">Create custom workouts for your clients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveWorkout}>
            <Save className="mr-2 h-4 w-4" />
            Save as Template
          </Button>
          <AssignWorkoutDialog 
            workoutName={workoutName} 
            exercises={exercises.length} 
            difficulty="Intermediate"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Exercise Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ExerciseLibrary
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onCategorySelect={setSelectedCategory}
              onAddExercise={handleAddExercise}
              exerciseCategories={exerciseCategories}
              filteredExercises={filteredExercises}
            />
          </CardContent>
        </Card>

        <Card className="card-shadow lg:col-span-2 col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Workout Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkoutSection
              exercises={exercises}
              onExercisesChange={setExercises}
              onAddClick={() => setDrawerOpen(true)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Input 
              placeholder="Workout Name" 
              className="max-w-sm" 
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
            <Button className="bg-trainer-purple hover:bg-trainer-dark-purple" onClick={handleSaveWorkout}>
              Save Workout
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
  
  return isMobile ? <MobileWorkoutBuilder /> : <DesktopWorkoutBuilder />;
};

export default WorkoutBuilder;
