import { cn } from "@/lib/utils";
import { Check, X, Clock, Pill, Activity, Calendar } from "lucide-react";
import type { DailyTask, TaskStatus } from "@/types";
import { CareBadge } from "@/components/ui/CareBadge";
import { Button } from "@/components/ui/Button";

interface TodayTimelineProps {
  tasks: DailyTask[];
  onTaskStatusChange?: (taskId: string, status: TaskStatus) => void;
  className?: string;
}

export function TodayTimeline({ tasks, onTaskStatusChange, className }: TodayTimelineProps) {
  const getIcon = (type: DailyTask['type']) => {
    switch (type) {
      case 'medication': return Pill;
      case 'vital': return Activity;
      case 'appointment': return Calendar;
      default: return Clock;
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'done': return 'Completed';
      case 'missed': return 'Missed';
      case 'pending': return 'Due';
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {tasks.map((task, index) => {
        const Icon = getIcon(task.type);
        const isPending = task.status === 'pending';
        
        return (
          <div 
            key={task.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 animate-fade-in",
              task.status === 'done' && "bg-success-light/50 border-success/20",
              task.status === 'missed' && "bg-destructive-light/50 border-destructive/20",
              task.status === 'pending' && "bg-card border-border hover:border-primary/30 hover:shadow-sm"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon */}
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
              task.status === 'done' && "bg-success/10 text-success",
              task.status === 'missed' && "bg-destructive/10 text-destructive",
              task.status === 'pending' && "bg-primary/10 text-primary"
            )}>
              <Icon className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-foreground truncate">{task.title}</span>
                <CareBadge status={task.status} className="text-[10px] px-2 py-0.5">
                  {getStatusLabel(task.status)}
                </CareBadge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{task.time}</span>
                {task.subtitle && (
                  <>
                    <span className="text-care-divider">•</span>
                    <span>{task.subtitle}</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            {isPending && onTaskStatusChange && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="care-action-done h-8 px-3"
                  onClick={() => onTaskStatusChange(task.id, 'done')}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Done
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="care-action-missed h-8 px-3"
                  onClick={() => onTaskStatusChange(task.id, 'missed')}
                >
                  <X className="w-4 h-4 mr-1" />
                  Missed
                </Button>
              </div>
            )}

            {/* Completed/Missed indicator */}
            {!isPending && (
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                task.status === 'done' && "bg-success text-success-foreground",
                task.status === 'missed' && "bg-destructive text-destructive-foreground"
              )}>
                {task.status === 'done' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
