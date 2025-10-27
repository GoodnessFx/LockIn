import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { hydrateAppStore } from '@/store/appStore';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const router = useRouter();
  const { hasOnboarded } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing app...');
        // Hydrate the app store with persisted data
        await hydrateAppStore();
        console.log('App store hydrated');
        
        // Show splash screen for 4 seconds
        setTimeout(() => {
          console.log('Splash screen timeout reached');
          setShowSplash(false);
          setIsLoading(false);
        }, 4000);
      } catch (error) {
        console.error('Error initializing app:', error);
        setShowSplash(false);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (!isLoading && !showSplash) {
      // Always navigate to onboarding screen first
      console.log('Always navigating to onboarding screen first');
      try {
        // Force navigation to onboarding screen regardless of hasOnboarded status
        console.log('Navigating to onboarding');
        router.replace('onboarding');
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to onboarding if navigation fails
        router.replace('onboarding');
      }
    }
  }, [isLoading, showSplash, router]);

  if (showSplash) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <LinearGradient
          colors={['#000000FF', '#000000FF', '#FFFFFF']}
          locations={[0.0, 0.5, 1.0]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* App Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}> <Ionicons name="lock-closed" size={60} color="black" /></Text>
              </View>
            </View>

            {/* App Name */}
            <Text style={styles.appName}>LockIn</Text>
            <Text style={styles.tagline}>Accelerate Your Growth... </Text>

            {/* Loading Status */}
            <View style={styles.statusContainer}>
              <View style={styles.statusBar}>
                <View style={styles.statusProgress} />
              </View>
              <Text style={styles.statusText}>Loading your journey...  </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Return null while navigating
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000FF',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#020202FF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  logoText: {
    fontSize: 48,
    color: '#ffffff',
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FAFAFFFF',
    letterSpacing: 3.0,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 20,
    color: '#9CA6AEFF',
    letterSpacing: 1.0,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 48,
  },
  statusContainer: {
    alignItems: 'center',
    width: '150%',
  },
  statusBar: {
    width: 280,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusProgress: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  statusText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});