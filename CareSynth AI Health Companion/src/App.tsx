import { useState, useEffect } from 'react';
import { Heart, Menu, X, Moon, Sun, CheckCircle2, TrendingUp, Clock, Pill, MessageSquare, Brain } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './components/ui/dialog';
import { MessageDoctor } from './components/patient/MessageDoctor';
import { DoctorAIChat } from './components/doctor/DoctorAIChat';
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
// import { DailyQuestionsCard } from './components/patient/DailyQuestionsCard';
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




// ... (existing imports)

// Updated DashboardContent
function DashboardContent({ showOnboarding, setShowOnboarding, onLogout }: { showOnboarding: boolean; setShowOnboarding: (show: boolean) => void; onLogout: () => void }) {
  const { patientProfile } = usePatient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<DashboardSection>('recovery');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showDoctorChat, setShowDoctorChat] = useState(false);

  const currentPatientData = currentPatient;

  const sections = [
    { id: 'recovery', label: 'Recovery Status', icon: Heart },
    { id: 'metrics', label: 'Health Metrics', icon: TrendingUp },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'medication', label: 'Medications', icon: Pill },
    { id: 'assistant', label: 'AI Assistant', icon: Brain },
    { id: 'contact', label: 'Doctor Contact', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'recovery':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#E8E8E8] mb-4">Recovery Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RealityCheckCard patient={currentPatientData} />
              <ConflictDetectionCard />
            </div>
            <DailyCheckIn onCheckInComplete={() => { }} />
          </div>
        );
      case 'metrics':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#E8E8E8] mb-4">Health Metrics</h2>
            <DailyCheckIn onCheckInComplete={() => { }} />
          </div>
        );
      case 'timeline':
        return <RecoveryTimeline events={timeline} />;
      case 'medication':
        return (
          <div className="space-y-6">
            <PrescriptionSummaryCard />
            <MedicationTracker medications={medications} />
          </div>
        );
      case 'assistant':
        return (
          <div className="h-[600px] bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center text-center">
            <Brain className="w-16 h-16 text-[#37E29D] mb-4" />
            <h3 className="text-xl text-[#E8E8E8] font-medium mb-2">AI Health Assistant</h3>
            <p className="text-[#A0A0A0] max-w-md">Use the "Doctor Contact" tab to chat with your AI assistant or message your doctor directly.</p>
            <Button
              onClick={() => setActiveSection('contact')}
              className="mt-6 bg-[#37E29D]/20 text-[#37E29D] hover:bg-[#37E29D]/30"
            >
              Go to Contact
            </Button>
          </div>
        );
      case 'contact':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
            <MessageDoctor patient={currentPatientData} />
            <DoctorAIChat selectedPatientName={currentPatientData.name} />
          </div>
        );
      default:
        return <div className="text-white">Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen relative transition-all duration-400 flex flex-col lg:flex-row bg-gradient-to-br from-[#0E1113] to-[#1C1F22]">
      {/* ... (background effects) ... */}

      {/* SIDEBAR - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 border-r backdrop-blur-md transition-all duration-500 border-white/10 bg-[#0E1113]/80">
        {/* ... (Header) ... */}

        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            {/* ... (Logo) ... */}
            <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center glow-mint-dark">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h2 className="font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                CareSynth
              </h2>
              <p className="text-xs text-[#6B7280]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Patient View
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
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

        {/* ... (Footer) ... */}
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
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between relative">
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

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Mobile toggles could go here */}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 bg-white/10 border border-white/20 hover:bg-white/15"
              >
                <Moon className="w-5 h-5 text-[#37E29D]" />
              </button>
            </div>

            {/* Logout */}
            <Button
              onClick={onLogout}
              className="absolute right-4 top-4 rounded-xl btn-gradient-shift text-white"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              Logout
            </Button>
          </div>
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
          </div>
        </footer>
      </div>

      {/* Dialogs and Modals */}
      <Dialog open={showDoctorChat} onOpenChange={setShowDoctorChat}>
        {/* ... dialog content ... */}
        <DialogContent className="max-w-4xl">
          <DialogTitle className="gradient-text-glow">Message Your Doctor</DialogTitle>
          <DialogDescription>Start a conversation and attach an AI summary if needed.</DialogDescription>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MessageDoctor patient={currentPatientData} />
            <DoctorAIChat selectedPatientName={currentPatientData.name} />
          </div>
        </DialogContent>
      </Dialog>

      <PrescriptionOnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={() => setShowOnboarding(false)}
      />
    </div>
  );
}

// ... (rest of file)


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try { return localStorage.getItem('cs_isLoggedIn') === 'true'; } catch { return false; }
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userName, setUserName] = useState<string>(() => {
    try { return localStorage.getItem('cs_userName') || ''; } catch { return ''; }
  });
  const [patientProfile, setPatientProfile] = useState<any>(() => {
    try {
      const raw = localStorage.getItem('cs_patientProfile');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Persist patient profile updates
  useEffect(() => {
    try {
      if (patientProfile) {
        localStorage.setItem('cs_patientProfile', JSON.stringify(patientProfile));
      }
    } catch { }
  }, [patientProfile]);

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setShowOnboarding(true);
    try {
      localStorage.setItem('cs_isLoggedIn', 'true');
      localStorage.setItem('cs_userName', name);
    } catch { }

    // Auto-load profile based on username
    if (name.toLowerCase().includes('kiran')) {
      fetch('/data/kiran.json')
        .then(res => res.json())
        .then(data => {
          setPatientProfile(data);
          try { localStorage.setItem('cs_patientProfile', JSON.stringify(data)); } catch { }
        })
        .catch(err => console.log('Kiran profile not found'));
    } else if (name.toLowerCase().includes('sahana')) {
      fetch('/data/sahana.json')
        .then(res => res.json())
        .then(data => {
          setPatientProfile(data);
          try { localStorage.setItem('cs_patientProfile', JSON.stringify(data)); } catch { }
        })
        .catch(err => console.log('Sahana profile not found'));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowOnboarding(false);
    try {
      localStorage.setItem('cs_isLoggedIn', 'false');
      localStorage.removeItem('cs_userName');
      localStorage.removeItem('cs_patientProfile');
    } catch { }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <PatientProvider value={{
      patientProfile: patientProfile,
      setPatientProfile: setPatientProfile,
      dailyQuestions: patientProfile?.dailyCheckInQuestions || [],
      setDailyQuestions: () => { },
      isAnalyzing: false,
      setIsAnalyzing: () => { }
    }}>
      <ThemeContext.Provider value={{ isDarkTheme: true }}>
        <DashboardContent showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} onLogout={handleLogout} />
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
