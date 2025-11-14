import { useRef, useEffect, useState } from 'react';
import { CheckCircle, Circle, AlertCircle, Calendar, Stethoscope, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { TimelineEvent } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';

interface RecoveryTimelineProps {
  events: TimelineEvent[];
}

export function RecoveryTimeline({ events }: RecoveryTimelineProps) {
  const { isDarkTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'surgery':
        return Stethoscope;
      case 'checkup':
        return Calendar;
      case 'milestone':
        return TrendingUp;
      case 'alert':
        return AlertCircle;
    }
  };

  const getColor = (type: TimelineEvent['type'], completed: boolean) => {
    if (!completed) return isDarkTheme ? 'text-[#A7B0B5] bg-white/[0.05]' : 'text-gray-400 bg-gray-100';
    
    switch (type) {
      case 'surgery':
        return isDarkTheme ? 'text-[#FFD580] bg-[#FFD580]/20' : 'text-[#FFD580] bg-amber-50';
      case 'checkup':
        return isDarkTheme ? 'text-[#5BC7FF] bg-[#5BC7FF]/20' : 'text-[#5BC7FF] bg-blue-50';
      case 'milestone':
        return isDarkTheme ? 'text-[#37E29D] bg-[#37E29D]/20' : 'text-[#37E29D] bg-green-50';
      case 'alert':
        return isDarkTheme ? 'text-[#FFD580] bg-[#FFD580]/20' : 'text-[#FFD580] bg-amber-50';
    }
  };

  const completionPercentage = (events.filter(e => e.completed).length / events.length) * 100;

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div ref={ref} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '400ms' }}>
        <h3 
          className="mb-6 gradient-text-glow"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
        >
          Recovery Timeline
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${isDarkTheme ? 'bg-white/[0.08]' : 'bg-gray-200'}`} />
          
          <div 
            className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-[#5BC7FF] to-[#37E29D] transition-all duration-1000 ease-out"
            style={{ height: isVisible ? `${completionPercentage}%` : '0%' }}
          />

          <div className="space-y-6">
            {events.map((event, index) => {
              const Icon = getIcon(event.type);
              const colorClass = getColor(event.type, event.completed);

              return (
                <div
                  key={event.id}
                  className={`relative flex gap-4 ${isVisible ? 'animate-in fade-in slide-in-from-left-4' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${colorClass} backdrop-blur-sm border ${
                      isDarkTheme ? 'border-white/[0.12]' : 'border-gray-200'
                    } ${isVisible ? 'animate-in zoom-in' : 'scale-0'}`}
                    style={{ animationDelay: `${index * 100 + 300}ms` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-6 ${event.completed ? '' : 'opacity-60'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 
                          className="gradient-text"
                          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '16px' }}
                        >
                          {event.title}
                        </h4>
                        <p 
                          className="text-sm gradient-text-secondary"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                        >
                          {event.description}
                        </p>
                      </div>
                      {event.completed && (
                        <div className={`${isVisible ? 'animate-in zoom-in spin-in' : 'scale-0'}`} style={{ animationDelay: `${index * 100 + 400}ms` }}>
                          <CheckCircle className="w-5 h-5 text-[#37E29D]" />
                        </div>
                      )}
                    </div>
                    <p 
                      className="text-sm flex items-center gap-2 gradient-text-muted"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </p>

                    {event.type === 'alert' && event.completed && (
                      <div
                        className={`mt-3 p-3 rounded-lg backdrop-blur-sm ${
                          isDarkTheme 
                            ? 'bg-[#FFD580]/20 border border-[#FFD580]/30'
                            : 'bg-amber-50 border border-amber-200'
                        } ${isVisible ? 'animate-in fade-in' : 'opacity-0'}`}
                        style={{ animationDelay: `${index * 100 + 500}ms` }}
                      >
                        <p 
                          className="text-sm gradient-text"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                        >
                          <strong>Resolution:</strong> Pain managed with adjusted medication. 
                          Doctor consulted via telehealth.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-6 p-4 rounded-xl backdrop-blur-sm ${
            isDarkTheme 
              ? 'bg-[#37E29D]/20 border border-[#37E29D]/30'
              : 'bg-green-50 border border-green-200'
          } ${isVisible ? 'animate-in fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '800ms' }}
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-[#37E29D]" />
            <p 
              className="text-sm gradient-text"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              You're {completionPercentage.toFixed(0)}% 
              through your recovery journey. Keep up the great work!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
