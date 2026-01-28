import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, Image, StyleSheet, Modal, TextInput, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '@/theme/theme';
import { useAuth } from '@/utils/auth/useAuth';
import { AppState, useAppStore } from '@/store/appStore';
import { useRouter } from 'expo-router';

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
  const notificationsEnabled = useAppStore((s: AppState) => s.notificationsEnabled);
  const setNotificationsEnabled = useAppStore((s: AppState) => s.setNotificationsEnabled);
  const subscriptionPlan = useAppStore((s: AppState) => s.subscriptionPlan);
  const setSubscriptionPlan = useAppStore((s: AppState) => s.setSubscriptionPlan);
  const security = useAppStore((s: AppState) => s.security);
  const setSecurity = useAppStore((s: AppState) => s.setSecurity);
  const setUserProfile = useAppStore((s: AppState) => s.setUserProfile);
  const router = useRouter();
  
  // local notification group toggles (non-persisted), optional
  const [notifications, setNotifications] = useState({
    milestones: true,
    focusReminders: true,
    weeklyReports: true,
    marketing: false,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(userProfile?.name || '');
  const [editEmail, setEditEmail] = useState(userProfile?.email || '');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

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
        <View />
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
              onPress={() => setShowEditModal(true)}
            />
            <SettingItem 
              icon={CreditCard} 
              label="Subscription" 
              value={subscriptionPlan + ' Plan'} 
              onPress={() => setShowSubscriptionModal(true)}
            />
            <SettingItem 
              icon={Shield} 
              label="Security" 
              onPress={() => setShowSecurityModal(true)}
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
              value={notificationsEnabled as unknown as string}
              onSwitch={(v) => setNotificationsEnabled(v)}
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
              onPress={async () => {
                const url = 'https://wa.me/2348072027335';
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  Linking.openURL(url);
                } else {
                  router.push('/(tabs)/lockmate');
                }
              }}
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

      {/* Edit Info Modal */}
      <Modal visible={showEditModal} transparent animationType="slide" onRequestClose={() => setShowEditModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Information</Text>
            <TextInput
              value={editName}
              onChangeText={setEditName}
              placeholder="Name"
              style={styles.input}
              placeholderTextColor={colors.textTertiary}
            />
            <TextInput
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
              placeholderTextColor={colors.textTertiary}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowEditModal(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalPrimary]}
                onPress={() => {
                  const next = {
                    id: userProfile?.id || 'user',
                    name: editName || userProfile?.name || 'LockIn Member',
                    email: editEmail || userProfile?.email || 'member@lockin.app',
                    niche: userProfile?.niche || 'General',
                    goal: userProfile?.goal || '',
                    preferredSchedule: userProfile?.preferredSchedule || '',
                    voicePreference: userProfile?.voicePreference || 'enabled',
                    timezone: userProfile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                  };
                  setUserProfile(next);
                  setShowEditModal(false);
                }}
              >
                <Text style={[styles.modalButtonText, styles.modalPrimaryText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Subscription Modal */}
      <Modal visible={showSubscriptionModal} transparent animationType="fade" onRequestClose={() => setShowSubscriptionModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Plan</Text>
            {(['Free','Pro','Enterprise'] as const).map(p => (
              <TouchableOpacity key={p} style={styles.optionRow} onPress={() => setSubscriptionPlan(p)}>
                <View style={[styles.radioOuter, subscriptionPlan === p && styles.radioOuterActive]}>
                  {subscriptionPlan === p && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.optionLabel}>{p} Plan</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowSubscriptionModal(false)}>
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Security Modal */}
      <Modal visible={showSecurityModal} transparent animationType="fade" onRequestClose={() => setShowSecurityModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Security</Text>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Biometric Unlock</Text>
              <Switch
                value={security.biometricEnabled}
                onValueChange={(v) => setSecurity({ biometricEnabled: v })}
                trackColor={{ false: '#e0e0e0', true: colors.primaryDark }}
                thumbColor={'#fff'}
              />
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Two-Factor Auth</Text>
              <Switch
                value={security.twoFactorEnabled}
                onValueChange={(v) => {
                  setSecurity({ twoFactorEnabled: v });
                  if (v) {
                    Alert.alert('Two-Factor Enabled', 'A verification code will be required at sign-in.');
                  }
                }}
                trackColor={{ false: '#e0e0e0', true: colors.primaryDark }}
                thumbColor={'#fff'}
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowSecurityModal(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semiBold,
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
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryDark,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
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
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
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
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingValue: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
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
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.errorColor,
  },
  versionText: {
    textAlign: 'center',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textTertiary,
    marginBottom: spacing.lg,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.backgroundColor,
    borderRadius: 16,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceColor,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  modalButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    backgroundColor: colors.surfaceColor,
  },
  modalButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  modalPrimary: {
    backgroundColor: colors.primaryDark,
  },
  modalPrimaryText: {
    color: '#fff',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  optionLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  radioOuterActive: {
    borderColor: colors.primaryDark,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryDark,
  },
});
