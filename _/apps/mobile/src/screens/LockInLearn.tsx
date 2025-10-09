import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';
import { useAppStore, CurriculumItem } from '../store/appStore';
import { generateCurriculum } from '../services/ai/curriculum';
import { APP_CONFIG } from '../../config/constants';

export default function LockInLearn() {
  const { colors, spacing, borderRadius } = useTheme();
  const { curriculum, setCurriculum, userProfile, updateCurriculumItem, markTaskComplete } = useAppStore();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate curriculum if not exists
  useEffect(() => {
    if (curriculum.length === 0 && userProfile?.niche) {
      setIsGenerating(true);
      // Simulate curriculum generation
      setTimeout(() => {
        const generatedCurriculum = generateCurriculum(userProfile.niche);
        setCurriculum(generatedCurriculum);
        setIsGenerating(false);
      }, 2000);
    }
  }, [curriculum.length, userProfile?.niche, setCurriculum]);

  const getWeekData = (week: number) => {
    const startDay = (week - 1) * 7 + 1;
    const endDay = Math.min(week * 7, APP_CONFIG.CURRICULUM_DAYS);
    return curriculum.filter(item => item.day >= startDay && item.day <= endDay);
  };

  const getWeekProgress = (week: number) => {
    const weekData = getWeekData(week);
    const completed = weekData.filter(item => item.completed).length;
    return weekData.length > 0 ? (completed / weekData.length) * 100 : 0;
  };

  const handleTaskToggle = async (item: CurriculumItem) => {
    await updateCurriculumItem(item.id, { completed: !item.completed });
    if (!item.completed) {
      await markTaskComplete(item.id);
    }
  };

  const renderTaskItem = ({ item }: { item: CurriculumItem }) => (
    <TouchableOpacity
      style={[
        styles.taskItem,
        { 
          backgroundColor: colors.surface,
          borderLeftColor: item.completed ? colors.success : colors.primary,
        }
      ]}
      onPress={() => handleTaskToggle(item)}
      activeOpacity={0.7}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskDay, { color: colors.primary }]}>
            Day {item.day}
          </Text>
          <View style={[
            styles.taskType,
            { 
              backgroundColor: item.type === 'milestone' ? colors.accent : 
                              item.type === 'practice' ? colors.warning : colors.primary 
            }
          ]}>
            <Text style={styles.taskTypeText}>
              {item.type.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={[
          styles.checkbox,
          { 
            backgroundColor: item.completed ? colors.success : 'transparent',
            borderColor: item.completed ? colors.success : colors.textSecondary
          }
        ]}>
          {item.completed && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
      </View>
      
      <Text style={[styles.taskTitle, { color: colors.text }]}>
        {item.title}
      </Text>
      
      <Text style={[styles.taskDescription, { color: colors.textSecondary }]}>
        {item.description}
      </Text>
      
      <View style={styles.taskFooter}>
        <View style={styles.timeEstimate}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.timeText, { color: colors.textSecondary }]}>
            {item.estimatedTime} min
          </Text>
        </View>
        {item.completed && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={[styles.completedText, { color: colors.success }]}>
              Completed
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderWeekSelector = () => {
    const totalWeeks = Math.ceil(APP_CONFIG.CURRICULUM_DAYS / 7);
    
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.weekSelector}
        contentContainerStyle={styles.weekSelectorContent}
      >
        {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => {
          const progress = getWeekProgress(week);
          return (
            <TouchableOpacity
              key={week}
              style={[
                styles.weekButton,
                { 
                  backgroundColor: selectedWeek === week ? colors.primary : colors.surface,
                  borderColor: selectedWeek === week ? colors.primary : colors.textSecondary
                }
              ]}
              onPress={() => setSelectedWeek(week)}
            >
              <Text style={[
                styles.weekButtonText,
                { color: selectedWeek === week ? 'white' : colors.text }
              ]}>
                Week {week}
              </Text>
              <View style={[
                styles.weekProgress,
                { backgroundColor: selectedWeek === week ? 'rgba(255,255,255,0.3)' : colors.textSecondary }
              ]}>
                <View style={[
                  styles.weekProgressFill,
                  { 
                    width: `${progress}%`,
                    backgroundColor: selectedWeek === week ? 'white' : colors.primary
                  }
                ]} />
              </View>
              <Text style={[
                styles.weekProgressText,
                { color: selectedWeek === week ? 'white' : colors.textSecondary }
              ]}>
                {Math.round(progress)}%
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Your Learning Journey
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {userProfile?.niche ? `${userProfile.niche} • ` : ''}90-day curriculum
        </Text>
      </View>
      <View style={[styles.progressCircle, { borderColor: colors.primary }]}>
        <Text style={[styles.progressText, { color: colors.primary }]}>
          {Math.round((curriculum.filter(item => item.completed).length / curriculum.length) * 100) || 0}%
        </Text>
      </View>
    </View>
  );

  if (isGenerating) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Ionicons name="school" size={64} color={colors.primary} />
          <Text style={[styles.loadingTitle, { color: colors.text }]}>
            Generating Your Curriculum
          </Text>
          <Text style={[styles.loadingSubtitle, { color: colors.textSecondary }]}>
            Creating a personalized 90-day learning plan...
          </Text>
        </View>
      </View>
    );
  }

  const weekData = getWeekData(selectedWeek);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      {renderWeekSelector()}
      
    <FlatList
        data={weekData}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        contentContainerStyle={[styles.listContainer, { padding: spacing.md }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No tasks for this week yet
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
  },
  weekSelector: {
    maxHeight: 80,
  },
  weekSelectorContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  weekProgress: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  weekProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  weekProgressText: {
    fontSize: 10,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 100,
  },
  taskItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskDay: {
    fontSize: 14,
    fontWeight: '700',
  },
  taskType: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  taskTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  taskDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});

