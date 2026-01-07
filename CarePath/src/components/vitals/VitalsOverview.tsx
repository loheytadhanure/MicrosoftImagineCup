import { Activity, Heart, Droplets, Thermometer, Wind } from "lucide-react";
import type { VitalReading } from "@/types";
import { cn } from "@/lib/utils";
import { CareCard, CareCardContent } from "@/components/ui/CareCard";
import { CareBadge } from "@/components/ui/CareBadge";

interface VitalsOverviewProps {
  vitals: VitalReading[];
  className?: string;
}

const vitalConfig = {
  blood_pressure: { icon: Heart, label: "Blood Pressure", color: "text-accent" },
  glucose: { icon: Droplets, label: "Blood Glucose", color: "text-warning" },
  heart_rate: { icon: Activity, label: "Heart Rate", color: "text-destructive" },
  temperature: { icon: Thermometer, label: "Temperature", color: "text-info" },
  oxygen: { icon: Wind, label: "Oxygen Saturation", color: "text-primary" },
  peak_flow: { icon: Wind, label: "Peak Flow", color: "text-success" }
};

export function VitalsOverview({ vitals, className }: VitalsOverviewProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {vitals.map((vital, index) => {
        const config = vitalConfig[vital.type];
        const Icon = config.icon;
        
        return (
          <CareCard 
            key={vital.id} 
            variant="interactive"
            className="animate-fade-in"
            style={{ animationDelay: `${index * 75}ms` } as React.CSSProperties}
          >
            <CareCardContent>
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10", config.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                {vital.isAbnormal && (
                  <CareBadge variant="pending" className="text-[10px]">
                    Review
                  </CareBadge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">{config.label}</p>
              <p className={cn(
                "text-2xl font-semibold",
                vital.isAbnormal ? "text-warning" : "text-foreground"
              )}>
                {vital.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">{vital.unit}</span>
              </p>
              
              {vital.notes && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{vital.notes}</p>
              )}
            </CareCardContent>
          </CareCard>
        );
      })}
    </div>
  );
}

