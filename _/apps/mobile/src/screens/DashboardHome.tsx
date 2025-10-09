import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';
import { useAppStore } from '../store/appStore';
import CountdownTimer from '../components/CountdownTimer';
import BatteryProgressIndicator from '../components/BatteryProgressIndicator';
import LiveClock from '../components/LiveClock';
import { APP_CONFIG } from '../../config/constants';

export default function DashboardHome() {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { progress, userProfile } = useAppStore();

  const calculateBatteryLevel = () => {
    const daysCompleted = progress.currentDay - 1;
    const totalDays = progress.totalDays;
    return Math.max(0, Math.min(100, (daysCompleted / totalDays) * 100));
  };

  const getStreakMessage = () => {
    if (progress.streak === 0) return "Start your streak today!";
    if (progress.streak < 7) return `${progress.streak} day streak - Keep going!`;
    if (progress.streak < 30) return `${progress.streak} day streak - Amazing!`;
    return `${progress.streak} day streak - You're unstoppable!`;
  };

  const quickActions = [
    { id: 'learn', title: 'Continue Learning', icon: 'school-outline', color: colors.primary },
    { id: 'progress', title: 'View Progress', icon: 'trending-up-outline', color: colors.success },
    { id: 'ai', title: 'Ask AI Coach', icon: 'chatbubble-outline', color: colors.accent },
    { id: 'lockmate', title: 'Find Lockmate', icon: 'people-outline', color: colors.warning },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={[styles.contentContainer, { padding: spacing.md }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with greeting */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
          </Text>
          <Text style={[styles.userName, { color: colors.text }]}>
            {userProfile?.name || 'Champion'}
          </Text>
        </View>
        <LiveClock size="small" showDate={false} />
      </View>

      {/* Main countdown card */}
      <View style={[styles.mainCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Your {APP_CONFIG.COMMITMENT_DAYS}-Day Commitment
        </Text>
        <CountdownTimer commitmentStartDate={progress.lastActiveDate} />
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
          {progress.currentDay} of {progress.totalDays} days completed
        </Text>
      </View>

      {/* Progress indicators row */}
      <View style={styles.progressRow}>
        <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
          <BatteryProgressIndicator 
            level={calculateBatteryLevel()} 
            size="medium" 
            showPercentage={true}
          />
          <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
            Progress
          </Text>
        </View>
        
        <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={32} color={colors.warning} />
            <Text style={[styles.streakNumber, { color: colors.text }]}>
              {progress.streak}
            </Text>
          </View>
          <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
            Day Streak
          </Text>
        </View>
      </View>

      {/* Streak message */}
      <View style={[styles.streakMessage, { backgroundColor: colors.surface }]}>
        <Ionicons name="trophy" size={20} color={colors.success} />
        <Text style={[styles.streakText, { color: colors.text }]}>
          {getStreakMessage()}
        </Text>
      </View>

      {/* Today's focus */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Focus</Text>
        <View style={styles.focusRow}>
          <View style={[styles.focusBox, { backgroundColor: colors.surface }]}>
            <Ionicons name="brain-outline" size={24} color={colors.primary} />
            <Text style={[styles.focusText, { color: colors.text }]}>
              Deep Work
            </Text>
            <Text style={[styles.focusTime, { color: colors.textSecondary }]}>
              2 hours
            </Text>
          </View>
          <View style={[styles.focusBox, { backgroundColor: colors.surface }]}>
            <Ionicons name="fitness-outline" size={24} color={colors.success} />
            <Text style={[styles.focusText, { color: colors.text }]}>
              Exercise
            </Text>
            <Text style={[styles.focusTime, { color: colors.textSecondary }]}>
              30 min
            </Text>
          </View>
        </View>
      </View>

      {/* Quick actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionButton, { backgroundColor: colors.surface }]}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon as any} size={24} color="white" />
              </View>
              <Text style={[styles.actionText, { color: colors.text }]}>
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100, // Account for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  mainCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  progressRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  progressCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  streakContainer: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  streakMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  focusRow: {
    flexDirection: 'row',
    gap: 12,
  },
  focusBox: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  focusText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  focusTime: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

