
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface Template {
  id: string;
  name: string;
  type: string;
  exercises: number;
  difficulty: string;
  createdAt: string;
  description?: string;
}

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Strength Training - Intermediate',
      type: 'Strength',
      exercises: 6,
      difficulty: 'Intermediate',
      createdAt: '2024-01-15',
      description: 'Full body strength workout'
    },
    {
      id: '2',
      name: 'HIIT Cardio Blast',
      type: 'Cardio',
      exercises: 8,
      difficulty: 'Hard',
      createdAt: '2024-01-10',
      description: 'High intensity interval training'
    }
  ]);
  
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleUseTemplate = (template: Template) => {
    // Navigate to workout builder with template data
    navigate('/workouts', { state: { template } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workout Templates</h1>
          <p className="text-muted-foreground mt-1">Manage your saved workout templates</p>
        </div>
        <Button onClick={() => navigate('/workouts')} className="bg-trainer-purple hover:bg-trainer-dark-purple">
          <Plus className="mr-2 h-4 w-4" />
          Create New Template
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="card-shadow hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-trainer-purple" />
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigate('/workouts', { state: { template, editMode: true } })}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {template.description && (
                <p className="text-sm text-muted-foreground">{template.description}</p>
              )}
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{template.type}</Badge>
                <Badge variant="outline">{template.difficulty}</Badge>
                <Badge variant="outline">{template.exercises} exercises</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Created: {new Date(template.createdAt).toLocaleDateString()}
              </div>
              <Button 
                className="w-full bg-trainer-purple hover:bg-trainer-dark-purple"
                onClick={() => handleUseTemplate(template)}
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium">No templates found</p>
          <p className="text-muted-foreground">Create your first workout template to get started</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
