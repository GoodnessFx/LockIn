import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, typography, spacing, shadows } from '@/theme/theme';
import { useAuth } from "@/utils/auth/useAuth";
import { useAppStore } from "@/store/appStore";
import BatteryProgressIndicator from "@/components/BatteryProgressIndicator";
import CountdownTimer from "@/components/CountdownTimer";
import LiveClock from "@/components/LiveClock";

// Replace emoji icons with Ionicons for a professional, consistent look
const Target = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="flag-outline" size={size || 20} color={color || '#333'} />
);
const Clock = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="time-outline" size={size || 20} color={color || '#333'} />
);
const TrendingUp = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="stats-chart-outline" size={size || 20} color={color || '#333'} />
);
const Plus = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="add-outline" size={size || 20} color={color || '#333'} />
);
const Calendar = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="calendar-outline" size={size || 20} color={color || '#333'} />
);
const CheckCircle = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="checkmark-circle-outline" size={size || 20} color={color || '#333'} />
);
const Zap = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="flash-outline" size={size || 20} color={color || '#333'} />
);
const Activity = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="bar-chart-outline" size={size || 20} color={color || '#333'} />
);
const Award = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="trophy-outline" size={size || 20} color={color || '#333'} />
);
const Play = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="play-outline" size={size || 20} color={color || '#333'} />
);
const Pause = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="pause-outline" size={size || 20} color={color || '#333'} />
);
const RotateCcw = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="refresh-outline" size={size || 20} color={color || '#333'} />
);
const Users = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="people-outline" size={size || 20} color={color || '#333'} />
);

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth();
  const userProfile = useAppStore((s: AppState) => s.userProfile);
  const progress = useAppStore((s: AppState) => s.progress);
  const updateProgress = useAppStore((s: AppState) => s.updateProgress);

  const [refreshing, setRefreshing] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // Focus timer state
  const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutes in seconds
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [focusMode, setFocusMode] = useState<'work' | 'break' | 'longBreak'>('work'); 

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const toggleFocusTimer = () => {
    setIsFocusRunning(!isFocusRunning);
  };

  const resetFocusTimer = () => {
    setIsFocusRunning(false);
    setFocusTime(25 * 60);
    setFocusMode('work');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.userName}>{userProfile?.name || 'LockIn Member'}</Text>
        </View>
        <View style={styles.headerRight}>
          <LiveClock />
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.avatarPlaceholder}>
               <Text style={styles.avatarText}>
                 {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
               </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Battery Progress Indicator */}
        <View style={styles.section}>
          <BatteryProgressIndicator level={progress.batteryLevel} />
        </View>

        {/* Countdown Timer */}
        <View style={styles.section}>
          <CountdownTimer />
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#E3F2FD' }]}>
              <Target color="#2196F3" />
            </View>
            <Text style={styles.statValue}>{progress.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
              <CheckCircle color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{progress.completedTasks.length}</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
              <Zap color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{progress.batteryLevel}%</Text>
            <Text style={styles.statLabel}>Energy</Text>
          </View>
        </View>

        {/* Focus Timer */}
        <View style={styles.focusCard}>
          <View style={styles.focusHeader}>
            <Text style={styles.focusTitle}>Deep Work Session</Text>
            <View style={styles.focusBadge}>
              <Text style={styles.focusBadgeText}>{focusMode === 'work' ? 'FOCUS' : 'BREAK'}</Text>
            </View>
          </View>
          
          <View style={styles.timerDisplay}>
            <Text style={styles.timerText}>
              {Math.floor(focusTime / 60).toString().padStart(2, '0')}:
              {(focusTime % 60).toString().padStart(2, '0')}
            </Text>
          </View>
          
          <View style={styles.timerControls}>
            <TouchableOpacity 
              style={[styles.controlButton, styles.playButton]}
              onPress={toggleFocusTimer}
            >
              {isFocusRunning ? <Pause color="#FFF" /> : <Play color="#FFF" />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlButton, styles.resetButton]}
              onPress={resetFocusTimer}
            >
              <RotateCcw color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Protocol</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.taskCard}>
            <View style={styles.taskLeft}>
              <View style={styles.checkbox}>
                <CheckCircle size={20} color="#ccc" />
              </View>
              <View>
                <Text style={styles.taskTitle}>Morning Deep Work</Text>
                <Text style={styles.taskSubtitle}>08:00 - 10:00 • Critical</Text>
              </View>
            </View>
            <View style={styles.taskRight}>
               <Activity color="#666" size={16} />
            </View>
          </View>

          <View style={styles.taskCard}>
            <View style={styles.taskLeft}>
              <View style={styles.checkbox}>
                 <CheckCircle size={20} color="#ccc" />
              </View>
              <View>
                <Text style={styles.taskTitle}>Skill Acquisition</Text>
                <Text style={styles.taskSubtitle}>14:00 - 15:30 • High Priority</Text>
              </View>
            </View>
            <View style={styles.taskRight}>
               <Award color="#666" size={16} />
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  greeting: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  userName: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  profileButton: {
    marginTop: spacing.xs,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  avatarText: {
    ...typography.h3,
    color: colors.primaryDark,
  },
  scrollContent: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  seeAllText: {
    ...typography.body,
    color: colors.primaryDark,
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '31%',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h2,
    fontSize: 20,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  focusCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  focusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  focusTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  focusBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  focusBadgeText: {
    color: '#2196F3',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  timerText: {
    ...typography.h1,
    fontSize: 56,
    fontVariant: ['tabular-nums'],
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: colors.primaryDark,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  resetButton: {
    backgroundColor: colors.surfaceColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  taskCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  taskSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  taskRight: {
    padding: 4,
  }
});
