import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from '../../config/constants';
import { UserProfile, ProgressData, CurriculumItem } from '../../store/appStore';

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
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    // TODO: Get token from secure storage
    return null;
  }

  private handleError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.data?.error || 'Server error';
      return new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Network error - please check your connection');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.client.post(API_CONFIG.ENDPOINTS.AUTH + '/login', {
        email,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async register(userData: Partial<UserProfile>): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.client.post(API_CONFIG.ENDPOINTS.AUTH + '/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      await this.client.post(API_CONFIG.ENDPOINTS.AUTH + '/logout');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // User endpoints
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await this.client.get(API_CONFIG.ENDPOINTS.USER + '/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateUserProfile(profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await this.client.put(API_CONFIG.ENDPOINTS.USER + '/profile', profile);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Progress endpoints
  async getProgress(): Promise<ApiResponse<ProgressResponse>> {
    try {
      const response = await this.client.get(API_CONFIG.ENDPOINTS.PROGRESS);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateProgress(progress: Partial<ProgressData>): Promise<ApiResponse<ProgressData>> {
    try {
      const response = await this.client.put(API_CONFIG.ENDPOINTS.PROGRESS, progress);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async markTaskComplete(taskId: string): Promise<ApiResponse> {
    try {
      const response = await this.client.post(API_CONFIG.ENDPOINTS.PROGRESS + '/complete', {
        taskId,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Curriculum endpoints
  async getCurriculum(): Promise<ApiResponse<CurriculumItem[]>> {
    try {
      const response = await this.client.get(API_CONFIG.ENDPOINTS.CURRICULUM);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async generateCurriculum(niche: string): Promise<ApiResponse<CurriculumItem[]>> {
    try {
      const response = await this.client.post(API_CONFIG.ENDPOINTS.CURRICULUM + '/generate', {
        niche,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // AI endpoints
  async askAI(prompt: string, context?: any): Promise<ApiResponse<string>> {
    try {
      const response = await this.client.post(API_CONFIG.ENDPOINTS.AI_CHAT, {
        prompt,
        context,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Notifications endpoints
  async getNotifications(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.client.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateNotificationSettings(settings: any): Promise<ApiResponse> {
    try {
      const response = await this.client.put(API_CONFIG.ENDPOINTS.NOTIFICATIONS + '/settings', settings);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Utility methods
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/health');
      return true;
    } catch {
      return false;
    }
  }

  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }

  setAuthToken(token: string): void {
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.client.defaults.headers.Authorization;
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
