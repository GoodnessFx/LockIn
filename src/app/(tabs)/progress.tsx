import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '@/theme/theme';
import { useAppStore, AppState, CurriculumItem } from '@/store/appStore';
import BatteryProgressIndicator from '@/components/BatteryProgressIndicator';

const Milestone = ({ day, title, completed, locked }: { day: number; title: string; completed: boolean; locked: boolean }) => (
  <View style={[styles.milestoneItem, locked && styles.milestoneLocked]}>
    <View style={styles.milestoneLeft}>
      <View style={[
        styles.milestoneIcon, 
        completed ? styles.milestoneCompleted : (locked ? styles.milestoneLockedIcon : styles.milestoneActive)
      ]}>
        {completed ? (
          <Ionicons name="checkmark" size={16} color="#FFF" />
        ) : locked ? (
          <Ionicons name="lock-closed" size={14} color={colors.textTertiary} />
        ) : (
          <Text style={styles.milestoneDayText}>{day}</Text>
        )}
      </View>
      <View style={styles.milestoneLine} />
    </View>
    <View style={styles.milestoneContent}>
      <Text style={[styles.milestoneTitle, locked && styles.textLocked]}>Day {day}: {title}</Text>
      <Text style={[styles.milestoneStatus, locked && styles.textLocked]}>
        {completed ? 'Completed' : locked ? 'Locked' : 'In Progress'}
      </Text>
    </View>
  </View>
);

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const progress = useAppStore((s: AppState) => s.progress);
  const curriculum = useAppStore((s: AppState) => s.curriculum);
  const updateProgress = useAppStore((s: AppState) => s.updateProgress);
  const markTaskComplete = useAppStore((s: AppState) => s.markTaskComplete);

  // Mock curriculum if empty (fallback)
  const displayCurriculum: CurriculumItem[] = curriculum.length > 0 ? curriculum : [
    { id: '1', day: 1, title: 'Commitment & Setup', description: 'Set up your environment', completed: true, type: 'milestone', estimatedTime: 30 },
    { id: '2', day: 2, title: 'Dopamine Detox', description: 'Remove distractions', completed: false, type: 'learning', estimatedTime: 45 },
    { id: '3', day: 3, title: 'Goal Visualization', description: 'Visualize your success', completed: false, type: 'practice', estimatedTime: 20 },
    { id: '7', day: 7, title: 'First Week Review', description: 'Review your progress', completed: false, type: 'milestone', estimatedTime: 60 },
    { id: '30', day: 30, title: 'Habit Formation', description: 'Solidify your habits', completed: false, type: 'milestone', estimatedTime: 60 },
    { id: '97', day: 97, title: 'Transformation Complete', description: 'Celebrate your journey', completed: false, type: 'milestone', estimatedTime: 0 },
  ];

  const handleCompleteDay = (day: number) => {
    if (day > progress.currentDay) return;
    const taskId = `day-${day}`;
    if (progress.completedTasks.includes(taskId)) return;
    markTaskComplete(taskId);
    const nextDay = Math.min(progress.currentDay + 1, progress.totalDays);
    const nextStreak = progress.streak + 1;
    const dayRatio = nextDay / progress.totalDays;
    const totalTasks = curriculum.length;
    const doneTasks = totalTasks > 0 ? curriculum.filter(t => t.completed).length : progress.completedTasks.length;
    const taskRatio = totalTasks > 0 ? doneTasks / totalTasks : (progress.completedTasks.length + 1) / Math.max(1, progress.totalDays);
    const blended = 0.5 * dayRatio + 0.5 * taskRatio;
    const nextBattery = Math.max(0, Math.min(100, Math.round(blended * 100)));
    updateProgress({
      currentDay: nextDay,
      streak: nextStreak,
      batteryLevel: nextBattery,
      lastActiveDate: new Date().toISOString(),
    });
    Alert.alert('Progress Updated', `Day ${day} completed.`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Journey</Text>
        <Text style={styles.headerSubtitle}>{progress.currentDay} of {progress.totalDays} Days</Text>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Battery Indicator Section */}
        <View style={styles.batterySection}>
          <BatteryProgressIndicator />
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{progress.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{((progress.currentDay / progress.totalDays) * 100).toFixed(0)}%</Text>
              <Text style={styles.statLabel}>Complete</Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          <View style={styles.timelineContainer}>
            {displayCurriculum.map((item, index) => (
              <TouchableOpacity
                key={item.id || index}
                activeOpacity={item.day === progress.currentDay ? 0.7 : 1}
                onPress={() => handleCompleteDay(item.day)}
              >
                <Milestone 
                  day={item.day}
                  title={item.title}
                  completed={progress.completedTasks.includes(`day-${item.day}`) || item.day < progress.currentDay}
                  locked={item.day > progress.currentDay}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.backgroundColor,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  batterySection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.borderColor,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  timelineSection: {
    marginBottom: spacing.xl,
  },
  timelineContainer: {
    paddingLeft: spacing.sm,
  },
  milestoneItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    height: 60,
  },
  milestoneLocked: {
    opacity: 0.7,
  },
  milestoneLeft: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 30,
  },
  milestoneIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  milestoneCompleted: {
    backgroundColor: colors.successColor,
  },
  milestoneActive: {
    backgroundColor: colors.primaryDark,
  },
  milestoneLockedIcon: {
    backgroundColor: colors.surfaceColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  milestoneDayText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  milestoneLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.borderColor,
    marginTop: -4,
    marginBottom: -14, // Connect to next item
  },
  milestoneContent: {
    flex: 1,
    justifyContent: 'center',
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  milestoneStatus: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  textLocked: {
    color: colors.textTertiary,
  },
});
