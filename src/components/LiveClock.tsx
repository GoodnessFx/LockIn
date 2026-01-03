import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LiveClockProps {
  showDate?: boolean;
  showSeconds?: boolean;
  format?: '12h' | '24h';
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function LiveClock({ 
  showDate = true, 
  showSeconds = true, 
  format = '12h',
  size = 'medium',
  color = '#0b0b0f'
}: LiveClockProps) {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  // Size configurations
  const sizeConfig = {
    small: { 
      timeFontSize: 17, 
      dateFontSize: 12, 
      containerPadding: 8,
      spacing: 4 
    },
    medium: { 
      timeFontSize: 24, 
      dateFontSize: 14, 
      containerPadding: 12,
      spacing: 6 
    },
    large: { 
      timeFontSize: 32, 
      dateFontSize: 16, 
      containerPadding: 16,
      spacing: 8 
    }
  };

  const config = sizeConfig[size];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now);
      setDate(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);


  const formatTime = (date: Date) => {
    const hours = format === '12h' 
      ? date.getHours() % 12 || 12
      : date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = format === '12h' ? (date.getHours() >= 12 ? 'PM' : 'AM') : '';

    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const secondsString = showSeconds ? `:${seconds.toString().padStart(2, '0')}` : '';
    
    return `${timeString}${secondsString} ${ampm}`.trim();
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.clockContainer}>
        <Text style={[
          styles.timeText, 
          { 
            fontSize: config.timeFontSize, 
            color,
            marginBottom: showDate ? config.spacing : 0 
          }
        ]}>
          {formatTime(time)}
        </Text>
        
        {showDate && (
          <Text style={[
            styles.dateText, 
            { 
              fontSize: config.dateFontSize, 
              color: color + '80' // Add transparency
            }
          ]}>
            {formatDate(date)}
          </Text>
        )}
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
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  timeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  dateText: {
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
});
