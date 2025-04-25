
import React from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export const SkeletonStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
      {[1, 2].map((index) => (
        <div key={index} className="col-span-2 space-y-3">
          <Skeleton className="h-[85px] w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
};
