import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { format } from 'date-fns';
import { User, Search, CalendarIcon, Check, CheckCircle, Loader } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const mockClients = [
  { id: 'c1', name: 'Alex Johnson', email: 'alex@example.com', status: 'active', avatar: null, lastActive: '2 hours ago', program: 'Weight Loss' },
  { id: 'c2', name: 'Morgan Smith', email: 'morgan@example.com', status: 'active', avatar: null, lastActive: '5 min ago', program: 'Strength' },
  { id: 'c3', name: 'Taylor Brown', email: 'taylor@example.com', status: 'inactive', avatar: null, lastActive: '2 days ago', program: 'Cardio' },
  { id: 'c4', name: 'Jamie Wilson', email: 'jamie@example.com', status: 'active', avatar: null, lastActive: '1 day ago', program: 'Rehabilitation' },
  { id: 'c5', name: 'Casey Martinez', email: 'casey@example.com', status: 'active', avatar: null, lastActive: 'Just now', program: 'Muscle Building' },
];

interface AssignWorkoutDialogProps {
  workoutName: string;
  exercises: number;
  difficulty: string;
}

export const AssignWorkoutDialog = ({ workoutName, exercises, difficulty }: AssignWorkoutDialogProps) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleClientSelection = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId) 
        : [...prev, clientId]
    );
  };

  const handleAssignWorkout = async () => {
    if (selectedClients.length === 0) {
      toast.error('Please select at least one client');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a due date');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const clientNames = selectedClients.map(id => 
        mockClients.find(client => client.id === id)?.name
      ).join(', ');
      
      toast.success(`Workout successfully assigned to ${clientNames}`);
      setIsOpen(false);
      setSelectedClients([]);
      setNotes('');
    } catch (error) {
      toast.error('Failed to assign workout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => (
    <div className="flex flex-col">
      <div className="mb-6">
        <div className="bg-trainer-gray rounded-md p-4 mb-4">
          <h3 className="text-base font-medium">Workout Summary</h3>
          <p className="text-sm text-muted-foreground">{workoutName}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline">{exercises} Exercises</Badge>
            <Badge variant="outline">Difficulty: {difficulty}</Badge>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="all">All Clients</TabsTrigger>
          </TabsList>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="max-h-[240px] overflow-y-auto space-y-2">
            {filteredClients.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No clients found</p>
            ) : (
              filteredClients.map((client) => (
                <div
                  key={client.id}
                  className={`p-3 rounded-md border flex items-center justify-between cursor-pointer transition-colors ${
                    selectedClients.includes(client.id) ? 'bg-secondary border-primary' : 'hover:bg-secondary/50'
                  }`}
                  onClick={() => toggleClientSelection(client.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.avatar || ''} alt={client.name} />
                      <AvatarFallback className="bg-trainer-purple text-white">
                        {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{client.program}</span>
                        <span>•</span>
                        <span>Last active: {client.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {selectedClients.includes(client.id) ? (
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-muted" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Tabs>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="due-date" className="mb-2 block">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="notes" className="mb-2 block">Notes (Optional)</Label>
          <Textarea 
            id="notes" 
            placeholder="Add any special instructions or notes for your client..." 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button 
          className="bg-trainer-purple hover:bg-trainer-dark-purple"
          onClick={handleAssignWorkout}
          disabled={isSubmitting || selectedClients.length === 0}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Assigning...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Assign Workout
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-trainer-purple hover:bg-trainer-dark-purple">
          <User className="mr-2 h-4 w-4" />
          Assign to Client
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-6">
        <DrawerHeader className="text-left pt-6">
          <DrawerTitle>Assign Workout to Clients</DrawerTitle>
        </DrawerHeader>
        {renderContent()}
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-trainer-purple hover:bg-trainer-dark-purple">
          <User className="mr-2 h-4 w-4" />
          Assign to Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Workout to Clients</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
