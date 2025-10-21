import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <LinearGradient
        colors={['#2563eb', '#3b82f6', '#FFFFFF']}
        locations={[0.0, 0.3, 1.0]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to LockIn</Text>
          <Text style={styles.subtitle}>Your 97-day growth journey starts here</Text>
        </View>

        <View style={styles.mainContent}>
          {/* Dashboard Card */}
          <View style={styles.card}>
            <Text style={styles.cardIcon}>📊</Text>
            <Text style={styles.cardTitle}>Dashboard</Text>
            <Text style={styles.cardDescription}>
              Track your progress, view statistics, and monitor your growth journey.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>View Dashboard</Text>
            </TouchableOpacity>
          </View>

          {/* Learning Card */}
          <View style={styles.card}>
            <Text style={styles.cardIcon}>📚</Text>
            <Text style={styles.cardTitle}>Learning Hub</Text>
            <Text style={styles.cardDescription}>
              Access your personalized curriculum and learning materials.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Start Learning</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Card */}
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🎯</Text>
            <Text style={styles.cardTitle}>Progress Tracker</Text>
            <Text style={styles.cardDescription}>
              Monitor your daily progress and maintain your streak.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Track Progress</Text>
            </TouchableOpacity>
          </View>

          {/* AI Coach Card */}
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🤖</Text>
            <Text style={styles.cardTitle}>AI Coach</Text>
            <Text style={styles.cardDescription}>
              Get personalized guidance and support from your AI assistant.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Chat with AI</Text>
            </TouchableOpacity>
          </View>

          {/* Community Card */}
          <View style={styles.card}>
            <Text style={styles.cardIcon}>👥</Text>
            <Text style={styles.cardTitle}>Community</Text>
            <Text style={styles.cardDescription}>
              Connect with like-minded individuals on similar journeys.
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Join Community</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Ready to accelerate your growth?</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0b0b0f',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cardButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#2563eb',
    fontSize: 18,
    fontWeight: '700',
  },
});