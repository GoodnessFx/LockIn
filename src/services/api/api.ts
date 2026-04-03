import { API_CONFIG } from '@/config/constants';
import { UserProfile, ProgressData, CurriculumItem, useAppStore } from '@/store/appStore';

// API Response Types
export interface ApiErrorDetail {
  field: string;
  message: string;
  type: string;
}

export interface ApiResponse<T = any> {
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  message: string;
  errors?: ApiErrorDetail[];
}

export interface AuthResponse {
  user: UserProfile;
  access: string;
  refresh: string;
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
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {}

  private getAuthToken(): string | null {
    return useAppStore.getState().authToken;
  }

  private setAuthToken(token: string | null): void {
    useAppStore.getState().setAuthToken(token);
  }

  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.map((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  private async handleError(res: Response): Promise<Error> {
    const errorData = (await res.json().catch(() => ({}))) as ApiErrorResponse;
    const error = new Error(errorData.message || `HTTP ${res.status}`) as any;
    error.status = res.status;
    error.errors = errorData.errors || [];
    return error;
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

  private async request<T>(path: string, options: RequestInit, retries = 3): Promise<ApiResponse<T>> {
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

        if (res.status === 401 && !path.includes('/auth/login') && !path.includes('/auth/refresh')) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            try {
              const refreshRes = await this.refreshToken();
              if (refreshRes.data?.access) {
                this.onTokenRefreshed(refreshRes.data.access);
                this.isRefreshing = false;
                // Retry original request with new token
                return this.request(path, options, retries);
              }
            } catch (err) {
              this.isRefreshing = false;
              this.setAuthToken(null);
              throw err;
            }
          } else {
            // Wait for refresh to complete
            return new Promise((resolve) => {
              this.addRefreshSubscriber((newToken) => {
                resolve(this.request(path, options, retries));
              });
            });
          }
        }

        if (!res.ok) {
          throw await this.handleError(res);
        }

        const data = (await res.json()) as ApiResponse<T>;
        return data;
      } catch (error: any) {
        const transient = error?.message?.includes('abort') || error?.status === 429 || error?.message?.includes('Network');
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
    return this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: Partial<UserProfile>): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, { method: 'POST' });
  }

  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    const refreshToken = useAppStore.getState().refreshToken;
    const response = await this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (response.data?.access) {
      this.setAuthToken(response.data.access);
      if (response.data.refresh) {
        useAppStore.getState().setRefreshToken(response.data.refresh);
      }
    }
    return response;
  }

  async forgotPassword(email: string): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(password: string, token: string): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ password, token }),
    });
  }

  // OAuth endpoints
  async googleOAuth(token: string): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>(API_CONFIG.ENDPOINTS.OAUTH.GOOGLE, {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  // User endpoints
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    return this.request<UserProfile>(API_CONFIG.ENDPOINTS.USER.ME, { method: 'GET' });
  }

  async updateUserProfile(profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    return this.request<UserProfile>(API_CONFIG.ENDPOINTS.USER.ME, {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  async deleteAccount(): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.ENDPOINTS.USER.ME, { method: 'DELETE' });
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.ENDPOINTS.USER.CHANGE_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }

  // Profile endpoints
  async uploadProfilePicture(fileUri: string): Promise<ApiResponse<any>> {
    const formData = new FormData();
    // In React Native, FormData needs an object for the file
    formData.append('file', {
      uri: fileUri,
      type: 'image/jpeg',
      name: 'profile_picture.jpg',
    } as any);

    return this.request(API_CONFIG.ENDPOINTS.PROFILE.UPLOAD, {
      method: 'POST',
      body: formData,
      // Note: fetch will set the correct Content-Type with boundary for FormData if we don't manually set it to application/json
      headers: { 'Content-Type': 'multipart/form-data' } as any,
    });
  }

  async deleteProfilePicture(): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.ENDPOINTS.PROFILE.DELETE, { method: 'DELETE' });
  }

  // Progress endpoints (Flagged: Not in docs, but keeping for legacy compatibility if needed)
  async getProgress(): Promise<ApiResponse<ProgressResponse>> {
    return this.request<ProgressResponse>(API_CONFIG.ENDPOINTS.PROGRESS, { method: 'GET' });
  }

  async updateProgress(progress: Partial<ProgressData>): Promise<ApiResponse<ProgressData>> {
    return this.request<ProgressData>(API_CONFIG.ENDPOINTS.PROGRESS, {
      method: 'PUT',
      body: JSON.stringify(progress),
    });
  }

  async markTaskComplete(taskId: string): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.ENDPOINTS.PROGRESS + '/complete', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    });
  }

  // Curriculum endpoints (Flagged: Not in docs)
  async getCurriculum(): Promise<ApiResponse<CurriculumItem[]>> {
    return this.request<CurriculumItem[]>(API_CONFIG.ENDPOINTS.CURRICULUM, { method: 'GET' });
  }

  async generateCurriculum(niche: string): Promise<ApiResponse<CurriculumItem[]>> {
    return this.request<CurriculumItem[]>(API_CONFIG.ENDPOINTS.CURRICULUM + '/generate', {
      method: 'POST',
      body: JSON.stringify({ niche }),
    });
  }

  // AI endpoints (Flagged: Not in docs)
  async askAI(prompt: string, context?: any): Promise<ApiResponse<string>> {
    return this.request<string>(API_CONFIG.ENDPOINTS.AI_CHAT, {
      method: 'POST',
      body: JSON.stringify({ prompt, context }),
    });
  }

  // Notifications endpoints (Flagged: Not in docs)
  async getNotifications(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(API_CONFIG.ENDPOINTS.NOTIFICATIONS, { method: 'GET' });
  }

  async updateNotificationSettings(settings: any): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.ENDPOINTS.NOTIFICATIONS + '/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Utility methods
  async healthCheck(): Promise<boolean> {
    try {
      await this.request(API_CONFIG.ENDPOINTS.HEALTH, { method: 'GET' });
      return true;
    } catch {
      return false;
    }
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }
}

export const apiService = new ApiService();
export default apiService;
