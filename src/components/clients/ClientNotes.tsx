
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { StickyNote, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type Note = {
  id: number;
  content: string;
  date: string;
};

export function ClientNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now(),
      content: newNote.trim(),
      date: new Date().toLocaleDateString(),
    };
    
    setNotes([note, ...notes]);
    setNewNote("");
    toast("Note added successfully");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Textarea 
            placeholder="Add a note..." 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={addNote}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <StickyNote className="h-4 w-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{note.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
