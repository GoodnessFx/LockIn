import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { useTheme } from '../hooks/ThemeProvider';
import { APP_CONFIG } from '../../config/constants';

interface CountdownTimerProps {
  targetDate?: string;
  commitmentStartDate?: string;
}

export default function CountdownTimer({ 
  targetDate, 
  commitmentStartDate 
}: CountdownTimerProps) {
  const { colors, typography } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isExpired, setIsExpired] = useState(false);
  const pulseAnim = useSharedValue(1);

  // Calculate target date - either provided or 97 days from start
  const getTargetDate = () => {
    if (targetDate) return new Date(targetDate);
    if (commitmentStartDate) {
      const start = new Date(commitmentStartDate);
      return new Date(start.getTime() + APP_CONFIG.COMMITMENT_DAYS * 24 * 60 * 60 * 1000);
    }
    // Default to 97 days from now
    return new Date(Date.now() + APP_CONFIG.COMMITMENT_DAYS * 24 * 60 * 60 * 1000);
  };

  useEffect(() => {
    const target = getTargetDate();
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const targetTime = target.getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
        
        // Pulse animation for urgency when < 7 days
        if (days < 7) {
          pulseAnim.value = withTiming(1.1, { duration: 1000 }, () => {
            pulseAnim.value = withTiming(1, { duration: 1000 });
          });
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate, commitmentStartDate]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      pulseAnim.value,
      [1, 1.1],
      [1, 1.1],
      Extrapolate.CLAMP
    );
    
    return {
      transform: [{ scale }],
    };
  });

  if (isExpired) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Text style={[styles.celebrationText, { color: colors.success }]}>
          🎉 Commitment Complete!
        </Text>
        <Text style={[styles.celebrationSubtext, { color: colors.textSecondary }]}>
          You've successfully completed your 97-day journey!
        </Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.surface }, animatedStyle]}>
      <View style={styles.timeContainer}>
        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, { color: colors.text }]}>
            {timeLeft.days.toString().padStart(2, '0')}
          </Text>
          <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
            Days
          </Text>
        </View>
        
        <View style={styles.separator}>
          <Text style={[styles.separatorText, { color: colors.textSecondary }]}>:</Text>
        </View>
        
        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, { color: colors.text }]}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </Text>
          <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
            Hours
          </Text>
        </View>
        
        <View style={styles.separator}>
          <Text style={[styles.separatorText, { color: colors.textSecondary }]}>:</Text>
        </View>
        
        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, { color: colors.text }]}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </Text>
          <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
            Min
          </Text>
        </View>
      </View>
      
      <Text style={[styles.motivationText, { color: colors.textSecondary }]}>
        {timeLeft.days < 7 
          ? "Final stretch! You've got this! 💪" 
          : timeLeft.days < 30 
          ? "Keep the momentum going! 🚀" 
          : "Every day counts toward your goal! ⭐"
        }
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  timeUnit: {
    alignItems: 'center',
    minWidth: 60,
  },
  timeNumber: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  separator: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorText: {
    fontSize: 24,
    fontWeight: '700',
  },
  motivationText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  celebrationText: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  celebrationSubtext: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

