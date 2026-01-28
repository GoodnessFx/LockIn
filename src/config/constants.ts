export const APP_CONFIG = {
  COMMITMENT_DAYS: 97,
  INACTIVITY_THRESHOLD_HOURS: 24,
  APP_NAME: 'LockIn',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@lockin.app',
};

export const API_CONFIG = {
  BASE_URL: 'https://api.lockin.app/v1', // Replace with actual API URL in production
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: '/auth',
    USER: '/user',
    PROGRESS: '/progress',
    CURRICULUM: '/curriculum',
    AI_CHAT: '/ai/chat',
    NOTIFICATIONS: '/notifications',
  },
};

export const THEME_CONFIG = {
  ANIMATION_DURATION: 300,
  BORDER_RADIUS: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
    XL: 24,
  },
};
