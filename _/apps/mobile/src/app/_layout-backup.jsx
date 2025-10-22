import React from "react";
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <LinearGradient
        colors={['#2563eb', '#3b82f6', '#FFFFFF']}
        locations={[0.0, 0.5, 1.0]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* App Logo/Icon */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🔒</Text>
            </View>
          </View>

          {/* App Name */}
          <Text style={styles.appName}>LockIn</Text>

          {/* Tagline */}
          <Text style={styles.tagline}>Accelerate Your Growth</Text>

          {/* Feature Cards */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📚</Text>
              <Text style={styles.featureTitle}>Learning</Text>
              <Text style={styles.featureDescription}>Structured curriculum for your growth</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureTitle}>Progress</Text>
              <Text style={styles.featureDescription}>Track your 97-day journey</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureTitle}>AI Coach</Text>
              <Text style={styles.featureDescription}>Personalized guidance and support</Text>
            </View>
          </View>

          {/* Status */}
          <View style={styles.statusContainer}>
            <View style={styles.statusBar}>
              <View style={styles.statusProgress} />
            </View>
            <Text style={styles.statusText}>Ready to launch...</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#2563eb',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#2563eb',
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
    color: '#0b0b0f',
    letterSpacing: 3.0,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 20,
    color: '#6c757d',
    letterSpacing: 1.0,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 48,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 48,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
  },
  statusContainer: {
    alignItems: 'center',
    width: '100%',
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
    width: '70%',
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