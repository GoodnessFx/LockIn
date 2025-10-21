// Basic storage service
import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  // Generic get method
  static async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  // Generic set method
  static async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      return false;
    }
  }

  // Remove item
  static async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      return false;
    }
  }

  // Clear all storage
  static async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  // User profile methods
  static async getUserProfile() {
    return await this.get('lockin_user_profile');
  }

  static async setUserProfile(profile) {
    return await this.set('lockin_user_profile', profile);
  }

  // App settings methods
  static async getAppSettings() {
    return await this.get('lockin_app_settings');
  }

  static async setAppSettings(settings) {
    return await this.set('lockin_app_settings', settings);
  }

  // Onboarding status
  static async getOnboardingStatus() {
    return await this.get('lockin_onboarding_status');
  }

  static async setOnboardingStatus(status) {
    return await this.set('lockin_onboarding_status', status);
  }
}

export default StorageService;