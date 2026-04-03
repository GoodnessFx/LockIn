import { useAppStore } from '@/store/appStore';
import { signIn as authSignIn, signUp as authSignUp } from '@/services/auth';
import apiService from '@/services/api/api';
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
        // Auth token is already set in authSignIn via store
        router.replace('/(tabs)');
        return { success: true };
      }
      return { success: false, error: result.error, errors: result.errors };
    } catch (error: any) {
      return { success: false, error: error.message || 'An error occurred', errors: error.errors };
    }
  };

  const signUp = async (userData: any) => {
    try {
      const result = await authSignUp(userData);
      if (result.success && result.token) {
        router.replace('/(tabs)');
        return { success: true };
      }
      return { success: false, error: result.error, errors: result.errors };
    } catch (error: any) {
      return { success: false, error: error.message || 'An error occurred', errors: error.errors };
    }
  };

  const signOut = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      useAppStore.getState().setAuthToken(null);
      useAppStore.getState().setRefreshToken(null);
      useAppStore.getState().setUserProfile(null);
      router.replace('/sign-in');
    }
  };

  return {
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    token: authToken,
    user: userProfile
  };
}
