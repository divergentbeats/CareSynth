import { useState } from 'react';
import { Bot, Sparkles, MessageCircle, Brain } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ChatMessage } from '../../lib/mockData';
import { APIBadge } from '../common/APIBadge';
import { useTheme } from '../../lib/ThemeContext';

interface AIChatProps {
  initialMessages: ChatMessage[];
}

export function AIChat({ initialMessages }: AIChatProps) {
  const { isDarkTheme } = useTheme();

  const handleClick = () => {
    window.location.href = 'CareSynth AI Health Companion\\public\\AI_bot.html';
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400 flex items-center justify-center`} style={{ height: '500px' }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(55, 226, 157, 0.5), 0 0 40px rgba(55, 226, 157, 0.3); }
          50% { box-shadow: 0 0 30px rgba(55, 226, 157, 0.8), 0 0 60px rgba(55, 226, 157, 0.5); }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes sparkle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(90deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          75% { transform: translateY(-5px) rotate(270deg); }
        }

        @keyframes brain-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .ai-button {
          position: relative;
          overflow: hidden;
          animation: float 3s ease-in-out infinite;
        }

        .ai-button:hover {
          animation: float 3s ease-in-out infinite, pulse-glow 2s ease-in-out infinite;
          transform: scale(1.05);
        }

        .bot-icon-wrapper {
          position: relative;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(55, 226, 157, 0.3), rgba(91, 199, 255, 0.3));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: rotate 8s linear infinite;
          box-shadow: 0 4px 15px rgba(55, 226, 157, 0.4);
          border: 2px solid rgba(55, 226, 157, 0.5);
        }

        .ai-button:hover .bot-icon-wrapper {
          animation: rotate 3s linear infinite;
          box-shadow: 0 6px 20px rgba(55, 226, 157, 0.6);
        }

        .bot-icon {
          animation: brain-pulse 2s ease-in-out infinite;
          color: #37E29D;
        }

        .sparkle-1, .sparkle-2 {
          position: absolute;
          animation: sparkle-float 4s ease-in-out infinite;
        }

        .sparkle-1 {
          top: -8px;
          right: -8px;
          animation-delay: 0s;
        }

        .sparkle-2 {
          bottom: -8px;
          left: -8px;
          animation-delay: 2s;
        }

        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }

        .ai-button:hover .shimmer-overlay {
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .text-glow {
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        .ai-button:hover .text-glow {
          text-shadow: 0 0 20px rgba(255,255,255,0.8);
        }

        .subtitle-glow {
          text-shadow: 0 0 5px rgba(55, 226, 157, 0.3);
        }
      `}</style>

      <div className="text-center space-y-6">
        {/* Header */}
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <div className="relative inline-block mb-4">
            {/* Animated Pulsing Ring Behind Icon */}
            <div
              className="absolute inset-0 rounded-2xl pulse-ring"
              style={{ background: '#37E29D' }}
            />

            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-[#37E29D] to-[#1C8B82] transition-transform hover:scale-105"
            >
              <Brain className="w-10 h-10 text-white" fill="white" />
            </div>
          </div>

          <h3 className="text-2xl mb-2 flex items-center justify-center gap-2 luxury-spacing text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
            AI Medical Assistant
            {/* Animated AI Spark */}
            <div className="sparkle-rotate">
              <Sparkles className="w-5 h-5 text-[#37E29D]" />
            </div>
          </h3>
          <p className="text-[#A0A0A0] subtitle-glow" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            Get instant answers to your health questions
          </p>
        </div>

        {/* Enhanced Button */}
        <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '0.2s' }}>
          <Button
            onClick={handleClick}
            className="ai-button btn-gradient-shift text-white rounded-xl px-8 py-6 text-lg flex items-center gap-4 relative group"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            <div className="shimmer-overlay" />

            <div className="bot-icon-wrapper relative">
              <Bot className="bot-icon w-7 h-7 relative z-10" />

              {/* Floating Sparkles */}
              <Sparkles className="sparkle-1 w-3 h-3 text-[#FFD580] absolute" />
              <Sparkles className="sparkle-2 w-3 h-3 text-[#5BC7FF] absolute" />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-glow relative z-10">Open AI Medical Chat</span>
              <span className="text-xs opacity-80 relative z-10" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                24/7 Health Support
              </span>
            </div>

            <MessageCircle className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Features List */}
        <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-2 gap-3 text-xs text-[#A0A0A0]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#37E29D]"></div>
              <span>Symptom Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#5BC7FF]"></div>
              <span>Medication Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FFD580]"></div>
              <span>Recovery Tips</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#37E29D]"></div>
              <span>Doctor Connection</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
