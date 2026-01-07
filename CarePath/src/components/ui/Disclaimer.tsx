import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface DisclaimerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'info' | 'warning';
}

export function Disclaimer({ children, className, variant = 'info' }: DisclaimerProps) {
  return (
    <div className={cn(
      "rounded-lg p-4 text-sm flex items-start gap-3",
      variant === 'info' && "bg-info-light border border-info/20 text-foreground",
      variant === 'warning' && "bg-warning-light border border-warning/20 text-foreground",
      className
    )}>
      <Info className={cn(
        "w-5 h-5 flex-shrink-0 mt-0.5",
        variant === 'info' && "text-info",
        variant === 'warning' && "text-warning"
      )} />
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
