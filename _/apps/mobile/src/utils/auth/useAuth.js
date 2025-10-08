import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect } from 'react';
import { useAuthStore, authKey } from './store';


/**
 * This hook provides authentication functionality.
 * It may be easier to use the `useAuthModal` or `useRequireAuth` hooks
 * instead as those will also handle showing authentication to the user
 * directly.
 */
export const useAuth = () => {
  const { isReady, auth, setAuth } = useAuthStore();

  const initiate = useCallback(() => {
    SecureStore.getItemAsync(authKey).then((auth) => {
      useAuthStore.setState({
        auth: auth ? JSON.parse(auth) : null,
        isReady: true,
      });
    });
  }, []);

  useEffect(() => {}, []);

  const signIn = useCallback(() => {
    // Always use a dummy auth for this app
    setAuth({
      user: {
        name: 'Demo User',
        email: 'demo@example.com',
      },
      token: 'demo-token',
    });
  }, [setAuth]);

  const signOut = useCallback(() => {
    setAuth(null);
  }, [setAuth]);

  return {
    isReady,
    isAuthenticated: isReady ? !!auth : null,
    signIn,
    signOut,
    auth,
    setAuth,
    initiate,
  };
};

/**
 * This hook will automatically open the authentication modal if the user is not authenticated.
 */
export const useRequireAuth = () => {
  const { isAuthenticated, isReady, signIn } = useAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      // Auto sign-in with dummy auth so the app is immediately usable
      signIn();
    }
  }, [isAuthenticated, isReady, signIn]);
};

export default useAuth;