import { useState } from 'react';
import { Bot } from 'lucide-react';
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
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: rotate 8s linear infinite;
          box-shadow: 0 4px 15px rgba(55, 226, 157, 0.4);
        }
        
        .ai-button:hover .bot-icon-wrapper {
          animation: rotate 3s linear infinite;
        }
        
        .bot-icon {
          animation: float 2s ease-in-out infinite;
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
      `}</style>
      
      <Button
        onClick={handleClick}
        className="ai-button btn-gradient-shift text-white rounded-xl px-8 py-6 text-lg flex items-center gap-4"
        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
      >
        <div className="shimmer-overlay" />
        
        <div className="bot-icon-wrapper">
          <Bot className="bot-icon w-6 h-6 relative z-10" />
        </div>
        
        <span className="text-glow relative z-10">Open AI Chat</span>
      </Button>
    </Card>
  );
}