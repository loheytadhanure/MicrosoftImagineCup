import { cn } from "@/lib/utils";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";
import type { MedicalReport } from "@/types";
import { CareCard, CareCardHeader, CareCardTitle, CareCardContent } from "@/components/ui/CareCard";
import { CareBadge } from "@/components/ui/CareBadge";
import { Disclaimer } from "@/components/ui/Disclaimer";

interface ReportCardProps {
  report: MedicalReport;
  className?: string;
}

export function ReportCard({ report, className }: ReportCardProps) {
  const hasAbnormalValues = report.abnormalValues && report.abnormalValues.length > 0;

  return (
    <CareCard className={cn("", className)}>
      <CareCardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CareCardTitle className="text-base">{report.title}</CareCardTitle>
            <p className="text-sm text-muted-foreground">Uploaded {report.uploadDate}</p>
          </div>
        </div>
        {hasAbnormalValues ? (
          <CareBadge variant="pending" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Needs Review
          </CareBadge>
        ) : (
          <CareBadge variant="done" className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Normal
          </CareBadge>
        )}
      </CareCardHeader>
      
      <CareCardContent className="space-y-4">
        {/* Simplified Explanation */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">What this test checks</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{report.simplifiedExplanation}</p>
        </div>

        <div className="care-divider" />

        {/* Abnormal Values */}
        {hasAbnormalValues && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              Values to discuss with your doctor
            </h4>
            <div className="space-y-3">
              {report.abnormalValues?.map((value, index) => (
                <div key={index} className="bg-warning-light rounded-lg p-3 border border-warning/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{value.name}</span>
                    <span className="text-sm text-warning-foreground font-semibold">{value.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Normal range: {value.normalRange}</p>
                  <p className="text-sm text-foreground">{value.interpretation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What This Means */}
        <div className="bg-care-highlight rounded-lg p-4 border border-primary/10">
          <h4 className="text-sm font-medium text-foreground mb-2">What this means for you</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{report.whatThisMeans}</p>
        </div>

        {/* Disclaimer */}
        <Disclaimer>
          This explanation is for understanding only and is not a medical diagnosis. Please discuss your results with your healthcare provider.
        </Disclaimer>
      </CareCardContent>
    </CareCard>
  );
}


