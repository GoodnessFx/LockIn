import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/appStore';
import Animated, { FadeIn, FadeOut, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { ArrowRight, Target, Users, BookOpen, Lock, Linkedin, Twitter } from 'lucide-react-native';
import { Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setOnboarded = useAppStore((s) => s.setOnboarded);

  const handleGetStarted = async () => {
    await setOnboarded(true);
    router.replace('/(tabs)/dashboard');
  };

  const handleSocialLink = (url) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const features = [
    {
      icon: <Target size={32} color="#6C5CE7" />,
      title: "97-Day Commitment",
      description: "Transform your life with a proven 97-day sprint system"
    },
    {
      icon: <BookOpen size={32} color="#6C5CE7" />,
      title: "AI Learning Coach",
      description: "Personalized curriculum and motivational guidance"
    },
    {
      icon: <Users size={32} color="#6C5CE7" />,
      title: "Lockmate Community",
      description: "Connect with accountability partners and mentors"
    },
    {
      icon: <Lock size={32} color="#6C5CE7" />,
      title: "Commitment Battery",
      description: "Track your energy and stay locked in to your goals"
    }
  ];

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withTiming(1, { duration: 600 });
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: '#ffffff' }]}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Animated.View entering={FadeIn.duration(600)} style={styles.logoContainer}>
            <Lock size={48} color="#6C5CE7" />
          </Animated.View>
          <Animated.Text entering={FadeIn.duration(600)} style={styles.title}>LockIn</Animated.Text>
          <Text style={styles.subtitle}>Dial in. Build relentlessly. Win together.</Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          {features.map((feature, index) => (
            <Animated.View key={index} style={[styles.featureCard, animatedStyle]}>
              <View style={styles.featureIcon}>
                {feature.icon}
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleGetStarted}
            activeOpacity={0.7}
          >
            <Text style={styles.ctaText}>Get Started</Text>
            <ArrowRight size={20} color="#ffffff" />
          </TouchableOpacity>
          
          <Text style={styles.ctaSubtext}>
            Join thousands building their dreams
          </Text>
          
          {/* Social Media Links */}
          <View style={styles.socialLinks}>
            <TouchableOpacity
              onPress={() => handleSocialLink('https://linkedin.com/company/lockin')}
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              <Linkedin size={24} color="#6C5CE7" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSocialLink('https://twitter.com/lockin')}
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              <Twitter size={24} color="#6C5CE7" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C5CE710',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0b0b0f',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 40,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6C5CE710',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  ctaSubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 20,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
