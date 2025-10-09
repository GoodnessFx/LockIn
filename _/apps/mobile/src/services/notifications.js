import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { APP_CONFIG } from '../config/constants';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export class NotificationService {
  static async registerForPushNotifications() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'LockIn Notifications',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#6C5CE7',
        description: 'Notifications for your learning journey',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.warn('Failed to get push token for push notification!');
        return null;
      }
      
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.warn('Must use physical device for Push Notifications');
    }

    return token;
  }

  // Learning journey notifications
  static async scheduleDailyReminder(time: string, message: string) {
    const [hours, minutes] = time.split(':').map(Number);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Learning Reminder 📚',
        body: message,
        data: { type: 'daily_reminder' },
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });
  }

  static async scheduleStreakReminder(streak: number) {
    const messages = {
      3: '🔥 3 day streak! You\'re building momentum!',
      7: '🎉 One week strong! You\'re on fire!',
      14: '🚀 Two weeks! You\'re unstoppable!',
      30: '🏆 One month! You\'re a learning machine!',
    };

    const message = messages[streak];
    if (message) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Streak Milestone! 🔥',
          body: message,
          data: { type: 'streak', streak },
        },
        trigger: null,
      });
    }
  }

  static async scheduleTaskReminder(taskTitle: string, estimatedTime: number) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder 📝',
        body: `Time to work on: ${taskTitle} (${estimatedTime} min)`,
        data: { type: 'task_reminder', taskTitle, estimatedTime },
      },
      trigger: { seconds: 1 },
    });
  }

  static async scheduleProgressMilestone(percentage: number, niche: string) {
    const messages = {
      25: `🎉 You're 25% through your ${niche} journey!`,
      50: `🎊 Halfway there! 50% of your ${niche} curriculum complete!`,
      75: `🚀 Almost there! 75% of your ${niche} learning done!`,
      100: `🏆 Congratulations! You've completed your ${niche} journey!`,
    };

    const message = messages[percentage];
    if (message) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Progress Milestone! 🎯',
          body: message,
          data: { type: 'progress_milestone', percentage, niche },
        },
        trigger: null,
      });
    }
  }

  static async scheduleRecoveryNotification(message: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to get back on track! 🚀',
        body: message,
        data: { type: 'recovery' },
      },
      trigger: { seconds: 1 },
    });
  }

  static async scheduleWeeklyInsight(insight: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Weekly Learning Insight 💡',
        body: insight,
        data: { type: 'weekly_insight' },
      },
      trigger: null,
    });
  }

  static async scheduleAchievementNotification(achievement: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Achievement Unlocked! 🏆',
        body: achievement,
        data: { type: 'achievement' },
      },
      trigger: null,
    });
  }

  // AI-powered notifications
  static async scheduleAIInsight(insight: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Smart Tip from LockIn AI 🤖',
        body: insight,
        data: { type: 'ai_insight' },
      },
      trigger: null,
    });
  }

  static async scheduleMotivationalMessage(message: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Motivation 💪',
        body: message,
        data: { type: 'motivation' },
      },
      trigger: null,
    });
  }

  // Social features (for future Lockmate functionality)
  static async scheduleSocialNotification(type: string, data: any) {
    const messages = {
      friend_joined: `${data.friendName} joined your learning group!`,
      friend_progress: `${data.friendName} just completed a ${data.taskType} task!`,
      leaderboard: `You're #${data.position} on this week's leaderboard!`,
      challenge_invite: `${data.friendName} challenged you to a learning sprint!`,
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Social Update 👥',
        body: messages[type] || 'New social activity!',
        data: { type: 'social', ...data },
      },
      trigger: null,
    });
  }

  // Utility methods
  static async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  static async cancelNotificationById(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  static async getNotificationHistory() {
    return await Notifications.getPresentedNotificationsAsync();
  }

  static async getScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }

  // Setup default notifications
  static async setupDefaultNotifications(userSchedule: string) {
    try {
      // Cancel existing notifications
      await this.cancelAllNotifications();

      // Schedule daily reminders based on user preference
      const reminderTimes = {
        morning: '09:00',
        afternoon: '14:00',
        evening: '20:00',
        flexible: '10:00',
      };

      const time = reminderTimes[userSchedule] || '10:00';
      await this.scheduleDailyReminder(time, 'Time for your daily learning session! 🎯');

      console.log('Default notifications setup complete');
    } catch (error) {
      console.error('Failed to setup default notifications:', error);
    }
  }
}
