import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  withSequence,
  Easing 
} from 'react-native-reanimated';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function CountdownTimer({ 
  targetDate, 
  onComplete, 
  showLabels = true,
  size = 'medium' 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const pulseAnimation = useSharedValue(1);
  const glowAnimation = useSharedValue(0);

  // Size configurations
  const sizeConfig = {
    small: { fontSize: 24, containerSize: 60, spacing: 8 },
    medium: { fontSize: 32, containerSize: 80, spacing: 12 },
    large: { fontSize: 48, containerSize: 100, spacing: 16 }
  };

  const config = sizeConfig[size];

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    // Start pulse animation
    pulseAnimation.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Start glow animation
    glowAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    return () => clearInterval(interval);
  }, [targetDate, onComplete, pulseAnimation, glowAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnimation.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowAnimation.value * 0.3,
  }));

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <View style={[styles.timeUnit, { width: config.containerSize }]}>
      <Animated.View style={[styles.timeContainer, animatedStyle]}>
        <Text style={[styles.timeValue, { fontSize: config.fontSize }]}>
          {value.toString().padStart(2, '0')}
        </Text>
      </Animated.View>
      {showLabels && (
        <Text style={styles.timeLabel}>{label}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.timerContainer, { gap: config.spacing }]}>
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </View>
      
      {/* Glow effect */}
      <Animated.View style={[styles.glowEffect, glowStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeUnit: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  timeValue: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
    textAlign: 'center',
  },
  glowEffect: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: '#6C5CE7',
    borderRadius: 20,
    zIndex: -1,
  },
});
