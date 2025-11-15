import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PatientProfile {
  patient: {
    id: string;
    name: string;
    age: number;
    condition: string;
    surgery?: string;
    diagnosis?: string;
    dayPostOp?: number;
    dayOfIllness?: number;
    riskScore: number;
  };
  prescriptionSummary: {
    condition: string;
    recoveryDays: number;
    symptomProgression: any[];
    doctorInstructions: string[];
    complicationsTimeline: any[];
    redFlagSymptoms: string[];
  };
  expectedProgress: {
    [key: string]: number[];
  };
  dailyCheckInQuestions: string[];
}

interface PatientContextType {
  patientProfile: PatientProfile | null;
  setPatientProfile: (profile: PatientProfile | null) => void;
  dailyQuestions: string[];
  setDailyQuestions: (questions: string[]) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children, value }: { children: ReactNode; value?: PatientContextType }) {
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [dailyQuestions, setDailyQuestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const contextValue = value || {
    patientProfile,
    setPatientProfile,
    dailyQuestions,
    setDailyQuestions,
    isAnalyzing,
    setIsAnalyzing,
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
}
