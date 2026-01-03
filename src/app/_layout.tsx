import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {!isConnected && (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      )}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#ff4757',
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  offlineText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
