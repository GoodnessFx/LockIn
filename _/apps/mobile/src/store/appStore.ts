import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '../../config/constants';

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
  completedTasks: string[];
  missedDays: number[];
  batteryLevel: number; // 0-100
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

export interface AIAssistant {
  isVisible: boolean;
  isMuted: boolean;
  lastMessage: string;
  suggestions: string[];
}

type AppState = {
  // Onboarding
  hasOnboarded: boolean;
  setOnboarded: (v: boolean) => Promise<void>;
  
  // Theme
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => Promise<void>;
  
  // User Profile
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => Promise<void>;
  
  // Progress Tracking
  progress: ProgressData;
  updateProgress: (updates: Partial<ProgressData>) => Promise<void>;
  markTaskComplete: (taskId: string) => Promise<void>;
  
  // Curriculum
  curriculum: CurriculumItem[];
  setCurriculum: (curriculum: CurriculumItem[]) => Promise<void>;
  updateCurriculumItem: (id: string, updates: Partial<CurriculumItem>) => Promise<void>;
  
  // AI Assistant
  aiAssistant: AIAssistant;
  updateAIAssistant: (updates: Partial<AIAssistant>) => Promise<void>;
  
  // App State
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  lastSyncTime: string | null;
  setLastSyncTime: (time: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Onboarding
      hasOnboarded: false,
      async setOnboarded(v) {
        await AsyncStorage.setItem('lockin:onboarded', v ? '1' : '0');
        set({ hasOnboarded: v });
      },
      
      // Theme
      theme: 'light', // Default to light theme for white-themed app
      async setTheme(t) {
        await AsyncStorage.setItem('lockin:theme', t);
        set({ theme: t });
      },
      
      // User Profile
      userProfile: null,
      async setUserProfile(profile) {
        await AsyncStorage.setItem('lockin:userProfile', JSON.stringify(profile));
        set({ userProfile: profile });
      },
      
      // Progress Tracking
      progress: {
        currentDay: 1,
        totalDays: APP_CONFIG.COMMITMENT_DAYS,
        streak: 0,
        lastActiveDate: new Date().toISOString(),
        completedTasks: [],
        missedDays: [],
        batteryLevel: 100
      },
      async updateProgress(updates) {
        const currentProgress = get().progress;
        const newProgress = { ...currentProgress, ...updates };
        await AsyncStorage.setItem('lockin:progress', JSON.stringify(newProgress));
        set({ progress: newProgress });
      },
      async markTaskComplete(taskId) {
        const currentProgress = get().progress;
        const completedTasks = [...currentProgress.completedTasks, taskId];
        await get().updateProgress({ completedTasks });
      },
      
      // Curriculum
      curriculum: [],
      async setCurriculum(curriculum) {
        await AsyncStorage.setItem('lockin:curriculum', JSON.stringify(curriculum));
        set({ curriculum });
      },
      async updateCurriculumItem(id, updates) {
        const currentCurriculum = get().curriculum;
        const updatedCurriculum = currentCurriculum.map(item =>
          item.id === id ? { ...item, ...updates } : item
        );
        await get().setCurriculum(updatedCurriculum);
      },
      
      // AI Assistant
      aiAssistant: {
        isVisible: true,
        isMuted: false,
        lastMessage: '',
        suggestions: []
      },
      async updateAIAssistant(updates) {
        const currentAI = get().aiAssistant;
        const newAI = { ...currentAI, ...updates };
        await AsyncStorage.setItem('lockin:aiAssistant', JSON.stringify(newAI));
        set({ aiAssistant: newAI });
      },
      
      // App State
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      lastSyncTime: null,
      setLastSyncTime: (time) => set({ lastSyncTime: time })
    }),
    {
      name: 'lockin-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        theme: state.theme,
        hasOnboarded: state.hasOnboarded,
        userProfile: state.userProfile,
        progress: state.progress,
        curriculum: state.curriculum,
        aiAssistant: state.aiAssistant
      })
    }
  )
);

export async function hydrateAppStore() {
  // Load critical data from AsyncStorage
  const onboarded = await AsyncStorage.getItem('lockin:onboarded');
  const theme = await AsyncStorage.getItem('lockin:theme');
  const userProfile = await AsyncStorage.getItem('lockin:userProfile');
  const progress = await AsyncStorage.getItem('lockin:progress');
  const curriculum = await AsyncStorage.getItem('lockin:curriculum');
  const aiAssistant = await AsyncStorage.getItem('lockin:aiAssistant');
  
  // Update store state
  if (onboarded === '1') useAppStore.setState({ hasOnboarded: true });
  if (theme) useAppStore.setState({ theme: theme as 'light' | 'dark' });
  if (userProfile) useAppStore.setState({ userProfile: JSON.parse(userProfile) });
  if (progress) useAppStore.setState({ progress: JSON.parse(progress) });
  if (curriculum) useAppStore.setState({ curriculum: JSON.parse(curriculum) });
  if (aiAssistant) useAppStore.setState({ aiAssistant: JSON.parse(aiAssistant) });
}

