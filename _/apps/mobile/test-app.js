// Simple test to verify the app can be imported
console.log('Testing app imports...');

try {
  // Test basic React Native imports
  const React = require('react');
  console.log('✓ React imported successfully');
  
  // Test Expo Router
  const { Stack } = require('expo-router');
  console.log('✓ Expo Router imported successfully');
  
  // Test our components
  const ErrorBoundary = require('./src/components/ErrorBoundary').default;
  console.log('✓ ErrorBoundary imported successfully');
  
  const BatteryProgressIndicator = require('./src/components/BatteryProgressIndicator').default;
  console.log('✓ BatteryProgressIndicator imported successfully');
  
  const CountdownTimer = require('./src/components/CountdownTimer').default;
  console.log('✓ CountdownTimer imported successfully');
  
  const LiveClock = require('./src/components/LiveClock').default;
  console.log('✓ LiveClock imported successfully');
  
  // Test store
  const { useAppStore } = require('./src/store/appStore');
  console.log('✓ App store imported successfully');
  
  console.log('🎉 All imports successful! App should work.');
  
} catch (error) {
  console.error('❌ Import error:', error.message);
  console.error('Stack trace:', error.stack);
}
