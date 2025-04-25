
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, GripVertical } from 'lucide-react';

interface ExerciseProps {
  id: string;
  name: string;
  category: string;
  onRemove: () => void;
}

export function DraggableExercise({ id, name, category, onRemove }: ExerciseProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-md border bg-muted/30 p-4 ${isDragging ? 'z-50' : ''}`}
    >
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="touch-none p-1 hover:bg-accent rounded-md"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
          <div>
            <p className="font-medium">{name}</p>
            <Badge variant="outline" className="text-xs mt-1">
              {category}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onRemove}>
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
  );
}
