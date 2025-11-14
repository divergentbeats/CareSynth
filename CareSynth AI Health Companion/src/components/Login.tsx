import { useState } from 'react';
import { TrendingUp, Mail, Lock, User, Stethoscope, ArrowRight, Sparkles, Activity, Brain, Radio, QrCode, Shield, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col lg:flex-row">
      {/* Left Side - Login Card (≈45% width) */}
      <div className="flex-1 lg:max-w-[45%] relative flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-[#0E1113] to-[#1C1F22]">
        {/* Dark Mode Bokeh Orbs with Reduced Brightness */}
        <div className="absolute top-[15%] left-[20%] w-20 h-20 rounded-full bg-[#37E29D] opacity-[0.08] blur-2xl bokeh-float-1" />
        <div className="absolute top-[60%] left-[10%] w-16 h-16 rounded-full bg-[#37E29D] opacity-[0.06] blur-xl bokeh-float-2" />
        <div className="absolute top-[30%] right-[15%] w-24 h-24 rounded-full bg-[#5BC7FF] opacity-[0.06] blur-2xl bokeh-float-3" />

        {/* Floating Light Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#37E29D] light-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Login Card Container - Enhanced Entrance Animation */}
        <div className="relative w-full max-w-md z-10 login-slide-in">
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 rounded-[24px] blur-lg bg-gradient-to-r from-[#37E29D] via-[#5BC7FF] to-[#37E29D] glowing-border" />
          
          {/* Glass Card */}
          <div className="relative rounded-[20px] shadow-[0_8px_32px_rgba(31,38,135,0.15)] p-8 bg-white/[0.08] backdrop-blur-xl border border-[#37E29D]/20">
            {/* Logo & Header */}
            <div className="text-center mb-10 animate-in fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <div className="relative inline-block mb-6">
                {/* Animated Pulsing Ring Behind Logo */}
                <div
                  className="absolute inset-0 rounded-2xl pulse-ring"
                  style={{ background: '#37E29D' }}
                />
                
                <div
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-[#37E29D] to-[#1C8B82] transition-transform hover:scale-105"
                >
                  <Zap className="w-10 h-10 text-white" fill="white" />
                </div>
              </div>
              
              <h1 className="text-2xl mb-3 flex items-center justify-center gap-3 luxury-spacing text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                CareSynth AI Recovery Verification Assistant
                {/* Animated AI Spark */}
                <div className="sparkle-rotate">
                  <Sparkles className="w-5 h-5 text-[#37E29D]" />
                </div>
              </h1>
              <p className="text-lg luxury-spacing text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Upload your prescription → AI extracts your expected recovery curve → You get a personalized dashboard
              </p>
            </div>

            {/* Role Toggle - Enhanced with Spring Pop & Glow */}
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <label className="block mb-4 text-center luxury-spacing text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Enter Your Credentials
              </label>
            </div>

            {/* Input Fields - Enhanced with Subtle Inner-Shadow Highlight */}
            <div className="space-y-5 mb-6 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>

              {/* Email */}
              <div>
                <label className="block mb-3 luxury-spacing text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" strokeWidth={2} />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 rounded-xl h-12 transition-all duration-300 bg-white/[0.05] backdrop-blur-sm border-[#37E29D]/20 text-[#E8E8E8] placeholder:text-[#A0A0A0] focus:border-[#37E29D] focus:ring-[#37E29D]/30 focus:shadow-[inset_0_2px_8px_rgba(55,226,157,0.1)]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-3 luxury-spacing text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" strokeWidth={2} />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 rounded-xl h-12 transition-all duration-300 bg-white/[0.05] backdrop-blur-sm border-[#37E29D]/20 text-[#E8E8E8] placeholder:text-[#A0A0A0] focus:border-[#37E29D] focus:ring-[#37E29D]/30 focus:shadow-[inset_0_2px_8px_rgba(55,226,157,0.1)]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  />
                </div>
              </div>
            </div>



            {/* Continue Button - Enhanced with Gradient Shift & Arrow Slide */}
            <div className="mb-6 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <Button
                onClick={handleContinue}
                className="w-full h-13 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden bg-gradient-to-r from-[#37E29D] to-[#1C8B82] hover:from-[#2FCA89] hover:to-[#157770] text-white hover:scale-[1.02] active:scale-[0.98]"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, letterSpacing: '0.02em' }}
              >
                <span className="relative z-10">Continue to Dashboard</span>
                <ArrowRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6 animate-in fade-in" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#37E29D]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/[0.08] text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  or sign up with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              {/* Google Button */}
              <button
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] backdrop-blur-sm border border-[#37E29D]/20 text-[#E8E8E8] transition-all duration-300 hover:bg-white/[0.1] hover:border-[#37E29D]/40 hover:scale-[1.02] active:scale-[0.98]"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                  <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                  <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                  <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                </svg>
                <span>Google</span>
              </button>
            </div>

            {/* Footer */}
            <p
              className="text-center text-sm mt-8 luxury-spacing text-[#A0A0A0] animate-in fade-in"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, animationDelay: '0.55s', animationFillMode: 'both' }}
            >
              Demo mode • No real credentials required
            </p>
          </div>
        </div>

        {/* Bottom Footer - Only on Mobile */}
        <footer className="absolute bottom-6 left-0 right-0 text-center z-10 lg:hidden animate-in fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
          <p className="text-sm text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            AI-powered by CareSynth Labs © 2025
          </p>
        </footer>
      </div>

      {/* Right Side - Animated AI Healthcare Visualization (≈55% width) */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-[#0E1113] to-[#1C1F22]">
        {/* Gradient Background with Intensified Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#37E29D]/15 via-[#1C8B82]/8 to-transparent" />
        
        {/* Diagonal Light Sweep Animation */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-[#37E29D]/30 to-transparent diagonal-sweep"
          style={{ width: '100%', height: '200%' }}
        />
        
        {/* Animated Particles/Orbs with Intensified Glow */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full blur-3xl bg-[#37E29D]/20 orb-1-float" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl bg-[#5BC7FF]/20 orb-2-float" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full blur-2xl bg-[#37E29D]/15 orb-3-float" />
        
        {/* Floating Light Particles for Right Panel */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`right-particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#37E29D] light-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Faint Bokeh Dots for Right Panel */}
        <div className="absolute top-[10%] right-[15%] w-20 h-20 rounded-full bg-[#37E29D] opacity-[0.12] blur-2xl bokeh-float-1" />
        <div className="absolute top-[70%] left-[10%] w-18 h-18 rounded-full bg-[#5BC7FF] opacity-[0.1] blur-xl bokeh-float-2" />
        <div className="absolute top-[40%] left-[5%] w-16 h-16 rounded-full bg-[#37E29D] opacity-[0.1] blur-xl bokeh-float-3" />
        <div className="absolute bottom-[15%] right-[20%] w-22 h-22 rounded-full bg-[#5BC7FF] opacity-[0.1] blur-2xl bokeh-float-1" />
        <div className="absolute top-[25%] right-[35%] w-14 h-14 rounded-full bg-[#37E29D] opacity-[0.12] blur-xl bokeh-float-2" />

        {/* Main Illustration Container */}
        <div className="relative z-10 w-full max-w-lg animate-in fade-in scale-in-95" style={{ animationDelay: '0.2s', animationDuration: '0.8s', animationFillMode: 'both' }}>
          {/* Central Doctor Avatar with Vitals - Enhanced with Breathing Motion */}
          <div className="relative breathe-scale">
            {/* Doctor Silhouette Circle */}
            <div className="w-48 h-48 mx-auto rounded-full backdrop-blur-sm border-2 flex items-center justify-center shadow-2xl bg-gradient-to-br from-[#37E29D]/30 to-[#5BC7FF]/30 border-[#37E29D]/40 glow-pulse-effect">
              <Stethoscope className="w-24 h-24 text-[#37E29D]" strokeWidth={1.5} />
            </div>

            {/* Orbiting Data Points */}
            {/* Heart Rate */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-orbit-20"
              style={{ transformOrigin: 'center 120px' }}
            >
              <div className="rounded-2xl p-4 shadow-lg flex items-center gap-3 bg-white/[0.12] backdrop-blur-md border border-[#37E29D]/30 hover:scale-110 transition-transform">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#37E29D] to-[#1C8B82]">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Heart Rate</div>
                  <div className="text-[#37E29D]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>72 bpm</div>
                </div>
              </div>
            </div>

            {/* AI Brain */}
            <div
              className="absolute top-1/4 right-0 translate-x-1/2 rotate-orbit-25"
              style={{ transformOrigin: '-80px center' }}
            >
              <div className="rounded-2xl p-4 shadow-lg flex items-center gap-3 bg-white/[0.12] backdrop-blur-md border border-[#5BC7FF]/30 hover:scale-110 transition-transform">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5BC7FF] to-[#1C8B82] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>AI Analysis</div>
                  <div className="text-[#5BC7FF]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Active</div>
                </div>
              </div>
            </div>

            {/* Activity Monitor */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-orbit-22"
              style={{ transformOrigin: 'center -120px' }}
            >
              <div className="rounded-2xl p-4 shadow-lg flex items-center gap-3 bg-white/[0.12] backdrop-blur-md border border-[#37E29D]/30 hover:scale-110 transition-transform">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#37E29D] to-[#1C8B82]">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Recovery</div>
                  <div className="text-[#37E29D]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>85%</div>
                </div>
              </div>
            </div>

            {/* Pulse Monitor */}
            <div
              className="absolute top-1/4 left-0 -translate-x-1/2 rotate-orbit-18"
              style={{ transformOrigin: '80px center' }}
            >
              <div className="rounded-2xl p-4 shadow-lg flex items-center gap-3 bg-white/[0.12] backdrop-blur-md border border-[#5BC7FF]/30 hover:scale-110 transition-transform">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5BC7FF] to-[#56C596] flex items-center justify-center">
                  <Radio className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Vitals</div>
                  <div className="text-[#5BC7FF]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Normal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pulse Wave Animation at Bottom - Looping Data Wave */}
          <div className="mt-16 relative h-20">
            <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
              <path
                d="M0,40 Q50,40 100,40 T200,40 T300,40 T400,40"
                stroke="url(#pulseGradientDark)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="pulseGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#37E29D" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#5BC7FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#37E29D" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Glowing Dot Moving Along Wave */}
            <div
              className="absolute w-3 h-3 rounded-full dot-move-animation"
              style={{
                backgroundColor: '#37E29D',
                boxShadow: '0 0 20px rgba(55, 226, 157, 0.8)'
              }}
            />
          </div>

          {/* Title Text */}
          <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <h2 className="mb-2 luxury-spacing text-[#E8E8E8]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
              Prescription Upload & Recovery Verification
            </h2>
            <p className="text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '15px' }}>
              Upload your prescription and let AI extract your personalized recovery curve
            </p>
          </div>
        </div>

        {/* Footer - Desktop Only */}
        <footer className="absolute bottom-6 left-0 right-0 text-center z-10 animate-in fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
          <p className="text-sm text-[#A0A0A0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            AI-powered by CareSynth Labs © 2025
          </p>
        </footer>
      </div>
    </div>
  );
}