import { useState } from 'react';
import { AlertCircle, Zap, Clock, TrendingDown, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { useTheme } from '../../lib/ThemeContext';

interface SymptomProgression {
  symptom: string;
  week1: string;
  week2: string;
  week3: string;
  week4: string;
}

interface ComplicationTimeline {
  day: number;
  risk: string;
  description: string;
}

interface PrescriptionSummaryProps {
  condition: string;
  recoveryDays: number;
  symptomProgression: SymptomProgression[];
  doctorInstructions: string[];
  complicationsTimeline: ComplicationTimeline[];
  redFlagSymptoms: string[];
}

export function PrescriptionSummaryCard({
  condition,
  recoveryDays,
  symptomProgression,
  doctorInstructions,
  complicationsTimeline,
  redFlagSymptoms,
}: PrescriptionSummaryProps) {
  const weeks = Math.ceil(recoveryDays / 7);
  const { isDarkTheme } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['instructions']));
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const primaryText = isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]';
  const secondaryText = isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]';
  const mutedText = isDarkTheme ? 'text-[#D0D0D0]' : 'text-[#374151]';
  const accentText = isDarkTheme ? 'text-[#5BC7FF]' : 'text-[#0C86B3]';

  const cardBgClass = isDarkTheme ? 'bg-white/[0.06] backdrop-blur-xl border-[#5BC7FF]/20' : 'bg-white shadow-sm border-gray-200';
  const innerBg = isDarkTheme ? 'bg-white/[0.05]' : 'bg-gray-50';
  const innerBorder = isDarkTheme ? 'border-[#5BC7FF]/10' : 'border-gray-200';

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getSeverityColor = (day: number) => {
    if (day <= 2) return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' };
    if (day <= 7) return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' };
    if (day <= 14) return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' };
    return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' };
  };

  return (
    <Card className={`w-full rounded-2xl p-6 lg:p-8 ${cardBgClass} border card-hover-lift transition-all duration-400`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className={`text-2xl lg:text-3xl font-semibold ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
          Prescription Summary
        </h2>
        <p className={`${secondaryText} flex items-center gap-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
          <Calendar className="w-4 h-4" />
          AI-extracted recovery plan
        </p>
      </div>

      {/* Condition & Recovery Duration with hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Condition */}
        <div className={`rounded-xl ${innerBg} p-4 border ${innerBorder} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#37E29D]/20 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <Zap className="w-4 h-4 text-[#37E29D]" />
            </div>
            <p className={`${secondaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Condition
            </p>
          </div>
          <p className={`${primaryText} font-semibold text-lg`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            {condition}
          </p>
        </div>

        {/* Recovery Duration */}
        <div className={`rounded-xl ${innerBg} p-4 border ${innerBorder} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#5BC7FF]/20 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <Clock className="w-4 h-4 text-[#5BC7FF]" />
            </div>
            <p className={`${secondaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Expected Recovery
            </p>
          </div>
          <p className={`${primaryText} font-semibold text-lg`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            {recoveryDays} days ({weeks} weeks)
          </p>
        </div>
      </div>

      {/* Doctor Instructions - Collapsible */}
      {doctorInstructions.length > 0 && (
        <div className="mb-8">
          <button
            onClick={() => toggleSection('instructions')}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#5BC7FF] transition-transform duration-300 group-hover:scale-110" />
              <h3 className={`text-lg font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Doctor Instructions
                <span className={`ml-2 text-xs ${secondaryText}`}>({doctorInstructions.length})</span>
              </h3>
            </div>
            {expandedSections.has('instructions') ? (
              <ChevronUp className="w-5 h-5 text-[#5BC7FF] transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#5BC7FF] transition-transform duration-300" />
            )}
          </button>
          <div className={`transition-all duration-500 overflow-hidden ${
            expandedSections.has('instructions') ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-3">
              {doctorInstructions.map((instruction, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg ${innerBg} p-3 border ${innerBorder} flex gap-3 transition-all duration-300 hover:scale-[1.01] hover:shadow-md`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5BC7FF] mt-2 flex-shrink-0" />
                  <p className={`${mutedText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Symptom Progression - Collapsible with interactive timeline */}
      {symptomProgression.length > 0 && (
        <div className="mb-8">
          <button
            onClick={() => toggleSection('progression')}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-[#5BC7FF] transition-transform duration-300 group-hover:scale-110" />
              <h3 className={`text-lg font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Expected Symptom Progression
              </h3>
            </div>
            {expandedSections.has('progression') ? (
              <ChevronUp className="w-5 h-5 text-[#5BC7FF] transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#5BC7FF] transition-transform duration-300" />
            )}
          </button>
          <div className={`transition-all duration-500 overflow-hidden ${
            expandedSections.has('progression') ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-4">
              {symptomProgression.map((progression, idx) => (
                <div key={idx} className={`rounded-lg ${innerBg} p-4 border ${innerBorder} transition-all duration-300 hover:shadow-lg`}>
                  <p className={`${accentText} font-semibold mb-3 flex items-center gap-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span className="w-2 h-2 rounded-full bg-[#5BC7FF]" />
                    {progression.symptom}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, i) => (
                      <div 
                        key={week} 
                        className={`text-center p-2 rounded-lg transition-all duration-300 ${
                          hoveredWeek === i 
                            ? isDarkTheme ? 'bg-white/[0.08] scale-105' : 'bg-gray-100 scale-105'
                            : 'hover:bg-white/[0.05]'
                        }`}
                        onMouseEnter={() => setHoveredWeek(i)}
                        onMouseLeave={() => setHoveredWeek(null)}
                      >
                        <p className={`${secondaryText} text-xs mb-1 font-medium`} style={{ fontFamily: 'Inter, sans-serif' }}>
                          {week}
                        </p>
                        <p className={`${mutedText} text-sm transition-transform duration-300 ${hoveredWeek === i ? 'scale-110 font-semibold' : ''}`} 
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: hoveredWeek === i ? 600 : 500 }}>
                          {Object.values(progression)[i + 1]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Complications Timeline - Collapsible with severity indicators */}
      {complicationsTimeline.length > 0 && (
        <div className="mb-8">
          <button
            onClick={() => toggleSection('complications')}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#FFB84D] transition-transform duration-300 group-hover:scale-110" />
              <h3 className={`text-lg font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Complications Timeline
              </h3>
            </div>
            {expandedSections.has('complications') ? (
              <ChevronUp className="w-5 h-5 text-[#FFB84D] transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#FFB84D] transition-transform duration-300" />
            )}
          </button>
          <div className={`transition-all duration-500 overflow-hidden ${
            expandedSections.has('complications') ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-3 relative">
              {/* Timeline connector line */}
              <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${isDarkTheme ? 'bg-white/10' : 'bg-gray-200'}`} />
              
              {complicationsTimeline.map((timeline, idx) => {
                const colors = getSeverityColor(timeline.day);
                return (
                  <div
                    key={idx}
                    className={`rounded-lg ${innerBg} p-4 border ${innerBorder} flex items-start gap-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg relative`}
                  >
                    <div className="flex items-center gap-2 flex-shrink-0 relative z-10">
                      <span className={`text-xs font-semibold ${colors.text} ${colors.bg} px-2.5 py-1 rounded-full border ${colors.border} transition-all duration-300 hover:scale-110`}>
                        Day {timeline.day}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#FFB84D] font-semibold text-sm mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {timeline.risk}
                      </p>
                      <p className={`${secondaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        {timeline.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Red Flag Symptoms - Always visible */}
      {redFlagSymptoms.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-[#FF6B6B] animate-pulse" />
            <h3 className={`text-lg font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Red Flag Symptoms
            </h3>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {redFlagSymptoms.map((symptom, idx) => (
              <div
                key={idx}
                className={`rounded-lg ${isDarkTheme ? 'bg-[#FF6B6B]/10 border-[#FF6B6B]/20 hover:bg-[#FF6B6B]/15' : 'bg-red-50 border-red-200 hover:bg-red-100'} p-3 border flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
              >
                <div className="w-2 h-2 rounded-full bg-[#FF6B6B] flex-shrink-0 animate-pulse" />
                <p className={`${secondaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {symptom}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
