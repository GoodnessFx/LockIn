import React from 'react';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Tobi from '@/components/Tobi';
import ProgressTracker from '@/components/ProgressTracker';

export default function ProgressScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" />
      <ProgressTracker />
      <Tobi />
    </ScrollView>
  );
}
