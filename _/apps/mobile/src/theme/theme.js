import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palette - Professional White Theme
export const colors = {
  // Primary Colors
  primaryDark: '#1a1a1a',
  secondaryDark: '#4a4a4a',
  backgroundColor: '#FFFFFF',
  
  // Accent Colors
  accentColor: '#2563eb',
  accentLight: '#3b82f6',
  
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
};

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
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80,
  '8xl': 96,
};

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  floating: {
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
};

// Screen Dimensions
export const screen = {
  width,
  height,
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 414,
  isLargeDevice: width >= 414,
};

// Responsive Dimensions
export const responsive = {
  // Width percentages
  wp: (percentage) => (width * percentage) / 100,
  
  // Height percentages
  hp: (percentage) => (height * percentage) / 100,
  
  // Font size scaling
  fs: (size) => {
    const scale = width / 375; // Base width
    return Math.max(12, size * scale);
  },
};

// Animation Durations
export const animations = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 1000,
};

// Theme Object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  screen,
  responsive,
  animations,
};

export default theme;
