import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palette - Professional White Theme
export const colors = {
  // Primary Colors
  primaryDark: '#1a1a1a',
  secondaryDark: '#4a4a4a',
  backgroundColor: '#FFFFFF',
  
  // Accent Colors
  accentColor: '#000000FF',
  accentLight: '#000000FF',
  
  // Text Colors
  textPrimary: '#0b0b0f',
  textSecondary: '#6c757d',
  textTertiary: '#9ca3af',
  
  // Surface Colors
  surfaceColor: '#f8f9fa',
  surfaceElevated: '#ffffff',
  
  // Border Colors
  borderColor: '#e0e0e0',
  borderLight: '#f0f0f0',
  
  // Status Colors
  successColor: '#00D4AA',
  errorColor: '#FF6B6B',
  warningColor: '#FFB347',
  infoColor: '#74B9FF',
  
  // Social Platform Colors
  linkedin: '#0077B5',
  github: '#333333',
  twitter: '#1DA1F2',
  instagram: '#E4405F',
  youtube: '#FF0000',
  behance: '#1769FF',
  
  // Gradients
  gradient: {
    primary: ['#2563eb', '#3b82f6', '#FFFFFF'],
    accent: ['#2563eb', '#3b82f6'],
    success: ['#00D4AA', '#00B894'],
    error: ['#FF6B6B', '#FF5252'],
  },
} as const;

// Typography
export const typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },
} as const;

// Spacing: Intentional rhythm, not uniform
export const spacing = {
  xs: 4,      // Micro adjustments
  sm: 8,      // Tight sections
  md: 16,     // Standard spacing
  lg: 24,     // Breathing room
  xl: 32,     // Major sections
  xxl: 48,    // Hero sections
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;
