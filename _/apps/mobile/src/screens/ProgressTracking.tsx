import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';
import { useAppStore } from '../store/appStore';
import { APP_CONFIG } from '../../config/constants';

export default function ProgressTracking() {
  const { colors, spacing } = useTheme();
  const { progress, curriculum } = useAppStore();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'calendar' | 'recovery'>('overview');

  const getProgressStats = () => {
    const totalTasks = curriculum.length;
    const completedTasks = curriculum.filter(item => item.completed).length;
    const missedDays = progress.missedDays.length;
    const currentStreak = progress.streak;
    const longestStreak = Math.max(currentStreak, 0); // TODO: Track longest streak
    
    return {
      totalTasks,
      completedTasks,
      missedDays,
      currentStreak,
      longestStreak,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    };
  };

  const stats = getProgressStats();

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Ionicons name="checkmark-circle" size={32} color={colors.success} />
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {stats.completedTasks}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Tasks Completed
          </Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Ionicons name="flame" size={32} color={colors.warning} />
          <Text style={[styles.statNumber, { color: colors.warning }]}>
            {stats.currentStreak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Current Streak
          </Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Ionicons name="trophy" size={32} color={colors.accent} />
          <Text style={[styles.statNumber, { color: colors.accent }]}>
            {stats.longestStreak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Longest Streak
          </Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Ionicons name="trending-up" size={32} color={colors.primary} />
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {Math.round(stats.completionRate)}%
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Completion Rate
          </Text>
        </View>
      </View>

      <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Weekly Progress
        </Text>
        <View style={styles.weekProgress}>
          {Array.from({ length: Math.ceil(APP_CONFIG.CURRICULUM_DAYS / 7) }, (_, i) => {
            const weekNumber = i + 1;
            const weekTasks = curriculum.filter(item => {
              const startDay = (weekNumber - 1) * 7 + 1;
              const endDay = weekNumber * 7;
              return item.day >= startDay && item.day <= endDay;
            });
            const completed = weekTasks.filter(item => item.completed).length;
            const progress = weekTasks.length > 0 ? (completed / weekTasks.length) * 100 : 0;
            
            return (
              <View key={weekNumber} style={styles.weekBar}>
                <Text style={[styles.weekLabel, { color: colors.textSecondary }]}>
                  W{weekNumber}
                </Text>
                <View style={[styles.progressBar, { backgroundColor: colors.textSecondary }]}>
                  <View style={[
                    styles.progressFill,
                    { 
                      width: `${progress}%`,
                      backgroundColor: progress === 100 ? colors.success : colors.primary
                    }
                  ]} />
                </View>
                <Text style={[styles.weekProgressText, { color: colors.textSecondary }]}>
                  {Math.round(progress)}%
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {stats.missedDays > 0 && (
        <View style={[styles.recoveryCard, { backgroundColor: colors.surface }]}>
          <View style={styles.recoveryHeader}>
            <Ionicons name="warning" size={24} color={colors.warning} />
            <Text style={[styles.recoveryTitle, { color: colors.text }]}>
              Recovery Needed
            </Text>
          </View>
          <Text style={[styles.recoveryText, { color: colors.textSecondary }]}>
            You've missed {stats.missedDays} days. Tap below to create a recovery plan.
          </Text>
          <TouchableOpacity
            style={[styles.recoveryButton, { backgroundColor: colors.warning }]}
            onPress={() => setSelectedTab('recovery')}
          >
            <Text style={styles.recoveryButtonText}>Create Recovery Plan</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderCalendar = () => (
    <View style={styles.tabContent}>
      <Text style={[styles.comingSoon, { color: colors.textSecondary }]}>
        Calendar view coming soon...
      </Text>
    </View>
  );

  const renderRecovery = () => (
    <View style={styles.tabContent}>
      <View style={[styles.recoveryPlan, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Recovery Plan
        </Text>
        <Text style={[styles.recoveryDescription, { color: colors.textSecondary }]}>
          Here's your personalized plan to get back on track:
        </Text>
        
        <View style={styles.recoverySteps}>
          <View style={styles.recoveryStep}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Complete 2 micro-tasks today to rebuild momentum
            </Text>
          </View>
          
          <View style={styles.recoveryStep}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Focus on the most important tasks from missed days
            </Text>
          </View>
          
          <View style={styles.recoveryStep}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Set smaller daily goals to avoid overwhelm
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.startRecoveryButton, { backgroundColor: colors.success }]}
        >
          <Text style={styles.startRecoveryButtonText}>Start Recovery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabButton = (tab: 'overview' | 'calendar' | 'recovery', title: string, icon: string) => (
    <TouchableOpacity
      key={tab}
      style={[
        styles.tabButton,
        { 
          backgroundColor: selectedTab === tab ? colors.primary : colors.surface,
          borderColor: selectedTab === tab ? colors.primary : colors.textSecondary
        }
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Ionicons 
        name={icon as any} 
        size={20} 
        color={selectedTab === tab ? 'white' : colors.textSecondary} 
      />
      <Text style={[
        styles.tabButtonText,
        { color: selectedTab === tab ? 'white' : colors.textSecondary }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.tabBar}>
        {renderTabButton('overview', 'Overview', 'analytics-outline')}
        {renderTabButton('calendar', 'Calendar', 'calendar-outline')}
        {renderTabButton('recovery', 'Recovery', 'refresh-outline')}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, { padding: spacing.md }]}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'calendar' && renderCalendar()}
        {selectedTab === 'recovery' && renderRecovery()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  tabContent: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  progressCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  weekProgress: {
    gap: 12,
  },
  weekBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: '600',
    width: 30,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  weekProgressText: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  recoveryCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recoveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  recoveryTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  recoveryText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  recoveryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  recoveryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  recoveryPlan: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recoveryDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  recoverySteps: {
    marginBottom: 24,
  },
  recoveryStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  startRecoveryButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  startRecoveryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  comingSoon: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});
