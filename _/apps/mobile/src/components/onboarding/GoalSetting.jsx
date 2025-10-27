import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const GoalSetting = ({ selectedGoal, onGoalSelected }) => {
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [customGoal, setCustomGoal] = useState('');

  const predefinedGoals = [
    {
      id: "career_switch",
      title: "Career Switch",
      description: "Transition to a new career field",
      icon: "🔄"
    },
    {
      id: "skill_upgrade",
      title: "Skill Upgrade",
      description: "Enhance existing professional skills",
      icon: "📈"
    },
    {
      id: "freelance_ready",
      title: "Freelance Ready",
      description: "Build skills for freelance work",
      icon: "💼"
    },
    {
      id: "startup_founder",
      title: "Startup Founder",
      description: "Develop entrepreneurial skills",
      icon: "🚀"
    },
    {
      id: "side_hustle",
      title: "Side Hustle",
      description: "Create additional income stream",
      icon: "💰"
    },
    {
      id: "personal_growth",
      title: "Personal Growth",
      description: "Learn for personal development",
      icon: "🌱"
    }
  ];

  const handleGoalSelect = (goalId) => {
    setIsCustomGoal(false);
    setCustomGoal('');
    onGoalSelected(goalId);
  };

  const handleCustomGoalSelect = () => {
    setIsCustomGoal(true);
    if (customGoal.trim()) {
      onGoalSelected(customGoal.trim());
    }
  };

  const handleCustomGoalChange = (text) => {
    setCustomGoal(text);
    if (text.trim()) {
      onGoalSelected(text.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's Your Goal?</Text>
      <Text style={styles.subtitle}>
        Tell us what you want to achieve in the next 97 days 🎯
      </Text>

      {/* Predefined Goals */}
      {predefinedGoals.map((goal) => {
        const isSelected = selectedGoal === goal.id && !isCustomGoal;
        
        return (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalCard,
              isSelected && styles.goalCardSelected
            ]}
            onPress={() => handleGoalSelect(goal.id)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.goalIcon,
              isSelected && styles.goalIconSelected
            ]}>
              <Text style={styles.goalEmoji}>{goal.icon}</Text>
            </View>
            <View style={styles.goalContent}>
              <Text style={[
                styles.goalTitle,
                isSelected && styles.goalTitleSelected
              ]}>
                {goal.title}
              </Text>
              <Text style={styles.goalDescription}>
                {goal.description}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Custom Goal Option */}
      <TouchableOpacity
        style={[
          styles.goalCard,
          isCustomGoal && styles.goalCardSelected
        ]}
        onPress={handleCustomGoalSelect}
        activeOpacity={0.7}
      >
        <View style={[
          styles.goalIcon,
          isCustomGoal && styles.goalIconSelected
        ]}>
          <Text style={styles.goalEmoji}>✏️</Text>
        </View>
        <View style={styles.goalContent}>
          <Text style={[
            styles.goalTitle,
            isCustomGoal && styles.goalTitleSelected
          ]}>
            Custom Goal
          </Text>
          <Text style={styles.goalDescription}>
            Define your own specific goal
          </Text>
        </View>
      </TouchableOpacity>

      {/* Custom Goal Input */}
      {isCustomGoal && (
        <View style={styles.customGoalContainer}>
          <TextInput
            style={styles.customGoalInput}
            placeholder="Describe your specific goal..."
            placeholderTextColor="#9ca3af"
            value={customGoal}
            onChangeText={handleCustomGoalChange}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0b0b0f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 24,
    lineHeight: 24,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  goalCardSelected: {
    backgroundColor: '#2563eb10',
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  goalIconSelected: {
    backgroundColor: '#2563eb',
  },
  goalEmoji: {
    fontSize: 22,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 4,
  },
  goalTitleSelected: {
    color: '#2563eb',
  },
  goalDescription: {
    fontSize: 13,
    color: '#6c757d',
    lineHeight: 20,
  },
  customGoalContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  customGoalInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
    padding: 16,
    fontSize: 14,
    color: '#0b0b0f',
    minHeight: 100,
  },
});

export default GoalSetting;
