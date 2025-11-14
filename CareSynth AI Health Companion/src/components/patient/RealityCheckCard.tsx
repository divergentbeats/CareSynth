import { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Card } from '../ui/card';
import { Patient } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';

interface RealityCheckCardProps {
  patient: Patient;
}

export function RealityCheckCard({ patient }: RealityCheckCardProps) {
  const { isDarkTheme } = useTheme();
  const [expandedSection, setExpandedSection] = useState<'reported' | 'expected' | 'conflicts' | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mock data for demonstration - in real app, this would come from API
  const alignmentScore = 82; // 0-100
  const reportedSymptoms = ['Mild pain', 'Slight swelling', 'Fatigue'];
  const expectedSymptoms = ['Mild pain', 'Moderate swelling', 'Fatigue'];
  const mismatches = ['Slight swelling vs Moderate swelling'];

  const getStatusColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  const getStatusIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return AlertTriangle;
    return XCircle;
  };

  const getStatusText = (score: number) => {
    if (score >= 80) return 'Aligned';
    if (score >= 60) return 'Slight Deviation';
    return 'Concerning';
  };

  const statusColor = getStatusColor(alignmentScore);
  const StatusIcon = getStatusIcon(alignmentScore);
  const statusText = getStatusText(alignmentScore);

  const summaryText = alignmentScore >= 80
    ? `Your recovery today matches ${alignmentScore}% of what your doctor expected.`
    : 'Significant deviation detected — check conflicts below.';

  const toggleSection = (section: 'reported' | 'expected' | 'conflicts') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400 overflow-hidden relative`}>
      {/* Animated background glow */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${
        statusColor === 'green' ? 'bg-gradient-to-br from-green-500/5 to-transparent' :
        statusColor === 'yellow' ? 'bg-gradient-to-br from-yellow-500/5 to-transparent' :
        'bg-gradient-to-br from-red-500/5 to-transparent'
      }`} style={{ opacity: expandedSection ? 0.3 : 0 }} />

      <div className="animate-in fade-in slide-in-from-bottom-2 relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2
                className="gradient-text-glow"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '28px' }}
              >
                Reality Check
              </h2>
              {/* Info tooltip */}
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Information about Reality Check"
                >
                  <Info className="w-4 h-4 text-[#5BC7FF]" />
                </button>
                {showTooltip && (
                  <div className={`absolute left-0 top-8 z-50 w-64 p-3 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-2 ${
                    isDarkTheme ? 'bg-[#1C1F22] border border-white/20' : 'bg-white border border-gray-200'
                  }`}>
                    <p className="text-xs gradient-text-secondary" style={{ fontFamily: 'Inter, sans-serif' }}>
                      AI compares your reported symptoms with expected recovery patterns to ensure you're on track.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p
              className="gradient-text-secondary text-sm"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              AI Alignment Analysis
            </p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${
            statusColor === 'green' ? 'bg-green-500/20 border border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' :
            statusColor === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]' :
            'bg-red-500/20 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
          }`}>
            <StatusIcon className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              {statusText}
            </span>
          </div>
        </div>

        {/* AI Alignment Score Ring with enhanced animation */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32 group">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle with gradient */}
              <defs>
                <linearGradient id={`scoreGradient-${statusColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={
                    statusColor === 'green' ? '#37E29D' :
                    statusColor === 'yellow' ? '#FFD580' :
                    '#F47C7C'
                  } />
                  <stop offset="100%" stopColor={
                    statusColor === 'green' ? '#1C8B82' :
                    statusColor === 'yellow' ? '#FFB84D' :
                    '#FF6B6B'
                  } />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={`url(#scoreGradient-${statusColor})`}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - alignmentScore / 100)}`}
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 8px ${
                    statusColor === 'green' ? 'rgba(55,226,157,0.4)' :
                    statusColor === 'yellow' ? 'rgba(255,213,128,0.4)' :
                    'rgba(244,124,124,0.4)'
                  })`
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="text-3xl font-bold gradient-text-glow transition-transform duration-300 group-hover:scale-110"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                >
                  {alignmentScore}
                </div>
                <div className="text-xs gradient-text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  Alignment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Text with animation */}
        <div className="mb-6 text-center">
          <p
            className="text-sm gradient-text animate-in fade-in slide-in-from-bottom-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, animationDelay: '200ms' }}
          >
            {summaryText}
          </p>
        </div>

        {/* Symptoms Comparison with collapsible sections */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reported Today */}
            <div className={`rounded-xl transition-all duration-400 overflow-hidden ${
              isDarkTheme
                ? 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05]'
                : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
            } backdrop-blur-sm`}>
              <button
                onClick={() => toggleSection('reported')}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <h3 className="text-sm font-medium gradient-text-secondary" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Reported Today
                </h3>
                {expandedSection === 'reported' ? (
                  <ChevronUp className="w-4 h-4 text-[#5BC7FF] transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#5BC7FF] transition-transform" />
                )}
              </button>
              <div className={`transition-all duration-300 ${expandedSection === 'reported' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <ul className="px-4 pb-4 space-y-2">
                  {reportedSymptoms.map((symptom, index) => (
                    <li 
                      key={index} 
                      className="text-xs gradient-text flex items-center gap-2 animate-in fade-in slide-in-from-left-2" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif', 
                        fontWeight: 400,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Expected by Doctor */}
            <div className={`rounded-xl transition-all duration-400 overflow-hidden ${
              isDarkTheme
                ? 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05]'
                : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
            } backdrop-blur-sm`}>
              <button
                onClick={() => toggleSection('expected')}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <h3 className="text-sm font-medium gradient-text-secondary" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Expected by Doctor
                </h3>
                {expandedSection === 'expected' ? (
                  <ChevronUp className="w-4 h-4 text-[#5BC7FF] transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#5BC7FF] transition-transform" />
                )}
              </button>
              <div className={`transition-all duration-300 ${expandedSection === 'expected' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <ul className="px-4 pb-4 space-y-2">
                  {expectedSymptoms.map((symptom, index) => (
                    <li 
                      key={index} 
                      className="text-xs gradient-text flex items-center gap-2 animate-in fade-in slide-in-from-left-2" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif', 
                        fontWeight: 400,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <TrendingUp className="w-3 h-3 text-blue-400 flex-shrink-0" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mismatches with pulse animation for critical items */}
          {mismatches.length > 0 && (
            <div className={`rounded-xl transition-all duration-400 overflow-hidden ${
              isDarkTheme
                ? 'bg-red-500/10 border border-red-500/20 hover:bg-red-500/15'
                : 'bg-red-50 border border-red-200 hover:bg-red-100'
            } backdrop-blur-sm`}>
              <button
                onClick={() => toggleSection('conflicts')}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <h3 className="text-sm font-medium text-red-400 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Conflicts Detected
                </h3>
                {expandedSection === 'conflicts' ? (
                  <ChevronUp className="w-4 h-4 text-red-400 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-red-400 transition-transform" />
                )}
              </button>
              <div className={`transition-all duration-300 ${expandedSection === 'conflicts' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <ul className="px-4 pb-4 space-y-2">
                  {mismatches.map((mismatch, index) => (
                    <li 
                      key={index} 
                      className="text-xs text-red-300 flex items-center gap-2 animate-in fade-in slide-in-from-left-2" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif', 
                        fontWeight: 400,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <XCircle className="w-3 h-3 flex-shrink-0 animate-pulse" />
                      {mismatch}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
