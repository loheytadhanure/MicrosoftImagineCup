// CarePath Type Definitions

export type TaskStatus = 'pending' | 'done' | 'missed';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  instructions?: string;
  status: TaskStatus;
}

export interface VitalReading {
  id: string;
  type: 'blood_pressure' | 'glucose' | 'heart_rate' | 'temperature' | 'oxygen' | 'peak_flow';
  value: string;
  unit: string;
  timestamp: string;
  notes?: string;
  isAbnormal?: boolean;
}

export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  notes?: string;
  timestamp: string;
}

export interface MealLog {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description: string;
  imageUrl?: string;
  timestamp: string;
}

export interface MedicalReport {
  id: string;
  title: string;
  type: 'lab_result' | 'imaging' | 'prescription' | 'summary';
  uploadDate: string;
  fileUrl?: string;
  simplifiedExplanation: string;
  whatThisMeans: string;
  abnormalValues?: AbnormalValue[];
}

export interface AbnormalValue {
  name: string;
  value: string;
  normalRange: string;
  interpretation: string;
}

export interface TrendData {
  date: string;
  value: number;
}

export interface VitalTrend {
  type: string;
  data: TrendData[];
  unit: string;
  interpretation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DailyTask {
  id: string;
  type: 'medication' | 'vital' | 'appointment';
  title: string;
  subtitle?: string;
  time: string;
  status: TaskStatus;
  icon?: string;
}

export interface UserProfile {
  name: string;
  dateOfBirth: string;
  conditions: string[];
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

