import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Loader2, X, Maximize2, Minimize2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { APIBadge } from '../common/APIBadge';
import { useTheme } from '../../lib/ThemeContext';

interface DoctorAIChatProps {
  selectedPatientName?: string;
}

interface Message {
  id: string;
  sender: 'doctor' | 'ai';
  message: string;
  timestamp: string;
}

export function DoctorAIChat({ selectedPatientName }: DoctorAIChatProps) {
  const { isDarkTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      message: `Hello Doctor! I'm CareSynth AI Companion, ready to assist you with patient insights and analytics. ${selectedPatientName ? `Currently viewing ${selectedPatientName}'s data.` : 'Select a patient to get started.'}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update AI context when patient changes
  useEffect(() => {
    if (selectedPatientName) {
      const contextMessage: Message = {
        id: `context_${Date.now()}`,
        sender: 'ai',
        message: `Switched to ${selectedPatientName}'s profile. I can now provide insights about their recovery trends, medication compliance, and risk factors. What would you like to know?`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages(prev => [...prev, contextMessage]);
    }
  }, [selectedPatientName]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: 'doctor',
      message: input,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with context-aware replies
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // POST /ai/insight-query
    // GET /ai/contextual-summary/{patientId}
    const aiResponse = getContextualResponse(input, selectedPatientName);

    const aiMessage: Message = {
      id: `msg_${Date.now() + 1}`,
      sender: 'ai',
      message: aiResponse,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const getContextualResponse = (query: string, patientName?: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('risk') || lowerQuery.includes('score')) {
      return patientName 
        ? `${patientName}'s current risk score is stable. Based on pain trends and medication compliance, I recommend continuing the current care plan with a follow-up in 48 hours.`
        : 'Please select a patient to view their risk assessment and recommendations.';
    }
    
    if (lowerQuery.includes('medication') || lowerQuery.includes('compliance')) {
      return patientName
        ? `${patientName} shows strong medication adherence at 92%. Recent data indicates consistent morning and evening doses. One missed night dose on Sunday - consider a WhatsApp reminder adjustment.`
        : 'Select a patient to review their medication compliance patterns.';
    }
    
    if (lowerQuery.includes('pain') || lowerQuery.includes('trend')) {
      return patientName
        ? `${patientName}'s pain levels are trending positively. Weekly average decreased from 5.2 to 4.1. The slight uptick on Sunday may correlate with increased physical activity. Monitor for the next 24 hours.`
        : 'Choose a patient to analyze their pain trajectory and recovery patterns.';
    }

    if (lowerQuery.includes('summary') || lowerQuery.includes('overview')) {
      return patientName
        ? `📊 Quick Summary for ${patientName}:\n• Recovery Stage: On track\n• Pain Management: Effective\n• Medication: 92% compliance\n• Risk Level: Low-Moderate\n• Next Action: Routine check-in in 48h\n• AI Confidence: 94%`
        : 'Select a patient for a comprehensive AI-generated summary.';
    }

    return patientName
      ? `I'm analyzing ${patientName}'s data. Based on current trends, recovery is progressing well. Pain levels are within expected range, medication compliance is strong, and there are no immediate red flags. Would you like specific insights on risk factors, medication patterns, or recovery timeline?`
      : 'I can help you analyze patient data, identify trends, and provide clinical insights. Select a patient from the dropdown to get started, or ask me about general analytics.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card 
      className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} rounded-[18px] card-hover-lift transition-all duration-400 flex flex-col relative overflow-hidden ${
        isExpanded ? 'fixed inset-4 z-50' : 'p-6'
      }`}
      style={{ height: isExpanded ? 'calc(100vh - 2rem)' : '550px' }}
    >
      <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full ai-pulse-halo"
                style={{
                  background: 'radial-gradient(circle, rgba(91, 199, 255, 0.3) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
              />
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#5BC7FF] to-[#37E29D] flex items-center justify-center glow-pulse">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="gradient-text-glow flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
                CareSynth AI Companion
                <Sparkles className="w-4 h-4 text-[#5BC7FF]" />
              </h3>
              <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {selectedPatientName ? `Analyzing ${selectedPatientName}` : 'Ready to assist'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <APIBadge endpoint="/ai/insight-query" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-lg ${isDarkTheme ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {[
            'Show risk trend',
            'Medication summary',
            'Pain analysis'
          ].map((action, idx) => (
            <button
              key={idx}
              onClick={() => setInput(action)}
              className={`px-3 py-1 rounded-lg text-xs transition-all animate-in fade-in ${
                isDarkTheme
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-[#5BC7FF]'
                  : 'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-[#0BAF85]'
              }`}
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: 500,
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex animate-in fade-in slide-in-from-bottom-2 ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <div
                className={`max-w-[85%] rounded-xl p-3 ${
                  msg.sender === 'doctor'
                    ? isDarkTheme
                      ? 'bg-gradient-to-r from-[#1C8B82] to-[#37E29D] text-white'
                      : 'gradient-accent text-white'
                    : isDarkTheme
                    ? 'bg-white/[0.05] border border-white/[0.12]'
                    : 'bg-gray-100 border border-gray-200'
                }`}
              >
                <p
                  className={`text-sm whitespace-pre-line ${
                    msg.sender === 'doctor' ? 'text-white' : 'gradient-text'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  {msg.message}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'doctor' ? 'text-white/70' : 'gradient-text-muted'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
              <div className={`rounded-xl p-3 flex items-center gap-2 ${
                isDarkTheme
                  ? 'bg-white/[0.05] border border-white/[0.12]'
                  : 'bg-gray-100 border border-gray-200'
              }`}>
                <Loader2 className="w-4 h-4 animate-spin text-[#5BC7FF]" />
                <span className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  AI is analyzing...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`flex gap-2 border-t pt-3 ${isDarkTheme ? 'border-white/[0.08]' : 'border-gray-200'}`}>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={selectedPatientName ? `Ask about ${selectedPatientName}...` : "Ask AI anything..."}
            className={`flex-1 min-h-[44px] max-h-[100px] resize-none rounded-xl ${
              isDarkTheme
                ? 'bg-white/[0.03] border-white/[0.12] text-white placeholder:text-[#6B7280]'
                : 'bg-white border-gray-300 placeholder:text-gray-400'
            }`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="btn-gradient-shift text-white rounded-xl px-4 h-[44px]"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* API Endpoint Label */}
        <div className="mt-2">
          <APIBadge endpoint="POST /ai/insight-query • GET /ai/contextual-summary/{patientId}" variant="full" />
        </div>
      </div>
    </Card>
  );
}
