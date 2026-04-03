import apiService from '@/services/api/api';
import { useAppStore } from '@/store/appStore';

interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
  errors?: any[];
}

/**
 * Authenticates the user.
 * Communicates with the configured backend authentication service.
 */
export const signIn = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const response = await apiService.login(email, password);
    
    if (response.data) {
      const { access, refresh, user } = response.data;
      useAppStore.getState().setAuthToken(access);
      useAppStore.getState().setRefreshToken(refresh);
      useAppStore.getState().setUserProfile(user);
      return { success: true, token: access };
    }
    
    return { success: false, error: response.message };
  } catch (error: any) {
    console.error("Authentication error:", error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred.",
      errors: error.errors
    };
  }
};

export const signUp = async (userData: Partial<UserProfile>): Promise<AuthResult> => {
  try {
    const response = await apiService.register(userData);
    
    if (response.data) {
      const { access, refresh, user } = response.data;
      useAppStore.getState().setAuthToken(access);
      useAppStore.getState().setRefreshToken(refresh);
      useAppStore.getState().setUserProfile(user);
      return { success: true, token: access };
    }
    
    return { success: false, error: response.message };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred.",
      errors: error.errors
    };
  }
};
