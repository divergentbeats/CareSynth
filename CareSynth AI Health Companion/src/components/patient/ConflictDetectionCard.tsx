import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Card } from '../ui/card';
import { useTheme } from '../../lib/ThemeContext';

interface ConflictDetectionCardProps {
  conflicts?: any[];
  onViewDetails?: () => void;
}

export function ConflictDetectionCard({ conflicts = [], onViewDetails }: ConflictDetectionCardProps) {
  const { isDarkTheme } = useTheme();

  const defaultConflicts = [
    { id: 'c1', title: 'High energy + increasing heart rate', severity: 'medium', trend: 'up' },
    { id: 'c2', title: 'Good mood + low oxygen', severity: 'high', trend: 'down' },
    { id: 'c3', title: 'Low pain + increased inflammation period', severity: 'low', trend: 'stable' },
  ];

  const list = conflicts.length ? conflicts : defaultConflicts;
  const primaryText = isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]';
  const secondaryText = isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]';

  const getSeverityConfig = (severity?: string) => {
    switch (severity) {
      case 'high':
        return { badge: 'bg-red-500/20 text-red-400 border-red-500/40' };
      case 'medium':
        return { badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' };
      default:
        return { badge: 'bg-blue-500/20 text-blue-400 border-blue-500/40' };
    }
  };

  return (
    <Card className={`w-full rounded-2xl ${isDarkTheme ? 'bg-white/[0.06] backdrop-blur-xl border-[#37E29D]/12' : 'bg-white shadow-sm border-gray-200'} border p-6 card-hover-lift transition-all duration-400`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FFB84D]/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <AlertTriangle className="w-5 h-5 text-[#FFB84D] animate-pulse" />
          </div>
          <div>
            <h3 className={`text-2xl font-semibold ${primaryText} flex items-center gap-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Conflict Detection
              {list.length > 0 && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB84D] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB84D]"></span>
                </span>
              )}
            </h3>
            <p className={`text-sm ${secondaryText} mt-0.5`} style={{ fontFamily: 'Inter, sans-serif' }}>
              {list.length} {list.length === 1 ? 'conflict' : 'conflicts'} detected
            </p>
          </div>
        </div>

        {/* Summary indicator */}
        {list.length > 0 && (
          <div className="flex gap-1">
            {['high', 'medium', 'low'].map(severity => {
              const count = list.filter(c => c.severity === severity).length;
              if (count === 0) return null;
              const config = getSeverityConfig(severity);
              return (
                <div
                  key={severity}
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${config.badge} transition-all duration-300 hover:scale-110`}
                  title={`${count} ${severity} severity`}
                >
                  {count}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`text-center p-2 rounded-lg ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
          <div className="text-lg font-semibold gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {list.length}
          </div>
          <div className="text-sm gradient-text-secondary" style={{ fontFamily: 'Inter, sans-serif' }}>
            Active Conflicts
          </div>
        </div>
        <div className={`text-center p-2 rounded-lg ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
          <div className="text-lg font-semibold gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {list.filter(c => c.severity === 'high').length}
          </div>
          <div className="text-sm gradient-text-secondary" style={{ fontFamily: 'Inter, sans-serif' }}>
            High Priority
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="mb-4 text-center">
        <p className={`text-base ${secondaryText} animate-in fade-in slide-in-from-bottom-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
          {list.length === 0
            ? 'No parameter conflicts detected today.'
            : `${list.filter(c => c.severity === 'high').length} high-priority conflicts require immediate attention.`
          }
        </p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => { window.location.href = 'https://trae2wo7a0vf.vercel.app/'; }}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#FFB84D] to-[#FF6B6B] text-white rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <span>View Conflict Details</span>
        <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </Card>
  );
}
