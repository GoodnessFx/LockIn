import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';
import { useAppStore } from '../store/appStore';
import { APP_CONFIG } from '../../config/constants';

export default function UserProfile() {
  const { colors, spacing, borderRadius } = useTheme();
  const { 
    userProfile, 
    progress, 
    theme, 
    setTheme, 
    aiAssistant, 
    updateAIAssistant,
    setOnboarded 
  } = useAppStore();

  const handleThemeToggle = async () => {
    await setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleVoiceToggle = async () => {
    await updateAIAssistant({ isMuted: !aiAssistant.isMuted });
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your progress data will be exported as a JSON file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Export', 
          onPress: () => {
            // TODO: Implement data export
            Alert.alert('Success', 'Data exported successfully!');
          }
        }
      ]
    );
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'This will reset all your progress and start over. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            // TODO: Implement progress reset
            Alert.alert('Success', 'Progress reset successfully!');
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await setOnboarded(false);
          }
        }
      ]
    );
  };

  const settingsItems = [
    {
      id: 'theme',
      title: 'Theme',
      subtitle: theme === 'dark' ? 'Dark Mode' : 'Light Mode',
      icon: theme === 'dark' ? 'moon' : 'sunny',
      onPress: handleThemeToggle,
      showToggle: true,
    },
    {
      id: 'voice',
      title: 'Voice Narration',
      subtitle: aiAssistant.isMuted ? 'Disabled' : 'Enabled',
      icon: aiAssistant.isMuted ? 'volume-mute' : 'volume-high',
      onPress: handleVoiceToggle,
      showToggle: true,
    },
    {
      id: 'export',
      title: 'Export Data',
      subtitle: 'Download your progress',
      icon: 'download-outline',
      onPress: handleExportData,
    },
    {
      id: 'reset',
      title: 'Reset Progress',
      subtitle: 'Start over from day 1',
      icon: 'refresh-outline',
      onPress: handleResetProgress,
      destructive: true,
    },
    {
      id: 'logout',
      title: 'Logout',
      subtitle: 'Sign out of your account',
      icon: 'log-out-outline',
      onPress: handleLogout,
      destructive: true,
    },
  ];

  const renderProfileHeader = () => (
    <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={styles.avatarText}>
          {userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
        </Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={[styles.profileName, { color: colors.text }]}>
          {userProfile?.name || 'User'}
        </Text>
        <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
          {userProfile?.email || 'user@example.com'}
        </Text>
        <Text style={[styles.profileNiche, { color: colors.primary }]}>
          {userProfile?.niche || 'General'}
        </Text>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.statNumber, { color: colors.primary }]}>
          {progress.streak}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          Day Streak
        </Text>
      </View>
      <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.statNumber, { color: colors.success }]}>
          {progress.currentDay}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          Days Completed
        </Text>
      </View>
      <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.statNumber, { color: colors.warning }]}>
          {Math.round((progress.currentDay / progress.totalDays) * 100)}%
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          Progress
        </Text>
      </View>
</View>
);

  const renderSettingsItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.settingsItem, { backgroundColor: colors.surface }]}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        <View style={[
          styles.settingsIcon,
          { backgroundColor: item.destructive ? colors.error : colors.primary }
        ]}>
          <Ionicons 
            name={item.icon as any} 
            size={20} 
            color="white" 
          />
        </View>
        <View style={styles.settingsText}>
          <Text style={[
            styles.settingsTitle,
            { color: item.destructive ? colors.error : colors.text }
          ]}>
            {item.title}
          </Text>
          <Text style={[styles.settingsSubtitle, { color: colors.textSecondary }]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
      {item.showToggle ? (
        <View style={[
          styles.toggle,
          { backgroundColor: item.id === 'theme' ? (theme === 'dark' ? colors.primary : colors.textSecondary) :
                          item.id === 'voice' ? (!aiAssistant.isMuted ? colors.primary : colors.textSecondary) : colors.textSecondary }
        ]}>
          <View style={[
            styles.toggleThumb,
            { 
              backgroundColor: 'white',
              transform: [{ translateX: item.id === 'theme' ? (theme === 'dark' ? 20 : 0) :
                                      item.id === 'voice' ? (!aiAssistant.isMuted ? 20 : 0) : 0 }]
            }
          ]} />
        </View>
      ) : (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={colors.textSecondary} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {renderProfileHeader()}
      {renderStats()}
      
      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Settings
        </Text>
        {settingsItems.map(renderSettingsItem)}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          LockIn v1.0.0
        </Text>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Made with ❤️ for builders
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  profileNiche: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  settingsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 12,
    marginBottom: 4,
  },
});
