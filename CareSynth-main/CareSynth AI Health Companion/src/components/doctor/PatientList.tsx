import { User, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Patient } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';

interface PatientListProps {
  patients: Patient[];
  onPatientClick: (patient: Patient) => void;
}

export function PatientList({ patients, onPatientClick }: PatientListProps) {
  const { isDarkTheme } = useTheme();
  const sortedPatients = [...patients].sort((a, b) => b.riskScore - a.riskScore);

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'stable':
        return 'bg-[#37E29D]/20 text-[#37E29D] border-[#37E29D]/30';
      case 'warning':
        return 'bg-[#FFD580]/20 text-[#FFD580] border-[#FFD580]/30';
      case 'critical':
        return 'bg-[#F47C7C]/20 text-[#F47C7C] border-[#F47C7C]/30';
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-[#37E29D]';
    if (score <= 60) return 'text-[#FFD580]';
    return 'text-[#F47C7C]';
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div className="animate-in fade-in slide-in-from-bottom-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="gradient-text-glow mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
              Active Patients
            </h3>
            <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              {sortedPatients.length} patients under care
            </p>
          </div>
          <Button 
            variant="outline" 
            className={`rounded-xl ${
              isDarkTheme
                ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08]'
                : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            <span className="gradient-text">View All</span>
          </Button>
        </div>

        <div className="space-y-3">
          {sortedPatients.map((patient, index) => (
            <div
              key={patient.id}
              onClick={() => onPatientClick(patient)}
              className={`p-4 rounded-xl transition-all cursor-pointer backdrop-blur-sm border animate-in fade-in slide-in-from-left-4 ${
                isDarkTheme
                  ? 'bg-white/[0.03] hover:bg-white/[0.05] border-white/[0.08] hover:border-[#37E29D]/50'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-[#1C8B82]'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#37E29D]/50">
                    <img
                      src={patient.photo}
                      alt={patient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {patient.status !== 'stable' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F47C7C] rounded-full flex items-center justify-center animate-in zoom-in">
                      <AlertCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="gradient-text truncate" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      {patient.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(patient.status)} text-xs px-2 py-0 backdrop-blur-sm`}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      {patient.status}
                    </Badge>
                  </div>
                  <p className="gradient-text-secondary text-sm truncate mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    {patient.surgery}
                  </p>
                  <div className="flex items-center gap-4 text-xs gradient-text-muted" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Day {patient.dayPostOp}
                    </span>
                    <span>Pain: {patient.painLevel}/10</span>
                  </div>
                </div>

                {/* Risk Score */}
                <div className="text-right">
                  <div className={`${getRiskColor(patient.riskScore)} mb-1`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                    {patient.riskScore}
                  </div>
                  <p className="gradient-text-muted text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    Risk Score
                  </p>
                </div>
              </div>

              {/* Last Check-in */}
              <div className={`mt-3 pt-3 border-t ${isDarkTheme ? 'border-white/[0.08]' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="gradient-text-muted flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    <TrendingUp className="w-3 h-3" />
                    Last check-in: {patient.lastCheckIn}
                  </span>
                  <span className="text-[#5BC7FF]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-[#5BC7FF]/20 rounded-xl border border-[#5BC7FF]/30 backdrop-blur-sm animate-in fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-[#5BC7FF] text-sm text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            <strong>{sortedPatients.filter(p => p.status !== 'stable').length}</strong> patients 
            require attention
          </p>
        </div>
      </div>
    </Card>
  );
}