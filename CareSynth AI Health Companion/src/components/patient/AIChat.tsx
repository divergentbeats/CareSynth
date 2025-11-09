import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ChatMessage } from '../../lib/mockData';
import { api } from '../../lib/firestoreStubs';
import { APIBadge } from '../common/APIBadge';
import { useTheme } from '../../lib/ThemeContext';

interface AIChatProps {
  initialMessages: ChatMessage[];
}

export function AIChat({ initialMessages }: AIChatProps) {
  const { isDarkTheme } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'patient',
      message: input,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));
    const aiResponse = await api.getAIResponse(input, {});

    const aiMessage: ChatMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'ai',
      message: aiResponse.response,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400 flex flex-col`} style={{ height: '500px' }}>
      <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#37E29D] flex items-center justify-center glow-pulse">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
                AI Health Companion
              </h3>
              <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Available 24/7
              </p>
            </div>
          </div>
          <APIBadge endpoint="/api/ai/chat" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 ${msg.sender === 'patient' ? 'flex-row-reverse' : ''}`}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm border ${
                  isDarkTheme ? 'border-white/[0.12]' : 'border-gray-200'
                } ${
                  msg.sender === 'patient'
                    ? 'bg-[#5BC7FF]/20'
                    : 'bg-gradient-to-br from-[#1C8B82] to-[#37E29D]'
                }`}
              >
                {msg.sender === 'patient' ? (
                  <User className="w-4 h-4 text-[#5BC7FF]" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex-1 max-w-[80%] ${
                  msg.sender === 'patient' ? 'text-right' : ''
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-2xl backdrop-blur-sm ${
                    msg.sender === 'patient'
                      ? 'bg-[#5BC7FF]/20 border border-[#5BC7FF]/30'
                      : isDarkTheme
                      ? 'bg-white/[0.05] border border-white/[0.12]'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  <p className="text-sm whitespace-pre-wrap gradient-text">{msg.message}</p>
                </div>
                <p className="text-xs gradient-text-muted mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1C8B82] to-[#37E29D] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className={`p-4 rounded-2xl backdrop-blur-sm border ${
                isDarkTheme
                  ? 'bg-white/[0.05] border-white/[0.12]'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#37E29D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#37E29D] rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  <div className="w-2 h-2 bg-[#37E29D] rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about your recovery..."
            className={`flex-1 resize-none rounded-xl border focus:border-[#37E29D] ${
              isDarkTheme
                ? 'bg-white/[0.05] border-white/[0.12] text-[#EAEAEA] placeholder:text-[#A7B0B5]'
                : 'bg-white border-gray-300 placeholder:text-gray-400'
            }`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            rows={2}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="btn-gradient-shift text-white rounded-xl px-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            {isTyping ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
