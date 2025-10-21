import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BatteryProgressIndicatorProps {
  size?: number;
  showPercentage?: boolean;
  showText?: boolean;
  percentage?: number;
}

export default function BatteryProgressIndicator({ 
  size = 100, 
  showPercentage = false, 
  showText = false,
  percentage = 75 
}: BatteryProgressIndicatorProps) {
  const batteryHeight = size * 0.6;
  const batteryWidth = size * 0.8;
  const tipWidth = size * 0.1;
  const tipHeight = size * 0.3;

  const getBatteryColor = (percent) => {
    if (percent >= 75) return '#00D4AA';
    if (percent >= 50) return '#FFB347';
    if (percent >= 25) return '#FF6B6B';
    return '#FF0000';
  };

  const batteryColor = getBatteryColor(percentage);

  return (
    <View style={styles.container}>
      <View style={[styles.batteryContainer, { width: batteryWidth, height: batteryHeight }]}>
        {/* Battery Fill */}
        <View 
          style={[
            styles.batteryFill, 
            { 
              width: `${Math.max(percentage, 2)}%`,
              backgroundColor: batteryColor 
            }
          ]} 
        />
        
        {/* Battery Tip */}
        <View 
          style={[
            styles.batteryTip, 
            { 
              width: tipWidth, 
              height: tipHeight,
              top: (batteryHeight - tipHeight) / 2
            }
          ]} 
        />
      </View>
      
      {showPercentage && (
        <Text style={[styles.percentageText, { fontSize: size * 0.15 }]}>
          {Math.round(percentage)}%
        </Text>
      )}
      
      {showText && (
        <Text style={[styles.statusText, { fontSize: size * 0.12 }]}>
          {percentage >= 75 ? 'Excellent' : 
           percentage >= 50 ? 'Good' : 
           percentage >= 25 ? 'Low' : 'Critical'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryContainer: {
    position: 'relative',
    borderWidth: 3,
    borderColor: '#0b0b0f',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 2,
  },
  batteryTip: {
    position: 'absolute',
    right: -3,
    backgroundColor: '#0b0b0f',
    borderRadius: 2,
  },
  percentageText: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#0b0b0f',
  },
  statusText: {
    marginTop: 4,
    color: '#6c757d',
    fontWeight: '500',
  },
});
