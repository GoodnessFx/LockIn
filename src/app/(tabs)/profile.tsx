import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '@/theme/theme';
import { useAuth } from '@/utils/auth/useAuth';
import useUser from '@/utils/auth/useUser';
import { AppState, useAppStore } from '@/store/appStore';

// Replace emoji icons with professional vector icons
const SettingsIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="settings-outline" size={size || 20} color={color || '#333'} />
);
const User = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="person-outline" size={size || 20} color={color || '#333'} />
);
const Bell = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="notifications-outline" size={size || 20} color={color || '#333'} />
);
const Shield = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="shield-checkmark-outline" size={size || 20} color={color || '#333'} />
);
const CreditCard = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="card-outline" size={size || 20} color={color || '#333'} />
);
const HelpCircle = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="help-circle-outline" size={size || 20} color={color || '#333'} />
);
const LogOut = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="log-out-outline" size={size || 20} color={color || '#333'} />
);
const ChevronRight = ({ size, color }: { size?: number; color?: string }) => (
  <Ionicons name="chevron-forward" size={size || 20} color={color || '#333'} />
);

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const userProfile = useAppStore((s: AppState) => s.userProfile);
  const theme = useAppStore((s: AppState) => s.theme);
  const setTheme = useAppStore((s: AppState) => s.setTheme);
  
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

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          style: "destructive",
          onPress: async () => {
            await signOut();
          }
        }
      ]
    );
  };

  const SettingItem = ({ 
    icon: Icon, 
    label, 
    value, 
    onPress, 
    isSwitch = false, 
    onSwitch 
  }: { 
    icon: any; 
    label: string; 
    value?: string; 
    onPress?: () => void; 
    isSwitch?: boolean; 
    onSwitch?: (val: boolean) => void;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon size={20} color={colors.textPrimary} />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {isSwitch ? (
          <Switch 
            value={value as unknown as boolean} 
            onValueChange={onSwitch}
            trackColor={{ false: '#e0e0e0', true: colors.primaryDark }}
            thumbColor={'#fff'}
          />
        ) : (
          <>
            {value && <Text style={styles.settingValue}>{value}</Text>}
            <ChevronRight color={colors.textTertiary} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <SettingsIcon size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
             <Text style={styles.avatarText}>
               {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
             </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile?.name || 'LockIn Member'}</Text>
            <Text style={styles.profileEmail}>{userProfile?.email || 'member@lockin.app'}</Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{userProfile?.niche || 'General'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <SettingItem 
              icon={User} 
              label="Personal Information" 
              onPress={() => {}}
            />
            <SettingItem 
              icon={CreditCard} 
              label="Subscription" 
              value="Pro Plan" 
              onPress={() => {}}
            />
            <SettingItem 
              icon={Shield} 
              label="Security" 
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingItem 
              icon={Bell} 
              label="Notifications" 
              isSwitch 
              value={notifications.milestones as unknown as string}
              onSwitch={(v) => setNotifications({...notifications, milestones: v})}
            />
            <SettingItem 
              icon={User} 
              label="Dark Mode" 
              isSwitch 
              value={theme === 'dark' as unknown as string}
              onSwitch={(v) => setTheme(v ? 'dark' : 'light')}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingItem 
              icon={HelpCircle} 
              label="Help Center" 
              onPress={() => {}}
            />
            <SettingItem 
              icon={Shield} 
              label="Privacy Policy" 
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut color={colors.errorColor} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0 (Build 142)</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceColor,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  avatarText: {
    ...typography.h1,
    fontSize: 24,
    color: colors.primaryDark,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  sectionContent: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingValue: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  signOutText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.errorColor,
  },
  versionText: {
    textAlign: 'center',
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.lg,
  }
});
