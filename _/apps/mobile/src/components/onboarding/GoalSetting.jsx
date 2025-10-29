import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const GoalSetting = ({ selectedGoal, onGoalSelected }) => {
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [customGoal, setCustomGoal] = useState('');

  const predefinedGoals = [
    {
      id: "career_switch",
      title: "Career Switch",
      description: "Transition to a new career field"
    },
    {
      id: "skill_upgrade",
      title: "Skill Upgrade",
      description: "Enhance existing professional skills"
    },
    {
      id: "freelance_ready",
      title: "Freelance Ready",
      description: "Build skills for freelance work"
    },
    {
      id: "startup_founder",
      title: "Startup Founder",
      description: "Develop entrepreneurial skills"
    },
    {
      id: "side_hustle",
      title: "Side Hustle",
      description: "Create additional income stream"
    },
    {
      id: "personal_growth",
      title: "Personal Growth",
      description: "Learn for personal development"
    },
    {
      id: "certification",
      title: "Certification",
      description: "Obtain professional certification"
    },
    {
      id: "job_promotion",
      title: "Job Promotion",
      description: "Qualify for a higher position"
    },
    {
      id: "portfolio_building",
      title: "Portfolio Building",
      description: "Create impressive work samples"
    },
    {
      id: "industry_expert",
      title: "Industry Expert",
      description: "Become recognized in your field"
    },
    {
      id: "remote_work",
      title: "Remote Work",
      description: "Develop skills for remote jobs"
    },
    {
      id: "leadership",
      title: "Leadership",
      description: "Develop management abilities"
    },
    {
      id: "public_speaking",
      title: "Public Speaking",
      description: "Improve presentation skills"
    },
    {
      id: "technical_mastery",
      title: "Technical Mastery",
      description: "Deep expertise in specific tech"
    },
    {
      id: "content_creator",
      title: "Content Creator",
      description: "Build audience through content"
    },
    {
      id: "consulting",
      title: "Consulting",
      description: "Offer expert advice to clients"
    },
    {
      id: "agency_founder",
      title: "Agency Founder",
      description: "Start a service-based business"
    },
    {
      id: "digital_nomad",
      title: "Digital Nomad",
      description: "Work while traveling globally"
    },
    {
      id: "passive_income",
      title: "Passive Income",
      description: "Create automated revenue streams"
    },
    {
      id: "career_pivot",
      title: "Career Pivot",
      description: "Shift to adjacent industry"
    },
    {
      id: "teaching",
      title: "Teaching",
      description: "Educate others in your field"
    },
    {
      id: "mentorship",
      title: "Mentorship",
      description: "Guide others professionally"
    },
    {
      id: "thought_leadership",
      title: "Thought Leadership",
      description: "Influence industry direction"
    },
    {
      id: "product_launch",
      title: "Product Launch",
      description: "Create and launch digital products"
    },
    {
      id: "open_source",
      title: "Open Source",
      description: "Contribute to community projects"
    },
    {
      id: "research",
      title: "Research",
      description: "Advance knowledge in your field"
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      <Text style={styles.title}>What's Your Goal?</Text>
      <Text style={styles.subtitle}>
        Tell us what you want to achieve in the next 97 days
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b0b0f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 32,
    lineHeight: 24,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  goalCardSelected: {
    backgroundColor: '#2563eb10',
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 4,
  },
  goalTitleSelected: {
    color: '#2563eb',
  },
  goalDescription: {
    fontSize: 14,
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
    fontSize: 16,
    color: '#0b0b0f',
    minHeight: 100,
  },
});

export default GoalSetting;
