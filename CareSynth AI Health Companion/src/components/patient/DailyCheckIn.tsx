import { useState } from 'react';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
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
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Customized questions based on patient type
  const getCustomQuestions = (): CustomQuestion[] => {
    if (currentPatient?.name === 'Kiran') {
      return [
        { id: 'knee_pain', question: 'Knee Pain Level (Post-Surgery)', type: 'slider', min: 0, max: 10, unit: '/10' },
        { id: 'swelling', question: 'Swelling around operated knee', type: 'slider', min: 0, max: 10, unit: 'mild to severe' },
        { id: 'mobility', question: 'Can you perform straight leg raising?', type: 'yesno' },
        { id: 'weight_bearing', question: 'Can you bear weight with walker/crutch?', type: 'yesno' },
        { id: 'fever', question: 'Any fever or discharge from wound?', type: 'yesno' },
      ];
    } else if (currentPatient?.name === 'Sahana') {
      return [
        { id: 'fever_level', question: 'Current Fever Level (°F)', type: 'slider', min: 98, max: 104, unit: '°F' },
        { id: 'sore_throat', question: 'Sore Throat Severity', type: 'slider', min: 0, max: 10, unit: 'none to severe' },
        { id: 'cough', question: 'Persistent Cough Present?', type: 'yesno' },
        { id: 'body_ache', question: 'Body Ache Severity', type: 'slider', min: 0, max: 10, unit: 'none to severe' },
        { id: 'fluid_intake', question: 'Drinking 2-3 litres daily?', type: 'yesno' },
      ];
    }
    
    // Default questions for other patients
    return [
      { id: 'pain', question: 'Current Pain Level', type: 'slider', min: 0, max: 10, unit: '/10' },
      { id: 'energy', question: 'Energy Level', type: 'slider', min: 0, max: 10, unit: 'low to high' },
    ];
  };

  const questions = getCustomQuestions();

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

  const handleSliderChange = (questionId: string, value: number[]) => {
    setAnswers({ ...answers, [questionId]: value[0] });
  };

  const handleYesNoChange = (questionId: string, value: boolean) => {
    setAnswers({ ...answers, [questionId]: value });
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
          <div>
            <h3 
              className={`${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'} font-semibold`}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}
            >
              Daily Check-In
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
          {questions.map((q, idx) => (
            <div key={q.id}>
              <div className="flex items-center justify-between mb-3">
                <label 
                  className={isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '15px' }}
                >
                  {q.question}
                </label>
                {q.type === 'slider' && answers[q.id] !== undefined && (
                  <div className="flex items-center gap-2 animate-in zoom-in">
                    <span className={`${getPainColor(answers[q.id])}`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      {answers[q.id]}{q.unit}
                    </span>
                  </div>
                )}
                {q.type === 'yesno' && answers[q.id] !== undefined && (
                  <span className={`text-sm font-medium ${answers[q.id] ? 'text-[#37E29D]' : 'text-[#F47C7C]'}`}>
                    {answers[q.id] ? '✓ Yes' : '✗ No'}
                  </span>
                )}
              </div>

              {q.type === 'slider' && (
                <>
                  <Slider
                    value={[answers[q.id] || (q.min || 0)]}
                    onValueChange={(val) => handleSliderChange(q.id, val)}
                    min={q.min || 0}
                    max={q.max || 10}
                    step={1}
                    className="mb-2"
                  />
                </>
              )}

              {q.type === 'yesno' && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleYesNoChange(q.id, true)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                      answers[q.id] === true
                        ? 'bg-[#37E29D] text-white'
                        : isDarkTheme
                        ? 'bg-white/10 text-[#A0A0A0] hover:bg-white/15'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleYesNoChange(q.id, false)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                      answers[q.id] === false
                        ? 'bg-[#F47C7C] text-white'
                        : isDarkTheme
                        ? 'bg-white/10 text-[#A0A0A0] hover:bg-white/15'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    No
                  </Button>
                </div>
              )}
            </div>
          ))}

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
                  <strong>High Symptom Alert:</strong> Your reported levels are concerning. 
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