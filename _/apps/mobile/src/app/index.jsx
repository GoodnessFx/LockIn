import { Redirect } from 'expo-router';
import { useAppStore } from '@/store/appStore';

export default function Index() {
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);
  
  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }
  
  return <Redirect href="/(tabs)/dashboard" />;
}
