import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Replaced lucide-react-native icons with emoji/text alternatives to avoid import errors
const SettingsIcon = () => <Text style={{ fontSize: 20 }}>⚙️</Text>;
const User = () => <Text style={{ fontSize: 20 }}>👤</Text>;
const Bell = () => <Text style={{ fontSize: 20 }}>🔔</Text>;
const Shield = () => <Text style={{ fontSize: 20 }}>🛡️</Text>;
const CreditCard = () => <Text style={{ fontSize: 20 }}>💳</Text>;
const HelpCircle = () => <Text style={{ fontSize: 20 }}>❓</Text>;
const LogOut = () => <Text style={{ fontSize: 20 }}>🚪</Text>;
const ChevronRight = () => <Text style={{ fontSize: 20 }}>▶️</Text>;
const Mail = () => <Text style={{ fontSize: 20 }}>📧</Text>;
const Phone = () => <Text style={{ fontSize: 20 }}>📞</Text>;
const Lock = () => <Text style={{ fontSize: 20 }}>🔒</Text>;
const Edit3 = () => <Text style={{ fontSize: 20 }}>✏️</Text>;
const Award = () => <Text style={{ fontSize: 20 }}>🏆</Text>;
const Target = () => <Text style={{ fontSize: 20 }}>🎯</Text>;
const Calendar = () => <Text style={{ fontSize: 20 }}>📅</Text>;
const BarChart3 = () => <Text style={{ fontSize: 20 }}>📊</Text>;
const Crown = () => <Text style={{ fontSize: 20 }}>👑</Text>;
const Star = () => <Text style={{ fontSize: 20 }}>⭐</Text>;
const Trophy = () => <Text style={{ fontSize: 20 }}>🏆</Text>;
const Zap = () => <Text style={{ fontSize: 20 }}>⚡</Text>;
const Clock = () => <Text style={{ fontSize: 20 }}>🕐</Text>;
import { useAuth } from '@/utils/auth/useAuth';
import useUser from '@/utils/auth/useUser';
import { useAppStore } from '@/store/appStore';
import StorageService from '@/services/storage';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { data: user } = useUser();
  const { userProfile: storeUserProfile } = useAppStore();
  const [onboardProfile, setOnboardProfile] = useState(null);

  useEffect(() => {
    const loadOnboarding = async () => {
      try {
        const data = await StorageService.get('lockin_onboarding_data');
        setOnboardProfile(data?.profile || null);
      } catch (error) {
        console.error('Error loading onboarding data:', error);
      }
    };
    loadOnboarding();
  }, []);
  
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

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => signOut()
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightElement, showChevron = true }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      }}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#0b0b0f' }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ fontSize: 14, color: '#6c757d', marginTop: 2 }}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (showChevron && <ChevronRight size={20} color="#6c757d" />)}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={{
      fontSize: 14,
      fontWeight: '600',
      color: '#6c757d',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: '#ffffff',
    }}>
      {title}
    </Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" />
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#0b0b0f' }}>
            Profile
          </Text>
          <Text style={{ fontSize: 16, color: '#6c757d', marginTop: 4 }}>
            Manage your account and track your progress
          </Text>
        </View>

        {/* Profile Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 20,
            padding: 24,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#2563eb20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <User size={40} color="#2563eb" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0b0b0f', marginBottom: 4 }}>
                  {(
                    (storeUserProfile?.name && storeUserProfile.name.trim()) ||
                    (onboardProfile?.firstName && onboardProfile.firstName.trim()) ||
                    (onboardProfile?.username && onboardProfile.username.trim()) ||
                    user?.name ||
                    user?.email ||
                    'LockIn User'
                  )}
                </Text>
                <Text style={{ fontSize: 16, color: '#6c757d', marginBottom: 8 }}>
                  Level {userStats.level} • {userStats.xp} XP
                </Text>
                <View style={{
                  height: 6,
                  backgroundColor: '#e0e0e0',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                  <View style={{
                    height: '100%',
                    width: `${(userStats.xp / userStats.nextLevelXp) * 100}%`,
                    backgroundColor: '#2563eb',
                    borderRadius: 3,
                  }} />
                </View>
                <Text style={{ fontSize: 12, color: '#6c757d', marginTop: 4 }}>
                  {userStats.nextLevelXp - userStats.xp} XP to next level
                </Text>
              </View>
              <TouchableOpacity 
                activeOpacity={0.7}
                style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                <Edit3 size={20} color="#6c757d" />
              </TouchableOpacity>
            </View>

            {/* Stats Grid */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#2563eb20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <Zap size={24} color="#2563eb" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0b0b0f' }}>
                  {userStats.streak}
                </Text>
                <Text style={{ fontSize: 12, color: '#6c757d' }}>Day Streak</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#00b89420',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <Target size={24} color="#00b894" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0b0b0f' }}>
                  {userStats.completedGoals}
                </Text>
                <Text style={{ fontSize: 12, color: '#6c757d' }}>Goals Done</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#fdcb6e20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <Clock size={24} color="#fdcb6e" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0b0b0f' }}>
                  {userStats.focusHours}
                </Text>
                <Text style={{ fontSize: 12, color: '#6c757d' }}>Focus Hours</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#e1705520',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <Trophy size={24} color="#e17055" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0b0b0f' }}>
                  {userStats.achievements}
                </Text>
                <Text style={{ fontSize: 12, color: '#6c757d' }}>Achievements</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Section */}
        <SectionHeader title="Account" />
        <View style={{ backgroundColor: '#f8f9fa', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
          <SettingItem
            icon={<User size={20} color="#2563eb" />}
            title="Personal Information"
            subtitle={user?.email || 'Update your profile details'}
            onPress={() => Alert.alert('Profile', 'Profile editing would open here')}
          />
          <SettingItem
            icon={<Mail size={20} color="#00b894" />}
            title="Email Address"
            subtitle={user?.email || 'No email set'}
            onPress={() => Alert.alert('Email', 'Email editing would open here')}
          />
          <SettingItem
            icon={<Phone size={20} color="#fdcb6e" />}
            title="Phone Number"
            subtitle="Add your phone number"
            onPress={() => Alert.alert('Phone', 'Phone number editing would open here')}
          />
        </View>

        {/* Notifications Section */}
        <SectionHeader title="Notifications" />
        <View style={{ backgroundColor: '#f8f9fa', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
          <SettingItem
            icon={<Bell size={20} color="#2563eb" />}
            title="Milestone Alerts"
            subtitle="Get notified when you reach goals"
            rightElement={
              <Switch
                value={notifications.milestones}
                onValueChange={(value) => setNotifications({...notifications, milestones: value})}
                trackColor={{ false: '#e0e0e0', true: '#2563eb' }}
                thumbColor={notifications.milestones ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Bell size={20} color="#2563eb" />}
            title="Focus Reminders"
            subtitle="Get reminded to start focus sessions"
            rightElement={
              <Switch
                value={notifications.focusReminders}
                onValueChange={(value) => setNotifications({...notifications, focusReminders: value})}
                trackColor={{ false: '#e0e0e0', true: '#2563eb' }}
                thumbColor={notifications.focusReminders ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Bell size={20} color="#2563eb" />}
            title="Weekly Reports"
            subtitle="Receive weekly progress summaries"
            rightElement={
              <Switch
                value={notifications.weeklyReports}
                onValueChange={(value) => setNotifications({...notifications, weeklyReports: value})}
                trackColor={{ false: '#e0e0e0', true: '#2563eb' }}
                thumbColor={notifications.weeklyReports ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Bell size={20} color="#2563eb" />}
            title="Marketing Updates"
            subtitle="Receive product updates and tips"
            rightElement={
              <Switch
                value={notifications.marketing}
                onValueChange={(value) => setNotifications({...notifications, marketing: value})}
                trackColor={{ false: '#e0e0e0', true: '#2563eb' }}
                thumbColor={notifications.marketing ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
        </View>

        {/* Security Section */}
        <SectionHeader title="Security & Privacy" />
        <View style={{ backgroundColor: '#f8f9fa', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
          <SettingItem
            icon={<Lock size={20} color="#e17055" />}
            title="Biometric Authentication"
            subtitle="Use Face ID or fingerprint to unlock"
            rightElement={
              <Switch
                value={security.biometric}
                onValueChange={(value) => setSecurity({...security, biometric: value})}
                trackColor={{ false: '#e0e0e0', true: '#2563eb' }}
                thumbColor={security.biometric ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Shield size={20} color="#00b894" />}
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security"
            rightElement={
              <Switch
                value={security.twoFactor}
                onValueChange={(value) => setSecurity({...security, twoFactor: value})}
                trackColor={{ false: '#e0e0e0', true: '#2563eb' }}
                thumbColor={security.twoFactor ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Shield size={20} color="#00b894" />}
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => Alert.alert('Privacy', 'Privacy policy would open here')}
          />
          <SettingItem
            icon={<Shield size={20} color="#00b894" />}
            title="Terms of Service"
            subtitle="Read our terms of service"
            onPress={() => Alert.alert('Terms', 'Terms of service would open here')}
          />
        </View>

        {/* App Settings Section */}
        <SectionHeader title="App Settings" />
        <View style={{ backgroundColor: '#f8f9fa', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
          <SettingItem
            icon={<BarChart3 size={20} color="#2563eb" />}
            title="Data & Analytics"
            subtitle="Manage your data and analytics"
            onPress={() => Alert.alert('Data', 'Data settings would open here')}
          />
          <SettingItem
            icon={<Calendar size={20} color="#2563eb" />}
            title="Focus Sessions"
            subtitle="Configure focus timer settings"
            onPress={() => Alert.alert('Focus', 'Focus settings would open here')}
          />
          <SettingItem
            icon={<Target size={20} color="#2563eb" />}
            title="Goal Settings"
            subtitle="Configure goal tracking preferences"
            onPress={() => Alert.alert('Goals', 'Goal settings would open here')}
          />
        </View>

        {/* Support Section */}
        <SectionHeader title="Support" />
        <View style={{ backgroundColor: '#f8f9fa', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
          <SettingItem
            icon={<HelpCircle size={20} color="#fdcb6e" />}
            title="Help Center"
            subtitle="Get answers to common questions"
            onPress={() => Alert.alert('Help', 'Help center would open here')}
          />
          <SettingItem
            icon={<HelpCircle size={20} color="#fdcb6e" />}
            title="Contact Support"
            subtitle="Get in touch with our team"
            onPress={() => Alert.alert('Support', 'Contact form would open here')}
          />
          <SettingItem
            icon={<HelpCircle size={20} color="#fdcb6e" />}
            title="App Version"
            subtitle="1.0.0 (Build 1)"
            showChevron={false}
          />
        </View>

        {/* Sign Out */}
        <View style={{ backgroundColor: '#f8f9fa', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
          <SettingItem
            icon={<LogOut size={20} color="#e17055" />}
            title="Sign Out"
            subtitle="Sign out of your account"
            onPress={handleSignOut}
            showChevron={false}
          />
        </View>

        {/* App Info */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <Text style={{ 
            fontSize: 14, 
            color: '#6c757d', 
            textAlign: 'center',
            lineHeight: 20 
          }}>
            LockIn helps you build relentlessly with focus timers, goal tracking, and accountability.
          </Text>
          <Text style={{ 
            fontSize: 12, 
            color: '#6c757d', 
            textAlign: 'center',
            marginTop: 8 
          }}>
            Made with ❤️ for builders everywhere
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}