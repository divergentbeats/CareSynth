import { useState } from 'react';
import { Pill, Clock, CheckCircle, Circle } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Medication } from '../../lib/mockData';
import { toast } from 'sonner';
import { useTheme } from '../../lib/ThemeContext';

interface MedicationTrackerProps {
  medications: Medication[];
}

export function MedicationTracker({ medications: initialMeds }: MedicationTrackerProps) {
  const { isDarkTheme } = useTheme();
  const [medications, setMedications] = useState(initialMeds);

  const handleTakeMedication = (medId: string, doseIndex: number) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === medId
          ? {
              ...med,
              taken: med.taken.map((taken, idx) =>
                idx === doseIndex ? true : taken
              )
            }
          : med
      )
    );

    toast.success('Medication logged', {
      description: 'Great job staying on schedule!',
      duration: 2000
    });
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 
            className={`${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'} font-semibold text-2xl`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Medication Tracker
          </h3>
          <div 
            className={`flex items-center gap-2 text-sm ${isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]'}`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            <Pill className="w-4 h-4" />
            <span>{medications.length} medications</span>
          </div>
        </div>

        <div className="space-y-4">
          {medications.map((med, index) => (
            <div
              key={med.id}
              className={`p-4 rounded-xl backdrop-blur-sm ${
                isDarkTheme 
                  ? 'bg-white/[0.03] border border-white/[0.08]'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 
                    className={`mb-1 ${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'} font-semibold text-base`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {med.name}
                  </h4>
                  <p 
                    className={`text-sm mb-1 ${isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]'}`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {med.dosage} • {med.frequency}
                  </p>
                  <div 
                    className={`flex items-center gap-2 text-sm ${isDarkTheme ? 'text-[#5BC7FF]' : 'text-[#1C8B82]'}`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Next: {med.nextDose}</span>
                  </div>
                </div>
              </div>

              {/* Doses Grid */}
              <div className="flex gap-2 mt-3">
                {med.taken.map((taken, doseIndex) => (
                  <button
                    key={doseIndex}
                    onClick={() => !taken && handleTakeMedication(med.id, doseIndex)}
                    disabled={taken}
                    className={`flex-1 p-3 rounded-lg transition-all backdrop-blur-sm ${
                      taken
                        ? 'bg-[#37E29D]/20 border-2 border-[#37E29D]/40'
                        : isDarkTheme
                        ? 'bg-white/[0.03] border-2 border-white/[0.12] hover:border-[#5BC7FF]/60 hover:scale-110'
                        : 'bg-white border-2 border-gray-300 hover:border-[#1C8B82] hover:scale-110'
                    } ${!taken ? 'active:scale-90' : ''}`}
                  >
                    {taken ? (
                      <CheckCircle className="w-5 h-5 text-[#37E29D] mx-auto" />
                    ) : (
                      <Circle className={`w-5 h-5 mx-auto ${isDarkTheme ? 'dark-mode-secondary' : 'text-gray-400'}`} />
                    )}
                    <p 
                      className="text-xs mt-1 gradient-text-muted"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      Dose {doseIndex + 1}
                    </p>
                  </button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div 
                  className={`flex items-center justify-between text-xs mb-1 ${isDarkTheme ? 'text-[#D0D0D0]' : 'text-[#374151]'}`}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  <span>Today's Progress</span>
                  <span>
                    {med.taken.filter(Boolean).length}/{med.taken.length}
                  </span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDarkTheme ? 'bg-white/[0.05]' : 'bg-gray-200'}`}>
                  <div
                    className="h-full progress-bar-mint transition-all duration-400"
                    style={{
                      width: `${(med.taken.filter(Boolean).length / med.taken.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-4 p-4 rounded-xl backdrop-blur-sm ${
            isDarkTheme 
              ? 'bg-[#5BC7FF]/20 border border-[#5BC7FF]/30'
              : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <p 
            className={`text-sm ${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'}`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            🔔 Medication reminders are sent via WhatsApp. Reply "TAKEN" to log doses automatically.
          </p>
        </div>
      </div>
    </Card>
  );
}
