import { useState } from 'react';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { toast } from 'sonner@2.0.3';
import { useTheme } from '../../lib/ThemeContext';

interface DailyCheckInProps {
  onCheckInComplete: (painLevel: number) => void;
}

export function DailyCheckIn({ onCheckInComplete }: DailyCheckInProps) {
  const { isDarkTheme } = useTheme();
  const [painLevel, setPainLevel] = useState([4]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const getPainColor = (level: number) => {
    if (level <= 3) return 'text-[#37E29D]';
    if (level <= 6) return 'text-[#FFD580]';
    return 'text-[#F47C7C]';
  };

  const getPainLabel = (level: number) => {
    if (level === 0) return 'No Pain';
    if (level <= 3) return 'Mild';
    if (level <= 6) return 'Moderate';
    if (level <= 8) return 'Severe';
    return 'Extreme';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsComplete(true);
    onCheckInComplete(painLevel[0]);

    if (painLevel[0] > 7) {
      toast.error('High pain level detected', {
        description: 'Your care team has been notified. Consider contacting your doctor.',
        duration: 5000
      });
    } else {
      toast.success('Daily check-in completed', {
        description: 'Thank you! Your progress is being tracked.',
        duration: 3000
      });
    }

    // Reset after 2 seconds
    setTimeout(() => setIsComplete(false), 2000);
  };

  const handleReportRedirect = () => {
    window.location.href = '/daily_report.html';
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 
            className="gradient-text-glow"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
          >
            Daily Check-In
          </h3>
          {isComplete && (
            <div className="animate-in zoom-in">
              <CheckCircle className="w-6 h-6 text-[#37E29D]" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label 
                className="gradient-text"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '15px' }}
              >
                Current Pain Level
              </label>
              <div key={painLevel[0]} className="flex items-center gap-2 animate-in zoom-in">
                <span className={`${getPainColor(painLevel[0])}`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  {painLevel[0]}/10
                </span>
                <span 
                  className="text-sm gradient-text-secondary"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  ({getPainLabel(painLevel[0])})
                </span>
              </div>
            </div>

            <Slider
              value={painLevel}
              onValueChange={setPainLevel}
              max={10}
              step={1}
              className="mb-2"
            />

            <div 
              className="flex justify-between text-xs mt-2 gradient-text-muted"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <span>No Pain</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          {painLevel[0] > 7 && (
            <div
              className={`flex items-start gap-3 p-4 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2 ${
                isDarkTheme 
                  ? 'bg-[#F47C7C]/20 border border-[#F47C7C]/30'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <AlertCircle className="w-5 h-5 text-[#F47C7C] flex-shrink-0 mt-0.5" />
              <div>
                <p 
                  className="text-sm gradient-text"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  <strong>High Pain Alert:</strong> Your pain level is concerning. 
                  Please contact your doctor if this persists.
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || isComplete}
            className="w-full btn-gradient-sweep text-white rounded-xl"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 animate-in fade-in">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </span>
            ) : isComplete ? (
              'Completed ✓'
            ) : (
              'Submit Check-In'
            )}
          </Button>

          <Button
            onClick={handleReportRedirect}
            className="w-full btn-gradient-sweep text-white rounded-xl flex items-center justify-center gap-2"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            <FileText className="w-5 h-5" />
            Send Your Daily Health Report
          </Button>
        </div>
      </div>
    </Card>
  );
}