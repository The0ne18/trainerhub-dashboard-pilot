
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FABProps {
  onClick: () => void;
  className?: string;
}

export const FAB: React.FC<FABProps> = ({ onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 rounded-full shadow-lg md:hidden",
        "bg-trainer-purple hover:bg-trainer-dark-purple text-white",
        "w-14 h-14 p-0 flex items-center justify-center",
        "transition-all duration-200 hover:scale-105",
        className
      )}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
