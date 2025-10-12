// Comprehensive test to verify all imports work correctly
console.log('🔍 Testing LockIn App Imports...\n');

const testImports = async () => {
  try {
    // Test React Native core
    console.log('Testing React Native core...');
    const React = require('react');
    const { View, Text, ScrollView, TouchableOpacity } = require('react-native');
    console.log('✅ React Native core imports successful');

    // Test Expo Router
    console.log('Testing Expo Router...');
    const { Stack, Tabs, Redirect } = require('expo-router');
    console.log('✅ Expo Router imports successful');

    // Test Expo components
    console.log('Testing Expo components...');
    const { StatusBar } = require('expo-status-bar');
    const SplashScreen = require('expo-splash-screen');
    console.log('✅ Expo components imports successful');

    // Test React Native libraries
    console.log('Testing React Native libraries...');
    const { useSafeAreaInsets } = require('react-native-safe-area-context');
    const { GestureHandlerRootView } = require('react-native-gesture-handler');
    const Animated = require('react-native-reanimated');
    console.log('✅ React Native libraries imports successful');

    // Test UI libraries
    console.log('Testing UI libraries...');
    const { QueryClient, QueryClientProvider } = require('@tanstack/react-query');
    const { create } = require('zustand');
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    console.log('✅ UI libraries imports successful');

    // Test SVG
    console.log('Testing SVG...');
    const Svg = require('react-native-svg');
    console.log('✅ SVG imports successful');

    // Test our components
    console.log('Testing our components...');
    const ErrorBoundary = require('./src/components/ErrorBoundary').default;
    const BatteryProgressIndicator = require('./src/components/BatteryProgressIndicator').default;
    const CountdownTimer = require('./src/components/CountdownTimer').default;
    const LiveClock = require('./src/components/LiveClock').default;
    console.log('✅ Our components imports successful');

    // Test our store
    console.log('Testing our store...');
    const { useAppStore, hydrateAppStore } = require('./src/store/appStore');
    console.log('✅ Our store imports successful');

    // Test our auth utilities
    console.log('Testing auth utilities...');
    const { useAuth } = require('./src/utils/auth/useAuth');
    const useUser = require('./src/utils/auth/useUser').default;
    console.log('✅ Auth utilities imports successful');

    // Test error boundaries
    console.log('Testing error boundaries...');
    const { DeviceErrorBoundaryWrapper } = require('./__create/DeviceErrorBoundary');
    const { ErrorBoundaryWrapper, SharedErrorBoundary } = require('./__create/SharedErrorBoundary');
    console.log('✅ Error boundaries imports successful');

    // Test app pages
    console.log('Testing app pages...');
    const RootLayout = require('./src/app/_layout').default;
    const Index = require('./src/app/index').default;
    const Onboarding = require('./src/app/onboarding').default;
    console.log('✅ App pages imports successful');

    // Test tab pages
    console.log('Testing tab pages...');
    const TabLayout = require('./src/app/(tabs)/_layout').default;
    const Dashboard = require('./src/app/(tabs)/dashboard').default;
    const LAI = require('./src/app/(tabs)/lai').default;
    const Lockmate = require('./src/app/(tabs)/lockmate').default;
    const Progress = require('./src/app/(tabs)/progress').default;
    const Profile = require('./src/app/(tabs)/profile').default;
    console.log('✅ Tab pages imports successful');

    console.log('\n🎉 ALL IMPORTS SUCCESSFUL! 🎉');
    console.log('\n📱 App Flow:');
    console.log('1. Splash Screen (3 seconds)');
    console.log('2. Onboarding (if first time)');
    console.log('3. Main App with 5 tabs:');
    console.log('   - Dashboard (LockIn)');
    console.log('   - LAI (Learning AI)');
    console.log('   - Lockmate (Community)');
    console.log('   - Progress (Tracking)');
    console.log('   - Profile (Settings)');
    console.log('\n✨ The app is ready to run!');

  } catch (error) {
    console.error('❌ Import error:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

testImports();
