import React, { useState } from 'react';
import { CheckCircle, HelpCircle, MessageSquare } from 'lucide-react';
import { Card } from '../ui/card';
import { useTheme } from '../../lib/ThemeContext';

interface DailyQuestionsCardProps {
  questions: string[];
  onComplete?: (answers: { [key: string]: any }) => void;
}

export function DailyQuestionsCard({ questions, onComplete }: DailyQuestionsCardProps) {
  const { isDarkTheme } = useTheme();
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const primaryText = isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]';
  const secondaryText = isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]';

  const handleAnswer = (questionIndex: number, answer: any) => {
    const newAnswers = { ...answers, [questionIndex]: answer };
    setAnswers(newAnswers);

    if (questionIndex < questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      // All questions answered
      onComplete?.(newAnswers);
    }
  };

  const renderQuestionInput = (question: string, index: number) => {
    // Simple input type detection based on question content
    if (question.toLowerCase().includes('scale') || question.toLowerCase().includes('level') || question.toLowerCase().includes('rate')) {
      return (
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={(e) => handleAnswer(index, parseInt(e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      );
    } else if (question.toLowerCase().includes('temperature')) {
      return (
        <input
          type="number"
          step="0.1"
          placeholder="98.6"
          className={`w-full p-3 rounded-lg border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-white/[0.05] border-[#37E29D]/20 text-[#E8E8E8] placeholder:text-[#A0A0A0]'
              : 'bg-white border-gray-200 text-[#0B1220] placeholder:text-[#4B5563]'
          } focus:border-[#37E29D] focus:ring-[#37E29D]/30`}
          onChange={(e) => handleAnswer(index, parseFloat(e.target.value))}
        />
      );
    } else if (question.toLowerCase().includes('yes') || question.toLowerCase().includes('have you')) {
      return (
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer(index, true)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              answers[index] === true
                ? 'bg-[#37E29D] text-white'
                : isDarkTheme
                ? 'bg-white/[0.05] border border-[#37E29D]/20 text-[#E8E8E8] hover:bg-[#37E29D]/20'
                : 'bg-white border border-gray-200 text-[#0B1220] hover:bg-[#37E29D]/10'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(index, false)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              answers[index] === false
                ? 'bg-[#37E29D] text-white'
                : isDarkTheme
                ? 'bg-white/[0.05] border border-[#37E29D]/20 text-[#E8E8E8] hover:bg-[#37E29D]/20'
                : 'bg-white border border-gray-200 text-[#0B1220] hover:bg-[#37E29D]/10'
            }`}
          >
            No
          </button>
        </div>
      );
    } else {
      return (
        <textarea
          placeholder="Type your answer here..."
          rows={3}
          className={`w-full p-3 rounded-lg border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-white/[0.05] border-[#37E29D]/20 text-[#E8E8E8] placeholder:text-[#A0A0A0]'
              : 'bg-white border-gray-200 text-[#0B1220] placeholder:text-[#4B5563]'
          } focus:border-[#37E29D] focus:ring-[#37E29D]/30`}
          onChange={(e) => handleAnswer(index, e.target.value)}
        />
      );
    }
  };

  return (
    <Card className={`w-full rounded-2xl p-6 lg:p-8 ${isDarkTheme ? 'bg-white/[0.06] backdrop-blur-xl border-[#5BC7FF]/20' : 'bg-white shadow-sm border-gray-200'} border card-hover-lift transition-all duration-400`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className={`text-3xl lg:text-4xl font-semibold ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
          Daily Check-In
        </h2>
        <p className={`text-lg ${secondaryText} flex items-center gap-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
          <MessageSquare className="w-5 h-5" />
          AI-generated personalized questions
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-[#37E29D] h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <HelpCircle className="w-6 h-6 text-[#37E29D] mt-1 flex-shrink-0" />
          <h3 className={`text-lg font-medium ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            {questions[currentQuestion]}
          </h3>
        </div>

        {renderQuestionInput(questions[currentQuestion], currentQuestion)}
      </div>

      {/* Question Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentQuestion === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#37E29D]/10 text-[#37E29D]'
          }`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Previous
        </button>

        <div className="flex gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentQuestion
                  ? 'bg-[#37E29D]'
                  : index < currentQuestion
                  ? 'bg-[#37E29D]/50'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
            } else {
              onComplete?.(answers);
            }
          }}
          className="px-4 py-2 bg-[#37E29D] text-white rounded-lg font-medium hover:bg-[#2FCA89] transition-all duration-300"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {currentQuestion < questions.length - 1 ? 'Next' : 'Complete'}
        </button>
      </div>

      {/* Completion Status */}
      {Object.keys(answers).length === questions.length && (
        <div className="mt-6 p-4 bg-[#37E29D]/10 rounded-lg border border-[#37E29D]/20">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#37E29D]" />
            <span className={`font-medium ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Daily check-in completed!
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
