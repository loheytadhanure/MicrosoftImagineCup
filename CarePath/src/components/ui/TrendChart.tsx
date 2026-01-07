import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { TrendData } from "@/types";

interface TrendChartProps {
  data: TrendData[];
  unit: string;
  className?: string;
}

export function TrendChart({ data, unit, className }: TrendChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const trend = data.length >= 2 
    ? data[data.length - 1].value - data[0].value 
    : 0;

  return (
    <div className={cn("care-chart-placeholder flex-col gap-4", className)}>
      {/* Chart visualization */}
      <div className="flex items-end justify-between gap-2 h-32 w-full px-4">
        {data.map((point, index) => {
          const height = ((point.value - minValue) / range) * 100;
          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div 
                className="w-full bg-primary/30 rounded-t-md transition-all duration-300 hover:bg-primary/50 relative group min-w-[20px] max-w-[40px] mx-auto"
                style={{ height: `${Math.max(height, 10)}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {point.value} {unit}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{point.date}</span>
            </div>
          );
        })}
      </div>
      
      {/* Trend indicator */}
      <div className="flex items-center gap-2 text-sm">
        {trend > 0 ? (
          <>
            <TrendingUp className="w-4 h-4 text-warning" />
            <span className="text-muted-foreground">Trending up</span>
          </>
        ) : trend < 0 ? (
          <>
            <TrendingDown className="w-4 h-4 text-success" />
            <span className="text-muted-foreground">Trending down</span>
          </>
        ) : (
          <>
            <Minus className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Stable</span>
          </>
        )}
      </div>
    </div>
  );
}

