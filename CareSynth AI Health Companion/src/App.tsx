import { useState } from 'react';
import { Heart, Menu, X, Moon, Sun, CheckCircle2, TrendingUp, Clock, Pill, MessageSquare, Brain } from 'lucide-react';
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
import { DailyQuestionsCard } from './components/patient/DailyQuestionsCard';
import { KiranPrescriptionPage } from './components/patient/KiranPrescriptionPage';

// Prescription Onboarding Modal
import PrescriptionOnboardingModal from './components/patient/PrescriptionOnboardingModal';

// Mock Data
import { currentPatient, prescriptionSummary, conflictsToday, medications, timeline } from './lib/mockData';

// Theme Context
import { ThemeContext } from './lib/ThemeContext';

// Patient Context
import { PatientProvider, usePatient } from './lib/PatientContext';

type DashboardSection = 'recovery' | 'metrics' | 'timeline' | 'medication' | 'assistant' | 'contact';

function DashboardContent({ showOnboarding, setShowOnboarding }: { showOnboarding: boolean; setShowOnboarding: (show: boolean) => void }) {
  const { patientProfile } = usePatient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [painLevel, setPainLevel] = useState(currentPatient.painLevel);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeSection, setActiveSection] = useState<DashboardSection>('recovery');
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showPrescriptionPage, setShowPrescriptionPage] = useState(false);

  // Show prescription page if requested
  if (showPrescriptionPage) {
    return <KiranPrescriptionPage onBack={() => setShowPrescriptionPage(false)} />;
  }

  // Use patient profile data if available, otherwise fallback to mock data
  const currentPrescriptionSummary = patientProfile?.prescriptionSummary || prescriptionSummary;
  const currentPatientData = patientProfile?.patient ? { ...patientProfile.patient, painLevel: painLevel, lastCheckIn: 'Just updated', photo: currentPatient.photo, status: currentPatient.status, surgery: patientProfile.patient.surgery || 'Unknown', dayPostOp: patientProfile.patient.dayPostOp || 0, dayOfIllness: patientProfile.patient.dayOfIllness || 0 } : currentPatient;

  const handlePainUpdate = (newPainLevel: number) => {
    setPainLevel(newPainLevel);
  };

  const handleButtonClick = (buttonId: string, callback?: () => void) => {
    setClickedButton(buttonId);
    if (callback) {
      setTimeout(callback, 100);
    }
    setTimeout(() => setClickedButton(null), 600);
  };

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
    const styles = `
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-10px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .section-container {
        animation: fadeInUp 0.6s ease-out;
      }

      .card-wrapper {
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .card-wrapper:hover {
        transform: translateY(-4px);
      }

      .shine-effect {
        position: relative;
        overflow: hidden;
      }

      .shine-effect::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.4) 50%,
          transparent 100%
        );
        animation: shimmer 0.6s ease-in-out;
        z-index: 10;
        pointer-events: none;
      }

      .section-title {
        animation: slideIn 0.5s ease-out;
      }
    `;

    return (
      <>
        <style>{styles}</style>
        {(() => {
          switch (activeSection) {
            case 'recovery':
              return (
                <div className="section-container space-y-8">
                  <div className="mb-8 section-title">
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
                    <div className={`card-wrapper ${clickedButton === 'recovery-1' ? 'shine-effect' : ''}`}>
                      <div className={`${isDarkTheme ? 'bg-[#1A2F2B] border border-white/5' : 'bg-white/50 border border-white/30'} rounded-2xl p-6 backdrop-blur-md`}>
                        <PrescriptionSummaryCard {...currentPrescriptionSummary} onViewDetails={() => setShowPrescriptionPage(true)} />
                      </div>
                    </div>
                    <div className={`card-wrapper ${clickedButton === 'recovery-2' ? 'shine-effect' : ''}`}>
                      <div className={`${isDarkTheme ? 'bg-[#1A2F2B] border border-white/5' : 'bg-white/50 border border-white/30'} rounded-2xl p-6 backdrop-blur-md`}>
                        <RealityCheckCard patient={currentPatientData} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            case 'metrics':
              return (
                <div className="section-container space-y-8">
                  <div className="mb-8 section-title">
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
                    <div className={`card-wrapper ${clickedButton === 'metrics-1' ? 'shine-effect' : ''}`}>
                      <div className={`${isDarkTheme ? 'bg-[#1A2F2B] border border-white/5' : 'bg-white/50 border border-white/30'} rounded-2xl p-6 backdrop-blur-md`}>
                        <ConflictDetectionCard conflicts={conflictsToday} />
                      </div>
                    </div>
                    <div className={`card-wrapper ${clickedButton === 'metrics-2' ? 'shine-effect' : ''}`}>
                      <div className={`${isDarkTheme ? 'bg-[#1A2F2B] border border-white/5' : 'bg-white/50 border border-white/30'} rounded-2xl p-6 backdrop-blur-md`}>
                        {patientProfile?.dailyCheckInQuestions ? (
                          <DailyQuestionsCard questions={patientProfile.dailyCheckInQuestions} />
                        ) : (
                          <DailyCheckIn onCheckInComplete={handlePainUpdate} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            case 'timeline':
              return (
                <div className="section-container space-y-8">
                  <div className="mb-8 section-title">
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
                  <div className={`card-wrapper ${clickedButton === 'timeline' ? 'shine-effect' : ''}`}>
                    <div className={`${isDarkTheme ? 'bg-[#1A2F2B] border border-white/5' : 'bg-white/50 border border-white/30'} rounded-2xl p-6 backdrop-blur-md`}>
                      <RecoveryTimeline events={patientProfile?.prescriptionSummary?.complicationsTimeline ? patientProfile.prescriptionSummary.complicationsTimeline.map((comp: any, index: number) => ({
                        id: `comp-${index}`,
                        title: comp.timeframe,
                        description: comp.complications.join(', '),
                        date: comp.timeframe,
                        type: 'alert' as const,
                        completed: false
                      })) : timeline} />
                    </div>
                  </div>
                </div>
              );
            case 'medication':
              return (
                <div className="section-container space-y-8">
                  <div className="mb-8 section-title">
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
                  <div className={`card-wrapper ${clickedButton === 'medication' ? 'shine-effect' : ''}`}>
                    <div className={`${isDarkTheme ? 'bg-[#1A2F2B] border border-white/5' : 'bg-white/50 border border-white/30'} rounded-2xl p-6 backdrop-blur-md`}>
                      <MedicationTracker medications={medications} />
                    </div>
                  </div>
                </div>
              );
            case 'assistant':
              return (
                <div className="section-container space-y-8">
                  <div className="mb-8 section-title">
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
                  <div className={`card-wrapper ${clickedButton === 'assistant' ? 'shine-effect' : ''}`}>
                    <div className={`${isDarkTheme ? 'bg-[#1A2F2B] border border-white/5' : 'bg-white/50 border border-white/30'} rounded-2xl p-12 backdrop-blur-md text-center`}>
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
                        onClick={() => handleButtonClick('assistant-btn', () => window.open('AI_bot.html', '_blank'))}
                        className={`bg-gradient-to-r from-[#37E29D] to-[#1C8B82] hover:from-[#2FCA89] hover:to-[#157770] text-white rounded-xl px-6 py-2 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-sm ${
                          clickedButton === 'assistant-btn' ? 'shine-effect' : ''
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif', position: 'relative' }}
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
                <div className="section-container space-y-8">
                  <div className="mb-8 section-title">
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
                  <div className={`card-wrapper ${clickedButton === 'contact' ? 'shine-effect' : ''}`}>
                    <div className={`${isDarkTheme ? 'bg-[#1A2F2B] border border-white/5' : 'bg-white/50 border border-white/30'} rounded-2xl p-12 backdrop-blur-md`}>
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
                        onClick={() => handleButtonClick('contact-btn', () => window.open('https://wa.me/918044478899?text=Hello%20Doctor,%20I%20need%20medical%20advice%20regarding%20my%20recovery', '_blank'))}
                        className={`bg-gradient-to-r from-[#37E29D] to-[#1C8B82] hover:from-[#2FCA89] hover:to-[#157770] text-white rounded-xl px-6 py-2 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-sm ${
                          clickedButton === 'contact-btn' ? 'shine-effect' : ''
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif', position: 'relative' }}
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
        })()}
      </>
    );
  };

  return (
    <div className="min-h-screen relative transition-all duration-400 flex flex-col lg:flex-row bg-gradient-to-br from-[#0E1113] to-[#1C1F22]">
      {/* Blurred Mint/Teal Light Glow - Top Left */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-[#37E29D] opacity-[0.15] blur-[100px] pointer-events-none transition-opacity duration-400" />

      {/* ✨ Animated Background Drift - Mint to Blue Parallax */}
      <div className="fixed top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#37E29D] to-[#5BC7FF] opacity-[0.08] blur-[120px] pointer-events-none background-drift" />

      {/* Neural Grid Pattern - Dark Mode Only */}
      <div className="fixed inset-0 neural-grid-pattern pointer-events-none opacity-100" />

      {/* Floating Particles - Dark Mode Only - CSS Animation */}
      {[...Array(6)].map((_, i) => (
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
      <aside className="hidden lg:flex flex-col w-64 border-r backdrop-blur-md transition-all duration-500 border-white/10 bg-[#0E1113]/80">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center glow-mint-dark">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h2 className="font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                CareSynth
              </h2>
              <p className="text-xs text-[#6B7280]" style={{ fontFamily: 'Inter, sans-serif' }}>
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
                    ? 'bg-gradient-to-r from-[#37E29D]/20 to-[#5BC7FF]/20 text-[#37E29D] border border-[#37E29D]/30'
                    : 'text-[#A0A0A0] hover:bg-white/5'
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
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 bg-white/10 hover:bg-white/15 text-[#37E29D]"
          >
            <Moon className="w-4 h-4" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>Dark</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b backdrop-blur-md transition-all duration-500 border-white/10 bg-[#0E1113]/80">
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
                <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center glow-mint-dark">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: '#E8E8E8' }}>
                    CareSynth
                  </h1>
                  <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#A0A0A0' }}>
                    Patient Dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Theme Toggle - Mobile Only */}
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 bg-white/10 border border-white/20 hover:bg-white/15"
            >
              <Moon className="w-5 h-5 text-[#37E29D]" />
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
                        ? 'bg-gradient-to-r from-[#37E29D]/20 to-[#5BC7FF]/20 text-[#37E29D]'
                        : 'text-[#A0A0A0]'
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
        <footer className="border-t transition-all duration-500 border-white/10 bg-[#0E1113]/80">
          <div className="px-4 lg:px-8 py-6 text-center">
            <p className="text-sm text-[#A0A0A0]">
              CareSynth AI Health Companion • Powered by AI & WhatsApp Automation
            </p>
            <p className="text-xs mt-2 text-[#6B7280]">
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
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userName, setUserName] = useState('');
  const [patientProfile, setPatientProfile] = useState<any>(null);

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setShowOnboarding(true);

    // Auto-load profile based on username
    if (name.toLowerCase().includes('kiran')) {
      fetch('/data/kiran.json')
        .then(res => res.json())
        .then(data => {
          setPatientProfile(data);
        })
        .catch(err => console.log('Kiran profile not found'));
    } else if (name.toLowerCase().includes('sahana')) {
      fetch('/data/sahana.json')
        .then(res => res.json())
        .then(data => {
          setPatientProfile(data);
        })
        .catch(err => console.log('Sahana profile not found'));
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <PatientProvider value={{
      patientProfile: patientProfile,
      setPatientProfile: setPatientProfile,
      dailyQuestions: patientProfile?.dailyCheckInQuestions || [],
      setDailyQuestions: () => {},
      isAnalyzing: false,
      setIsAnalyzing: () => {}
    }}>
      <ThemeContext.Provider value={{ isDarkTheme: true }}>
        <DashboardContent showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} />
        <Toaster position="top-right" />

        {/* Prescription Onboarding Modal */}
        <PrescriptionOnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={() => setShowOnboarding(false)}
        />
      </ThemeContext.Provider>
    </PatientProvider>
  );
}
