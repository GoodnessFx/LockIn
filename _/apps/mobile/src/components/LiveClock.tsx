import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/ThemeProvider';

interface LiveClockProps {
  timezone?: string;
  showDate?: boolean;
  showSeconds?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function LiveClock({ 
  timezone = 'local',
  showDate = true,
  showSeconds = true,
  size = 'medium'
}: LiveClockProps) {
  const { colors, typography } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: true,
    };

    if (timezone !== 'local') {
      options.timeZone = timezone;
    }

    return date.toLocaleTimeString('en-US', options);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };

    if (timezone !== 'local') {
      options.timeZone = timezone;
    }

    return date.toLocaleDateString('en-US', options);
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          timeFontSize: 16,
          dateFontSize: 12,
          containerPadding: 8,
        };
      case 'large':
        return {
          timeFontSize: 28,
          dateFontSize: 16,
          containerPadding: 16,
        };
      default:
        return {
          timeFontSize: 20,
          dateFontSize: 14,
          containerPadding: 12,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.surface,
        padding: sizeStyles.containerPadding 
      }
    ]}>
      <Text style={[
        styles.timeText, 
        { 
          color: colors.text, 
          fontSize: sizeStyles.timeFontSize 
        }
      ]}>
        {formatTime(currentTime)}
      </Text>
      
      {showDate && (
        <Text style={[
          styles.dateText, 
          { 
            color: colors.textSecondary, 
            fontSize: sizeStyles.dateFontSize 
          }
        ]}>
          {formatDate(currentTime)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeText: {
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  dateText: {
    fontWeight: '500',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
