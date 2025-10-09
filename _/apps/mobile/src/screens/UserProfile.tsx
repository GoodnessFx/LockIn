import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';
import { useAppStore } from '../store/appStore';
import { APP_CONFIG } from '../../config/constants';
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  Lock,
  Edit3,
  Award,
  Target,
  Calendar,
  BarChart3,
  Crown,
  Star,
  Trophy,
  Zap,
  Settings
} from 'lucide-react-native';

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

  const [notifications, setNotifications] = useState({
    milestones: true,
    focusReminders: true,
    weeklyReports: true,
    marketing: false,
  });

  const [security, setSecurity] = useState({
    biometric: true,
    twoFactor: false,
  });

  // Mock user stats
  const userStats = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 23,
    totalGoals: 45,
    completedGoals: 38,
    focusHours: 156,
    achievements: 8,
  };

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

  const SettingItem = ({ icon, title, subtitle, onPress, rightElement, showChevron = true }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.settingItem, { backgroundColor: colors.surface }]}
      activeOpacity={0.7}
    >
      <View style={styles.settingItemLeft}>
        <View style={[styles.settingIcon, { backgroundColor: colors.primary }]}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightElement || (showChevron && <ChevronRight size={20} color={colors.textSecondary} />)}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
      {title}
    </Text>
  );

  const renderProfileHeader = () => (
    <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <User size={40} color="white" />
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={[styles.profileName, { color: colors.text }]}>
            {userProfile?.name || 'IG'}
          </Text>
          <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
            Level {userStats.level} • {userStats.xp} XP
          </Text>
          <View style={[styles.xpBar, { backgroundColor: colors.textSecondary }]}>
            <View style={[
              styles.xpFill,
              { 
                width: `${(userStats.xp / userStats.nextLevelXp) * 100}%`,
                backgroundColor: colors.primary 
              }
            ]} />
          </View>
          <Text style={[styles.xpText, { color: colors.textSecondary }]}>
            {userStats.nextLevelXp - userStats.xp} XP to next level
          </Text>
        </View>
        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.textSecondary }]}>
          <Edit3 size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.primary }]}>
            <Zap size={24} color="white" />
          </View>
          <Text style={[styles.statNumber, { color: colors.text }]}>{userStats.streak}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.success }]}>
            <Target size={24} color="white" />
          </View>
          <Text style={[styles.statNumber, { color: colors.text }]}>{userStats.completedGoals}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Goals Done</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.warning }]}>
            <Calendar size={24} color="white" />
          </View>
          <Text style={[styles.statNumber, { color: colors.text }]}>{userStats.focusHours}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Focus Hours</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.error }]}>
            <Trophy size={24} color="white" />
          </View>
          <Text style={[styles.statNumber, { color: colors.text }]}>{userStats.achievements}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Achievements</Text>
        </View>
      </View>
    </View>
  );



  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {renderProfileHeader()}
      
      {/* Account Section */}
      <SectionHeader title="Account" />
      <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}>
        <SettingItem
          icon={<User size={20} color="white" />}
          title="Personal Information"
          subtitle={userProfile?.email || 'Update your profile details'}
          onPress={() => Alert.alert('Profile', 'Profile editing would open here')}
        />
        <SettingItem
          icon={<Mail size={20} color="white" />}
          title="Email Address"
          subtitle={userProfile?.email || 'No email set'}
          onPress={() => Alert.alert('Email', 'Email editing would open here')}
        />
        <SettingItem
          icon={<Phone size={20} color="white" />}
          title="Phone Number"
          subtitle="Add your phone number"
          onPress={() => Alert.alert('Phone', 'Phone number editing would open here')}
        />
      </View>

      {/* Notifications Section */}
      <SectionHeader title="Notifications" />
      <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}>
        <SettingItem
          icon={<Bell size={20} color="white" />}
          title="Milestone Alerts"
          subtitle="Get notified when you reach goals"
          rightElement={
            <Switch
              value={notifications.milestones}
              onValueChange={(value) => setNotifications({...notifications, milestones: value})}
              trackColor={{ false: colors.textSecondary, true: colors.primary }}
              thumbColor="white"
            />
          }
          showChevron={false}
        />
        <SettingItem
          icon={<Bell size={20} color="white" />}
          title="Focus Reminders"
          subtitle="Get reminded to start focus sessions"
          rightElement={
            <Switch
              value={notifications.focusReminders}
              onValueChange={(value) => setNotifications({...notifications, focusReminders: value})}
              trackColor={{ false: colors.textSecondary, true: colors.primary }}
              thumbColor="white"
            />
          }
          showChevron={false}
        />
        <SettingItem
          icon={<Bell size={20} color="white" />}
          title="Weekly Reports"
          subtitle="Receive weekly progress summaries"
          rightElement={
            <Switch
              value={notifications.weeklyReports}
              onValueChange={(value) => setNotifications({...notifications, weeklyReports: value})}
              trackColor={{ false: colors.textSecondary, true: colors.primary }}
              thumbColor="white"
            />
          }
          showChevron={false}
        />
      </View>

      {/* App Settings Section */}
      <SectionHeader title="App Settings" />
      <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}>
        <SettingItem
          icon={<Settings size={20} color="white" />}
          title="Theme"
          subtitle={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          rightElement={
            <Switch
              value={theme === 'dark'}
              onValueChange={handleThemeToggle}
              trackColor={{ false: colors.textSecondary, true: colors.primary }}
              thumbColor="white"
            />
          }
          showChevron={false}
        />
        <SettingItem
          icon={<Bell size={20} color="white" />}
          title="Voice Narration"
          subtitle={aiAssistant.isMuted ? 'Disabled' : 'Enabled'}
          rightElement={
            <Switch
              value={!aiAssistant.isMuted}
              onValueChange={handleVoiceToggle}
              trackColor={{ false: colors.textSecondary, true: colors.primary }}
              thumbColor="white"
            />
          }
          showChevron={false}
        />
        <SettingItem
          icon={<BarChart3 size={20} color="white" />}
          title="Data & Analytics"
          subtitle="Manage your data and analytics"
          onPress={() => Alert.alert('Data', 'Data settings would open here')}
        />
      </View>

      {/* Support Section */}
      <SectionHeader title="Support" />
      <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}>
        <SettingItem
          icon={<HelpCircle size={20} color="white" />}
          title="Help Center"
          subtitle="Get answers to common questions"
          onPress={() => Alert.alert('Help', 'Help center would open here')}
        />
        <SettingItem
          icon={<HelpCircle size={20} color="white" />}
          title="Contact Support"
          subtitle="Get in touch with our team"
          onPress={() => Alert.alert('Support', 'Contact form would open here')}
        />
        <SettingItem
          icon={<HelpCircle size={20} color="white" />}
          title="App Version"
          subtitle="1.0.0 (Build 1)"
          showChevron={false}
        />
      </View>

      {/* Sign Out */}
      <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}>
        <SettingItem
          icon={<LogOut size={20} color="white" />}
          title="Sign Out"
          subtitle="Sign out of your account"
          onPress={handleLogout}
          showChevron={false}
        />
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
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  xpBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  xpFill: {
    height: '100%',
    borderRadius: 3,
  },
  xpText: {
    fontSize: 12,
  },
  editButton: {
    borderRadius: 8,
    padding: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  settingsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 4,
  },
});
