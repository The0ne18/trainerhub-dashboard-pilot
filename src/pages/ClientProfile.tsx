import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, Mail, Phone, Dumbbell, Calendar, Edit } from 'lucide-react';
import { EditClientForm } from '@/components/clients/EditClientForm';
import { ClientNotes } from '@/components/clients/ClientNotes';

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
  // ... other clients
];

const ClientProfile = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const client = clientsData.find(c => c.id === Number(id));

  if (!client) {
    return <div className="p-4">Client not found</div>;
  }

  const handleEditSubmit = (values: any) => {
    // In a real app, this would update the database
    console.log('Updated values:', values);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Client Profile</h1>
          <p className="text-muted-foreground mt-1">View and manage client details</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {isEditing ? (
            <Card>
              <CardContent className="p-6">
                <EditClientForm 
                  client={client}
                  onSubmit={handleEditSubmit}
                  onCancel={() => setIsEditing(false)}
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={client.image} alt={client.name} />
                      <AvatarFallback>
                        <UserRound className="h-16 w-16" />
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant={client.tag === 'subscription' ? "default" : "outline"}>
                      {client.tag === 'subscription' ? 'Subscription' : 'One-time'}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold">{client.name}</h2>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{client.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Plan</div>
                        <div className="flex items-center gap-2">
                          <Dumbbell className="h-4 w-4" />
                          <span>{client.plan}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Goal</div>
                        <div>{client.goal}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Next Session</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{client.nextSession}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardContent className="p-6">
              <ClientNotes />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientProfile;
