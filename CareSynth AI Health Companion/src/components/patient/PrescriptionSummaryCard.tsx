import { Zap, Clock, CheckCircle2, Calendar, ExternalLink, Hospital, Stethoscope } from 'lucide-react';
import { Card } from '../ui/card';
import { useTheme } from '../../lib/ThemeContext';

interface PrescriptionSummaryProps {
  hospital?: string;
  address?: string;
  contact?: string;
  doctor?: string;
  registrationNo?: string;
  patientName?: string;
  patientId?: string;
  surgeryDate?: string;
  followUpDate?: string;
  condition: string;
  recoveryDays: number;
  symptomProgression: any[];
  doctorInstructions: string[];
  redFlagSymptoms: string[];
  onViewDetails?: () => void;
}

export function PrescriptionSummaryCard({
  hospital,
  address,
  contact,
  doctor,
  registrationNo,
  patientName,
  patientId,
  surgeryDate,
  followUpDate,
  condition,
  recoveryDays,
  symptomProgression,
  doctorInstructions,
  redFlagSymptoms,
  onViewDetails,
}: PrescriptionSummaryProps) {
  const weeks = Math.ceil(recoveryDays / 7);
  const { isDarkTheme } = useTheme();

  const primaryText = isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]';
  const secondaryText = isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]';

  const cardBgClass = isDarkTheme ? 'bg-white/[0.06] backdrop-blur-xl border-[#5BC7FF]/20' : 'bg-white shadow-sm border-gray-200';
  const innerBg = isDarkTheme ? 'bg-white/[0.05]' : 'bg-gray-50';
  const innerBorder = isDarkTheme ? 'border-[#5BC7FF]/10' : 'border-gray-200';

  return (
    <Card className={`w-full rounded-2xl p-6 lg:p-8 ${cardBgClass} border card-hover-lift transition-all duration-400`}>
      {/* Hospital & Doctor Details */}
      {hospital && (
        <div className={`mb-6 p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hospital Info */}
            <div className="flex gap-3">
              <Hospital className="w-5 h-5 text-[#37E29D] flex-shrink-0 mt-1" />
              <div>
                <p className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {hospital}
                </p>
                <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {address}
                </p>
                <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  📞 {contact}
                </p>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex gap-3">
              <Stethoscope className="w-5 h-5 text-[#5BC7FF] flex-shrink-0 mt-1" />
              <div>
                <p className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {doctor}
                </p>
                <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Reg No: {registrationNo}
                </p>
                <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Patient ID: {patientId} • {patientName}, {surgeryDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h2 className={`text-4xl lg:text-5xl font-semibold ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
          Prescription Summary
        </h2>
        <p className={`text-xl ${secondaryText} flex items-center gap-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
          <Calendar className="w-6 h-6" />
          Complete recovery plan
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Condition */}
        <div className={`text-center p-4 rounded-xl ${innerBg} border ${innerBorder} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
          <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-[#37E29D]/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#37E29D]" />
          </div>
          <p className={`${secondaryText} text-base mb-1`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Procedure
          </p>
          <p className={`${primaryText} font-semibold text-lg`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            {condition}
          </p>
        </div>

        {/* Recovery Duration */}
        <div className={`text-center p-4 rounded-xl ${innerBg} border ${innerBorder} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
          <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-[#5BC7FF]/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#5BC7FF]" />
          </div>
          <p className={`${secondaryText} text-base mb-1`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Recovery Time
          </p>
          <p className={`${primaryText} font-semibold text-lg`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            {recoveryDays} days
          </p>
        </div>

        {/* Instructions Count */}
        <div className={`text-center p-4 rounded-xl ${innerBg} border ${innerBorder} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
          <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-[#FFB84D]/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#FFB84D]" />
          </div>
          <p className={`${secondaryText} text-base mb-1`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Instructions
          </p>
          <p className={`${primaryText} font-semibold text-lg`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            {doctorInstructions.length}
          </p>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="mb-6 text-center">
        <p className={`text-base ${secondaryText} animate-in fade-in slide-in-from-bottom-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
          {weeks}-week recovery plan with {symptomProgression.length} milestone phases and {redFlagSymptoms.length} critical warning signs to monitor.
        </p>
        {followUpDate && (
          <p className={`text-sm ${secondaryText} mt-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Follow-up scheduled: {followUpDate}
          </p>
        )}
      </div>

      {/* View Details Button */}
      <button
        onClick={onViewDetails}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#5BC7FF] to-[#37E29D] text-white rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <span>View Complete Recovery Plan</span>
        <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </Card>
  );
}
