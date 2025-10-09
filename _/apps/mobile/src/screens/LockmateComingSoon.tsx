import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';

export default function LockmateComingSoon() {
  const { colors, spacing } = useTheme();

  const features = [
    {
      icon: 'people',
      title: 'Find Accountability Partners',
      description: 'Connect with others on similar learning journeys'
    },
    {
      icon: 'chatbubbles',
      title: 'Group Challenges',
      description: 'Join or create challenges with your lockmates'
    },
    {
      icon: 'trophy',
      title: 'Leaderboards',
      description: 'Compete and see how you rank against peers'
    },
    {
      icon: 'calendar',
      title: 'Study Sessions',
      description: 'Schedule and join virtual study sessions'
    }
  ];

  const renderFeature = (feature: any, index: number) => (
    <View key={index} style={[styles.featureCard, { backgroundColor: colors.surface }]}>
      <View style={[styles.featureIcon, { backgroundColor: colors.primary }]}>
        <Ionicons name={feature.icon as any} size={24} color="white" />
      </View>
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, { color: colors.text }]}>
          {feature.title}
        </Text>
        <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
          {feature.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
            <Ionicons name="people" size={48} color="white" />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Lockmate Coming Soon
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Connect with fellow learners and build together. The community features are in development and will be available soon.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={[styles.featuresTitle, { color: colors.text }]}>
            What's Coming
          </Text>
          {features.map(renderFeature)}
        </View>

        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={[styles.notifyButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              // TODO: Implement notification signup
            }}
          >
            <Ionicons name="notifications" size={20} color="white" />
            <Text style={styles.notifyButtonText}>
              Notify Me When Ready
            </Text>
          </TouchableOpacity>
          
          <Text style={[styles.ctaSubtext, { color: colors.textSecondary }]}>
            We'll let you know as soon as Lockmate is available
          </Text>
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
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  ctaContainer: {
    alignItems: 'center',
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  notifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  ctaSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
