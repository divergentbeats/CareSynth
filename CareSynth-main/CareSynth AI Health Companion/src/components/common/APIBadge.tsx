import { Settings, Code } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

interface APIBadgeProps {
  endpoint?: string;
  variant?: 'compact' | 'full';
}

export function APIBadge({ endpoint, variant = 'compact' }: APIBadgeProps) {
  const { isDarkTheme } = useTheme();
  
  if (variant === 'full' && endpoint) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 backdrop-blur-sm border rounded-lg animate-in fade-in slide-in-from-top-1 transition-all hover:scale-[1.02] hover:-translate-y-0.5 ${
          isDarkTheme
            ? 'bg-[#5BC7FF]/10 border-[#5BC7FF]/30 text-[#5BC7FF]'
            : 'bg-[#0BAF85]/10 border-[#0BAF85]/30 text-[#0BAF85]'
        }`}
        title={`API Endpoint: ${endpoint}`}
      >
        <Code className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono font-medium">{endpoint}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 backdrop-blur-sm border rounded-md animate-in fade-in zoom-in-95 transition-all hover:scale-105 ${
        isDarkTheme
          ? 'bg-white/5 border-white/10'
          : 'bg-gray-100/80 border-gray-200/50'
      }`}
      title={endpoint ? `API: ${endpoint}` : 'API Connected'}
    >
      <Settings className={`w-3 h-3 ${isDarkTheme ? 'text-[#5BC7FF]' : 'text-gray-500'}`} />
      {endpoint && (
        <span className={`text-[9px] font-mono ${isDarkTheme ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
          {endpoint}
        </span>
      )}
    </div>
  );
}
