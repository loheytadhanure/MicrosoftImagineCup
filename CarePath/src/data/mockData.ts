import type { 
  DailyTask, 
  VitalReading, 
  MedicalReport, 
  VitalTrend, 
  ChatMessage,
  UserProfile,
  Symptom
} from '@/types';

export const userProfile: UserProfile = {
  name: "Loheyta Mitchell",
  dateOfBirth: "1965-03-15",
  conditions: ["Type 2 Diabetes", "Hypertension"],
  allergies: ["Penicillin"],
  emergencyContact: {
    name: "John Mitchell",
    phone: "(555) 123-4567",
    relationship: "Spouse"
  }
};

export const todayTasks: DailyTask[] = [
  {
    id: "1",
    type: "medication",
    title: "Metformin 500mg",
    subtitle: "Take with breakfast",
    time: "8:00 AM",
    status: "done"
  },
  {
    id: "2",
    type: "vital",
    title: "Check Blood Pressure",
    subtitle: "Morning reading",
    time: "8:30 AM",
    status: "done"
  },
  {
    id: "3",
    type: "medication",
    title: "Lisinopril 10mg",
    subtitle: "Take with water",
    time: "9:00 AM",
    status: "pending"
  },
  {
    id: "4",
    type: "vital",
    title: "Check Blood Glucose",
    subtitle: "Before lunch",
    time: "12:00 PM",
    status: "pending"
  },
  {
    id: "5",
    type: "medication",
    title: "Metformin 500mg",
    subtitle: "Take with dinner",
    time: "6:00 PM",
    status: "pending"
  }
];

export const recentVitals: VitalReading[] = [
  {
    id: "v1",
    type: "blood_pressure",
    value: "128/82",
    unit: "mmHg",
    timestamp: "2026-01-05T08:30:00",
    notes: "Rested for 5 minutes before reading"
  },
  {
    id: "v2",
    type: "glucose",
    value: "142",
    unit: "mg/dL",
    timestamp: "2026-01-05T07:00:00",
    notes: "Fasting reading",
    isAbnormal: true
  },
  {
    id: "v3",
    type: "heart_rate",
    value: "72",
    unit: "bpm",
    timestamp: "2026-01-05T08:30:00"
  },
  {
    id: "v4",
    type: "oxygen",
    value: "98",
    unit: "%",
    timestamp: "2026-01-05T08:30:00"
  }
];

export const symptomOptions: string[] = [
  "Headache",
  "Fatigue",
  "Dizziness",
  "Nausea",
  "Chest discomfort",
  "Shortness of breath",
  "Joint pain",
  "Blurred vision",
  "Numbness or tingling",
  "Other"
];

export const recentSymptoms: Symptom[] = [
  {
    id: "s1",
    name: "Fatigue",
    severity: "mild",
    notes: "Feeling tired in the afternoon",
    timestamp: "2026-01-05T14:00:00"
  }
];

export const medicalReports: MedicalReport[] = [
  {
    id: "r1",
    title: "Complete Blood Count (CBC)",
    type: "lab_result",
    uploadDate: "2026-01-02",
    simplifiedExplanation: "This test checks your overall blood health by measuring different parts of your blood including red cells, white cells, and platelets.",
    whatThisMeans: "Your blood counts are mostly within healthy ranges. Your hemoglobin is slightly lower than typical, which might make you feel a bit more tired than usual. This is something to monitor but not immediately concerning.",
    abnormalValues: [
      {
        name: "Hemoglobin",
        value: "11.8 g/dL",
        normalRange: "12.0 - 16.0 g/dL",
        interpretation: "Slightly below the typical range. May contribute to mild fatigue."
      }
    ]
  },
  {
    id: "r2",
    title: "HbA1c Test",
    type: "lab_result",
    uploadDate: "2026-01-02",
    simplifiedExplanation: "This test shows your average blood sugar levels over the past 2-3 months. It helps understand how well blood sugar is being managed over time.",
    whatThisMeans: "Your HbA1c is 7.2%, which indicates your blood sugar has been slightly elevated on average. The goal for most people with diabetes is below 7%. Small lifestyle adjustments may help improve this number.",
    abnormalValues: [
      {
        name: "HbA1c",
        value: "7.2%",
        normalRange: "Below 5.7% (non-diabetic) / Below 7% (diabetic goal)",
        interpretation: "Slightly above target. Indicates room for improvement in blood sugar management."
      }
    ]
  }
];

export const vitalTrends: VitalTrend[] = [
  {
    type: "Blood Pressure (Systolic)",
    unit: "mmHg",
    interpretation: "Your blood pressure has been relatively stable this week, staying within a healthy range. The slight variations are normal day-to-day changes.",
    data: [
      { date: "Mon", value: 126 },
      { date: "Tue", value: 130 },
      { date: "Wed", value: 128 },
      { date: "Thu", value: 125 },
      { date: "Fri", value: 132 },
      { date: "Sat", value: 127 },
      { date: "Sun", value: 128 }
    ]
  },
  {
    type: "Blood Glucose",
    unit: "mg/dL",
    interpretation: "Your glucose levels have shown some variation. Morning fasting readings tend to be higher. Consider discussing meal timing with your care team.",
    data: [
      { date: "Mon", value: 138 },
      { date: "Tue", value: 145 },
      { date: "Wed", value: 132 },
      { date: "Thu", value: 148 },
      { date: "Fri", value: 140 },
      { date: "Sat", value: 135 },
      { date: "Sun", value: 142 }
    ]
  },
  {
    type: "Medication Adherence",
    unit: "%",
    interpretation: "Great job! You've taken most of your medications on time this week. Consistency helps your treatments work better.",
    data: [
      { date: "Mon", value: 100 },
      { date: "Tue", value: 100 },
      { date: "Wed", value: 80 },
      { date: "Thu", value: 100 },
      { date: "Fri", value: 100 },
      { date: "Sat", value: 80 },
      { date: "Sun", value: 100 }
    ]
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: "c1",
    role: "assistant",
    content: "Hello! I'm here to help you understand your medical reports. You can ask me questions about any test results or medical terms, and I'll explain them in simple language. What would you like to know?",
    timestamp: "2026-01-05T10:00:00"
  }
];

export const mockAIResponses: Record<string, string> = {
  "what does hba1c mean": "HbA1c (also called A1c) is a blood test that shows your average blood sugar levels over the past 2-3 months. Think of it like a report card for blood sugar management. Unlike daily glucose checks that show a snapshot, HbA1c shows the bigger picture of how your body has been handling sugar over time.",
  "is my hemoglobin low": "Your hemoglobin is 11.8 g/dL, which is slightly below the typical range of 12.0-16.0 g/dL. This small difference might contribute to feeling more tired than usual. It's worth mentioning to your doctor, but it's not an emergency. Eating iron-rich foods like leafy greens, beans, and lean meats may help.",
  "what is normal blood pressure": "For most adults, a healthy blood pressure is generally below 120/80 mmHg. The first number (systolic) measures pressure when your heart beats, and the second (diastolic) measures pressure between beats. Your recent reading of 128/82 is slightly elevated but close to the healthy range.",
  "default": "I understand you'd like to know more about your health information. While I can help explain medical terms and test results in simpler language, please remember that I'm here for educational purposes only. For personalized medical advice, please consult with your healthcare provider."
};

