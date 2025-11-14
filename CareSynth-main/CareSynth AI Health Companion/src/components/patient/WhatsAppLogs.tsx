import { MessageCircle, CheckCircle, Bell, Activity } from 'lucide-react';
import { Card } from '../ui/card';
import { WhatsAppLog } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';

interface WhatsAppLogsProps {
  logs: WhatsAppLog[];
}

export function WhatsAppLogs({ logs }: WhatsAppLogsProps) {
  const { isDarkTheme } = useTheme();
  
  const getIcon = (type: WhatsAppLog['type']) => {
    switch (type) {
      case 'check-in':
        return Activity;
      case 'reminder':
        return Bell;
      case 'alert':
        return MessageCircle;
    }
  };

  const getColor = (type: WhatsAppLog['type']) => {
    switch (type) {
      case 'check-in':
        return 'text-[#5BC7FF] bg-[#5BC7FF]/20';
      case 'reminder':
        return 'text-[#FFD580] bg-[#FFD580]/20';
      case 'alert':
        return 'text-[#FFD580] bg-[#FFD580]/20';
    }
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '700ms' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
            WhatsApp Automation
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#37E29D]/20 text-[#37E29D] rounded-full text-sm border border-[#37E29D]/30 backdrop-blur-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            <CheckCircle className="w-4 h-4" />
            <span>Active</span>
          </div>
        </div>

        <div className="space-y-3">
          {logs.map((log, index) => {
            const Icon = getIcon(log.type);
            const colorClass = getColor(log.type);

            return (
              <div
                key={log.id}
                className={`p-4 rounded-xl backdrop-blur-sm transition-all border animate-in fade-in slide-in-from-left-4 ${
                  isDarkTheme
                    ? 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg backdrop-blur-sm border ${
                    isDarkTheme ? 'border-white/[0.12]' : 'border-gray-200'
                  } ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="gradient-text capitalize" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                        {log.type.replace('-', ' ')}
                      </span>
                      <span className="text-xs gradient-text-muted" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        {log.timestamp}
                      </span>
                    </div>

                    <div className={`mb-2 p-3 rounded-lg backdrop-blur-sm border ${
                      isDarkTheme
                        ? 'bg-white/[0.05] border-white/[0.08]'
                        : 'bg-white border-gray-200'
                    }`}>
                      <p className="gradient-text-secondary text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        <strong>Patient Response:</strong>
                      </p>
                      <p className="gradient-text text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        "{log.patientResponse}"
                      </p>
                    </div>

                    {log.aiAnalysis && (
                      <div className="flex items-start gap-2 p-2 bg-[#5BC7FF]/20 rounded-lg border border-[#5BC7FF]/30 backdrop-blur-sm">
                        <CheckCircle className="w-4 h-4 text-[#5BC7FF] flex-shrink-0 mt-0.5" />
                        <p className="text-[#5BC7FF] text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                          {log.aiAnalysis}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-[#37E29D]/20 rounded-xl border border-[#37E29D]/30 backdrop-blur-sm animate-in fade-in" style={{ animationDelay: '800ms' }}>
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-[#37E29D] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#37E29D] text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                <strong>WhatsApp Check-ins:</strong> Automated messages are sent twice daily 
                (8:00 AM & 8:00 PM) to track your recovery.
              </p>
              <p className="text-[#37E29D] text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Simply reply with your pain level and medication status - our AI analyzes your responses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
