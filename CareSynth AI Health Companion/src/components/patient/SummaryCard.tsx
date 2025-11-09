import { Heart, Activity, Calendar, TrendingDown, Download, Link } from 'lucide-react';
import { RiskGauge } from '../common/RiskGauge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Patient } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';
import { getCardClass, getHeadingClass, getBodyClass, getBgClass, getBorderClass, getAccentColor } from '../../lib/themeUtils';
import { APIBadge } from '../common/APIBadge';
import { toast } from 'sonner@2.0.3';

interface SummaryCardProps {
  patient: Patient;
}

export function SummaryCard({ patient }: SummaryCardProps) {
  const { isDarkTheme } = useTheme();
  
  const stats = [
    {
      icon: Calendar,
      label: 'Days Post-Op',
      value: patient.dayPostOp,
      color: isDarkTheme ? 'text-[#5BC7FF]' : 'text-blue-500'
    },
    {
      icon: Activity,
      label: 'Pain Level',
      value: `${patient.painLevel}/10`,
      color: isDarkTheme ? 'text-[#FFD580]' : 'text-purple-500'
    },
    {
      icon: Heart,
      label: 'Status',
      value: patient.status === 'stable' ? 'Stable' : patient.status === 'warning' ? 'Warning' : 'Critical',
      color: patient.status === 'stable' 
        ? (isDarkTheme ? 'text-[#37E29D]' : 'text-green-500') 
        : patient.status === 'warning' 
        ? (isDarkTheme ? 'text-[#FFD580]' : 'text-amber-500') 
        : (isDarkTheme ? 'text-[#F47C7C]' : 'text-red-500')
    }
  ];

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div className="animate-in fade-in slide-in-from-bottom-2">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 
              className="mb-2 gradient-text-glow"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '28px' }}
            >
              Recovery Summary
            </h2>
            <p 
              className="gradient-text-secondary text-sm"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Last updated: {patient.lastCheckIn}
            </p>
          </div>
          <RiskGauge score={patient.riskScore} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center gap-4 p-4 rounded-xl animate-in fade-in slide-in-from-bottom-2 ${
                isDarkTheme 
                  ? 'bg-white/[0.03] border border-white/[0.08]' 
                  : 'bg-gray-50 border border-gray-100'
              } backdrop-blur-sm transition-all duration-400`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className={`p-3 rounded-lg ${stat.color} ${
                isDarkTheme 
                  ? 'bg-white/[0.05] border border-white/[0.12]' 
                  : 'bg-white border border-gray-200'
              } backdrop-blur-sm icon-hover-effect`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm gradient-text-muted" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {stat.label}
                </p>
                <p 
                  className="gradient-text-glow"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '20px' }}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 p-4 rounded-xl animate-in fade-in ${
            isDarkTheme 
              ? patient.painLevel <= 3 
                ? 'bg-[#37E29D]/20 border border-[#37E29D]/30'
                : patient.painLevel <= 6
                ? 'bg-[#5BC7FF]/20 border border-[#5BC7FF]/30'
                : 'bg-[#F47C7C]/20 border border-[#F47C7C]/30'
              : patient.painLevel <= 3
              ? 'bg-green-50 border border-green-200'
              : patient.painLevel <= 6
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-red-50 border border-red-200'
          } backdrop-blur-sm transition-all duration-400`}
          style={{ animationDelay: '500ms' }}
        >
          <div className="flex items-center gap-3">
            <TrendingDown className={`w-5 h-5 ${
              isDarkTheme
                ? patient.painLevel <= 3
                  ? 'text-[#37E29D]'
                  : patient.painLevel <= 6
                  ? 'text-[#5BC7FF]'
                  : 'text-[#F47C7C]'
                : patient.painLevel <= 3
                ? 'text-green-600'
                : patient.painLevel <= 6
                ? 'text-blue-600'
                : 'text-red-600'
            }`} />
            <p 
              className="text-sm gradient-text flex-1"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              {patient.painLevel <= 3 && 'Excellent! Pain levels are well-managed. Keep up the recovery routine.'}
              {patient.painLevel > 3 && patient.painLevel <= 6 && 'Moderate pain detected. Continue monitoring and follow medication schedule.'}
              {patient.painLevel > 6 && 'High pain levels detected. Consider contacting your doctor if this persists.'}
            </p>
          </div>
        </div>

        {/* Connected to Doctor Dashboard + Download Report */}
        <div className="mt-4 flex items-center justify-between animate-in fade-in" style={{ animationDelay: '600ms' }}>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm ${
            isDarkTheme
              ? 'bg-white/[0.03] border border-white/[0.08]'
              : 'bg-gray-50 border border-gray-100'
          }`}>
            <Link className="w-4 h-4 text-[#37E29D]" />
            <span className="text-xs gradient-text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Connected to Doctor Dashboard
            </span>
            <APIBadge endpoint="POST /patient/{id}/update-response" />
          </div>
          <Button
            onClick={() => {
              toast.success('Generating your recovery report...', {
                description: 'PDF will include all your health metrics and timeline',
                duration: 3000
              });
            }}
            variant="outline"
            size="sm"
            className={`rounded-lg ${
              isDarkTheme
                ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-[#5BC7FF]'
                : 'border-gray-300 bg-white hover:bg-gray-50 text-[#0BAF85]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download My Report
          </Button>
        </div>
      </div>
    </Card>
  );
}
