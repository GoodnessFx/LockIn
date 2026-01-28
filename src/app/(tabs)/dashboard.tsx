import React, { useEffect, useState } from "react";
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
import { useAppStore, AppState } from "@/store/appStore";
import * as Animatable from 'react-native-animatable';
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [pausedDuringSession, setPausedDuringSession] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // Focus timer state
  const [focusTime, setFocusTime] = useState(57 * 60); // 57 minutes in seconds
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [focusMode, setFocusMode] = useState<'work' | 'break' | 'longBreak'>('work'); 

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const toggleFocusTimer = () => {
    if (isFocusRunning) {
      setIsFocusRunning(false);
      setPausedDuringSession(true);
    } else {
      setIsFocusRunning(true);
      if (focusTime === 57 * 60) {
        setPausedDuringSession(false);
      }
    }
  };

  const resetFocusTimer = () => {
    setIsFocusRunning(false);
    setFocusTime(57 * 60);
    setFocusMode('work');
    setPausedDuringSession(false);
  };

  useEffect(() => {
    if (!progress.endDateISO) {
      const start = progress.startDateISO ? new Date(progress.startDateISO) : new Date();
      const end = new Date(start.getTime() + (progress.totalDays * 24 * 60 * 60 * 1000));
      updateProgress({
        startDateISO: start.toISOString(),
        endDateISO: end.toISOString(),
        totalDays: progress.totalDays || 97
      });
    }
  }, []);

  useEffect(() => {
    if (!isFocusRunning) return;
    const id = setInterval(() => {
      setFocusTime((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isFocusRunning]);

  useEffect(() => {
    if (focusTime === 0) {
      setIsFocusRunning(false);
      if (!pausedDuringSession) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
      setFocusTime(57 * 60);
      setFocusMode('work');
      setPausedDuringSession(false);
    }
  }, [focusTime, pausedDuringSession]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>LockedIn</Text>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.userName}>{userProfile?.name || 'LockIn Member'}</Text>
        </View>
        <View style={styles.headerRight}>
          <LiveClock />
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
          <BatteryProgressIndicator />
        </View>

        {/* Countdown Timer */}
        <View style={styles.section}>
          <CountdownTimer 
            targetDate={progress.endDateISO ? new Date(progress.endDateISO) : undefined}
            onComplete={() => {
              updateProgress({ isLocked: true, currentDay: progress.totalDays });
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 4000);
            }}
          />
          {showConfetti && (
            <View style={styles.confettiOverlay} pointerEvents="none">
              {[...Array(12)].map((_, i) => (
                <Animatable.Text
                  key={i}
                  animation="bounceInDown"
                  iterationCount={1}
                  delay={i * 100}
                  style={styles.confettiPiece}
                >
                  *
                </Animatable.Text>
              ))}
              <Text style={styles.confettiTitle}>Achievement Unlocked</Text>
            </View>
          )}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Target color={colors.textSecondary} />
            </View>
            <Text style={styles.statValue}>{progress.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <CheckCircle color={colors.textSecondary} />
            </View>
            <Text style={styles.statValue}>{progress.completedTasks.length}</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Zap color={colors.textSecondary} />
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
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginTop: spacing.xs,
  },
  brand: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
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
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.primaryDark,
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
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
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
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
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
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    fontVariant: ['tabular-nums'],
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginRight: spacing.md,
  },
  resetButton: {
    backgroundColor: colors.surfaceColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginLeft: spacing.md,
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
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  taskTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  taskSubtitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  taskRight: {
    padding: 4,
  },
  confettiOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: spacing.xl,
  },
  confettiPiece: {
    fontSize: 24,
    color: '#ff9800',
    marginBottom: 4,
  },
  confettiTitle: {
    marginTop: spacing.md,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  }
});
