export const theme = {
  colors: {
    // Light theme
    backgroundLight: "#ffffff",
    surfaceLight: "#f8f9fa",
    textLight: "#0b0b0f",
    textSecondaryLight: "#6c757d",
    
    // Dark theme
    backgroundDark: "#0b0b0f",
    surfaceDark: "#1a1a1f",
    textDark: "#ffffff",
    textSecondaryDark: "#a0a0a0",
    
    // Brand colors
    primary: "#6C5CE7",
    primaryDark: "#5a4fcf",
    accent: "#E84393",
    success: "#00b894",
    warning: "#fdcb6e",
    error: "#e17055",
    
    // Battery progress colors
    batteryFull: "#00b894",
    batteryMedium: "#fdcb6e",
    batteryLow: "#e17055",
    batteryEmpty: "#636e72"
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '800' as const },
    h2: { fontSize: 24, fontWeight: '700' as const },
    h3: { fontSize: 20, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const },
    caption: { fontSize: 14, fontWeight: '400' as const },
    small: { fontSize: 12, fontWeight: '400' as const }
  }
};

// API Configuration - Easy to change endpoints
export const API_CONFIG = {
  // Change these to your backend endpoints
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://your-backend.com/api',
  AI_PROXY_URL: process.env.EXPO_PUBLIC_AI_PROXY_URL || 'https://your-ai-proxy.com',
  TIMEOUT: 10000,
  
  // Endpoints - Easy to reference and modify
  ENDPOINTS: {
    AUTH: '/auth',
    USER: '/user',
    PROGRESS: '/progress',
    CURRICULUM: '/curriculum',
    AI_CHAT: '/ai/chat',
    NOTIFICATIONS: '/notifications'
  }
};

// App Configuration
export const APP_CONFIG = {
  COMMITMENT_DAYS: 97,
  CURRICULUM_DAYS: 90,
  INACTIVITY_THRESHOLD_HOURS: 24,
  NOTIFICATION_INTERVALS: {
    MORNING: '09:00',
    EVENING: '20:00'
  }
};

