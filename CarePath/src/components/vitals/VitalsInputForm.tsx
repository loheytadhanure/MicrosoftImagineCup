import { useState } from "react";
import { cn } from "@/lib/utils";
import { Activity, Save } from "lucide-react";
import { CareCard, CareCardHeader, CareCardTitle, CareCardContent } from "@/components/ui/CareCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface VitalsInputFormProps {
  onSubmit?: (data: VitalFormData) => void;
  className?: string;
}

export interface VitalFormData {
  systolic: string;
  diastolic: string;
  glucose: string;
  heartRate: string;
  oxygen: string;
  notes: string;
}

export function VitalsInputForm({ onSubmit, className }: VitalsInputFormProps) {
  const [formData, setFormData] = useState<VitalFormData>({
    systolic: '',
    diastolic: '',
    glucose: '',
    heartRate: '',
    oxygen: '',
    notes: ''
  });

  const handleChange = (field: keyof VitalFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData({
      systolic: '',
      diastolic: '',
      glucose: '',
      heartRate: '',
      oxygen: '',
      notes: ''
    });
  };

  return (
    <CareCard className={cn("", className)}>
      <CareCardHeader>
        <CareCardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Log Vitals
        </CareCardTitle>
      </CareCardHeader>
      <CareCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Blood Pressure */}
            <div className="col-span-2">
              <Label className="text-sm text-muted-foreground mb-2 block">Blood Pressure (mmHg)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Systolic"
                  value={formData.systolic}
                  onChange={(e) => handleChange('systolic', e.target.value)}
                  className="care-input"
                />
                <span className="text-muted-foreground">/</span>
                <Input
                  type="number"
                  placeholder="Diastolic"
                  value={formData.diastolic}
                  onChange={(e) => handleChange('diastolic', e.target.value)}
                  className="care-input"
                />
              </div>
            </div>

            {/* Glucose */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Blood Glucose (mg/dL)</Label>
              <Input
                type="number"
                placeholder="e.g., 120"
                value={formData.glucose}
                onChange={(e) => handleChange('glucose', e.target.value)}
                className="care-input"
              />
            </div>

            {/* Heart Rate */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Heart Rate (bpm)</Label>
              <Input
                type="number"
                placeholder="e.g., 72"
                value={formData.heartRate}
                onChange={(e) => handleChange('heartRate', e.target.value)}
                className="care-input"
              />
            </div>

            {/* Oxygen */}
            <div className="col-span-2">
              <Label className="text-sm text-muted-foreground mb-2 block">Oxygen Saturation (%)</Label>
              <Input
                type="number"
                placeholder="e.g., 98"
                value={formData.oxygen}
                onChange={(e) => handleChange('oxygen', e.target.value)}
                className="care-input"
              />
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <Label className="text-sm text-muted-foreground mb-2 block">Notes (optional)</Label>
              <Input
                type="text"
                placeholder="Any additional notes..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="care-input"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Reading
          </Button>
        </form>
      </CareCardContent>
    </CareCard>
  );
}

