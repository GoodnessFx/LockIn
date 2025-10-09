import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';
import DashboardHome from '../screens/DashboardHome';
import LockInLearn from '../screens/LockInLearn';
import UserProfile from '../screens/UserProfile';
import LockmateComingSoon from '../screens/LockmateComingSoon';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'LAI') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Lockmate') {
            iconName = focused ? 'people' : 'people-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: isDark ? colors.surfaceDark : colors.surfaceLight,
          borderTopColor: isDark ? '#333' : '#e0e0e0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
          borderBottomColor: isDark ? '#333' : '#e0e0e0',
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '700',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardHome}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="LAI" 
        component={LockInLearn}
        options={{ title: 'Learn' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={UserProfile}
        options={{ title: 'Profile' }}
      />
      <Tab.Screen 
        name="Lockmate" 
        component={LockmateComingSoon}
        options={{ title: 'Lockmate' }}
      />
    </Tab.Navigator>
  );
}
