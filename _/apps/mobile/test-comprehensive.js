// Comprehensive test to verify all imports and identify potential issues
console.log('🔍 Comprehensive LockIn App Test...\n');

const testAllImports = async () => {
  const errors = [];
  const warnings = [];

  try {
    console.log('1. Testing React Native core...');
    const React = require('react');
    const { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } = require('react-native');
    console.log('✅ React Native core imports successful');

    console.log('2. Testing Expo Router...');
    const { Stack, Tabs, Redirect, useRouter, useGlobalSearchParams } = require('expo-router');
    console.log('✅ Expo Router imports successful');

    console.log('3. Testing Expo components...');
    const { StatusBar } = require('expo-status-bar');
    const SplashScreen = require('expo-splash-screen');
    const { useSafeAreaInsets } = require('react-native-safe-area-context');
    console.log('✅ Expo components imports successful');

    console.log('4. Testing React Native libraries...');
    const { GestureHandlerRootView } = require('react-native-gesture-handler');
    const Animated = require('react-native-reanimated');
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    console.log('✅ React Native libraries imports successful');

    console.log('5. Testing UI libraries...');
    const { QueryClient, QueryClientProvider } = require('@tanstack/react-query');
    const { create } = require('zustand');
    console.log('✅ UI libraries imports successful');

    console.log('6. Testing SVG...');
    const Svg = require('react-native-svg');
    console.log('✅ SVG imports successful');

    console.log('7. Testing our components...');
    try {
      const ErrorBoundary = require('./src/components/ErrorBoundary').default;
      console.log('✅ ErrorBoundary imported successfully');
    } catch (e) {
      errors.push('ErrorBoundary import failed: ' + e.message);
    }

    try {
      const BatteryProgressIndicator = require('./src/components/BatteryProgressIndicator').default;
      console.log('✅ BatteryProgressIndicator imported successfully');
    } catch (e) {
      errors.push('BatteryProgressIndicator import failed: ' + e.message);
    }

    try {
      const CountdownTimer = require('./src/components/CountdownTimer').default;
      console.log('✅ CountdownTimer imported successfully');
    } catch (e) {
      errors.push('CountdownTimer import failed: ' + e.message);
    }

    try {
      const LiveClock = require('./src/components/LiveClock').default;
      console.log('✅ LiveClock imported successfully');
    } catch (e) {
      errors.push('LiveClock import failed: ' + e.message);
    }

    console.log('8. Testing our store...');
    try {
      const { useAppStore, hydrateAppStore } = require('./src/store/appStore');
      console.log('✅ App store imported successfully');
    } catch (e) {
      errors.push('App store import failed: ' + e.message);
    }

    console.log('9. Testing auth utilities...');
    try {
      const { useAuth } = require('./src/utils/auth/useAuth');
      console.log('✅ useAuth imported successfully');
    } catch (e) {
      errors.push('useAuth import failed: ' + e.message);
    }

    try {
      const useUser = require('./src/utils/auth/useUser').default;
      console.log('✅ useUser imported successfully');
    } catch (e) {
      errors.push('useUser import failed: ' + e.message);
    }

    console.log('10. Testing error boundaries...');
    try {
      const { DeviceErrorBoundaryWrapper } = require('./__create/DeviceErrorBoundary');
      console.log('✅ DeviceErrorBoundary imported successfully');
    } catch (e) {
      errors.push('DeviceErrorBoundary import failed: ' + e.message);
    }

    try {
      const { ErrorBoundaryWrapper, SharedErrorBoundary } = require('./__create/SharedErrorBoundary');
      console.log('✅ SharedErrorBoundary imported successfully');
    } catch (e) {
      errors.push('SharedErrorBoundary import failed: ' + e.message);
    }

    console.log('11. Testing app pages...');
    try {
      const RootLayout = require('./src/app/_layout').default;
      console.log('✅ RootLayout imported successfully');
    } catch (e) {
      errors.push('RootLayout import failed: ' + e.message);
    }

    try {
      const Index = require('./src/app/index').default;
      console.log('✅ Index imported successfully');
    } catch (e) {
      errors.push('Index import failed: ' + e.message);
    }

    try {
      const Onboarding = require('./src/app/onboarding').default;
      console.log('✅ Onboarding imported successfully');
    } catch (e) {
      errors.push('Onboarding import failed: ' + e.message);
    }

    console.log('12. Testing tab pages...');
    try {
      const TabLayout = require('./src/app/(tabs)/_layout').default;
      console.log('✅ TabLayout imported successfully');
    } catch (e) {
      errors.push('TabLayout import failed: ' + e.message);
    }

    try {
      const Dashboard = require('./src/app/(tabs)/dashboard').default;
      console.log('✅ Dashboard imported successfully');
    } catch (e) {
      errors.push('Dashboard import failed: ' + e.message);
    }

    try {
      const LAI = require('./src/app/(tabs)/lai').default;
      console.log('✅ LAI imported successfully');
    } catch (e) {
      errors.push('LAI import failed: ' + e.message);
    }

    try {
      const Lockmate = require('./src/app/(tabs)/lockmate').default;
      console.log('✅ Lockmate imported successfully');
    } catch (e) {
      errors.push('Lockmate import failed: ' + e.message);
    }

    try {
      const Progress = require('./src/app/(tabs)/progress').default;
      console.log('✅ Progress imported successfully');
    } catch (e) {
      errors.push('Progress import failed: ' + e.message);
    }

    try {
      const Profile = require('./src/app/(tabs)/profile').default;
      console.log('✅ Profile imported successfully');
    } catch (e) {
      errors.push('Profile import failed: ' + e.message);
    }

    console.log('13. Testing configuration files...');
    try {
      const constants = require('./config/constants');
      console.log('✅ Constants imported successfully');
    } catch (e) {
      errors.push('Constants import failed: ' + e.message);
    }

    console.log('14. Testing polyfills...');
    try {
      const polyfills = require('./src/__create/polyfills');
      console.log('✅ Polyfills imported successfully');
    } catch (e) {
      errors.push('Polyfills import failed: ' + e.message);
    }

    console.log('15. Testing metro utilities...');
    try {
      const reportError = require('./__create/report-error-to-remote');
      console.log('✅ Report error utility imported successfully');
    } catch (e) {
      errors.push('Report error utility import failed: ' + e.message);
    }

    try {
      const handleError = require('./__create/handle-resolve-request-error');
      console.log('✅ Handle error utility imported successfully');
    } catch (e) {
      errors.push('Handle error utility import failed: ' + e.message);
    }

    // Summary
    console.log('\n📊 TEST RESULTS:');
    console.log('================');
    
    if (errors.length === 0) {
      console.log('🎉 ALL IMPORTS SUCCESSFUL! 🎉');
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
    } else {
      console.log('❌ ERRORS FOUND:');
      errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }

    if (warnings.length > 0) {
      console.log('\n⚠️ WARNINGS:');
      warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }

  } catch (error) {
    console.error('❌ CRITICAL ERROR:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

testAllImports();
