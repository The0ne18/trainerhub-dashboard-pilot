
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface Exercise {
  id: number;
  name: string;
  category: string;
  bodyPart: string;
  difficulty: string;
}

interface ExerciseLibraryProps {
  selectedCategory: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCategorySelect: (category: string) => void;
  onAddExercise: (exercise: Exercise) => void;
  exerciseCategories: string[];
  filteredExercises: Exercise[];
}

export function ExerciseLibrary({
  selectedCategory,
  searchTerm,
  onSearchChange,
  onCategorySelect,
  onAddExercise,
  exerciseCategories,
  filteredExercises
}: ExerciseLibraryProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search exercises..." 
          className="pl-10" 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {exerciseCategories.map(category => (
          <Badge 
            key={category} 
            variant={category === selectedCategory ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => onCategorySelect(category)}
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
                onClick={() => onAddExercise(exercise)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
