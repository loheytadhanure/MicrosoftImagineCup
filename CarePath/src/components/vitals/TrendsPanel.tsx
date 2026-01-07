import { cn } from "@/lib/utils";
import { TrendChart } from "@/components/ui/TrendChart";
import { CareCard, CareCardHeader, CareCardTitle, CareCardContent } from "@/components/ui/CareCard";
import type { VitalTrend } from "@/types";

interface TrendsPanelProps {
  trends: VitalTrend[];
  className?: string;
}

export function TrendsPanel({ trends, className }: TrendsPanelProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {trends.map((trend, index) => (
        <CareCard 
          key={trend.type} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CareCardHeader>
            <CareCardTitle>{trend.type}</CareCardTitle>
            <span className="text-sm text-muted-foreground">Last 7 days</span>
          </CareCardHeader>
          <CareCardContent className="space-y-4">
            <TrendChart data={trend.data} unit={trend.unit} />
            
            {/* Interpretation */}
            <div className="bg-care-surface rounded-lg p-4 border border-care-divider">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {trend.interpretation}
              </p>
            </div>
          </CareCardContent>
        </CareCard>
      ))}
    </div>
  );
}

