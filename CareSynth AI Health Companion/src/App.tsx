import { useState } from 'react';
import { Heart, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';

// Login Component
import { Login } from './components/Login';

// Patient Dashboard
import { PatientDashboard } from './components/patient/PatientDashboard';

// Prescription Onboarding Modal
import PrescriptionOnboardingModal from './components/patient/PrescriptionOnboardingModal';

// Individual Cards (for other uses)
import { SummaryCard } from './components/patient/SummaryCard';
import { DailyCheckIn } from './components/patient/DailyCheckIn';

// Mock Data
import { currentPatient } from './lib/mockData';

// Theme Context
import { ThemeContext } from './lib/ThemeContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [painLevel, setPainLevel] = useState(currentPatient.painLevel);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Theme state with toggle functionality
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handlePainUpdate = (newPainLevel: number) => {
    setPainLevel(newPainLevel);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Show onboarding modal if no prescription exists
    setShowOnboarding(true);
  };

  // Show login if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme }}>
      <div 
        data-theme={isDarkTheme ? 'dark' : 'light'}
        className={`min-h-screen relative transition-all duration-400 ${
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
        
        {/* Header with Animated Gradient Background */}
        <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-500 ${
          isDarkTheme 
            ? 'border-white/10 dashboard-dark-card' 
            : 'border-white/30 glass-card'
        }`}>
          {/* ✨ Ambient Glow Pulse Layer */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[60px] pointer-events-none">
            <div 
              className="absolute inset-0 ambient-glow-pulse"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(55, 226, 157, 0.15) 0%, transparent 70%)',
                filter: 'blur(25px)',
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                {/* ✨ AI Pulse Halo behind Logo */}
                <div
                  className="absolute inset-0 rounded-xl ai-pulse-halo"
                  style={{
                    background: 'radial-gradient(circle, rgba(55, 226, 157, 0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
                {/* Animated Pulsing Ring Behind Logo */}
                <div
                  className="absolute inset-0 rounded-xl opacity-[0.08] pulse-ring"
                  style={{
                    background: isDarkTheme ? '#37E29D' : '#1C8B82',
                  }}
                />
                <div className={`relative w-12 h-12 gradient-accent rounded-xl flex items-center justify-center shadow-lg icon-hover-effect ${
                  isDarkTheme ? 'glow-mint-dark' : 'glow-teal'
                }`}>
                  <Heart className="w-7 h-7 text-white" fill="white" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h1 
                  className="luxury-spacing title-neon-glow gradient-text-glow"
                  style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: 600,
                    fontSize: '38px',
                    lineHeight: '1.2'
                  }}
                >
                  CareSynth
                </h1>
                <p 
                  className="luxury-spacing gradient-text-secondary"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontWeight: 500,
                    fontSize: '18px',
                    marginTop: '-2px'
                  }}
                >
                  Health Companion Dashboard
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              {/* Modern Theme Toggle Icon Button - 36px Glass Circle */}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isDarkTheme
                    ? 'bg-white/10 border border-white/20 hover:bg-white/15'
                    : 'bg-white/60 border border-gray-200/50 hover:bg-white/80'
                }`}
              >
                <div
                  className="transition-transform duration-400"
                  style={{ transform: isDarkTheme ? 'rotate(0deg)' : 'rotate(180deg)' }}
                >
                  {isDarkTheme ? (
                    <Moon className="w-5 h-5 text-[#37E29D]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[#1C8B82]" />
                  )}
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-col gap-2">
                <Button
                  variant="default"
                  className="w-full justify-start gap-2 rounded-xl"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart className="w-4 h-4" />
                  Patient Dashboard
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="animate-in fade-in slide-in-from-bottom-4">
            {/* Patient Dashboard - Focused View */}
            <PatientDashboard 
              patient={currentPatient} 
              onPainUpdate={handlePainUpdate}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className={`relative mt-16 py-8 border-t transition-all duration-500 ${
          isDarkTheme
            ? 'border-white/10 dashboard-dark-card'
            : 'border-white/30 glass-card'
        }`}>
          <div className="container mx-auto px-4 text-center">
            <p className={`text-sm ${isDarkTheme ? 'dashboard-dark-body' : 'light-mode-body'}`}>
              CareSynth AI Health Companion • Powered by AI & WhatsApp Automation
            </p>
            <p className={`text-xs mt-2 ${isDarkTheme ? 'text-[#6B7280]' : 'light-mode-muted'}`}>
              AI-powered by CareSynth Labs © 2025 • Demo prototype - Not for clinical use
            </p>
          </div>
        </footer>

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
