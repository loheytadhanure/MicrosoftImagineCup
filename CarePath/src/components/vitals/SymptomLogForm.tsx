import { useState } from "react";
import { cn } from "@/lib/utils";
import { Stethoscope, Save, ChevronDown } from "lucide-react";
import { CareCard, CareCardHeader, CareCardTitle, CareCardContent } from "@/components/ui/CareCard";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { symptomOptions } from "@/data/mockData";

interface SymptomLogFormProps {
  onSubmit?: (data: SymptomFormData) => void;
  className?: string;
}

export interface SymptomFormData {
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  notes: string;
}

export function SymptomLogForm({ onSubmit, className }: SymptomLogFormProps) {
  const [formData, setFormData] = useState<SymptomFormData>({
    symptom: '',
    severity: 'mild',
    notes: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.symptom) {
      onSubmit?.(formData);
      setFormData({ symptom: '', severity: 'mild', notes: '' });
    }
  };

  return (
    <CareCard className={cn("", className)}>
      <CareCardHeader>
        <CareCardTitle className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" />
          Log Symptoms
        </CareCardTitle>
      </CareCardHeader>
      <CareCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Symptom Dropdown */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">What are you experiencing?</Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 border rounded-lg care-input bg-background text-left"
              >
                <span className={formData.symptom ? 'text-foreground' : 'text-muted-foreground'}>
                  {formData.symptom || 'Select a symptom...'}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>
              
              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-card border rounded-lg shadow-care-lg max-h-48 overflow-y-auto">
                  {symptomOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, symptom: option }));
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-primary-light transition-colors text-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Severity */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Severity</Label>
            <div className="flex gap-2">
              {(['mild', 'moderate', 'severe'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, severity: level }))}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all",
                    formData.severity === level
                      ? level === 'mild' 
                        ? "bg-success-light border-success text-success"
                        : level === 'moderate'
                        ? "bg-warning-light border-warning text-warning-foreground"
                        : "bg-destructive-light border-destructive text-destructive"
                      : "bg-background border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Additional details (optional)</Label>
            <Textarea
              placeholder="Describe what you're feeling..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="care-input min-h-[80px] resize-none"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={!formData.symptom}>
            <Save className="w-4 h-4 mr-2" />
            Log Symptom
          </Button>
        </form>
      </CareCardContent>
    </CareCard>
  );
}

