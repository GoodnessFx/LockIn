import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '@/config/constants';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  niche: string;
  goal: string;
  preferredSchedule: string;
  voicePreference: 'enabled' | 'disabled';
  timezone: string;
}

export interface ProgressData {
  currentDay: number;
  totalDays: number;
  streak: number;
  lastActiveDate: string;
  startDateISO?: string;
  endDateISO?: string;
  isLocked?: boolean;
  completedTasks: string[];
  missedDays: number[];
  batteryLevel: number; // 0-100
  notes: Array<{
    id: string;
    text: string;
    date: string;
    type: string;
  }>;
}

export interface CurriculumItem {
  id: string;
  day: number;
  title: string;
  description: string;
  type: 'learning' | 'practice' | 'milestone';
  completed: boolean;
  estimatedTime: number; // minutes
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'mentor';
  timestamp: string;
}

export interface AIAssistant {
  isVisible: boolean;
  isMuted: boolean;
  lastMessage: string;
  suggestions: string[];
  messages: Message[];
}

export interface AppState {
  // Auth
  authToken: string | null;
  setAuthToken: (token: string | null) => void;

  // Preferences
  notificationsEnabled: boolean;
  setNotificationsEnabled: (v: boolean) => void;
  subscriptionPlan: 'Free' | 'Pro' | 'Enterprise';
  setSubscriptionPlan: (p: 'Free' | 'Pro' | 'Enterprise') => void;
  security: {
    biometricEnabled: boolean;
    twoFactorEnabled: boolean;
  };
  setSecurity: (updates: Partial<AppState['security']>) => void;

  // Onboarding
  hasOnboarded: boolean;
  setOnboarded: (v: boolean) => void;
  
  // Theme
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  
  // User Profile
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  
  // Progress Tracking
  progress: ProgressData;
  updateProgress: (updates: Partial<ProgressData>) => void;
  markTaskComplete: (taskId: string) => void;
  
  // Curriculum
  curriculum: CurriculumItem[];
  setCurriculum: (curriculum: CurriculumItem[]) => void;
  updateCurriculumItem: (id: string, updates: Partial<CurriculumItem>) => void;
  
  // AI Assistant
  aiAssistant: AIAssistant;
  updateAIAssistant: (updates: Partial<AIAssistant>) => void;
  
  // App State
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  lastSyncTime: string | null;
  setLastSyncTime: (time: string) => void;
}

const INITIAL_PROGRESS: ProgressData = {
  currentDay: 1,
  totalDays: APP_CONFIG.COMMITMENT_DAYS,
  streak: 0,
  lastActiveDate: new Date().toISOString(),
  startDateISO: new Date().toISOString(),
  endDateISO: new Date(Date.now() + APP_CONFIG.COMMITMENT_DAYS * 24 * 60 * 60 * 1000).toISOString(),
  isLocked: false,
  completedTasks: [],
  missedDays: [],
  batteryLevel: 100,
  notes: []
};

const INITIAL_AI_ASSISTANT: AIAssistant = {
  isVisible: true,
  isMuted: false,
  lastMessage: '',
  suggestions: [],
  messages: []
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      authToken: null,
      setAuthToken: (token) => set({ authToken: token }),

      // Preferences
      notificationsEnabled: true,
      setNotificationsEnabled: (v) => set({ notificationsEnabled: v }),
      subscriptionPlan: 'Pro',
      setSubscriptionPlan: (p) => set({ subscriptionPlan: p }),
      security: {
        biometricEnabled: true,
        twoFactorEnabled: false,
      },
      setSecurity: (updates) => {
        const current = get().security;
        set({ security: { ...current, ...updates } });
      },

      // Onboarding
      hasOnboarded: false,
      setOnboarded: (v) => set({ hasOnboarded: v }),
      
      // Theme
      theme: 'light',
      setTheme: (t) => set({ theme: t }),
      
      // User Profile
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),
      
      // Progress Tracking
      progress: INITIAL_PROGRESS,
      updateProgress: (updates) => {
        const currentProgress = get().progress;
        set({ progress: { ...currentProgress, ...updates } });
      },
      markTaskComplete: (taskId) => {
        const currentProgress = get().progress;
        const completedTasks = [...currentProgress.completedTasks, taskId];
        // We reuse updateProgress to keep logic centralized
        get().updateProgress({ completedTasks });
      },
      
      // Curriculum
      curriculum: [],
      setCurriculum: (curriculum) => set({ curriculum }),
      updateCurriculumItem: (id, updates) => {
        const currentCurriculum = get().curriculum;
        const updatedCurriculum = currentCurriculum.map(item =>
          item.id === id ? { ...item, ...updates } : item
        );
        set({ curriculum: updatedCurriculum });
      },
      
      // AI Assistant
      aiAssistant: INITIAL_AI_ASSISTANT,
      updateAIAssistant: (updates) => {
        const currentAI = get().aiAssistant;
        set({ aiAssistant: { ...currentAI, ...updates } });
      },
      
      // App State
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      lastSyncTime: null,
      setLastSyncTime: (time) => set({ lastSyncTime: time })
    }),
    {
      name: 'lockin-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
                authToken: state.authToken,
                theme: state.theme,
        notificationsEnabled: state.notificationsEnabled,
        subscriptionPlan: state.subscriptionPlan,
        security: state.security,
        hasOnboarded: state.hasOnboarded,
        userProfile: state.userProfile,
        progress: state.progress,
        curriculum: state.curriculum,
        aiAssistant: state.aiAssistant
      })
    }
  )
);
