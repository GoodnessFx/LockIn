import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

  // Size configurations
  const sizeConfig = {
    small: { fontSize: 24, containerSize: 50, spacing: 6 },
    medium: { fontSize: 32, containerSize: 70, spacing: 8 },
    large: { fontSize: 48, containerSize: 90, spacing: 12 }
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

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <View style={[styles.timeUnit, { width: config.containerSize }]}>
      <View style={styles.timeContainer}>
        <Text style={[styles.timeValue, { fontSize: config.fontSize }]}>
          {value.toString().padStart(2, '0')}
        </Text>
      </View>
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
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
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
});
