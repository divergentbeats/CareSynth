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

  // Helper component for section headers
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-6 animate-in fade-in slide-in-from-left-2">
      <h2 
        className="text-xl font-semibold"
        style={{
          fontFamily: 'Poppins, sans-serif',
          color: isDarkTheme ? '#E8E8E8' : '#0B1220',
          fontSize: '20px',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}
      >
        {title}
      </h2>
      <div 
        className="h-0.5 w-16 mt-2 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #37E29D 0%, transparent 100%)'
        }}
      />
    </div>
  );

  return (
    <div className="space-y-12">
      {/* SECTION 1: Recovery Overview */}
      <section className="space-y-4">
        <SectionHeader title="Recovery Overview" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card-entrance card-entrance-delay-1">
            <PrescriptionSummaryCard 
              {...dashboardData}
            />
          </div>
          <div className="card-entrance card-entrance-delay-1">
            <RealityCheckCard patient={patient} />
          </div>
        </div>
      </section>

      {/* SECTION 2: Health Metrics & Monitoring */}
      <section className="space-y-4">
        <SectionHeader title="Health Metrics & Monitoring" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card-entrance card-entrance-delay-2">
            <ConflictDetectionCard conflicts={conflictsToday} />
          </div>
          <div className="card-entrance card-entrance-delay-2">
            <DailyCheckIn onCheckInComplete={handlePainUpdate} />
          </div>
        </div>
      </section>

      {/* SECTION 3: Recovery Timeline */}
      <section className="space-y-4">
        <SectionHeader title="Recovery Timeline" />
        <div className="card-entrance card-entrance-delay-3">
          <RecoveryTimeline events={timeline} />
        </div>
      </section>

      {/* SECTION 4: Medication Management */}
      <section className="space-y-4">
        <SectionHeader title="Medication Management" />
        <div className="card-entrance card-entrance-delay-3">
          <MedicationTracker medications={medications} />
        </div>
      </section>
    </div>
  );
}
