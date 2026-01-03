import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useAppStore } from '../store/appStore';
import { colors, spacing, borderRadius, typography } from '@/theme/theme';

interface ThemeContextType {
  isDark: boolean;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  } & typeof colors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
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

  const themedColors = isDark ? {
    background: colors.backgroundColor,
    surface: colors.surfaceColor,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    ...colors
  } : {
    background: colors.backgroundColor,
    surface: colors.surfaceColor,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    ...colors
  };

  const contextValue: ThemeContextType = {
    isDark,
    colors: themedColors,
    spacing,
    borderRadius,
    typography,
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

