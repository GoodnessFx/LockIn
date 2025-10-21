// Basic notification service without expo-notifications dependency
import { Alert } from 'react-native';

class NotificationService {
  // Basic alert-based notifications
  static showAlert(title, message, buttons = [{ text: 'OK' }]) {
    Alert.alert(title, message, buttons);
  }

  // Schedule a simple reminder (using setTimeout for now)
  static scheduleReminder(title, message, delay = 0) {
    return setTimeout(() => {
      this.showAlert(title, message);
    }, delay);
  }

  // Cancel a scheduled reminder
  static cancelReminder(timeoutId) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  // Show milestone notification
  static showMilestoneNotification(milestone) {
    this.showAlert(
      '🎉 Milestone Achieved!',
      `Congratulations! You've reached: ${milestone}`,
      [{ text: 'Awesome!', style: 'default' }]
    );
  }

  // Show focus reminder
  static showFocusReminder() {
    this.showAlert(
      '⏰ Focus Time!',
      'Time to start your focus session. You got this! 💪',
      [
        { text: 'Start Focus', style: 'default' },
        { text: 'Later', style: 'cancel' }
      ]
    );
  }

  // Show daily progress reminder
  static showDailyProgressReminder() {
    this.showAlert(
      '📊 Daily Check-in',
      'How was your progress today? Take a moment to reflect.',
      [
        { text: 'Log Progress', style: 'default' },
        { text: 'Skip', style: 'cancel' }
      ]
    );
  }
}

export default NotificationService;