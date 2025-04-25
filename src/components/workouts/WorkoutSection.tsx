
import React from 'react';
import { Plus, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DraggableExercise } from './DraggableExercise';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface Exercise {
  id: string;
  name: string;
  category: string;
}

interface WorkoutSectionProps {
  exercises: Exercise[];
  onExercisesChange: (exercises: Exercise[]) => void;
  onAddClick: () => void;
  emptyState?: boolean;
}

export function WorkoutSection({ exercises, onExercisesChange, onAddClick, emptyState = false }: WorkoutSectionProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onExercisesChange(
        arrayMove(
          exercises,
          exercises.findIndex((item) => item.id === active.id),
          exercises.findIndex((item) => item.id === over.id)
        )
      );
    }
  };

  const handleRemoveExercise = (exerciseId: string) => {
    onExercisesChange(exercises.filter((ex) => ex.id !== exerciseId));
  };

  if (emptyState || exercises.length === 0) {
    return (
      <div className="p-10 border-2 border-dashed rounded-md text-center">
        <Dumbbell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">Add exercises to your workout</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={exercises} strategy={verticalListSortingStrategy}>
          {exercises.map((exercise) => (
            <DraggableExercise
              key={exercise.id}
              id={exercise.id}
              name={exercise.name}
              category={exercise.category}
              onRemove={() => handleRemoveExercise(exercise.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
      
      <Button variant="outline" className="w-full mt-2" onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        Add Exercise
      </Button>
    </div>
  );
}
