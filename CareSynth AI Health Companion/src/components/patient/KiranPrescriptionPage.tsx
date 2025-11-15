import { useState } from 'react';
import { ArrowLeft, Download, Printer, AlertCircle, CheckCircle2, Pill, Activity, Clock } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';
import { Button } from '../ui/button';

interface KiranPrescriptionPageProps {
  onBack?: () => void;
}

export function KiranPrescriptionPage({ onBack }: KiranPrescriptionPageProps) {
  const { isDarkTheme } = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const primaryText = isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]';
  const secondaryText = isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]';
  const cardBg = isDarkTheme ? 'bg-white/[0.06] border-white/10' : 'bg-white/50 border-white/30';
  const sectionBg = isDarkTheme ? 'bg-white/[0.03]' : 'bg-gray-50';

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gradient-to-br from-[#0E1113] to-[#1C1F22]' : 'bg-gradient-to-br from-[#F7F9FB] to-[#FFFFFF]'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 ${isDarkTheme ? 'bg-[#0E1113]/80 border-white/10' : 'bg-white/80 border-white/30'} border-b backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isDarkTheme ? 'hover:bg-white/10 text-[#A0A0A0]' : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className={`text-2xl font-bold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            Prescription Summary
          </h1>
          <div className="flex gap-2">
            <Button className={`${isDarkTheme ? 'bg-white/10 hover:bg-white/15' : 'bg-gray-200 hover:bg-gray-300'} flex items-center gap-2`}>
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button className="bg-gradient-to-r from-[#37E29D] to-[#1C8B82] hover:from-[#2FCA89] hover:to-[#157770] text-white flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hospital & Doctor Info */}
        <div className={`${cardBg} border rounded-2xl p-8 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className={`text-2xl font-bold ${primaryText} mb-3`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Sunrise Orthopaedic & Multispeciality Hospital
              </h2>
              <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                1/220, Main Road, Bengaluru - 560034
              </p>
              <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                📞 080-44478899
              </p>
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${primaryText} mb-3`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Dr. Gaurav Menon, MS (Ortho)
              </h3>
              <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                Registration No: KMC/59721
              </p>
              <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                📅 Consultation Date: 12/11/2025
              </p>
            </div>
          </div>
        </div>

        {/* Patient Info & Surgery Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${cardBg} border rounded-2xl p-6`}>
            <p className={`text-sm ${secondaryText} mb-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Patient Name
            </p>
            <p className={`text-2xl font-bold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Kiran
            </p>
            <p className={`text-sm ${secondaryText} mt-1`} style={{ fontFamily: 'Inter, sans-serif' }}>
              ID: 230177 | Age: 32
            </p>
          </div>

          <div className={`${cardBg} border rounded-2xl p-6`}>
            <p className={`text-sm ${secondaryText} mb-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Surgery Type
            </p>
            <p className={`text-2xl font-bold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Knee Arthroscopy
            </p>
            <p className={`text-sm ${secondaryText} mt-1`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Partial Meniscectomy (Left)
            </p>
          </div>

          <div className={`${cardBg} border rounded-2xl p-6`}>
            <p className={`text-sm ${secondaryText} mb-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Surgery Date
            </p>
            <p className={`text-2xl font-bold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              09/11/2025
            </p>
            <p className={`text-sm ${secondaryText} mt-1`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Follow-up: 19/11/2025
            </p>
          </div>
        </div>

        {/* Medications */}
        <div className={`${cardBg} border rounded-2xl p-8 mb-8`}>
          <button
            onClick={() => toggleSection('medications')}
            className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <Pill className="w-6 h-6 text-[#FFB84D]" />
              <h2 className={`text-2xl font-bold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Medications
              </h2>
            </div>
            <span className={`text-2xl ${expandedSection === 'medications' ? '' : ''}`}>
              {expandedSection === 'medications' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'medications' && (
            <div className="space-y-4">
              <div className={`${sectionBg} p-4 rounded-lg`}>
                <p className={`text-lg font-semibold ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Oxycodone 5mg
                </p>
                <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                  One tablet every 6 hours for pain management
                </p>
                <p className="text-sm text-[#FFB84D] mt-2">⚠️ As needed, do not exceed 4 tablets per day</p>
              </div>

              <div className={`${sectionBg} p-4 rounded-lg`}>
                <p className={`text-lg font-semibold ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Aspirin 81mg
                </p>
                <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                  One tablet once daily (morning) for 14 days
                </p>
                <p className="text-sm text-[#37E29D] mt-2">✓ Blood thinner - Take with food if stomach upset</p>
              </div>
            </div>
          )}
        </div>

        {/* Expected Symptom Progression */}
        <div className={`${cardBg} border rounded-2xl p-8 mb-8`}>
          <button
            onClick={() => toggleSection('progression')}
            className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-[#5BC7FF]" />
              <h2 className={`text-2xl font-bold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Expected Symptom Progression
              </h2>
            </div>
            <span className={`text-2xl`}>
              {expandedSection === 'progression' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'progression' && (
            <div className="space-y-3">
              {[
                { days: 'Days 1-2', desc: 'Moderate pain, mild swelling' },
                { days: 'Days 3-5', desc: 'Pain reduces, swelling may persist' },
                { days: 'Days 6-10', desc: 'Discomfort on movement, gradual improvement' },
                { days: 'After Day 10', desc: 'Minimal pain, improved knee mobility' }
              ].map((item, idx) => (
                <div key={idx} className={`${sectionBg} p-4 rounded-lg flex items-start gap-4`}>
                  <div className="bg-[#37E29D]/20 rounded-lg p-2 flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#37E29D]" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {item.days}
                    </p>
                    <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobility & Physiotherapy */}
        <div className={`${cardBg} border rounded-2xl p-8 mb-8`}>
          <button
            onClick={() => toggleSection('mobility')}
            className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
          >
            <h2 className={`text-2xl font-bold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Mobility & Physiotherapy Guidance
            </h2>
            <span className={`text-2xl`}>
              {expandedSection === 'mobility' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'mobility' && (
            <div className="space-y-3">
              {[
                'Straight leg raising and ankle pumps – 5 mins, 4x daily',
                'Partial weight bearing with walker/crutch from Day 3',
                'Physiotherapy session to start Day 4 (as scheduled)',
                'Avoid squatting, twisting for 3 weeks'
              ].map((item, idx) => (
                <div key={idx} className={`${sectionBg} p-4 rounded-lg flex items-start gap-3`}>
                  <CheckCircle2 className="w-5 h-5 text-[#37E29D] flex-shrink-0 mt-0.5" />
                  <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Doctor Instructions */}
        <div className={`${cardBg} border rounded-2xl p-8 mb-8`}>
          <button
            onClick={() => toggleSection('instructions')}
            className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
          >
            <h2 className={`text-2xl font-bold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Doctor Instructions
            </h2>
            <span className={`text-2xl`}>
              {expandedSection === 'instructions' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'instructions' && (
            <div className="space-y-3">
              {[
                'Keep the operated knee elevated while resting',
                'Apply ice packs for 10 minutes every 4 hours',
                'Change dressing as instructed',
                'Adhere to physiotherapy schedule'
              ].map((item, idx) => (
                <div key={idx} className={`${sectionBg} p-4 rounded-lg flex items-start gap-3`}>
                  <CheckCircle2 className="w-5 h-5 text-[#5BC7FF] flex-shrink-0 mt-0.5" />
                  <p className={secondaryText} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Red Flags */}
        <div className={`border-[#F47C7C] bg-[#F47C7C]/10 border-2 rounded-2xl p-8 mb-8`}>
          <button
            onClick={() => toggleSection('redflags')}
            className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[#F47C7C]" />
              <h2 className={`text-2xl font-bold text-[#F47C7C]`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Red Flags - Seek Immediate Medical Attention
              </h2>
            </div>
            <span className={`text-2xl text-[#F47C7C]`}>
              {expandedSection === 'redflags' ? '−' : '+'}
            </span>
          </button>

          {expandedSection === 'redflags' && (
            <div className="space-y-3">
              {[
                'Sudden onset swelling, severe pain',
                'Fever above 100°F',
                'Knee locking or inability to move knee',
                'Bleeding or discharge from wound site'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3">
                  <span className="text-[#F47C7C] font-bold">●</span>
                  <p className={`text-[#F47C7C]`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`${cardBg} border rounded-2xl p-8 text-center`}>
          <p className={`text-lg ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            For any queries, contact:
          </p>
          <p className={`${secondaryText} mb-4`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Sunrise Orthopaedic & Multispeciality Hospital | 080-44478899
          </p>
          <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            This is a digital copy of your prescription. Keep it for your records.
          </p>
        </div>
      </div>
    </div>
  );
}
