import { useState } from 'react';
import { Send, Edit2, Sparkles, CheckCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import { api } from '../../lib/firestoreStubs';
import { Patient } from '../../lib/mockData';
import { useTheme } from '../../lib/ThemeContext';

interface MessageDoctorProps {
  patient: Patient;
}

export function MessageDoctor({ patient }: MessageDoctorProps) {
  const { isDarkTheme } = useTheme();
  const [message, setMessage] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const generateSummary = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = await api.generateAISummary(patient);
    
    setAiSummary(result.summary);
    setIsGenerating(false);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSending(false);
    setMessageSent(true);

    toast.success('Message sent to Dr. Smith', {
      description: 'Your doctor will review and respond soon.',
      duration: 3000
    });

    // Reset after animation
    setTimeout(() => {
      setMessage('');
      setAiSummary('');
      setMessageSent(false);
    }, 2000);
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
        <h3 className="gradient-text-glow mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
          Message Your Doctor
        </h3>

        <div className="space-y-4">
          {/* Message Input */}
          <div>
            <label className="block gradient-text-secondary text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Your Message
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your concerns or questions..."
              className={`w-full resize-none rounded-xl border focus:border-[#37E29D] ${
                isDarkTheme
                  ? 'bg-white/[0.05] border-white/[0.12] text-[#EAEAEA] placeholder:text-[#A7B0B5]'
                  : 'bg-white border-gray-300 placeholder:text-gray-400'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              rows={4}
            />
          </div>

          {/* Generate AI Summary Button */}
          {message && !aiSummary && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <Button
                onClick={generateSummary}
                disabled={isGenerating}
                variant="outline"
                className="w-full rounded-xl border-[#FFD580]/30 bg-[#FFD580]/10 hover:bg-[#FFD580]/20 text-[#FFD580]"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating AI Summary...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Attach AI-Generated Health Summary
                  </>
                )}
              </Button>
            </div>
          )}

          {/* AI Summary Preview */}
          {aiSummary && (
            <div className="border-2 border-[#FFD580]/30 rounded-xl overflow-hidden backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-gradient-to-r from-[#FFD580]/20 to-[#5BC7FF]/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD580]" />
                  <span className="gradient-text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    AI-Generated Summary
                  </span>
                </div>
                <Button
                  onClick={() => setIsEditingSummary(!isEditingSummary)}
                  variant="ghost"
                  size="sm"
                  className="text-[#FFD580] hover:bg-[#FFD580]/10"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  {isEditingSummary ? 'Done' : 'Edit'}
                </Button>
              </div>
              
              <div className={`p-4 ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
                {isEditingSummary ? (
                  <Textarea
                    value={aiSummary}
                    onChange={(e) => setAiSummary(e.target.value)}
                    className={`w-full resize-none rounded-lg border ${
                      isDarkTheme
                        ? 'bg-white/[0.05] border-white/[0.12] text-[#EAEAEA]'
                        : 'bg-white border-gray-300'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    rows={10}
                  />
                ) : (
                  <pre className="text-sm gradient-text-secondary whitespace-pre-wrap font-sans" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    {aiSummary}
                  </pre>
                )}
              </div>

              <div className="bg-[#FFD580]/20 px-4 py-3 border-t border-[#FFD580]/30 backdrop-blur-sm">
                <p className="text-[#FFD580] text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  💡 This summary will be attached to your message. You can edit it before sending.
                </p>
              </div>
            </div>
          )}

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isSending || messageSent}
            className="w-full btn-gradient-shift text-white rounded-xl"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            {messageSent ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Message Sent!
              </span>
            ) : isSending ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send to Doctor
                {aiSummary && ' (with AI Summary)'}
              </span>
            )}
          </Button>

          <p className="gradient-text-muted text-sm text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            Dr. Smith typically responds within 4 hours
          </p>
        </div>
      </div>
    </Card>
  );
}
