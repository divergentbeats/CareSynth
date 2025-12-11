
import { useState } from 'react';
import { Analytics } from './Analytics';
import { PatientList } from './PatientList';
import { AlertFeed } from './AlertFeed';
import { PatientDetailModal } from './PatientDetailModal';
import { allPatients, Patient, alerts } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';

export function DoctorDashboard() {
    const { isDarkTheme } = useTheme();
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const handlePatientClick = (patient: Patient) => {
        setSelectedPatient(patient);
    };

    return (
        <div className="space-y-6">
            {/* Top Row: Analytics & Alerts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                    <Analytics />
                </div>
                <div className="xl:col-span-1">
                    <AlertFeed alerts={alerts} />
                </div>
            </div>

            {/* Bottom Row: Patient List */}
            <div className="grid grid-cols-1 gap-6">
                <PatientList patients={allPatients} onPatientClick={handlePatientClick} />
            </div>

            {/* Patient Detail Modal */}
            {selectedPatient && (
                <PatientDetailModal
                    isOpen={!!selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                    patient={selectedPatient}
                />
            )}
        </div>
    );
}
