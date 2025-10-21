import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Replaced lucide-react-native icons with emoji/text alternatives
const Calendar = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📅</Text>;
const Target = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🎯</Text>;
const Trophy = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🏆</Text>;
const TrendingUp = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📈</Text>;
const Clock = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🕐</Text>;
const Award = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🏆</Text>;

const { width } = Dimensions.get('window');

const ProgressTracker = () => {
  const [progressData] = useState({
    currentDay: 1,
    totalDays: 97,
    overallProgress: 1,
    totalHoursStudied: 0,
    completedTasks: 0,
    totalTasks: 0,
    streak: 0,
    bestStreak: 0,
    milestones: [
      { day: 7, title: 'First Week Complete', completed: false },
      { day: 14, title: 'Two Weeks Strong', completed: false },
      { day: 21, title: 'Three Week Warrior', completed: false },
      { day: 30, title: 'Month One Master', completed: false },
      { day: 45, title: 'Halfway Hero', completed: false },
      { day: 60, title: 'Two Month Titan', completed: false },
      { day: 75, title: 'Three Quarter Champion', completed: false },
      { day: 90, title: 'Almost There!', completed: false },
      { day: 97, title: 'LockIn Legend', completed: false }
    ]
  });

  const todaysProgress = {
    hoursStudied: 0,
    tasksCompleted: 0,
    tasksTotal: 0,
    mood: 'neutral'
  };

  const milestoneProgress = {
    completed: 0,
    total: progressData.milestones.length,
    percentage: 0,
    milestones: progressData.milestones
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Day {progressData.currentDay} of {progressData.totalDays}</Text>
      </View>

      {/* Main Progress Card */}
      <View style={styles.mainProgressCard}>
        <LinearGradient
          colors={['#2563eb', '#3b82f6']}
          style={styles.progressGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.progressContent}>
            <Text style={styles.progressTitle}>Overall Progress</Text>
            <Text style={styles.progressPercentage}>{progressData.overallProgress}%</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: `${progressData.overallProgress}%` }
                  ]} 
                />
              </View>
            </View>
            <Text style={styles.progressSubtext}>
              {progressData.totalDays - progressData.currentDay} days remaining
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Clock size={24} color="#2563eb" />
          </View>
          <Text style={styles.statValue}>{progressData.totalHoursStudied}</Text>
          <Text style={styles.statLabel}>Hours Studied</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Target size={24} color="#2563eb" />
          </View>
          <Text style={styles.statValue}>{progressData.completedTasks}</Text>
          <Text style={styles.statLabel}>Tasks Completed</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <TrendingUp size={24} color="#2563eb" />
          </View>
          <Text style={styles.statValue}>{progressData.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Trophy size={24} color="#2563eb" />
          </View>
          <Text style={styles.statValue}>{progressData.bestStreak}</Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
      </View>

      {/* Today's Progress */}
      {todaysProgress && (
        <View style={styles.todayCard}>
          <Text style={styles.cardTitle}>Today's Progress</Text>
          <View style={styles.todayStats}>
            <View style={styles.todayStat}>
              <Text style={styles.todayStatValue}>{todaysProgress.hoursStudied || 0}</Text>
              <Text style={styles.todayStatLabel}>Hours</Text>
            </View>
            <View style={styles.todayStat}>
              <Text style={styles.todayStatValue}>
                {todaysProgress.tasksCompleted || 0}/{todaysProgress.tasksTotal || 0}
              </Text>
              <Text style={styles.todayStatLabel}>Tasks</Text>
            </View>
            <View style={styles.todayStat}>
              <Text style={styles.todayStatValue}>
                {['😴', '😔', '😐', '😊', '😄'][todaysProgress.mood === 'neutral' ? 2 : 
                  todaysProgress.mood === 'happy' ? 4 : 
                  todaysProgress.mood === 'sad' ? 1 : 2]}
              </Text>
              <Text style={styles.todayStatLabel}>Mood</Text>
            </View>
          </View>
        </View>
      )}

      {/* Milestones */}
      <View style={styles.milestonesCard}>
        <Text style={styles.cardTitle}>Milestones</Text>
        <Text style={styles.cardSubtitle}>
          {milestoneProgress.completed} of {milestoneProgress.total} completed
        </Text>
        
        <View style={styles.milestonesList}>
          {milestoneProgress.milestones.slice(0, 5).map((milestone, index) => (
            <View key={milestone.day} style={styles.milestoneItem}>
              <View style={[
                styles.milestoneIcon,
                milestone.completed && styles.milestoneIconCompleted
              ]}>
                <Award 
                  size={20} 
                  color={milestone.completed ? '#ffffff' : '#9ca3af'} 
                />
              </View>
              <View style={styles.milestoneContent}>
                <Text style={[
                  styles.milestoneTitle,
                  milestone.completed && styles.milestoneTitleCompleted
                ]}>
                  {milestone.title}
                </Text>
                <Text style={styles.milestoneDay}>Day {milestone.day}</Text>
              </View>
              {milestone.completed && (
                <View style={styles.milestoneCheck}>
                  <Text style={styles.milestoneCheckText}>✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>
        
        {milestoneProgress.milestones.length > 5 && (
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>
              View All Milestones ({milestoneProgress.total - 5} more)
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Weekly Progress */}
      <View style={styles.weeklyCard}>
        <Text style={styles.cardTitle}>This Week</Text>
        <View style={styles.weeklyChart}>
          {Array.from({ length: 7 }, (_, index) => {
            // Mock weekly progress data
            const weeklyProgress = [
              { date: '2024-01-15', hoursStudied: 2 },
              { date: '2024-01-16', hoursStudied: 3 },
              { date: '2024-01-17', hoursStudied: 1 },
              { date: '2024-01-18', hoursStudied: 4 },
              { date: '2024-01-19', hoursStudied: 2 },
              { date: '2024-01-20', hoursStudied: 0 },
              { date: '2024-01-21', hoursStudied: 1 }
            ];
            const day = weeklyProgress.find(d => {
              const dayDate = new Date(d.date);
              return dayDate.getDay() === index;
            });
            const height = day ? Math.max(20, (day.hoursStudied || 0) * 10) : 20;
            
            return (
              <View key={index} style={styles.weeklyBar}>
                <View style={[
                  styles.weeklyBarFill,
                  { height: height }
                ]} />
                <Text style={styles.weeklyBarLabel}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b0b0f',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  mainProgressCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  progressGradient: {
    padding: 24,
  },
  progressContent: {
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 72) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb10',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0b0b0f',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  todayCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 16,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
  },
  todayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  todayStat: {
    alignItems: 'center',
  },
  todayStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 4,
  },
  todayStatLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  milestonesCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  milestonesList: {
    marginTop: 8,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  milestoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  milestoneIconCompleted: {
    backgroundColor: '#2563eb',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 2,
  },
  milestoneTitleCompleted: {
    color: '#2563eb',
  },
  milestoneDay: {
    fontSize: 14,
    color: '#6c757d',
  },
  milestoneCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneCheckText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  showMoreButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  showMoreText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  weeklyCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 16,
  },
  weeklyBar: {
    alignItems: 'center',
    width: (width - 88) / 7,
  },
  weeklyBarFill: {
    width: 20,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    marginBottom: 8,
    minHeight: 20,
  },
  weeklyBarLabel: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '600',
  },
});

export default ProgressTracker;
