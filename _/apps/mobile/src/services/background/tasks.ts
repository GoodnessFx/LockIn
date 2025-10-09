import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '../../config/constants';
import { aiService } from '../ai/aiService';

const TASK_NAME = 'LOCKIN_INACTIVITY';
const INACTIVITY_THRESHOLD = APP_CONFIG.INACTIVITY_THRESHOLD_HOURS * 60 * 60 * 1000; // Convert to milliseconds

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    console.log('Background task running: Checking for inactivity...');
    
    // Get last active timestamp
    const lastActiveStr = await AsyncStorage.getItem('lockin:lastActive');
    const lastActive = lastActiveStr ? new Date(lastActiveStr) : new Date();
    const now = new Date();
    const timeSinceActive = now.getTime() - lastActive.getTime();

    // Check if user has been inactive
    if (timeSinceActive > INACTIVITY_THRESHOLD) {
      console.log('User inactive detected, creating recovery suggestions...');
      
      // Get user progress data
      const progressStr = await AsyncStorage.getItem('lockin:progress');
      const userProfileStr = await AsyncStorage.getItem('lockin:userProfile');
      
      if (progressStr && userProfileStr) {
        const progress = JSON.parse(progressStr);
        const userProfile = JSON.parse(userProfileStr);
        
        // Generate recovery suggestions using AI
        const recoveryResponse = await aiService.getRecoverySuggestions({
          progress,
          userProfile,
        });

        // Schedule notification
        await scheduleRecoveryNotification(recoveryResponse.message);
        
        // Store recovery suggestions
        await AsyncStorage.setItem('lockin:recoverySuggestions', JSON.stringify({
          message: recoveryResponse.message,
          suggestions: recoveryResponse.suggestions || [],
          timestamp: now.toISOString(),
        }));
      }
    }

    // Update last check timestamp
    await AsyncStorage.setItem('lockin:lastBackgroundCheck', now.toISOString());
    
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background task error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

async function scheduleRecoveryNotification(message: string): Promise<void> {
  try {
    // Cancel any existing recovery notifications
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    // Schedule new notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to get back on track! 🚀',
        body: message.length > 100 ? message.substring(0, 100) + '...' : message,
        data: { type: 'recovery', message },
      },
      trigger: { seconds: 1 }, // Send immediately
    });
  } catch (error) {
    console.error('Failed to schedule notification:', error);
  }
}

export async function registerTasks(): Promise<void> {
  try {
    // Request notification permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Notification permissions not granted');
    }

    // Register background fetch task
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 60 * 60 * 6, // 6 hours
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log('Background tasks registered successfully');
  } catch (error) {
    console.error('Failed to register background tasks:', error);
  }
}

export async function unregisterTasks(): Promise<void> {
  try {
    await BackgroundFetch.unregisterTaskAsync(TASK_NAME);
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('Background tasks unregistered successfully');
  } catch (error) {
    console.error('Failed to unregister background tasks:', error);
  }
}

export async function updateLastActive(): Promise<void> {
  try {
    await AsyncStorage.setItem('lockin:lastActive', new Date().toISOString());
  } catch (error) {
    console.error('Failed to update last active timestamp:', error);
  }
}

export async function getRecoverySuggestions(): Promise<any> {
  try {
    const suggestionsStr = await AsyncStorage.getItem('lockin:recoverySuggestions');
    return suggestionsStr ? JSON.parse(suggestionsStr) : null;
  } catch (error) {
    console.error('Failed to get recovery suggestions:', error);
    return null;
  }
}

export async function clearRecoverySuggestions(): Promise<void> {
  try {
    await AsyncStorage.removeItem('lockin:recoverySuggestions');
  } catch (error) {
    console.error('Failed to clear recovery suggestions:', error);
  }
}

