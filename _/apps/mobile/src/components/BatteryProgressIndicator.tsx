import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { useTheme } from '../hooks/ThemeProvider';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface BatteryProgressIndicatorProps {
  level: number; // 0-100
  size?: 'small' | 'medium' | 'large';
  showPercentage?: boolean;
  animated?: boolean;
}

export default function BatteryProgressIndicator({ 
  level, 
  size = 'medium', 
  showPercentage = true,
  animated = true 
}: BatteryProgressIndicatorProps) {
  const { colors } = useTheme();
  const animatedLevel = useSharedValue(level);

  React.useEffect(() => {
    if (animated) {
      animatedLevel.value = withTiming(level, { duration: 1000 });
    } else {
      animatedLevel.value = level;
    }
  }, [level, animated]);

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { width: 60, height: 30, strokeWidth: 2, fontSize: 10 };
      case 'large':
        return { width: 120, height: 60, strokeWidth: 3, fontSize: 16 };
      default:
        return { width: 80, height: 40, strokeWidth: 2, fontSize: 12 };
    }
  };

  const sizeConfig = getSizeConfig();
  const { width, height, strokeWidth, fontSize } = sizeConfig;

  // Battery dimensions
  const batteryWidth = width - 8; // Account for terminal
  const batteryHeight = height;
  const terminalWidth = 6;
  const terminalHeight = height * 0.4;
  const fillPadding = strokeWidth + 2;

  const getBatteryColor = (level: number) => {
    if (level >= 75) return colors.batteryFull;
    if (level >= 50) return colors.batteryMedium;
    if (level >= 25) return colors.batteryLow;
    return colors.batteryEmpty;
  };

  const animatedProps = useAnimatedProps(() => {
    const fillWidth = interpolate(
      animatedLevel.value,
      [0, 100],
      [0, batteryWidth - fillPadding * 2],
      Extrapolate.CLAMP
    );

    return {
      width: fillWidth,
    };
  });

  const batteryColor = getBatteryColor(level);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={batteryColor} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={batteryColor} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        
        {/* Battery body */}
        <Rect
          x={0}
          y={0}
          width={batteryWidth}
          height={batteryHeight}
          rx={4}
          ry={4}
          fill="none"
          stroke={colors.textSecondary}
          strokeWidth={strokeWidth}
        />
        
        {/* Battery terminal */}
        <Rect
          x={batteryWidth}
          y={(batteryHeight - terminalHeight) / 2}
          width={terminalWidth}
          height={terminalHeight}
          rx={2}
          ry={2}
          fill={colors.textSecondary}
        />
        
        {/* Battery fill */}
        <AnimatedRect
          x={fillPadding}
          y={fillPadding}
          height={batteryHeight - fillPadding * 2}
          rx={2}
          ry={2}
          fill="url(#batteryGradient)"
          animatedProps={animatedProps}
        />
      </Svg>
      
      {showPercentage && (
        <Text style={[
          styles.percentageText, 
          { 
            color: colors.text, 
            fontSize,
            marginTop: 4 
          }
        ]}>
          {Math.round(level)}%
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
  percentageText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
