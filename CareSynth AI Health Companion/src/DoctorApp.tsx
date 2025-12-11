import { useState } from 'react';
import { Heart, Moon, TrendingUp } from 'lucide-react';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { ThemeContext } from './lib/ThemeContext';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';

export default function DoctorApp() {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    return (
        <ThemeContext.Provider value={{ isDarkTheme }}>
            <div className="min-h-screen relative transition-all duration-400 flex flex-col lg:flex-row bg-gradient-to-br from-[#0E1113] to-[#1C1F22]">

                {/* SIDEBAR - Desktop Only */}
                <aside className="hidden lg:flex flex-col w-64 border-r backdrop-blur-md transition-all duration-500 border-white/10 bg-[#0E1113]/80">
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center glow-mint-dark">
                                <Heart className="w-6 h-6 text-white" fill="white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    CareSynth
                                </h2>
                                <p className="text-xs text-[#5BC7FF]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    Doctor Portal
                                </p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        <button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#5BC7FF]/20 to-[#37E29D]/20 text-[#5BC7FF] border border-[#5BC7FF]/30"
                        >
                            <TrendingUp className="w-5 h-5 flex-shrink-0" />
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                                Dashboard
                            </span>
                        </button>
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 bg-white/10 hover:bg-white/15 text-[#37E29D]"
                        >
                            <Moon className="w-4 h-4" />
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>Dark Mode</span>
                        </button>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 flex flex-col">
                    <header className="border-b backdrop-blur-md transition-all duration-500 border-white/10 bg-[#0E1113]/80">
                        <div className="px-4 lg:px-8 py-4 flex items-center justify-between relative">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="lg:hidden w-10 h-10 gradient-accent rounded-lg flex items-center justify-center glow-mint-dark">
                                        <Heart className="w-6 h-6 text-white" fill="white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: '#E8E8E8' }}>
                                            Doctor Dashboard
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <Button
                                className="rounded-xl btn-gradient-shift text-white"
                                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                            >
                                Logout
                            </Button>
                        </div>
                    </header>

                    <main className="flex-1 px-4 lg:px-8 py-8 overflow-y-auto">
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <DoctorDashboard />
                        </div>
                    </main>
                </div>
                <Toaster position="top-right" />
            </div>
        </ThemeContext.Provider>
    );
}
