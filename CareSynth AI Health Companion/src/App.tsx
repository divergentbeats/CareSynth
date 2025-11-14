import { useState } from 'react';
import { Heart, Menu, X, Moon, Sun, CheckCircle2, TrendingUp, AlertCircle, Clock, Pill, MessageSquare, Brain } from 'lucide-react';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';

// Login Component
import { Login } from './components/Login';

// Patient Cards
import { PrescriptionSummaryCard } from './components/patient/PrescriptionSummaryCard';
import { RealityCheckCard } from './components/patient/RealityCheckCard';
import { ConflictDetectionCard } from './components/patient/ConflictDetectionCard';
import { MedicationTracker } from './components/patient/MedicationTracker';
import { RecoveryTimeline } from './components/patient/RecoveryTimeline';
import { DailyCheckIn } from './components/patient/DailyCheckIn';

// Prescription Onboarding Modal
import PrescriptionOnboardingModal from './components/patient/PrescriptionOnboardingModal';

// Mock Data
import { currentPatient, prescriptionSummary, conflictsToday, medications, timeline } from './lib/mockData';

// Theme Context
import { ThemeContext } from './lib/ThemeContext';

type DashboardSection = 'recovery' | 'metrics' | 'timeline' | 'medication' | 'assistant' | 'contact';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [painLevel, setPainLevel] = useState(currentPatient.painLevel);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeSection, setActiveSection] = useState<DashboardSection>('recovery');

  const handlePainUpdate = (newPainLevel: number) => {
    setPainLevel(newPainLevel);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowOnboarding(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Section definitions
  const sections = [
    { id: 'recovery', label: 'Recovery Overview', icon: CheckCircle2 },
    { id: 'metrics', label: 'Health Metrics', icon: TrendingUp },
    { id: 'timeline', label: 'Recovery Timeline', icon: Clock },
    { id: 'medication', label: 'Medications', icon: Pill },
    { id: 'assistant', label: 'AI Assistant', icon: Brain },
    { id: 'contact', label: 'Message Doctor', icon: MessageSquare },
  ] as const;

  const renderContent = () => {
    switch (activeSection) {
      case 'recovery':
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 
                className="text-3xl font-bold mb-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: isDarkTheme ? '#E8E8E8' : '#0B1220',
                }}
              >
                Recovery Overview
              </h2>
              <div 
                className="h-1 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #37E29D 0%, transparent 100%)'
                }}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card-entrance card-entrance-delay-1 opacity-100 transition-opacity duration-300">
                <div className={`${isDarkTheme ? 'dashboard-dark-card' : 'glass-card'} rounded-2xl p-6 backdrop-blur-md`}>
                  <PrescriptionSummaryCard {...prescriptionSummary} />
                </div>
              </div>
              <div className="card-entrance card-entrance-delay-1 opacity-100 transition-opacity duration-300">
                <div className={`${isDarkTheme ? 'dashboard-dark-card' : 'glass-card'} rounded-2xl p-6 backdrop-blur-md`}>
                  <RealityCheckCard patient={currentPatient} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'metrics':
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 
                className="text-3xl font-bold mb-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: isDarkTheme ? '#E8E8E8' : '#0B1220',
                }}
              >
                Health Metrics & Monitoring
              </h2>
              <div 
                className="h-1 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #37E29D 0%, transparent 100%)'
                }}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card-entrance card-entrance-delay-2 opacity-100 transition-opacity duration-300">
                <div className={`${isDarkTheme ? 'dashboard-dark-card' : 'glass-card'} rounded-2xl p-6 backdrop-blur-md`}>
                  <ConflictDetectionCard conflicts={conflictsToday} />
                </div>
              </div>
              <div className="card-entrance card-entrance-delay-2 opacity-100 transition-opacity duration-300">
                <div className={`${isDarkTheme ? 'dashboard-dark-card' : 'glass-card'} rounded-2xl p-6 backdrop-blur-md`}>
                  <DailyCheckIn onCheckInComplete={handlePainUpdate} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'timeline':
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 
                className="text-3xl font-bold mb-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: isDarkTheme ? '#E8E8E8' : '#0B1220',
                }}
              >
                Recovery Timeline
              </h2>
              <div 
                className="h-1 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #37E29D 0%, transparent 100%)'
                }}
              />
            </div>
            <div className="card-entrance card-entrance-delay-3 opacity-100 transition-opacity duration-300">
              <div className={`${isDarkTheme ? 'dashboard-dark-card' : 'glass-card'} rounded-2xl p-6 backdrop-blur-md`}>
                <RecoveryTimeline events={timeline} />
              </div>
            </div>
          </div>
        );
      case 'medication':
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 
                className="text-3xl font-bold mb-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: isDarkTheme ? '#E8E8E8' : '#0B1220',
                }}
              >
                Medication Management
              </h2>
              <div 
                className="h-1 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #37E29D 0%, transparent 100%)'
                }}
              />
            </div>
            <div className="card-entrance card-entrance-delay-3 opacity-100 transition-opacity duration-300">
              <div className={`${isDarkTheme ? 'dashboard-dark-card' : 'glass-card'} rounded-2xl p-6 backdrop-blur-md`}>
                <MedicationTracker medications={medications} />
              </div>
            </div>
          </div>
        );
      case 'assistant':
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 
                className="text-3xl font-bold mb-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: isDarkTheme ? '#E8E8E8' : '#0B1220',
                }}
              >
                AI Health Assistant
              </h2>
              <div 
                className="h-1 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #37E29D 0%, transparent 100%)'
                }}
              />
            </div>
            <div className="card-entrance card-entrance-delay-1 opacity-100 transition-opacity duration-300">
              <div className={`${isDarkTheme ? 'dashboard-dark-card' : 'glass-card'} rounded-2xl p-12 backdrop-blur-md text-center`}>
                <div className="relative inline-block mb-6">
                  <div
                    className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-[#37E29D] to-[#1C8B82]"
                  >
                    <Brain className="w-12 h-12 text-white" fill="white" />
                  </div>
                </div>
                <h3 
                  className="text-2xl mb-3 font-semibold"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: isDarkTheme ? '#E8E8E8' : '#0B1220',
                  }}
                >
                  AI Medical Assistant
                </h3>
                <p 
                  className="mb-8 text-lg"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: isDarkTheme ? '#A0A0A0' : '#4B5563',
                  }}
                >
                  Get instant answers to your health questions with our AI-powered medical assistant. Available 24/7 for your convenience.
                </p>
                <Button
                  onClick={() => {
                    window.open('AI_bot.html', '_blank');
                  }}
                  className="bg-gradient-to-r from-[#37E29D] to-[#1C8B82] hover:from-[#2FCA89] hover:to-[#157770] text-white rounded-xl px-10 py-3 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Open AI Chat
                </Button>
                <div className={`grid grid-cols-2 gap-6 mt-10 pt-8 border-t ${isDarkTheme ? 'border-white/10' : 'border-black/10'}`}>
                  <div>
                    <div className="text-base font-semibold mb-2" style={{ color: isDarkTheme ? '#37E29D' : '#1C8B82' }}>
                      24/7 Support
                    </div>
                    <p className="text-sm" style={{ color: isDarkTheme ? '#A0A0A0' : '#4B5563' }}>
                      Always available when you need us
                    </p>
                  </div>
                  <div>
                    <div className="text-base font-semibold mb-2" style={{ color: isDarkTheme ? '#37E29D' : '#1C8B82' }}>
                      Expert Guidance
                    </div>
                    <p className="text-sm" style={{ color: isDarkTheme ? '#A0A0A0' : '#4B5563' }}>
                      Personalized medical advice
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 
                className="text-3xl font-bold mb-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: isDarkTheme ? '#E8E8E8' : '#0B1220',
                }}
              >
                Message Your Doctor
              </h2>
              <div 
                className="h-1 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #37E29D 0%, transparent 100%)'
                }}
              />
            </div>
            <div className="card-entrance opacity-100 transition-opacity duration-300">
              <div className={`${isDarkTheme ? 'dashboard-dark-card' : 'glass-card'} rounded-2xl p-12 backdrop-blur-md`}>
                <h3 
                  className="text-2xl font-semibold mb-4"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: isDarkTheme ? '#E8E8E8' : '#0B1220',
                  }}
                >
                  Direct Communication
                </h3>
                <p 
                  className="text-lg mb-8"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: isDarkTheme ? '#A0A0A0' : '#4B5563',
                  }}
                >
                  Send messages to your healthcare provider for personalized medical advice and support.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#37E29D] to-[#1C8B82] hover:from-[#2FCA89] hover:to-[#157770] text-white rounded-xl px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme }}>
      <div 
        data-theme={isDarkTheme ? 'dark' : 'light'}
        className={`min-h-screen relative transition-all duration-400 flex flex-col lg:flex-row ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-[#0E1113] to-[#1C1F22]' 
            : 'bg-gradient-to-br from-[#F7F9FB] to-[#FFFFFF]'
        }`}
      >
        {/* Blurred Mint/Teal Light Glow - Top Left */}
        <div className={`fixed -top-40 -left-40 w-96 h-96 rounded-full ${
          isDarkTheme ? 'bg-[#37E29D] opacity-[0.15]' : 'bg-[#37E29D] opacity-[0.06]'
        } blur-[100px] pointer-events-none transition-opacity duration-400`} />
        
        {/* ✨ Animated Background Drift - Mint to Blue Parallax */}
        <div className={`fixed top-1/4 right-1/4 w-[500px] h-[500px] rounded-full ${
          isDarkTheme ? 'bg-gradient-to-br from-[#37E29D] to-[#5BC7FF] opacity-[0.08]' : 'bg-gradient-to-br from-[#37E29D] to-[#5BC7FF] opacity-[0.04]'
        } blur-[120px] pointer-events-none background-drift`} />
        
        {/* Neural Grid Pattern - Dark Mode Only */}
        {isDarkTheme && (
          <div className="fixed inset-0 neural-grid-pattern pointer-events-none opacity-100" />
        )}
        
        {/* Floating Particles - Dark Mode Only - CSS Animation */}
        {isDarkTheme && [...Array(6)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="fixed w-2 h-2 rounded-full floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#1C8B82' : '#5BC7FF',
              opacity: 0.05,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        <Toaster position="top-right" />
        
        {/* SIDEBAR - Desktop Only */}
        <aside className={`hidden lg:flex flex-col w-64 border-r backdrop-blur-md transition-all duration-500 ${
          isDarkTheme 
            ? 'border-white/10 bg-[#0E1113]/80' 
            : 'border-white/30 bg-[#F7F9FB]/80'
        }`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b" style={{
            borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 gradient-accent rounded-lg flex items-center justify-center ${
                isDarkTheme ? 'glow-mint-dark' : 'glow-teal'
              }`}>
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h2 className={`font-semibold ${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  CareSynth
                </h2>
                <p className={`text-xs ${isDarkTheme ? 'text-[#6B7280]' : 'text-[#4B5563]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as DashboardSection)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? isDarkTheme
                        ? 'bg-gradient-to-r from-[#37E29D]/20 to-[#5BC7FF]/20 text-[#37E29D] border border-[#37E29D]/30'
                        : 'bg-gradient-to-r from-[#37E29D]/10 to-[#5BC7FF]/10 text-[#1C8B82] border border-[#37E29D]/20'
                      : isDarkTheme
                      ? 'text-[#A0A0A0] hover:bg-white/5'
                      : 'text-[#4B5563] hover:bg-black/5'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                    {section.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t" style={{
            borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-white/10 hover:bg-white/15 text-[#37E29D]'
                  : 'bg-black/10 hover:bg-black/15 text-[#1C8B82]'
              }`}
            >
              {isDarkTheme ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>Light</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className={`border-b backdrop-blur-md transition-all duration-500 ${
            isDarkTheme 
              ? 'border-white/10 bg-[#0E1113]/80' 
              : 'border-white/30 bg-[#F7F9FB]/80'
          }`}>
            <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 gradient-accent rounded-lg flex items-center justify-center ${
                    isDarkTheme ? 'glow-mint-dark' : 'glow-teal'
                  }`}>
                    <Heart className="w-6 h-6 text-white" fill="white" />
                  </div>
                  <div className="hidden md:block">
                    <h1 className="text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: isDarkTheme ? '#E8E8E8' : '#0B1220' }}>
                      CareSynth
                    </h1>
                    <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: isDarkTheme ? '#A0A0A0' : '#4B5563' }}>
                      Patient Dashboard
                    </p>
                  </div>
                </div>
              </div>

              {/* Theme Toggle - Mobile Only */}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`lg:hidden w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isDarkTheme
                    ? 'bg-white/10 border border-white/20 hover:bg-white/15'
                    : 'bg-white/60 border border-gray-200/50 hover:bg-white/80'
                }`}
              >
                {isDarkTheme ? (
                  <Moon className="w-5 h-5 text-[#37E29D]" />
                ) : (
                  <Sun className="w-5 h-5 text-[#1C8B82]" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden px-4 pb-4 space-y-2 animate-in fade-in">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id as DashboardSection);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? isDarkTheme
                            ? 'bg-gradient-to-r from-[#37E29D]/20 to-[#5BC7FF]/20 text-[#37E29D]'
                            : 'bg-gradient-to-r from-[#37E29D]/10 to-[#5BC7FF]/10 text-[#1C8B82]'
                          : isDarkTheme
                          ? 'text-[#A0A0A0]'
                          : 'text-[#4B5563]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span style={{ fontFamily: 'Poppins, sans-serif' }}>{section.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 px-4 lg:px-8 py-8 overflow-y-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4">
              {renderContent()}
            </div>
          </main>

          {/* Footer */}
          <footer className={`border-t transition-all duration-500 ${
            isDarkTheme
              ? 'border-white/10 bg-[#0E1113]/80'
              : 'border-white/30 bg-[#F7F9FB]/80'
          }`}>
            <div className="px-4 lg:px-8 py-6 text-center">
              <p className={`text-sm ${isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]'}`}>
                CareSynth AI Health Companion • Powered by AI & WhatsApp Automation
              </p>
              <p className={`text-xs mt-2 ${isDarkTheme ? 'text-[#6B7280]' : 'text-[#6B7280]'}`}>
                AI-powered by CareSynth Labs © 2025 • Demo prototype - Not for clinical use
              </p>
            </div>
          </footer>
        </div>

        {/* Prescription Onboarding Modal */}
        <PrescriptionOnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={() => setShowOnboarding(false)}
        />
      </div>
    </ThemeContext.Provider>
  );
}
