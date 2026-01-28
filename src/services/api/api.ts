import { API_CONFIG } from '@/config/constants';
import { UserProfile, ProgressData, CurriculumItem, useAppStore } from '@/store/appStore';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}

export interface ProgressResponse {
  progress: ProgressData;
  curriculum: CurriculumItem[];
}

// API Service Class
class ApiService {
  private baseURL: string = API_CONFIG.BASE_URL;
  private timeout: number = API_CONFIG.TIMEOUT;
  private lastRequestTimes: number[] = [];
  private maxRps = 8;

  constructor() {}

  private getAuthToken(): string | null {
    return useAppStore.getState().authToken;
  }

  private handleError(error: any): Error {
    if (typeof error === 'string') return new Error(error);
    if (error?.message) return new Error(error.message);
    return new Error('An unexpected error occurred');
  }

  private async acquireSlot(): Promise<void> {
    const now = Date.now();
    this.lastRequestTimes = this.lastRequestTimes.filter((t) => now - t < 1000);
    if (this.lastRequestTimes.length < this.maxRps) {
      this.lastRequestTimes.push(now);
      return;
    }
    const earliest = this.lastRequestTimes[0];
    const wait = Math.max(0, 1000 - (now - earliest));
    await new Promise((r) => setTimeout(r, wait));
    this.lastRequestTimes.push(Date.now());
  }

  private async request<T>(path: string, options: RequestInit, retries = 3): Promise<T> {
    let attempt = 0;
    let delay = 300;
    while (true) {
      try {
        await this.acquireSlot();
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeout);
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        const token = this.getAuthToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(this.baseURL + path, {
          ...options,
          headers: { ...headers, ...(options.headers as any) },
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) {
          const bodyText = await res.text().catch(() => '');
          const msg = bodyText || `HTTP ${res.status}`;
          throw new Error(msg);
        }
        const data = (await res.json()) as T;
        return data;
      } catch (error: any) {
        const transient = error?.message?.includes('abort') || error?.message?.includes('HTTP 429') || error?.message?.includes('Network');
        if (!transient || attempt >= retries) {
          throw error;
        }
        await new Promise((r) => setTimeout(r, delay));
        delay = Math.min(delay * 2, 5000);
        attempt += 1;
      }
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const data = await this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH + '/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  async register(userData: Partial<UserProfile>): Promise<ApiResponse<AuthResponse>> {
    try {
      const data = await this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH + '/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      await this.request(API_CONFIG.ENDPOINTS.AUTH + '/logout', { method: 'POST' });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  // User endpoints
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const data = await this.request<UserProfile>(API_CONFIG.ENDPOINTS.USER + '/profile', { method: 'GET' });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  async updateUserProfile(profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const data = await this.request<UserProfile>(API_CONFIG.ENDPOINTS.USER + '/profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  // Progress endpoints
  async getProgress(): Promise<ApiResponse<ProgressResponse>> {
    try {
      const data = await this.request<ProgressResponse>(API_CONFIG.ENDPOINTS.PROGRESS, { method: 'GET' });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  async updateProgress(progress: Partial<ProgressData>): Promise<ApiResponse<ProgressData>> {
    try {
      const data = await this.request<ProgressData>(API_CONFIG.ENDPOINTS.PROGRESS, {
        method: 'PUT',
        body: JSON.stringify(progress),
      });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  async markTaskComplete(taskId: string): Promise<ApiResponse> {
    try {
      const data = await this.request(API_CONFIG.ENDPOINTS.PROGRESS + '/complete', {
        method: 'POST',
        body: JSON.stringify({ taskId }),
      });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  // Curriculum endpoints
  async getCurriculum(): Promise<ApiResponse<CurriculumItem[]>> {
    try {
      const data = await this.request<CurriculumItem[]>(API_CONFIG.ENDPOINTS.CURRICULUM, { method: 'GET' });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  async generateCurriculum(niche: string): Promise<ApiResponse<CurriculumItem[]>> {
    try {
      const data = await this.request<CurriculumItem[]>(API_CONFIG.ENDPOINTS.CURRICULUM + '/generate', {
        method: 'POST',
        body: JSON.stringify({ niche }),
      });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  // AI endpoints
  async askAI(prompt: string, context?: any): Promise<ApiResponse<string>> {
    try {
      const data = await this.request<string>(API_CONFIG.ENDPOINTS.AI_CHAT, {
        method: 'POST',
        body: JSON.stringify({ prompt, context }),
      });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  // Notifications endpoints
  async getNotifications(): Promise<ApiResponse<any[]>> {
    try {
      const data = await this.request<any[]>(API_CONFIG.ENDPOINTS.NOTIFICATIONS, { method: 'GET' });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  async updateNotificationSettings(settings: any): Promise<ApiResponse> {
    try {
      const data = await this.request(API_CONFIG.ENDPOINTS.NOTIFICATIONS + '/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: this.handleError(error).message };
    }
  }

  // Utility methods
  async healthCheck(): Promise<boolean> {
    try {
      await this.request('/health', { method: 'GET' });
      return true;
    } catch {
      return false;
    }
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  setAuthToken(token: string): void {
    useAppStore.setState({ authToken: token });
  }

  removeAuthToken(): void {
    useAppStore.setState({ authToken: null });
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export individual methods for convenience
export const {
  login,
  register,
  logout,
  getUserProfile,
  updateUserProfile,
  getProgress,
  updateProgress,
  markTaskComplete,
  getCurriculum,
  generateCurriculum,
  askAI,
  getNotifications,
  updateNotificationSettings,
  healthCheck,
} = apiService;
