import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppState = {
  hasOnboarded: boolean;
  setOnboarded: (v: boolean) => Promise<void>;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => Promise<void>;
};

export const useAppStore = create<AppState>((set) => ({
  hasOnboarded: false,
  async setOnboarded(v) {
    await AsyncStorage.setItem('lockin:onboarded', v ? '1' : '0');
    set({ hasOnboarded: v });
  },
  theme: 'light',
  async setTheme(t) {
    await AsyncStorage.setItem('lockin:theme', t);
    set({ theme: t });
  },
}));

export async function hydrateAppStore() {
  const v = await AsyncStorage.getItem('lockin:onboarded');
  const theme = (await AsyncStorage.getItem('lockin:theme')) as 'light' | 'dark' | null;
  if (v === '1') useAppStore.setState({ hasOnboarded: true });
  if (theme) useAppStore.setState({ theme });
}

