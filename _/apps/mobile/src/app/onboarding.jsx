import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/appStore';
import StorageService from '@/services/storage';
import ProgressService from '@/services/progress';
import NotificationService from '@/services/notifications';
// Replaced lucide-react-native icons with emoji/text alternatives
const ArrowLeft = () => <Text style={{ fontSize: 20 }}>⬅️</Text>;
const ArrowRight = () => <Text style={{ fontSize: 20 }}>➡️</Text>;
const Check = () => <Text style={{ fontSize: 20 }}>✅</Text>;
const Skip = () => <Text style={{ fontSize: 20 }}>⏭️</Text>;

// Import onboarding components
import StepIndicator from '@/components/onboarding/StepIndicator';
import NicheSelection from '@/components/onboarding/NicheSelection';
import GoalSetting from '@/components/onboarding/GoalSetting';
import SocialLinks from '@/components/onboarding/SocialLinks';
import ProfileSetup from '@/components/onboarding/ProfileSetup';

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const setUserProfile = useAppStore((s) => s.setUserProfile);
  
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  // Onboarding data state
  const [selectedNiche, setSelectedNiche] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [socialLinks, setSocialLinks] = useState({});
  const [profileData, setProfileData] = useState({});

  const stepTitles = [
    "Choose Your Niche",
    "Set Your Goal",
    "Connect Social Accounts",
    "Complete Profile"
  ];

  const canContinue = () => {
    switch (currentStep) {
      case 0:
        return selectedNiche !== null;
      case 1:
        return selectedGoal !== null && selectedGoal.trim() !== '';
      case 2:
        return true; // Social links are optional
      case 3:
        return profileData.firstName && profileData.firstName.trim() !== '' &&
               profileData.lastName && profileData.lastName.trim() !== '' &&
               profileData.username && profileData.username.trim() !== '';
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    Alert.alert(
      "Skip Onboarding?",
      "You can complete your profile setup later in settings. Are you sure you want to skip?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Skip", 
          style: "destructive",
          onPress: completeOnboarding
        }
      ]
    );
  };

  const completeOnboarding = async () => {
    try {
      // Save onboarding data
      const onboardingData = {
        niche: selectedNiche,
        goal: selectedGoal,
        socialLinks: socialLinks,
        profile: profileData,
        onboardingCompleted: true,
        completedAt: new Date().toISOString(),
      };

      // Save to storage service
      await StorageService.setUserProfile({
        ...profileData,
        niche: selectedNiche,
        goal: selectedGoal,
        socialLinks: socialLinks
      });

      // Also sync to app store for LAI tab awareness
      await setUserProfile({
        id: (profileData.username || 'local').toString(),
        name: `${(profileData.firstName || '').trim()} ${(profileData.lastName || '').trim()}`.trim() || profileData.username || 'LockIn User',
        email: profileData.email || '',
        niche: selectedNiche || '',
        goal: selectedGoal || '',
        preferredSchedule: '',
        voicePreference: 'enabled',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      });
      
      // Save onboarding status
      await StorageService.setOnboardingStatus(onboardingData);
      
      console.log('Onboarding completed successfully:', onboardingData);
      
      // Mark as onboarded and navigate to main app
      await setOnboarded(true);
      console.log('Onboarding state set to true, navigating to dashboard');
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      Alert.alert(
        'Error',
        'There was an error completing your setup. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <NicheSelection
            selectedNiche={selectedNiche}
            onNicheSelected={setSelectedNiche}
          />
        );
      case 1:
        return (
          <GoalSetting
            selectedGoal={selectedGoal}
            onGoalSelected={setSelectedGoal}
          />
        );
      case 2:
        return (
          <SocialLinks
            socialLinks={socialLinks}
            onSocialLinksUpdated={setSocialLinks}
          />
        );
      case 3:
        return (
          <ProfileSetup
            profileData={profileData}
            onProfileUpdated={setProfileData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
      />

      {/* Step Content */}
      <View style={styles.content}>
        {renderCurrentStep()}
      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canContinue() && styles.continueButtonDisabled
          ]}
          onPress={nextStep}
          disabled={!canContinue()}
        >
          {currentStep > 0 && (
            <TouchableOpacity 
              style={styles.backArrowContainer} 
              onPress={previousStep}
            >
              <ArrowLeft />
            </TouchableOpacity>
          )}
          <Text style={[
            styles.continueButtonText,
            !canContinue() && styles.continueButtonTextDisabled
          ]}>
            {currentStep === totalSteps - 1 ? "Complete Setup" : "Continue"}
          </Text>
          {currentStep === totalSteps - 1 ? (
            <Check size={20} color={canContinue() ? "#ffffff" : "#9ca3af"} />
          ) : (
            <ArrowRight size={20} color={canContinue() ? "#ffffff" : "#9ca3af"} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    width: 48,
  },
  headerRight: {
    width: 48,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
    marginLeft: 4,
  },
  placeholder: {
    width: 48,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  continueButton: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#e9ecef',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  continueButtonTextDisabled: {
    color: '#9ca3af',
  },
  backArrowContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
});
