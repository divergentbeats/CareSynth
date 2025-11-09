import { AlertCircle, Activity, Pill, Image, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert } from '../../lib/mockData';
import { useState } from 'react';
import { useTheme } from '../../lib/ThemeContext';

interface AlertFeedProps {
  alerts: Alert[];
  onAlertClick?: (alert: Alert) => void;
}

export function AlertFeed({ alerts, onAlertClick }: AlertFeedProps) {
  const { isDarkTheme } = useTheme();
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'pain':
        return Activity;
      case 'wound':
        return Image;
      case 'medication':
        return Pill;
      case 'vitals':
        return AlertCircle;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-[#5BC7FF]/20 text-[#5BC7FF] border-[#5BC7FF]/30';
      case 'medium':
        return 'bg-[#FFD580]/20 text-[#FFD580] border-[#FFD580]/30';
      case 'high':
        return 'bg-[#F47C7C]/20 text-[#F47C7C] border-[#F47C7C]/30';
    }
  };

  const getBorderColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'low':
        return 'border-l-[#5BC7FF]';
      case 'medium':
        return 'border-l-[#FFD580]';
      case 'high':
        return 'border-l-[#F47C7C]';
    }
  };

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
  const unreadCount = visibleAlerts.filter(a => !a.read).length;

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="gradient-text-glow mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
              Real-Time Alerts
            </h3>
            <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              {visibleAlerts.length} active notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <div
                className="w-8 h-8 bg-[#F47C7C] text-white rounded-full flex items-center justify-center animate-in zoom-in"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                {unreadCount}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {visibleAlerts.map((alert, index) => {
            const Icon = getIcon(alert.type);
            const severityColor = getSeverityColor(alert.severity);
            const borderColor = getBorderColor(alert.severity);

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-l-4 ${borderColor} border backdrop-blur-sm transition-all animate-in fade-in slide-in-from-left-4 ${
                  isDarkTheme
                    ? 'bg-white/[0.03] border-white/[0.08]'
                    : 'bg-gray-50 border-gray-200'
                } ${
                  !alert.read ? 'ring-1 ring-white/[0.12]' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg backdrop-blur-sm ${severityColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="gradient-text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                            {alert.patientName}
                          </h4>
                          {!alert.read && (
                            <div className="w-2 h-2 bg-[#5BC7FF] rounded-full animate-in zoom-in" />
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={`${severityColor} text-xs px-2 py-0 mb-2 backdrop-blur-sm`}
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                        >
                          {alert.severity} priority
                        </Badge>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDismiss(alert.id)}
                        className="gradient-text-muted hover:gradient-text p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="gradient-text-secondary text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      {alert.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs gradient-text-muted" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        {alert.timestamp}
                      </span>
                      <Button
                        onClick={() => onAlertClick?.(alert)}
                        size="sm"
                        variant="outline"
                        className={`rounded-lg text-xs text-[#5BC7FF] ${
                          isDarkTheme
                            ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08]'
                            : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                      >
                        View Patient
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {visibleAlerts.length === 0 && (
            <div className="text-center py-12 animate-in fade-in">
              <div className="w-16 h-16 bg-[#37E29D]/20 border border-[#37E29D]/30 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <AlertCircle className="w-8 h-8 text-[#37E29D]" />
              </div>
              <p className="gradient-text mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                All caught up!
              </p>
              <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                No active alerts at the moment.
              </p>
            </div>
          )}
        </div>

        {visibleAlerts.length > 0 && (
          <div className={`mt-4 pt-4 border-t ${isDarkTheme ? 'border-white/[0.08]' : 'border-gray-200'} flex gap-2 animate-in fade-in`} style={{ animationDelay: '500ms' }}>
            <Button 
              variant="outline" 
              className={`flex-1 rounded-xl text-sm ${
                isDarkTheme
                  ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08]'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              <span className="gradient-text">Mark All Read</span>
            </Button>
            <Button 
              className="flex-1 btn-gradient-shift text-white rounded-xl text-sm"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              Bulk Actions
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
