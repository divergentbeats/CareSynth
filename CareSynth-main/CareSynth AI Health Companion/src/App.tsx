import { useState } from 'react';
import { User, Stethoscope, Heart, Menu, X, Moon, Sun } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';

// Login Component
import { Login } from './components/Login';

// Patient Components
import { SummaryCard } from './components/patient/SummaryCard';
import { DailyCheckIn } from './components/patient/DailyCheckIn';
import { WoundUploader } from './components/patient/WoundUploader';
import { MedicationTracker } from './components/patient/MedicationTracker';
import { RecoveryTimeline } from './components/patient/RecoveryTimeline';
import { AIChat } from './components/patient/AIChat';
import { MessageDoctor } from './components/patient/MessageDoctor';
import { WhatsAppLogs } from './components/patient/WhatsAppLogs';

// Doctor Components
import { PatientList } from './components/doctor/PatientList';
import { AlertFeed } from './components/doctor/AlertFeed';
import { PatientDetailModal } from './components/doctor/PatientDetailModal';
import { Analytics } from './components/doctor/Analytics';
import { DoctorAIChat } from './components/doctor/DoctorAIChat';

// Mock Data
import {
  currentPatient,
  medications,
  timeline,
  allPatients,
  alerts,
  chatHistory,
  whatsappLogs
} from './lib/mockData';
import type { Patient, Alert } from './lib/mockData';

// Theme Context
import { ThemeContext } from './lib/ThemeContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [painLevel, setPainLevel] = useState(currentPatient.painLevel);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Theme state with toggle functionality
  const [selectedDoctorPatient, setSelectedDoctorPatient] = useState<{ id: string; name: string }>({ id: '1', name: 'Sarah Johnson' });

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleAlertClick = (alert: Alert) => {
    const patient = allPatients.find(p => p.id === alert.patientId);
    if (patient) {
      handlePatientClick(patient);
    }
  };

  const handlePainUpdate = (newPainLevel: number) => {
    setPainLevel(newPainLevel);
  };

  const handleDoctorPatientChange = (patientId: string, patientName: string) => {
    setSelectedDoctorPatient({ id: patientId, name: patientName });
  };

  const handleLogin = (role: 'patient' | 'doctor') => {
    setActiveTab(role);
    setIsLoggedIn(true);
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

            {/* Desktop Tab Toggle + Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'patient' | 'doctor')}>
                <TabsList className={`p-1.5 rounded-xl shadow-lg transition-all duration-300 ${
                  isDarkTheme 
                    ? 'bg-white/10 backdrop-blur-md border border-white/20' 
                    : 'bg-white/60 backdrop-blur-md border border-[#1C8B82]/10'
                }`}>
                  <TabsTrigger 
                    value="patient" 
                    className={`rounded-lg flex items-center gap-2 px-6 transition-all duration-200 luxury-spacing ${
                      isDarkTheme 
                        ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1C8B82] data-[state=active]:to-[#37E29D] data-[state=active]:text-white data-[state=active]:shadow-lg text-[#9AA0A6]' 
                        : 'data-[state=active]:gradient-accent data-[state=active]:text-white data-[state=active]:shadow-lg'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                  >
                    <User className="w-4 h-4" />
                    Patient View
                  </TabsTrigger>
                  <TabsTrigger 
                    value="doctor" 
                    className={`rounded-lg flex items-center gap-2 px-6 transition-all duration-200 luxury-spacing ${
                      isDarkTheme 
                        ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1C8B82] data-[state=active]:to-[#37E29D] data-[state=active]:text-white data-[state=active]:shadow-lg text-[#9AA0A6]' 
                        : 'data-[state=active]:gradient-accent data-[state=active]:text-white data-[state=active]:shadow-lg'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                  >
                    <Stethoscope className="w-4 h-4" />
                    Doctor View
                  </TabsTrigger>
                </TabsList>
              </Tabs>

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
                  variant={activeTab === 'patient' ? 'default' : 'outline'}
                  className="w-full justify-start gap-2 rounded-xl"
                  onClick={() => {
                    setActiveTab('patient');
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4" />
                  Patient View
                </Button>
                <Button
                  variant={activeTab === 'doctor' ? 'default' : 'outline'}
                  className="w-full justify-start gap-2 rounded-xl"
                  onClick={() => {
                    setActiveTab('doctor');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Stethoscope className="w-4 h-4" />
                  Doctor View
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {activeTab === 'patient' ? (
            <div key="patient" className="animate-in fade-in slide-in-from-bottom-4">
              {/* Patient View */}
              <div className="space-y-6">
                {/* Summary Card - Full Width */}
                <div className="card-entrance card-entrance-delay-1">
                  <SummaryCard patient={{ ...currentPatient, painLevel }} />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card-entrance card-entrance-delay-2">
                    <DailyCheckIn onCheckInComplete={handlePainUpdate} />
                  </div>
                  <div className="card-entrance card-entrance-delay-2">
                    <WoundUploader />
                  </div>
                </div>

                {/* Medication and Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card-entrance card-entrance-delay-3">
                    <MedicationTracker medications={medications} />
                  </div>
                  <div className="card-entrance card-entrance-delay-3">
                    <RecoveryTimeline events={timeline} />
                  </div>
                </div>

                {/* WhatsApp Logs */}
                <div className="card-entrance card-entrance-delay-4">
                  <WhatsAppLogs logs={whatsappLogs} />
                </div>

                {/* Communication */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card-entrance card-entrance-delay-5">
                    <AIChat initialMessages={chatHistory} />
                  </div>
                  <div className="card-entrance card-entrance-delay-5">
                    <MessageDoctor patient={{ ...currentPatient, painLevel }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key="doctor" className="animate-in fade-in slide-in-from-bottom-4">
              {/* Doctor View */}
              <div className="space-y-6">
                {/* Analytics Dashboard with Patient Selection */}
                <div className="card-entrance card-entrance-delay-1">
                  <Analytics onPatientChange={handleDoctorPatientChange} />
                </div>

                {/* Patient List, Alerts, and AI Chat */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card-entrance card-entrance-delay-2">
                    <PatientList
                      patients={allPatients}
                      onPatientClick={handlePatientClick}
                    />
                  </div>
                  <div className="card-entrance card-entrance-delay-2">
                    <AlertFeed
                      alerts={alerts}
                      onAlertClick={handleAlertClick}
                    />
                  </div>
                </div>

                {/* AI Companion for Doctor */}
                <div className="card-entrance card-entrance-delay-3">
                  <DoctorAIChat selectedPatientName={selectedDoctorPatient.name} />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Patient Detail Modal */}
        <PatientDetailModal
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

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
      </div>
    </ThemeContext.Provider>
  );
}
