
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditClientForm } from '@/components/clients/EditClientForm';
import { toast } from 'sonner';

type Client = {
  id: number;
  name: string;
  email: string;
  plan: string;
  goal: string;
  tag: string;
  image: string;
  nextSession: string;
};

type EditClientDialogProps = {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientUpdated: (updatedClient: Partial<Client>) => void;
};

export function EditClientDialog({ client, open, onOpenChange, onClientUpdated }: EditClientDialogProps) {
  const handleSubmit = (values: Partial<Client>) => {
    // In a real application, this would be an API call to update the client
    onClientUpdated({ ...client, ...values });
    toast.success("Client updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <EditClientForm 
          client={client} 
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
