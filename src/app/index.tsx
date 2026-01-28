import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const router = useRouter();
  const { hasOnboarded, authToken, userProfile, setOnboarded } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing app...');
        // App store hydration is handled automatically by Zustand persist middleware
        // We just wait a bit for the splash screen
        
        // Show splash screen for 3 seconds to feel responsive
        setTimeout(() => {
          console.log('Splash screen timeout reached');
          if (!authToken && !userProfile && hasOnboarded) {
            setOnboarded(false);
          }
          setShowSplash(false);
          setIsLoading(false);
        }, 3000);
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
      if (authToken) {
        router.replace('/(tabs)/dashboard');
      } else {
        router.replace('/sign-in');
      }
    }
  }, [isLoading, showSplash, router, authToken]);

  if (showSplash) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <LinearGradient
          colors={['#000000', '#000000', '#FFFFFF']}
          locations={[0.0, 0.5, 1.0]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* App Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons name="lock-closed" size={60} color="black" style={styles.logoIcon} />
              </View>
            </View>

            {/* App Name */}
            <Text style={styles.appName}>LockIn</Text>
            <Text style={styles.tagline}>Accelerate Your Growth</Text>

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
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    transform: [{ translateX: -6 }],
  },
  appName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#CCCCCC',
    marginBottom: 60,
    letterSpacing: 1,
  },
  statusContainer: {
    width: '80%',
    alignItems: 'center',
  },
  statusBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  },
  statusProgress: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  statusText: {
    color: '#888888',
    fontSize: 12,
  },
});
