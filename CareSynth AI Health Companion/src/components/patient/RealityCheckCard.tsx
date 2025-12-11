import { CheckCircle, AlertTriangle, XCircle, ExternalLink } from 'lucide-react';
import { Card } from '../ui/card';
import { Patient } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';

interface RealityCheckCardProps {
  patient: Patient;
  onViewDetails?: () => void;
}

export function RealityCheckCard({ patient, onViewDetails }: RealityCheckCardProps) {
  const { isDarkTheme } = useTheme();

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

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400 overflow-hidden relative`}>
      <div className="animate-in fade-in slide-in-from-bottom-2 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2
                className={isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'}
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '32px' }}
              >
                Reality Check
              </h2>
            </div>
            <p
              className={isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]'}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px' }}
            >
              AI Alignment Analysis
            </p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${statusColor === 'green' ? 'bg-green-500/20 border border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' :
              statusColor === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]' :
                'bg-red-500/20 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
            }`}>
            <StatusIcon className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              {statusText}
            </span>
          </div>
        </div>

        {/* Compact AI Alignment Score Ring */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-24 h-24 group">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                strokeWidth="8"
                fill="none"
              />
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
                  filter: `drop-shadow(0 0 8px ${statusColor === 'green' ? 'rgba(55,226,157,0.4)' :
                      statusColor === 'yellow' ? 'rgba(255,213,128,0.4)' :
                        'rgba(244,124,124,0.4)'
                    })`
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className={`text-2xl font-bold transition-transform duration-300 group-hover:scale-110 ${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'}`}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                >
                  {alignmentScore}
                </div>
                <div className={`text-xs ${isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]'}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  Alignment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mb-4 text-center">
          <p
            className={`text-sm ${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'}`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, animationDelay: '200ms' }}
          >
            {alignmentScore >= 80
              ? `Your recovery matches ${alignmentScore}% of expected patterns.`
              : `${mismatches.length} parameter${mismatches.length > 1 ? 's' : ''} need${mismatches.length > 1 ? '' : 's'} attention.`
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`text-center p-2 rounded-lg ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
            <div className={`text-lg font-semibold ${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              {reportedSymptoms.length}
            </div>
            <div className={`text-xs ${isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Symptoms Tracked
            </div>
          </div>
          <div className={`text-center p-2 rounded-lg ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
            <div className={`text-lg font-semibold ${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              {mismatches.length}
            </div>
            <div className={`text-xs ${isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              Conflicts
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => {
            window.open(import.meta.env.VITE_API_ABSOLUTE_URL || 'http://localhost:5000', '_blank');
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#5BC7FF] to-[#37E29D] text-white rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <span>View Detailed Analysis</span>
          <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </Card>
  );
}
