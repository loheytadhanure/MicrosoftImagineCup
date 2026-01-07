import { cn } from "@/lib/utils";
import type { TaskStatus } from "@/types";

interface CareBadgeProps {
  status?: TaskStatus;
  variant?: 'done' | 'missed' | 'pending' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function CareBadge({ status, variant, children, className }: CareBadgeProps) {
  const resolvedVariant = variant || status || 'info';
  
  const variants = {
    done: 'care-badge-done',
    missed: 'care-badge-missed',
    pending: 'care-badge-pending',
    info: 'care-badge-info'
  };

  return (
    <span className={cn('care-badge', variants[resolvedVariant], className)}>
      {children}
    </span>
  );
}

