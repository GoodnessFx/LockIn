import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useAppStore } from '../store/appStore';
import { theme } from '../../config/constants';

interface ThemeContextType {
  isDark: boolean;
  colors: typeof theme.colors;
  spacing: typeof theme.spacing;
  borderRadius: typeof theme.borderRadius;
  typography: typeof theme.typography;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const { theme: userTheme, setTheme } = useAppStore();
  
  // Use user preference, fallback to system preference, then default to dark
  const isDark = userTheme === 'dark' || (userTheme === 'light' ? false : systemColorScheme === 'dark');
  
  const toggleTheme = async () => {
    await setTheme(isDark ? 'light' : 'dark');
  };

  const colors = isDark ? {
    background: theme.colors.backgroundDark,
    surface: theme.colors.surfaceDark,
    text: theme.colors.textDark,
    textSecondary: theme.colors.textSecondaryDark,
    ...theme.colors
  } : {
    background: theme.colors.backgroundLight,
    surface: theme.colors.surfaceLight,
    text: theme.colors.textLight,
    textSecondary: theme.colors.textSecondaryLight,
    ...theme.colors
  };

  const contextValue: ThemeContextType = {
    isDark,
    colors,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    typography: theme.typography,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

