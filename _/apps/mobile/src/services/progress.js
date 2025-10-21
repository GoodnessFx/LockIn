// Basic progress service
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProgressService {
  static STORAGE_KEY = 'lockin_progress';

  // Get current progress
  static async getProgress() {
    try {
      const progress = await AsyncStorage.getItem(this.STORAGE_KEY);
      return progress ? JSON.parse(progress) : {
        currentDay: 1,
        totalDays: 97,
        streak: 0,
        completedTasks: [],
        lastActiveDate: new Date().toISOString(),
        batteryLevel: 100
      };
    } catch (error) {
      console.error('Error getting progress:', error);
      return null;
    }
  }

  // Update progress
  static async updateProgress(updates) {
    try {
      const currentProgress = await this.getProgress();
      const newProgress = { ...currentProgress, ...updates };
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(newProgress));
      return newProgress;
    } catch (error) {
      console.error('Error updating progress:', error);
      return null;
    }
  }

  // Mark task as complete
  static async markTaskComplete(taskId) {
    try {
      const progress = await this.getProgress();
      if (progress && !progress.completedTasks.includes(taskId)) {
        progress.completedTasks.push(taskId);
        await this.updateProgress(progress);
      }
      return progress;
    } catch (error) {
      console.error('Error marking task complete:', error);
      return null;
    }
  }

  // Get streak count
  static async getStreak() {
    try {
      const progress = await this.getProgress();
      return progress ? progress.streak : 0;
    } catch (error) {
      console.error('Error getting streak:', error);
      return 0;
    }
  }

  // Update battery level
  static async updateBatteryLevel(level) {
    try {
      return await this.updateProgress({ batteryLevel: Math.max(0, Math.min(100, level)) });
    } catch (error) {
      console.error('Error updating battery level:', error);
      return null;
    }
  }
}

export default ProgressService;