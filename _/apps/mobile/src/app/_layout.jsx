import { useAuth } from "@/utils/auth/useAuth";
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
  const { initiate, isReady } = useAuth();
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);

  useEffect(() => {
    initiate();
    hydrateAppStore();
  }, [initiate]);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

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
        <Animated.Text entering={FadeIn.duration(300)} style={{ fontSize: 36, fontWeight: '800', color: '#0b0b0f' }}>
          LockIn
        </Animated.Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
