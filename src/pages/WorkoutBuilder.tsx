
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Dumbbell, Save, ChevronRight, User, FileText, BookOpen, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssignWorkoutDialog } from '@/components/workouts/AssignWorkoutDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { FAB } from '@/components/ui/fab';
import { SkeletonCard } from '@/components/ui/skeleton-loader';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter
} from '@/components/ui/drawer';

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

// Dummy saved templates; later this can be hooked up to backend
const savedTemplates = [
  {
    id: 't1',
    name: 'Full Body Blast',
    type: 'Strength',
    exercises: 6,
    difficulty: 'Medium'
  },
  {
    id: 't2',
    name: 'Quick HIIT Cardio',
    type: 'Cardio',
    exercises: 4,
    difficulty: 'Hard'
  },
  {
    id: 't3',
    name: 'Mobility Flow',
    type: 'Flexibility',
    exercises: 5,
    difficulty: 'Easy'
  }
];

const WorkoutBuilder = () => {
  const [workoutName, setWorkoutName] = useState('Strength Training - Intermediate');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const isMobile = useIsMobile();
  
  // Filter exercises based on selected category and search term
  const filteredExercises = exerciseLibrary.filter(exercise => {
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Handle adding exercise to the workout
  const handleAddExercise = (exercise) => {
    console.log('Adding exercise:', exercise);
    // This would normally update the workout state
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  const renderExerciseLibrary = () => (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search exercises..." 
          className="pl-10" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {exerciseCategories.map(category => (
          <Badge 
            key={category} 
            variant={category === selectedCategory ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <div className={`space-y-2 mt-3 ${isMobile ? 'max-h-[60vh]' : 'max-h-[500px]'} overflow-y-auto pr-2`}>
        {filteredExercises.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">
            No exercises found matching your criteria
          </div>
        ) : (
          filteredExercises.map(exercise => (
            <div 
              key={exercise.id} 
              className="p-3 border rounded-md hover:bg-secondary cursor-pointer flex justify-between items-center group"
            >
              <div>
                <p className="font-medium">{exercise.name}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {exercise.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{exercise.bodyPart}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className={isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"} 
                size="sm"
                onClick={() => handleAddExercise(exercise)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </>
  );
  
  const renderTemplateSection = () => (
    <div className={`space-y-2 ${isMobile ? 'flex overflow-x-auto space-y-0 space-x-3 pb-4' : ''}`}>
      {savedTemplates.length === 0 ? (
        <div className="text-muted-foreground italic text-sm">No templates saved yet.</div>
      ) : (
        savedTemplates.map(template => (
          <div 
            key={template.id} 
            className={`p-4 rounded-md border hover:bg-secondary transition cursor-pointer ${
              isMobile ? 'min-w-[200px] flex-shrink-0' : ''
            }`}
          >
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="font-medium">{template.name}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">{template.type}</Badge>
              <span className="text-xs text-muted-foreground">{template.exercises} Exercises</span>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
              Use Template
            </Button>
          </div>
        ))
      )}
    </div>
  );
  
  // Mobile layout components
  const ExerciseDrawer = () => (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Exercise Library</DrawerTitle>
          <DrawerDescription>Search for exercises to add to your workout</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-2">
          {renderExerciseLibrary()}
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
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <Card className="card-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Templates</CardTitle>
        </CardHeader>
        <CardContent>
          {renderTemplateSection()}
        </CardContent>
      </Card>
      
      <Card className="card-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="warmup">
            <TabsList className="w-full">
              <TabsTrigger value="warmup" className="flex-1">Warm-up</TabsTrigger>
              <TabsTrigger value="main" className="flex-1">Main</TabsTrigger>
              <TabsTrigger value="cooldown" className="flex-1">Cool-down</TabsTrigger>
            </TabsList>
            
            <TabsContent value="warmup" className="space-y-4 mt-4">
              <div className="p-6 border-2 border-dashed rounded-md text-center">
                <Dumbbell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Add exercises to warm-up</p>
              </div>
            </TabsContent>
            
            <TabsContent value="main" className="space-y-4 mt-4">
              <div className="rounded-md border bg-muted/30 p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-medium">Barbell Squat</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      Strength
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Sets</p>
                    <Input type="number" defaultValue="3" className="h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Reps</p>
                    <Input type="number" defaultValue="10" className="h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Weight</p>
                    <Input defaultValue="120lbs" className="h-8" />
                  </div>
                </div>
                
                <Input placeholder="Notes (optional)" className="mt-3 text-sm" />
              </div>
              
              <div className="rounded-md border bg-muted/30 p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-medium">Push-Up</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      Strength
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Sets</p>
                    <Input type="number" defaultValue="3" className="h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Reps</p>
                    <Input type="number" defaultValue="15" className="h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Weight</p>
                    <Input defaultValue="Body" className="h-8" />
                  </div>
                </div>
                
                <Input 
                  placeholder="Notes (optional)" 
                  className="mt-3 text-sm" 
                  defaultValue="Chest to floor, full extension" 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="cooldown" className="space-y-4 mt-4">
              <div className="p-6 border-2 border-dashed rounded-md text-center">
                <Dumbbell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Add exercises to cool-down</p>
              </div>
            </TabsContent>
          </Tabs>
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
  
  // Desktop layout
  const DesktopWorkoutBuilder = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workout Builder</h1>
          <p className="text-muted-foreground mt-1">Create custom workouts for your clients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save as Template
          </Button>
          <AssignWorkoutDialog 
            workoutName={workoutName} 
            exercises={2} 
            difficulty="Intermediate"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Saved Templates */}
        <Card className="card-shadow hidden lg:block col-span-1 h-fit max-h-[650px] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-trainer-purple" />
              Saved Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {savedTemplates.length === 0 ? (
              <div className="text-muted-foreground italic text-sm">No templates saved yet.</div>
            ) : (
              savedTemplates.map(template => (
                <div key={template.id} className="p-4 rounded-md border flex items-center gap-3 justify-between hover:bg-secondary transition cursor-pointer">
                  <div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="font-medium">{template.name}</span>
                    </div>
                    <div className="flex gap-2 mt-0.5">
                      <Badge variant="outline" className="text-xs">{template.type}</Badge>
                      <span className="text-xs text-muted-foreground">{template.exercises} Exercises</span>
                      <Badge variant="outline" className="text-xs">{template.difficulty}</Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Exercise Library */}
        <Card className="card-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Exercise Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderExerciseLibrary()}
          </CardContent>
        </Card>

        {/* Workout Builder */}
        <Card className="card-shadow lg:col-span-2 col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Workout Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="warmup">
              <TabsList className="mb-4">
                <TabsTrigger value="warmup">Warm-up</TabsTrigger>
                <TabsTrigger value="main">Main Workout</TabsTrigger>
                <TabsTrigger value="cooldown">Cool-down</TabsTrigger>
              </TabsList>
              
              <TabsContent value="warmup" className="space-y-4">
                <div className="p-10 border-2 border-dashed rounded-md text-center">
                  <Dumbbell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Drag and drop exercises here or click to add</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="main" className="space-y-4">
                <div className="rounded-md border bg-muted/30 p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium">Barbell Squat</p>
                      <Badge variant="outline" className="text-xs">
                        Strength
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        placeholder="Sets" 
                        className="w-16 text-center" 
                        defaultValue="3"
                      />
                      <Input 
                        type="number" 
                        placeholder="Reps" 
                        className="w-16 text-center"
                        defaultValue="10"
                      />
                      <Input 
                        placeholder="Weight" 
                        className="w-20 text-center"
                        defaultValue="120lbs"
                      />
                    </div>
                  </div>
                  <Input placeholder="Notes (optional)" className="mt-2" />
                </div>
                
                <div className="rounded-md border bg-muted/30 p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium">Push-Up</p>
                      <Badge variant="outline" className="text-xs">
                        Strength
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        placeholder="Sets" 
                        className="w-16 text-center" 
                        defaultValue="3"
                      />
                      <Input 
                        type="number" 
                        placeholder="Reps" 
                        className="w-16 text-center"
                        defaultValue="15"
                      />
                      <Input 
                        placeholder="Weight" 
                        className="w-20 text-center"
                        defaultValue="Body"
                      />
                    </div>
                  </div>
                  <Input placeholder="Notes (optional)" className="mt-2" defaultValue="Chest to floor, full extension" />
                </div>
                
                <Button variant="outline" className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exercise
                </Button>
              </TabsContent>
              
              <TabsContent value="cooldown" className="space-y-4">
                <div className="p-10 border-2 border-dashed rounded-md text-center">
                  <Dumbbell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Drag and drop exercises here or click to add</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Input 
              placeholder="Workout Name" 
              className="max-w-sm" 
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
            <Button className="bg-trainer-purple hover:bg-trainer-dark-purple">
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
