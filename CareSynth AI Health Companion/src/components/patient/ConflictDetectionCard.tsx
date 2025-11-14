import React, { useState } from 'react';
import { AlertTriangle, Zap, Activity, Thermometer, Heart, ChevronDown, ChevronUp, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/card';
import { useTheme } from '../../lib/ThemeContext';

interface Conflict {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  severity?: 'low' | 'medium' | 'high';
  trend?: 'up' | 'down' | 'stable';
}

interface ConflictDetectionCardProps {
  conflicts?: Conflict[];
}

export function ConflictDetectionCard({ conflicts = [] }: ConflictDetectionCardProps) {
  const { isDarkTheme } = useTheme();
  const [expandedConflicts, setExpandedConflicts] = useState<Set<string>>(new Set());
  const [hoveredConflict, setHoveredConflict] = useState<string | null>(null);

  const defaultConflicts: Conflict[] = [
    { 
      id: 'c1', 
      title: 'High energy + increasing heart rate', 
      description: 'Patient reports high energy levels while heart rate monitoring shows an upward trend. This could indicate overexertion.',
      icon: <Activity className="w-5 h-5 text-[#37E29D]" />,
      severity: 'medium',
      trend: 'up'
    },
    { 
      id: 'c2', 
      title: 'Good mood + low oxygen', 
      description: 'Subjective mood assessment is positive, but SpO2 readings are below normal range. Sensor malfunction or clinical concern.',
      icon: <Thermometer className="w-5 h-5 text-[#FF6B6B]" />,
      severity: 'high',
      trend: 'down'
    },
    { 
      id: 'c3', 
      title: 'Low pain + increased inflammation period', 
      description: 'Pain scores are low but inflammation markers suggest active inflammatory response. Monitor for delayed pain perception.',
      icon: <Zap className="w-5 h-5 text-[#5BC7FF]" />,
      severity: 'low',
      trend: 'stable'
    },
  ];

  const list = conflicts.length ? conflicts : defaultConflicts;
  const primaryText = isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]';
  const secondaryText = isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]';

  const toggleConflict = (id: string) => {
    const newExpanded = new Set(expandedConflicts);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedConflicts(newExpanded);
  };

  const getSeverityConfig = (severity?: string) => {
    switch (severity) {
      case 'high':
        return {
          bg: isDarkTheme ? 'bg-red-500/10' : 'bg-red-50',
          border: 'border-red-500/30',
          text: 'text-red-400',
          badge: 'bg-red-500/20 text-red-400 border-red-500/40',
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
        };
      case 'medium':
        return {
          bg: isDarkTheme ? 'bg-yellow-500/10' : 'bg-yellow-50',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
          glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]'
        };
      default:
        return {
          bg: isDarkTheme ? 'bg-blue-500/10' : 'bg-blue-50',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          badge: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
          glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]'
        };
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />;
      case 'down':
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Activity className="w-3 h-3" />;
    }
  };

  const sortedConflicts = [...list].sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return (severityOrder[a.severity || 'low'] || 2) - (severityOrder[b.severity || 'low'] || 2);
  });

  return (
    <Card className={`w-full rounded-2xl ${isDarkTheme ? 'bg-white/[0.06] backdrop-blur-xl border-[#37E29D]/12' : 'bg-white shadow-sm border-gray-200'} border p-6 card-hover-lift transition-all duration-400`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FFB84D]/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <AlertTriangle className="w-5 h-5 text-[#FFB84D] animate-pulse" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${primaryText} flex items-center gap-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Conflict Detection
              {list.length > 0 && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB84D] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB84D]"></span>
                </span>
              )}
            </h3>
            <p className={`text-xs ${secondaryText} mt-0.5`} style={{ fontFamily: 'Inter, sans-serif' }}>
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

      {list.length === 0 ? (
        <div className={`text-center py-8`}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
            <Heart className="w-8 h-8 text-green-400" />
          </div>
          <p className={`${secondaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
            No parameter conflicts detected today.
          </p>
          <p className={`${secondaryText} text-xs mt-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
            All health metrics are aligned with expected recovery patterns.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sortedConflicts.map((conflict, index) => {
            const isExpanded = expandedConflicts.has(conflict.id);
            const isHovered = hoveredConflict === conflict.id;
            const config = getSeverityConfig(conflict.severity);
            
            return (
              <li 
                key={conflict.id} 
                className={`rounded-lg ${config.bg} border ${config.border} transition-all duration-300 overflow-hidden ${
                  isHovered ? `scale-[1.02] ${config.glow}` : ''
                }`}
                onMouseEnter={() => setHoveredConflict(conflict.id)}
                onMouseLeave={() => setHoveredConflict(null)}
              >
                <button
                  onClick={() => toggleConflict(conflict.id)}
                  className="w-full p-3 flex items-start gap-3 text-left"
                >
                  <div className={`w-9 h-9 rounded-md ${isDarkTheme ? 'bg-white/[0.05]' : 'bg-white/50'} flex items-center justify-center mt-1 flex-shrink-0 transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}>
                    {conflict.icon || <Heart className="w-5 h-5 text-[#37E29D]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={`${primaryText} font-medium text-sm flex-1`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {conflict.title}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Severity badge */}
                        {conflict.severity && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${config.badge} uppercase tracking-wide`}>
                            {conflict.severity}
                          </span>
                        )}
                        {/* Trend indicator */}
                        {conflict.trend && (
                          <span className={`${config.text}`}>
                            {getTrendIcon(conflict.trend)}
                          </span>
                        )}
                        {/* Expand/collapse icon */}
                        {conflict.description && (
                          isExpanded ? (
                            <ChevronUp className={`w-4 h-4 ${config.text} transition-transform duration-300`} />
                          ) : (
                            <ChevronDown className={`w-4 h-4 ${config.text} transition-transform duration-300`} />
                          )
                        )}
                      </div>
                    </div>
                    
                    {/* Expanded description */}
                    {conflict.description && (
                      <div className={`transition-all duration-300 ${
                        isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      } overflow-hidden`}>
                        <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-white/50'} border ${isDarkTheme ? 'border-white/[0.05]' : 'border-gray-200'}`}>
                          <div className="flex items-start gap-2">
                            <Info className={`w-4 h-4 ${config.text} flex-shrink-0 mt-0.5`} />
                            <p className={`${secondaryText} text-xs leading-relaxed`} style={{ fontFamily: 'Inter, sans-serif' }}>
                              {conflict.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Action footer */}
      {list.length > 0 && (
        <div className={`mt-4 pt-4 border-t ${isDarkTheme ? 'border-white/[0.08]' : 'border-gray-200'}`}>
          <p className={`text-xs ${secondaryText} text-center`} style={{ fontFamily: 'Inter, sans-serif' }}>
            <Info className="w-3 h-3 inline mr-1" />
            Conflicts are automatically flagged for doctor review
          </p>
        </div>
      )}
    </Card>
  );
}
