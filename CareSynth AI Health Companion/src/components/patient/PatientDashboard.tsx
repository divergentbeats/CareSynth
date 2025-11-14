import { useState, useEffect } from 'react';
import { PrescriptionSummaryCard } from './PrescriptionSummaryCard';
import { RealityCheckCard } from './RealityCheckCard';
import { ConflictDetectionCard } from './ConflictDetectionCard';
import { MedicationTracker } from './MedicationTracker';
import { RecoveryTimeline } from './RecoveryTimeline';
import { DailyCheckIn } from './DailyCheckIn';
import { Patient, Medication, TimelineEvent, prescriptionSummary, conflictsToday, medications, timeline, currentPatient } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';

interface PatientDashboardProps {
  patient?: Patient;
  onPainUpdate?: (level: number) => void;
}

export function PatientDashboard({ patient = currentPatient, onPainUpdate }: PatientDashboardProps) {
  const { isDarkTheme } = useTheme();
  const [painLevel, setPainLevel] = useState(patient.painLevel);
  const [dashboardData, setDashboardData] = useState(prescriptionSummary);

  // Simulate loading data from analyzePrescription()
  useEffect(() => {
    // In a real app, this would call an API or service
    // const data = await analyzePrescription(patient);
    // setDashboardData(data);
    
    // For now, using mock data
    setDashboardData(prescriptionSummary);
  }, [patient]);

  const handlePainUpdate = (newPainLevel: number) => {
    setPainLevel(newPainLevel);
    onPainUpdate?.(newPainLevel);
  };

  return (
    <div className="space-y-6">
      {/* 1. Prescription Summary Card - Full Width */}
      <div className="card-entrance card-entrance-delay-1">
        <PrescriptionSummaryCard 
          {...dashboardData}
        />
      </div>

      {/* 2. Reality Check Card - Full Width */}
      <div className="card-entrance card-entrance-delay-1">
        <RealityCheckCard patient={patient} />
      </div>

      {/* 3. Conflict Detection Card - Full Width */}
      <div className="card-entrance card-entrance-delay-1">
        <ConflictDetectionCard conflicts={conflictsToday} />
      </div>

      {/* 4. Recovery Timeline (RecoveryDeviationTimeline) */}
      <div className="card-entrance card-entrance-delay-2">
        <RecoveryTimeline events={timeline} />
      </div>

      {/* 5. Daily Questions Card (using DailyCheckIn for now) */}
      <div className="card-entrance card-entrance-delay-2">
        <DailyCheckIn onCheckInComplete={handlePainUpdate} />
      </div>

      {/* 6. Medication Tracker */}
      <div className="card-entrance card-entrance-delay-3">
        <MedicationTracker medications={medications} />
      </div>
    </div>
  );
}
