import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../lib/ThemeContext';

interface RiskGaugeProps {
  score: number;
  size?: number;
}

export function RiskGauge({ score, size = 200 }: RiskGaugeProps) {
  const { isDarkTheme } = useTheme();
  const [displayScore, setDisplayScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = score / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.round(increment * currentStep));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, score]);

  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getColor = (value: number) => {
    if (isDarkTheme) {
      if (value <= 30) return '#37E29D'; // mint green
      if (value <= 60) return '#FFD580'; // amber
      return '#F47C7C'; // coral red
    } else {
      if (value <= 30) return '#10b981'; // green
      if (value <= 60) return '#f59e0b'; // amber
      return '#ef4444'; // red
    }
  };

  const getStatus = (value: number) => {
    if (value <= 30) return 'Low Risk';
    if (value <= 60) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgb(229 231 235)'}
            strokeWidth="16"
          />
          
          {/* Animated progress circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={getColor(score)}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ 
              filter: isDarkTheme ? 'drop-shadow(0 0 8px currentColor)' : 'none',
              transition: 'stroke-dashoffset 2s ease-out'
            }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`${isVisible ? 'animate-in fade-in zoom-in-50' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
            <span className="block" style={{ color: getColor(score), fontSize: '48px', fontWeight: 700 }}>
              {displayScore}
            </span>
            <span className={`block text-center mt-1 ${isDarkTheme ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>/100</span>
          </div>
        </div>
      </div>
      
      <div className={`text-center ${isVisible ? 'animate-in fade-in slide-in-from-bottom-2' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
        <div 
          className={`px-4 py-1.5 rounded-full inline-block ${isDarkTheme ? 'glow-teal-dark' : ''}`}
          style={{ backgroundColor: `${getColor(score)}20`, color: getColor(score) }}
        >
          {getStatus(score)}
        </div>
      </div>
    </div>
  );
}
