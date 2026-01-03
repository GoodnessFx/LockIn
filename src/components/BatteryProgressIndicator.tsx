import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useAppStore } from '../store/appStore';

interface BatteryProgressIndicatorProps {
  size?: number;
  showPercentage?: boolean;
  showText?: boolean;
}

export default function BatteryProgressIndicator({ 
  size = 120, 
  showPercentage = true, 
  showText = true 
}: BatteryProgressIndicatorProps) {
  const { progress } = useAppStore();
  const batteryLevel = progress?.batteryLevel || 100;
  
  // Calculate progress percentage
  const progressPercentage = Math.max(0, Math.min(100, batteryLevel));
  
  // Determine battery color based on level
  const getBatteryColor = (level: number) => {
    if (level >= 80) return '#00b894'; // Green
    if (level >= 50) return '#fdcb6e'; // Yellow
    if (level >= 20) return '#e17055'; // Orange
    return '#636e72'; // Gray
  };
  
  const batteryColor = getBatteryColor(progressPercentage);
  
  // Calculate the fill path based on battery level
  const fillWidth = (progressPercentage / 100) * (size * 0.6); // 60% of battery width is fillable
  
  return (
    <View style={styles.container}>
      <View style={styles.batteryContainer}>
        <Svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size * 0.6}`}>
          <Defs>
            <LinearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={batteryColor} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={batteryColor} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          
          {/* Battery outline */}
          <Path
            d={`M 10 10 L ${size - 20} 10 L ${size - 20} ${size * 0.3} L ${size - 10} ${size * 0.3} L ${size - 10} ${size * 0.4} L ${size - 20} ${size * 0.4} L ${size - 20} ${size * 0.5} L 10 ${size * 0.5} Z`}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
          />
          
          {/* Battery fill */}
          <Path
            d={`M 12 12 L ${12 + fillWidth} 12 L ${12 + fillWidth} ${size * 0.3 - 2} L ${12 + fillWidth} ${size * 0.3 - 2} L ${12 + fillWidth} ${size * 0.4 - 2} L ${12 + fillWidth} ${size * 0.4 - 2} L ${12 + fillWidth} ${size * 0.5 - 2} L 12 ${size * 0.5 - 2} Z`}
            fill="url(#batteryGradient)"
          />
          
          {/* Battery tip */}
          <Path
            d={`M ${size - 20} ${size * 0.25} L ${size - 15} ${size * 0.25} L ${size - 15} ${size * 0.35} L ${size - 20} ${size * 0.35} Z`}
            fill="#e0e0e0"
          />
        </Svg>
        
        {showPercentage && (
          <View style={styles.percentageContainer}>
            <Text style={[styles.percentageText, { color: batteryColor }]}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>
        )}
      </View>
      
      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.batteryLabel}>Commitment Battery</Text>
          <Text style={styles.batterySubtext}>
            {progressPercentage >= 80 ? 'Fully Charged!' : 
             progressPercentage >= 50 ? 'Good Progress' : 
             progressPercentage >= 20 ? 'Keep Going!' : 'Needs Recharge'}
          </Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -10 }],
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  batteryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 4,
  },
  batterySubtext: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
});
