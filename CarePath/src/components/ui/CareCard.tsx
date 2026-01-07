import * as React from "react";
import { cn } from "@/lib/utils";

interface CareCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'interactive' | 'highlight';
}

export function CareCard({ children, className, variant = 'default', ...props }: CareCardProps) {
  const variants = {
    default: 'care-card',
    interactive: 'care-card-interactive',
    highlight: 'care-card-highlight'
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}

interface CareCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CareCardHeader({ children, className }: CareCardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {children}
    </div>
  );
}

interface CareCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CareCardTitle({ children, className }: CareCardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-foreground", className)}>
      {children}
    </h3>
  );
}

interface CareCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CareCardContent({ children, className }: CareCardContentProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}

