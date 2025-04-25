
import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface Template {
  id: string;
  name: string;
  type: string;
  exercises: number;
  difficulty: string;
}

interface TemplatesSectionProps {
  templates: Template[];
  onTemplateSelect: (template: Template) => void;
}

export function TemplatesSection({ templates, onTemplateSelect }: TemplatesSectionProps) {
  const isMobile = useIsMobile();
  
  if (templates.length === 0) {
    return <div className="text-muted-foreground italic text-sm">No templates saved yet.</div>;
  }

  return (
    <div className={`space-y-2 ${isMobile ? 'flex overflow-x-auto space-y-0 space-x-3 pb-4' : ''}`}>
      {templates.map(template => (
        <div 
          key={template.id} 
          className={`p-4 rounded-md border hover:bg-secondary transition cursor-pointer ${
            isMobile ? 'min-w-[200px] flex-shrink-0' : ''
          }`}
          onClick={() => onTemplateSelect(template)}
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
      ))}
    </div>
  );
}
