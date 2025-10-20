// Polyfills and global setup
import 'react-native-url-polyfill/auto';
import './src/__create/polyfills';

// Set up global Buffer for Node.js compatibility
global.Buffer = require('buffer').Buffer;

// Import reanimated after polyfills
import 'react-native-reanimated';

// Error handling for early initialization
try {
  import('expo-router/entry');
} catch (error) {
  console.error('Failed to load expo-router/entry:', error);
  // Fallback initialization
  const { AppRegistry } = require('react-native');
  AppRegistry.registerComponent('main', () => () => null);
}