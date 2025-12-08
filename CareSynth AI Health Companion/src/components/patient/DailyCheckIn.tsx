import { useState } from 'react';
import { CheckCircle, FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useTheme } from '../../lib/ThemeContext';
import { usePatient } from '../../lib/PatientContext';

interface DailyCheckInProps {
  onCheckInComplete: (painLevel: number) => void;
}

interface CustomQuestion {
  id: string;
  question: string;
  type: 'slider' | 'yesno' | 'symptom';
  min?: number;
  max?: number;
  unit?: string;
}

export function DailyCheckIn({ onCheckInComplete }: DailyCheckInProps) {
  const { isDarkTheme } = useTheme();
  const { currentPatient } = usePatient();
  
  const [painLevel, setPainLevel] = useState([4]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const questions: CustomQuestion[] = [];

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

  const handleReportChange = (value: string) => {
    setReport(value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsComplete(true);
    onCheckInComplete(painLevel[0]);
    toast.success('Health report saved', {
      description: 'Your detailed report has been captured.',
      duration: 3000
    });
    setTimeout(() => setIsComplete(false), 1500);
  };

  const handleReportRedirect = () => {
    window.location.href = '/daily_report.html';
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 
              className={`${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'} font-semibold`}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
            >
              Health Check-In
            </h3>
            <p 
              className={`text-sm ${isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]'} mt-1`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Personalized for {currentPatient?.name}
            </p>
          </div>
          {isComplete && (
            <div className="animate-in zoom-in">
              <CheckCircle className="w-6 h-6 text-[#37E29D]" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || isComplete}
            className="w-full btn-gradient-sweep text-white rounded-xl"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 animate-in fade-in">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : isComplete ? (
              'Completed ✓'
            ) : (
              'Save Report'
            )}
          </Button>

          <Button
            onClick={handleReportRedirect}
            className="w-full btn-gradient-sweep text-white rounded-xl flex items-center justify-center gap-2"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            <FileText className="w-5 h-5" />
            Send Your Health Report
          </Button>
        </div>
      </div>
    </Card>
  );
}