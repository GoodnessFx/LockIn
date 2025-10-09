import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppStore } from '../store/appStore';
import Onboarding from '../screens/Onboarding';
import MainTabs from './MainTabs';
import ProgressTracking from '../screens/ProgressTracking';
import LockmateComingSoon from '../screens/LockmateComingSoon';

const Stack = createStackNavigator();

export default function RootStack() {
  const { hasOnboarded } = useAppStore();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasOnboarded ? (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen 
            name="ProgressTracking" 
            component={ProgressTracking}
            options={{ 
              headerShown: true, 
              title: 'Progress Tracking',
              headerStyle: { backgroundColor: '#0b0b0f' },
              headerTintColor: '#ffffff'
            }} 
          />
          <Stack.Screen 
            name="LockmateComingSoon" 
            component={LockmateComingSoon}
            options={{ 
              headerShown: true, 
              title: 'Lockmate',
              headerStyle: { backgroundColor: '#0b0b0f' },
              headerTintColor: '#ffffff'
            }} 
          />
        </>
      )}
    </Stack.Navigator>
  );
}
