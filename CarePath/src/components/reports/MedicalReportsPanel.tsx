import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileText, Image, X, Loader2 } from "lucide-react";
import { CareCard, CareCardHeader, CareCardTitle, CareCardContent } from "@/components/ui/CareCard";
import { Button } from "@/components/ui/Button";

interface MedicalReportsPanelProps {
  onUpload?: (file: File) => void;
  className?: string;
}

export function MedicalReportsPanel({ onUpload, className }: MedicalReportsPanelProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onUpload?.(file);
    }, 2000);
  };

  const clearFile = () => {
    setUploadedFile(null);
    setIsProcessing(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    return FileText;
  };

  return (
    <CareCard className={cn("", className)}>
      <CareCardHeader>
        <CareCardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Upload Medical Report
        </CareCardTitle>
      </CareCardHeader>
      <CareCardContent>
        {uploadedFile ? (
          <div className="space-y-4">
            {/* File Preview */}
            <div className="flex items-center gap-3 p-4 bg-care-surface rounded-lg border">
              {(() => {
                const FileIcon = getFileIcon(uploadedFile);
                return <FileIcon className="w-8 h-8 text-primary" />;
              })()}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {!isProcessing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Processing State */}
            {isProcessing && (
              <div className="flex items-center gap-3 p-4 bg-primary-light rounded-lg border border-primary/20">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <div>
                  <p className="font-medium text-sm text-primary">Analyzing report...</p>
                  <p className="text-xs text-muted-foreground">Extracting key information</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200",
              dragActive 
                ? "border-primary bg-primary-light" 
                : "border-border hover:border-primary/30 hover:bg-primary-light/30"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium text-foreground mb-1">
                Drop your report here
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                or click to browse files
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF and image files
              </p>
            </div>
          </div>
        )}
      </CareCardContent>
    </CareCard>
  );
}


