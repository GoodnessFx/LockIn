import React from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from 'react-native';
import Animated, { FadeIn, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppStore, hydrateAppStore } from "@/store/appStore";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const initialize = async () => {
      await hydrateAppStore();
      setIsReady(true);
      SplashScreen.hideAsync();
    };
    initialize();
  }, []);

  if (!isReady) {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.9);
    useEffect(() => {
      opacity.value = withTiming(1, { duration: 600 });
      scale.value = withTiming(1, { duration: 600 });
    }, []);
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }));
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View entering={FadeIn.duration(300)} style={{ alignItems: 'center' }}>
          <Animated.View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Animated.Text style={{ fontSize: 48, fontWeight: '800', color: '#6C5CE7' }}>
              LockIn
            </Animated.Text>
            <Animated.View style={{ marginLeft: 8 }}>
              <Animated.Text style={{ fontSize: 32, color: '#000000' }}>🔒</Animated.Text>
            </Animated.View>
          </Animated.View>
          <Animated.Text style={{ fontSize: 18, fontWeight: '600', color: '#0b0b0f', marginBottom: 4 }}>
            Dial In. Build Relentlessly.
          </Animated.Text>
          <Animated.Text style={{ fontSize: 14, color: '#6c757d', textAlign: 'center' }}>
            Your 97-day transformation starts now
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
