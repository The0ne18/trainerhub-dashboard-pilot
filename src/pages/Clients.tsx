
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Calendar,
  Dumbbell,
  Users
} from 'lucide-react';

const clientsData = [
  { 
    id: 1, 
    name: 'Emma Thompson', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80', 
    tag: 'subscription',
    plan: 'Premium Monthly',
    email: 'emma.t@example.com',
    goal: 'Weight Loss',
    nextSession: 'Today, 10:00 AM'
  },
  { 
    id: 2, 
    name: 'Michael Chen', 
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80', 
    tag: 'one-time',
    plan: 'Single Session',
    email: 'michael.c@example.com',
    goal: 'Muscle Building',
    nextSession: 'Tomorrow, 3:30 PM'
  },
  { 
    id: 3, 
    name: 'Sarah Johnson', 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80', 
    tag: 'subscription',
    plan: 'Standard Weekly',
    email: 'sarah.j@example.com',
    goal: 'Flexibility',
    nextSession: 'Friday, 11:00 AM'
  },
  { 
    id: 4, 
    name: 'David Rodriguez', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80', 
    tag: 'subscription',
    plan: 'Premium Monthly',
    email: 'david.r@example.com',
    goal: 'Athletic Performance',
    nextSession: 'Next Monday, 2:00 PM'
  },
  { 
    id: 5, 
    name: 'Jessica Kim', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80', 
    tag: 'one-time',
    plan: 'Single Session',
    email: 'jessica.k@example.com',
    goal: 'Rehabilitation',
    nextSession: 'Not Scheduled'
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredClients = clientsData.filter(client => {
    // Apply search filter
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply tag filter
    const matchesTag = activeFilter === 'all' || client.tag === activeFilter;
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your client list and details</p>
        </div>
        <Button className="bg-trainer-purple hover:bg-trainer-dark-purple">
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={activeFilter === 'all' ? "default" : "outline"} 
            onClick={() => setActiveFilter('all')}
          >
            <Users className="mr-2 h-4 w-4" />
            All
          </Button>
          <Button 
            variant={activeFilter === 'subscription' ? "default" : "outline"} 
            onClick={() => setActiveFilter('subscription')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Subscription
          </Button>
          <Button 
            variant={activeFilter === 'one-time' ? "default" : "outline"} 
            onClick={() => setActiveFilter('one-time')}
          >
            <Dumbbell className="mr-2 h-4 w-4" />
            One-time
          </Button>
        </div>
      </div>
      
      {/* Clients list */}
      <div className="grid grid-cols-1 gap-4">
        {filteredClients.map(client => (
          <Card key={client.id} className="card-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-24 h-24 bg-gray-200">
                  <img 
                    src={client.image} 
                    alt={client.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{client.name}</h3>
                      <Badge variant={client.tag === 'subscription' ? "default" : "outline"}>
                        {client.tag === 'subscription' ? 'Subscription' : 'One-time'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                    <div className="flex gap-4 mt-2">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">PLAN</p>
                        <p className="text-sm">{client.plan}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">GOAL</p>
                        <p className="text-sm">{client.goal}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">NEXT SESSION</p>
                        <p className="text-sm">{client.nextSession}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;
