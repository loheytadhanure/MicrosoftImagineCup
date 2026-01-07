import { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Upload, X } from "lucide-react";
import { CareCard, CareCardHeader, CareCardTitle, CareCardContent } from "@/components/ui/CareCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface MealLogFormProps {
  onSubmit?: (data: MealFormData) => void;
  className?: string;
}

export interface MealFormData {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description: string;
  imagePreview: string | null;
}

export function MealLogForm({ onSubmit, className }: MealLogFormProps) {
  const [formData, setFormData] = useState<MealFormData>({
    type: 'breakfast',
    description: '',
    imagePreview: null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imagePreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description) {
      onSubmit?.(formData);
      setFormData({ type: 'breakfast', description: '', imagePreview: null });
    }
  };

  const mealTypes = [
    { value: 'breakfast', label: '🌅 Breakfast' },
    { value: 'lunch', label: '☀️ Lunch' },
    { value: 'dinner', label: '🌙 Dinner' },
    { value: 'snack', label: '🍎 Snack' }
  ] as const;

  return (
    <CareCard className={cn("", className)}>
      <CareCardHeader>
        <CareCardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Log Meal
        </CareCardTitle>
      </CareCardHeader>
      <CareCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Meal Type */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Meal Type</Label>
            <div className="grid grid-cols-4 gap-2">
              {mealTypes.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: value }))}
                  className={cn(
                    "py-2 px-2 rounded-lg border text-xs font-medium transition-all",
                    formData.type === value
                      ? "bg-primary-light border-primary text-primary"
                      : "bg-background border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">What did you eat?</Label>
            <Input
              type="text"
              placeholder="e.g., Oatmeal with berries and honey"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="care-input"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Photo (optional)</Label>
            {formData.imagePreview ? (
              <div className="relative">
                <img 
                  src={formData.imagePreview} 
                  alt="Meal preview" 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, imagePreview: null }))}
                  className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/30 hover:bg-primary-light/30 transition-all">
                <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">Click to upload photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={!formData.description}>
            <Camera className="w-4 h-4 mr-2" />
            Log Meal
          </Button>
        </form>
      </CareCardContent>
    </CareCard>
  );
}

