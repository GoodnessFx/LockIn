import { useAppStore } from '@/store/appStore';
import { signIn as authSignIn } from '@/services/auth';
import { router } from 'expo-router';

export function useAuth() {
  const authToken = useAppStore((s) => s.authToken);
  const setAuthToken = useAppStore((s) => s.setAuthToken);
  const userProfile = useAppStore((s) => s.userProfile);
  const setUserProfile = useAppStore((s) => s.setUserProfile);

  const isAuthenticated = !!authToken || !!userProfile;

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authSignIn(email, password);
      if (result.success && result.token) {
        setAuthToken(result.token);
        // In a real app, we would fetch the user profile here using the token
        router.replace('/(tabs)');
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message || 'An error occurred' };
    }
  };

  const signOut = async () => {
    setAuthToken(null);
    setUserProfile(null);
    router.replace('/sign-in');
  };

  return {
    isAuthenticated,
    signIn,
    signOut,
    token: authToken,
    user: userProfile
  };
}
