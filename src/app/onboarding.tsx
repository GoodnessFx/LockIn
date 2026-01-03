import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/appStore';
import { Ionicons } from '@expo/vector-icons';

// Import onboarding components
import StepIndicator from '@/components/onboarding/StepIndicator';
import NicheSelection from '@/components/onboarding/NicheSelection';
import GoalSetting from '@/components/onboarding/GoalSetting';
import SocialLinks from '@/components/onboarding/SocialLinks';
import ProfileSetup from '@/components/onboarding/ProfileSetup';

// Professional icon components using Ionicons
const ArrowLeft = (props: any) => <Ionicons name="arrow-back-outline" {...props} />;
const ArrowRight = (props: any) => <Ionicons name="arrow-forward-outline" {...props} />;
const Check = (props: any) => <Ionicons name="checkmark-circle-outline" {...props} />;

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const setUserProfile = useAppStore((s) => s.setUserProfile);
  const userProfile = useAppStore((s) => s.userProfile);

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  // Onboarding data state
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [profileData, setProfileData] = useState<{firstName?: string; lastName?: string; username?: string}>({});

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
        return selectedGoal !== null && selectedGoal?.trim() !== '';
      case 2:
        return true; // Social links are optional
      case 3:
        return !!(profileData.firstName?.trim() && profileData.lastName?.trim() && profileData.username?.trim());
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

  const completeOnboarding = async () => {
    try {
      // Save partial profile data to store
      // We create a temporary profile object. 
      // Note: Real ID and Email will be set in Sign Up.
      const partialProfile = {
        id: 'temp-id', // Placeholder
        name: `${profileData.firstName} ${profileData.lastName}`,
        email: '', // Placeholder
        niche: selectedNiche || '',
        goal: selectedGoal || '',
        preferredSchedule: '',
        voicePreference: 'enabled' as const,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...socialLinks // Maybe store social links in profile? The interface doesn't have it yet.
      };

      // We need to match the UserProfile interface
      // Since socialLinks are not in UserProfile, we skip them for now or extend the interface.
      // For now, we just save what fits.
      
      setUserProfile({
        ...partialProfile,
        // If there was an existing profile (unlikely), merge it?
        // ...userProfile 
      });

      // Mark as onboarded and navigate to sign-up
      await setOnboarded(true);
      console.log('Onboarding state set to true, navigating to sign-up');
      router.replace('/sign-up');
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
              <ArrowLeft size={24} color="#000" />
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
  content: {
    flex: 1,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    backgroundColor: '#000000',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#f0f0f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  continueButtonTextDisabled: {
    color: '#9ca3af',
  },
  backArrowContainer: {
    position: 'absolute',
    left: 20,
    padding: 8,
  }
});
