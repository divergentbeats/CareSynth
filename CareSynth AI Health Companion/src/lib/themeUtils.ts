// Theme utility functions for dark/light theme class management

export function getCardClass(isDark: boolean): string {
  return isDark
    ? 'dashboard-dark-card'
    : 'glass-card-strong border-white/30 shadow-xl';
}

export function getHeadingClass(isDark: boolean): string {
  return isDark ? 'dashboard-dark-heading' : 'text-gray-900';
}

export function getBodyClass(isDark: boolean): string {
  return isDark ? 'dashboard-dark-body' : 'text-gray-600';
}

export function getMutedClass(isDark: boolean): string {
  return isDark ? 'text-[#6B7280]' : 'text-gray-500';
}

export function getBgClass(isDark: boolean, variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'primary'): string {
  if (isDark) {
    switch (variant) {
      case 'primary':
        return 'bg-white/10';
      case 'secondary':
        return 'bg-white/5';
      case 'success':
        return 'bg-[#1C8B82]/20';
      case 'warning':
        return 'bg-[#FFD580]/20';
      case 'error':
        return 'bg-[#F47C7C]/20';
    }
  } else {
    switch (variant) {
      case 'primary':
        return 'bg-gray-50';
      case 'secondary':
        return 'bg-white';
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-amber-50';
      case 'error':
        return 'bg-red-50';
    }
  }
}

export function getBorderClass(isDark: boolean, variant: 'default' | 'success' | 'warning' | 'error' = 'default'): string {
  if (isDark) {
    switch (variant) {
      case 'default':
        return 'border-white/12';
      case 'success':
        return 'border-[#1C8B82]/30';
      case 'warning':
        return 'border-[#FFD580]/30';
      case 'error':
        return 'border-[#F47C7C]/30';
    }
  } else {
    switch (variant) {
      case 'default':
        return 'border-gray-200';
      case 'success':
        return 'border-green-200';
      case 'warning':
        return 'border-amber-200';
      case 'error':
        return 'border-red-200';
    }
  }
}

export function getAccentColor(isDark: boolean, variant: 'teal' | 'mint' | 'error' = 'teal'): string {
  if (isDark) {
    switch (variant) {
      case 'teal':
        return 'text-[#1C8B82]';
      case 'mint':
        return 'text-[#37E29D]';
      case 'error':
        return 'text-[#F47C7C]';
    }
  } else {
    switch (variant) {
      case 'teal':
        return 'text-[#1C8B82]';
      case 'mint':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
    }
  }
}
