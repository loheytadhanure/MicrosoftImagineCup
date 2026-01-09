//Manual Report Entry Panel

// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Plus, Trash2, Save } from "lucide-react";
// import {
//   CareCard,
//   CareCardHeader,
//   CareCardTitle,
//   CareCardContent,
// } from "@/components/ui/CareCard";
// import { Button } from "@/components/ui/Button";

// /* ---------- Types ---------- */

// interface Medicine {
//   name: string;
//   doseValue: string;
//   doseUnit: "mg" | "g" | "ml";
//   frequency: "OD" | "BD" | "TDS" | "SOS" | "HS";
// }

// interface Lab {
//   testName: string;
//   value: string;
//   unit?: string;
// }

// /* ---------- Lab Test Dropdown Options ---------- */

// const LAB_TESTS = [
//   // Basic
//   "Blood Pressure",
//   "Heart Rate",
//   "Temperature",
//   "Respiratory Rate",
//   "Oxygen Saturation (SpO2)",

//   // Blood Tests
//   "Complete Blood Count (CBC)",
//   "Hemoglobin (Hb)",
//   "Blood Sugar (Fasting)",
//   "Blood Sugar (Postprandial)",
//   "HbA1c",
//   "Lipid Profile",
//   "Liver Function Test (LFT)",
//   "Kidney Function Test (KFT)",
//   "Serum Creatinine",
//   "Blood Urea",
//   "Electrolytes (Na, K, Cl)",

//   // Thyroid
//   "TSH",
//   "T3",
//   "T4",

//   // Urine
//   "Urine Routine",
//   "Urine Microscopy",
//   "Urine Albumin",

//   // Cardiac
//   "ECG",
//   "2D Echo",
//   "Troponin I",

//   // Others
//   "Vitamin D",
//   "Vitamin B12",
//   "Calcium",
//   "CRP",
//   "ESR",
// ];

// /* ---------- Component ---------- */

// export function MedicalReportsPanel({ className }: { className?: string }) {
//   /* Patient Metadata */
//   const [patient, setPatient] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     weight: "",
//     height: "",
//   });

//   /* Medicines */
//   const [medicines, setMedicines] = useState<Medicine[]>([
//     { name: "", doseValue: "", doseUnit: "mg", frequency: "OD" },
//   ]);

//   /* Labs */
//   const [labs, setLabs] = useState<Lab[]>([
//     { testName: "", value: "", unit: "" },
//   ]);

//   /* ---------- Handlers ---------- */

//   const updateMedicine = (i: number, field: keyof Medicine, value: string) => {
//     const updated = [...medicines];
//     updated[i] = { ...updated[i], [field]: value };
//     setMedicines(updated);
//   };

//   const updateLab = (i: number, field: keyof Lab, value: string) => {
//     const updated = [...labs];
//     updated[i] = { ...updated[i], [field]: value };
//     setLabs(updated);
//   };

//   const handleSave = () => {
//     const payload = {
//       patient,
//       medicines,
//       labs,
//     };

//     console.log("Saved Medical Data:", payload);
//     alert("Medical data saved successfully (console log)");
//   };

//   return (
//     <CareCard className={cn(className)}>
//       <CareCardHeader>
//         <CareCardTitle>Medical Details (Manual Entry)</CareCardTitle>
//       </CareCardHeader>

//       <CareCardContent className="space-y-8">

//         {/* ---------- Patient Metadata ---------- */}
//         <section className="space-y-4">
//           <h4 className="font-medium">Patient Metadata</h4>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input className="care-input" placeholder="Patient Name"
//               value={patient.name}
//               onChange={(e) => setPatient({ ...patient, name: e.target.value })}
//             />
//             <input className="care-input" placeholder="Age"
//               value={patient.age}
//               onChange={(e) => setPatient({ ...patient, age: e.target.value })}
//             />
//             <select className="care-input"
//               value={patient.gender}
//               onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
//             >
//               <option value="">Gender</option>
//               <option>Female</option>
//               <option>Male</option>
//               <option>Other</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input className="care-input" placeholder="Weight (kg)"
//               value={patient.weight}
//               onChange={(e) => setPatient({ ...patient, weight: e.target.value })}
//             />
//             <input className="care-input" placeholder="Height (cm)"
//               value={patient.height}
//               onChange={(e) => setPatient({ ...patient, height: e.target.value })}
//             />
//           </div>
//         </section>

//         {/* ---------- Medicines ---------- */}
//         <section className="space-y-4">
//           <h4 className="font-medium">Medicines</h4>

//           {medicines.map((med, i) => (
//             <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-3 border p-4 rounded-lg">
//               <input className="care-input" placeholder="Medicine Name"
//                 value={med.name}
//                 onChange={(e) => updateMedicine(i, "name", e.target.value)}
//               />
//               <input className="care-input" placeholder="Dose"
//                 value={med.doseValue}
//                 onChange={(e) => updateMedicine(i, "doseValue", e.target.value)}
//               />
//               <select className="care-input"
//                 value={med.doseUnit}
//                 onChange={(e) => updateMedicine(i, "doseUnit", e.target.value)}
//               >
//                 <option value="mg">mg</option>
//                 <option value="g">g</option>
//                 <option value="ml">ml</option>
//               </select>
//               <select className="care-input"
//                 value={med.frequency}
//                 onChange={(e) => updateMedicine(i, "frequency", e.target.value)}
//               >
//                 <option value="OD">OD (Once Daily)</option>
//                 <option value="BD">BD (Twice Daily)</option>
//                 <option value="TDS">TDS (Three Times Daily)</option>
//                 <option value="SOS">SOS (As Needed)</option>
//                 <option value="HS">HS (At Bedtime)</option>
//               </select>

//               <Button variant="ghost" size="icon"
//                 onClick={() => setMedicines(medicines.filter((_, idx) => idx !== i))}
//               >
//                 <Trash2 className="w-4 h-4" />
//               </Button>
//             </div>
//           ))}

//           <Button variant="outline"
//             onClick={() => setMedicines([...medicines, { name: "", doseValue: "", doseUnit: "mg", frequency: "OD" }])}
//           >
//             <Plus className="w-4 h-4 mr-2" /> Add Medicine
//           </Button>
//         </section>

//         {/* ---------- Labs ---------- */}
//         <section className="space-y-4">
//           <h4 className="font-medium">Labs / Vitals</h4>

//           {labs.map((lab, i) => (
//             <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 border p-4 rounded-lg">
//               <select className="care-input"
//                 value={lab.testName}
//                 onChange={(e) => updateLab(i, "testName", e.target.value)}
//               >
//                 <option value="">Select Test</option>
//                 {LAB_TESTS.map((test) => (
//                   <option key={test} value={test}>{test}</option>
//                 ))}
//               </select>

//               <input className="care-input" placeholder="Value"
//                 value={lab.value}
//                 onChange={(e) => updateLab(i, "value", e.target.value)}
//               />
//               <input className="care-input" placeholder="Unit (optional)"
//                 value={lab.unit}
//                 onChange={(e) => updateLab(i, "unit", e.target.value)}
//               />

//               <Button variant="ghost" size="icon"
//                 onClick={() => setLabs(labs.filter((_, idx) => idx !== i))}
//               >
//                 <Trash2 className="w-4 h-4" />
//               </Button>
//             </div>
//           ))}

//           <Button variant="outline"
//             onClick={() => setLabs([...labs, { testName: "", value: "", unit: "" }])}
//           >
//             <Plus className="w-4 h-4 mr-2" /> Add Lab / Vital
//           </Button>
//         </section>

//         {/* ---------- Save Button ---------- */}
//         <div className="flex justify-end pt-4">
//           <Button onClick={handleSave}>
//             <Save className="w-4 h-4 mr-2" /> Save Medical Data
//           </Button>
//         </div>

//       </CareCardContent>
//     </CareCard>
//   );
// }



//UPLAOD MEDICAL REPORT PANEL

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


