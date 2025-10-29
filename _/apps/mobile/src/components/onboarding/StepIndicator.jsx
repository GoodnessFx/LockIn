import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StepIndicator = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={['#2563eb', '#3b82f6']}
            style={[
              styles.progressFill,
              { width: `${((currentStep + 1) / totalSteps) * 100}%` }
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </View>

      {/* Step Numbers and Titles */}
      <View style={styles.stepsContainer}>
        {stepTitles.map((title, index) => (
          <View key={index} style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                index <= currentStep ? styles.stepCircleActive : styles.stepCircleInactive
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  index <= currentStep ? styles.stepNumberActive : styles.stepNumberInactive
                ]}
              >
                {index + 1}
              </Text>
            </View>
            <Text
              style={[
                styles.stepTitle,
                index <= currentStep ? styles.stepTitleActive : styles.stepTitleInactive
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  stepCircleInactive: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepNumberInactive: {
    color: '#9ca3af',
  },
  stepTitle: {
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 80,
  },
  stepTitleActive: {
    color: '#0b0b0f',
    fontWeight: '600',
  },
  stepTitleInactive: {
    color: '#9ca3af',
  },
});

export default StepIndicator;
