// Comprehensive Dark Theme Class Generators
// Use these functions to ensure consistent dark theme styling across all components

export const darkCard = (isDark: boolean) => 
  isDark 
    ? 'dashboard-dark-card hover:shadow-2xl' 
    : 'glass-card-strong border-white/30 shadow-xl hover:shadow-2xl';

export const darkHeading = (isDark: boolean) => 
  isDark ? 'dashboard-dark-heading' : 'text-gray-900';

export const darkBody = (isDark: boolean) => 
  isDark ? 'dashboard-dark-body' : 'text-gray-600';

export const darkMuted = (isDark: boolean) => 
  isDark ? 'text-[#6B7280]' : 'text-gray-500';

export const darkBg = (isDark: boolean) => 
  isDark ? 'bg-white/10' : 'bg-gray-50';

export const darkBgSecondary = (isDark: boolean) => 
  isDark ? 'bg-white/5' : 'bg-white';

export const darkBorder = (isDark: boolean) => 
  isDark ? 'border-white/12' : 'border-gray-200';

export const darkInput = (isDark: boolean) => 
  isDark 
    ? 'bg-white/10 border-white/20 text-[#EAEAEA] placeholder:text-[#6B7280] focus:border-[#37E29D]' 
    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#1C8B82]';

export const darkButton = (isDark: boolean) => 
  isDark 
    ? 'bg-gradient-to-r from-[#1C8B82] to-[#37E29D] hover:shadow-lg glow-mint-dark' 
    : 'gradient-accent hover:shadow-lg';

export const darkBadge = (isDark: boolean, variant: 'success' | 'warning' | 'error' | 'info' = 'info') => {
  if (isDark) {
    switch (variant) {
      case 'success':
        return 'bg-[#1C8B82]/20 text-[#37E29D] border-[#1C8B82]/30';
      case 'warning':
        return 'bg-[#FFD580]/20 text-[#FFD580] border-[#FFD580]/30';
      case 'error':
        return 'bg-[#F47C7C]/20 text-[#F47C7C] border-[#F47C7C]/30';
      case 'info':
        return 'bg-[#5BC7FF]/20 text-[#5BC7FF] border-[#5BC7FF]/30';
    }
  } else {
    switch (variant) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  }
};
