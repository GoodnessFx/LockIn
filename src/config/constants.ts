export const APP_CONFIG = {
  COMMITMENT_DAYS: 97,
  INACTIVITY_THRESHOLD_HOURS: 24,
  APP_NAME: 'LockIn',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@lockin.app',
};

export const API_CONFIG = {
  BASE_URL: 'https://locked-in.up.railway.app/api/v1',
  TIMEOUT: 15000,
  ENDPOINTS: {
    HEALTH: '/health',
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    OAUTH: {
      GOOGLE: '/oauth/google',
    },
    USER: {
      ME: '/user/me',
      CHANGE_PASSWORD: '/user/change-password',
    },
    PROFILE: {
      UPLOAD: '/profile/upload',
      SERVE: (userId: string) => `/profile/serve/${userId}`,
      DELETE: '/profile/delete',
    },
    // Keep these for now if they are used elsewhere, but flag them if not in docs
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
