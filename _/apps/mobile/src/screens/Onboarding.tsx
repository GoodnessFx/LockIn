import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';
import { useAppStore, UserProfile } from '../store/appStore';
import { APP_CONFIG } from '../../config/constants';

interface OnboardingProps {
  onDone: () => void;
}

type OnboardingStep = 'welcome' | 'niche' | 'goal' | 'schedule' | 'voice' | 'complete';

const NICHE_OPTIONS = [
  { id: 'web-dev', title: 'Web Development', icon: 'code-slash-outline', description: 'Frontend, Backend, Full-stack' },
  { id: 'mobile-dev', title: 'Mobile Development', icon: 'phone-portrait-outline', description: 'iOS, Android, React Native' },
  { id: 'data-science', title: 'Data Science', icon: 'analytics-outline', description: 'ML, AI, Analytics' },
  { id: 'design', title: 'UI/UX Design', icon: 'color-palette-outline', description: 'User Experience, Visual Design' },
  { id: 'marketing', title: 'Digital Marketing', icon: 'megaphone-outline', description: 'Growth, SEO, Social Media' },
  { id: 'business', title: 'Entrepreneurship', icon: 'business-outline', description: 'Startups, Product Management' },
];

const SCHEDULE_OPTIONS = [
  { id: 'morning', title: 'Early Bird', time: '6:00 AM - 12:00 PM', icon: 'sunny-outline' },
  { id: 'afternoon', title: 'Day Warrior', time: '12:00 PM - 6:00 PM', icon: 'partly-sunny-outline' },
  { id: 'evening', title: 'Night Owl', time: '6:00 PM - 12:00 AM', icon: 'moon-outline' },
  { id: 'flexible', title: 'Flexible', time: 'Any time that works', icon: 'time-outline' },
];

export default function Onboarding({ onDone }: OnboardingProps) {
  const { colors, spacing, borderRadius } = useTheme();
  const { setOnboarded, setUserProfile } = useAppStore();
  
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    niche: '',
    goal: '',
    schedule: '',
    voicePreference: 'enabled' as 'enabled' | 'disabled',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const steps: OnboardingStep[] = ['welcome', 'niche', 'goal', 'schedule', 'voice', 'complete'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: OnboardingStep[] = ['welcome', 'niche', 'goal', 'schedule', 'voice', 'complete'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleComplete = async () => {
    const userProfile: UserProfile = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      niche: formData.niche,
      goal: formData.goal,
      preferredSchedule: formData.schedule,
      voicePreference: formData.voicePreference,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    await setUserProfile(userProfile);
    await setOnboarded(true);
    onDone();
  };

  const renderWelcome = () => (
    <View style={styles.stepContainer}>
      <Image source={require('../../assets/images/splash-icon.png')} style={styles.logo} />
      <Text style={[styles.title, { color: colors.text }]}>Welcome to LockIn</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Your 97-day journey to mastery starts here. Let's build something incredible together.
      </Text>
      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.primary }]}
        onPress={handleNext}
      >
        <Text style={styles.primaryButtonText}>Let's Begin</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNicheSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text }]}>Choose Your Niche</Text>
      <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
        What area do you want to master in the next 97 days?
      </Text>
      
      <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
        {NICHE_OPTIONS.map((niche) => (
          <TouchableOpacity
            key={niche.id}
            style={[
              styles.optionCard,
              { 
                backgroundColor: colors.surface,
                borderColor: formData.niche === niche.id ? colors.primary : 'transparent',
                borderWidth: formData.niche === niche.id ? 2 : 0,
              }
            ]}
            onPress={() => updateFormData('niche', niche.id)}
          >
            <Ionicons 
              name={niche.icon as any} 
              size={32} 
              color={formData.niche === niche.id ? colors.primary : colors.textSecondary} 
            />
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>{niche.title}</Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                {niche.description}
              </Text>
            </View>
            {formData.niche === niche.id && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.surface }]}
          onPress={handleBack}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.primaryButton, 
            { 
              backgroundColor: formData.niche ? colors.primary : colors.textSecondary,
              opacity: formData.niche ? 1 : 0.5 
            }
          ]}
          onPress={handleNext}
          disabled={!formData.niche}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGoalSetting = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text }]}>Set Your Goal</Text>
      <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
        What specific outcome do you want to achieve?
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            { 
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.textSecondary 
            }
          ]}
          placeholder="e.g., Build a full-stack web application"
          placeholderTextColor={colors.textSecondary}
          value={formData.goal}
          onChangeText={(text) => updateFormData('goal', text)}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.surface }]}
          onPress={handleBack}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.primaryButton, 
            { 
              backgroundColor: formData.goal.trim() ? colors.primary : colors.textSecondary,
              opacity: formData.goal.trim() ? 1 : 0.5 
            }
          ]}
          onPress={handleNext}
          disabled={!formData.goal.trim()}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderScheduleSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text }]}>Choose Your Schedule</Text>
      <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
        When do you work best? We'll send reminders during your preferred hours.
      </Text>
      
      <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
        {SCHEDULE_OPTIONS.map((schedule) => (
          <TouchableOpacity
            key={schedule.id}
            style={[
              styles.optionCard,
              { 
                backgroundColor: colors.surface,
                borderColor: formData.schedule === schedule.id ? colors.primary : 'transparent',
                borderWidth: formData.schedule === schedule.id ? 2 : 0,
              }
            ]}
            onPress={() => updateFormData('schedule', schedule.id)}
          >
            <Ionicons 
              name={schedule.icon as any} 
              size={32} 
              color={formData.schedule === schedule.id ? colors.primary : colors.textSecondary} 
            />
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>{schedule.title}</Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                {schedule.time}
              </Text>
            </View>
            {formData.schedule === schedule.id && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.surface }]}
          onPress={handleBack}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.primaryButton, 
            { 
              backgroundColor: formData.schedule ? colors.primary : colors.textSecondary,
              opacity: formData.schedule ? 1 : 0.5 
            }
          ]}
          onPress={handleNext}
          disabled={!formData.schedule}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVoicePreference = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text }]}>Voice Narration</Text>
      <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
        Enable AI voice coaching to get spoken guidance and motivation.
      </Text>
      
      <View style={styles.voiceOptions}>
        <TouchableOpacity
          style={[
            styles.voiceOption,
            { 
              backgroundColor: colors.surface,
              borderColor: formData.voicePreference === 'enabled' ? colors.primary : 'transparent',
              borderWidth: formData.voicePreference === 'enabled' ? 2 : 0,
            }
          ]}
          onPress={() => updateFormData('voicePreference', 'enabled')}
        >
          <Ionicons 
            name="volume-high" 
            size={32} 
            color={formData.voicePreference === 'enabled' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[styles.voiceOptionTitle, { color: colors.text }]}>Enabled</Text>
          <Text style={[styles.voiceOptionDescription, { color: colors.textSecondary }]}>
            Get voice coaching and motivation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.voiceOption,
            { 
              backgroundColor: colors.surface,
              borderColor: formData.voicePreference === 'disabled' ? colors.primary : 'transparent',
              borderWidth: formData.voicePreference === 'disabled' ? 2 : 0,
            }
          ]}
          onPress={() => updateFormData('voicePreference', 'disabled')}
        >
          <Ionicons 
            name="volume-mute" 
            size={32} 
            color={formData.voicePreference === 'disabled' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[styles.voiceOptionTitle, { color: colors.text }]}>Disabled</Text>
          <Text style={[styles.voiceOptionDescription, { color: colors.textSecondary }]}>
            Text-only guidance
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.surface }]}
          onPress={handleBack}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={handleNext}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderComplete = () => (
    <View style={styles.stepContainer}>
      <View style={[styles.completeIcon, { backgroundColor: colors.success }]}>
        <Ionicons name="checkmark" size={48} color="white" />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>You're All Set!</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Your personalized 97-day curriculum is being generated. Get ready to transform your skills!
      </Text>
      
      <View style={styles.summaryCard}>
        <Text style={[styles.summaryTitle, { color: colors.text }]}>Your Journey</Text>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Niche:</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {NICHE_OPTIONS.find(n => n.id === formData.niche)?.title}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Schedule:</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {SCHEDULE_OPTIONS.find(s => s.id === formData.schedule)?.title}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Voice:</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {formData.voicePreference === 'enabled' ? 'Enabled' : 'Disabled'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.primary }]}
        onPress={handleComplete}
      >
        <Text style={styles.primaryButtonText}>Start My Journey</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {currentStep === 'welcome' && renderWelcome()}
      {currentStep === 'niche' && renderNicheSelection()}
      {currentStep === 'goal' && renderGoalSetting()}
      {currentStep === 'schedule' && renderScheduleSelection()}
      {currentStep === 'voice' && renderVoicePreference()}
      {currentStep === 'complete' && renderComplete()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 24,
  },
  optionCard: {
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
  optionContent: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  voiceOptions: {
    flex: 1,
    marginBottom: 24,
  },
  voiceOption: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  voiceOptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  voiceOptionDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  completeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

