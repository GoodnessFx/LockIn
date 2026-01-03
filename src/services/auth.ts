import { API_CONFIG } from '@/config/constants';

interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
}

/**
 * Authenticates the user.
 * Communicates with the configured backend authentication service.
 */
export const signIn = async (email: string, password: string): Promise<AuthResult> => {
  try {
    // For development/demo purposes without a backend:
    const isDevelopment = true;

    if (isDevelopment) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (email && password) {
        const token = "dev-token-" + Date.now();
        return { success: true, token };
      }
      return { success: false, error: "Email and password are required." };
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
       throw new Error('Authentication failed');
    }

    const data = await response.json();
    return { success: true, token: data.token };

  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
};
