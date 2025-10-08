import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
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
  Zap
} from 'lucide-react-native';
import { useRequireAuth, useAuth } from '@/utils/auth/useAuth';
import useUser from '@/utils/auth/useUser';

export default function Profile() {
  useRequireAuth();
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { data: user } = useUser();
  
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
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#2d3748',
      }}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2d3748',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff' }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ fontSize: 14, color: '#94a3b8', marginTop: 2 }}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (showChevron && <ChevronRight size={20} color="#94a3b8" />)}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={{
      fontSize: 14,
      fontWeight: '600',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: '#0b0b0f',
    }}>
      {title}
    </Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0b0f' }}>
      <StatusBar style="light" />
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
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#ffffff' }}>
            Profile
          </Text>
          <Text style={{ fontSize: 16, color: '#94a3b8', marginTop: 4 }}>
            Manage your account and track your progress
          </Text>
        </View>

        {/* Profile Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View style={{
            backgroundColor: '#1a1a2e',
            borderRadius: 20,
            padding: 24,
            borderWidth: 1,
            borderColor: '#2d3748',
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#7dd3fc20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <User size={40} color="#7dd3fc" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 }}>
                  {user?.name || 'Demo User'}
                </Text>
                <Text style={{ fontSize: 16, color: '#94a3b8', marginBottom: 8 }}>
                  Level {userStats.level} • {userStats.xp} XP
                </Text>
                <View style={{
                  height: 6,
                  backgroundColor: '#2d3748',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                  <View style={{
                    height: '100%',
                    width: `${(userStats.xp / userStats.nextLevelXp) * 100}%`,
                    backgroundColor: '#7dd3fc',
                    borderRadius: 3,
                  }} />
                </View>
                <Text style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                  {userStats.nextLevelXp - userStats.xp} XP to next level
                </Text>
              </View>
              <TouchableOpacity style={{
                backgroundColor: '#2d3748',
                borderRadius: 8,
                padding: 8,
              }}>
                <Edit3 size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            {/* Stats Grid */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#7dd3fc20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <Zap size={24} color="#7dd3fc" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                  {userStats.streak}
                </Text>
                <Text style={{ fontSize: 12, color: '#94a3b8' }}>Day Streak</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#10b98120',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <Target size={24} color="#10b981" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                  {userStats.completedGoals}
                </Text>
                <Text style={{ fontSize: 12, color: '#94a3b8' }}>Goals Done</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#f59e0b20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <Clock size={24} color="#f59e0b" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                  {userStats.focusHours}
                </Text>
                <Text style={{ fontSize: 12, color: '#94a3b8' }}>Focus Hours</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#ef444420',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                  <Trophy size={24} color="#ef4444" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                  {userStats.achievements}
                </Text>
                <Text style={{ fontSize: 12, color: '#94a3b8' }}>Achievements</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Section */}
        <SectionHeader title="Account" />
        <View style={{ backgroundColor: '#1a1a2e', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#2d3748' }}>
          <SettingItem
            icon={<User size={20} color="#7dd3fc" />}
            title="Personal Information"
            subtitle={user?.email || 'Update your profile details'}
            onPress={() => Alert.alert('Profile', 'Profile editing would open here')}
          />
          <SettingItem
            icon={<Mail size={20} color="#10b981" />}
            title="Email Address"
            subtitle={user?.email || 'No email set'}
            onPress={() => Alert.alert('Email', 'Email editing would open here')}
          />
          <SettingItem
            icon={<Phone size={20} color="#f59e0b" />}
            title="Phone Number"
            subtitle="Add your phone number"
            onPress={() => Alert.alert('Phone', 'Phone number editing would open here')}
          />
        </View>

        {/* Notifications Section */}
        <SectionHeader title="Notifications" />
        <View style={{ backgroundColor: '#1a1a2e', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#2d3748' }}>
          <SettingItem
            icon={<Bell size={20} color="#7dd3fc" />}
            title="Milestone Alerts"
            subtitle="Get notified when you reach goals"
            rightElement={
              <Switch
                value={notifications.milestones}
                onValueChange={(value) => setNotifications({...notifications, milestones: value})}
                trackColor={{ false: '#2d3748', true: '#7dd3fc' }}
                thumbColor={notifications.milestones ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Bell size={20} color="#7dd3fc" />}
            title="Focus Reminders"
            subtitle="Get reminded to start focus sessions"
            rightElement={
              <Switch
                value={notifications.focusReminders}
                onValueChange={(value) => setNotifications({...notifications, focusReminders: value})}
                trackColor={{ false: '#2d3748', true: '#7dd3fc' }}
                thumbColor={notifications.focusReminders ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Bell size={20} color="#7dd3fc" />}
            title="Weekly Reports"
            subtitle="Receive weekly progress summaries"
            rightElement={
              <Switch
                value={notifications.weeklyReports}
                onValueChange={(value) => setNotifications({...notifications, weeklyReports: value})}
                trackColor={{ false: '#2d3748', true: '#7dd3fc' }}
                thumbColor={notifications.weeklyReports ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Bell size={20} color="#7dd3fc" />}
            title="Marketing Updates"
            subtitle="Receive product updates and tips"
            rightElement={
              <Switch
                value={notifications.marketing}
                onValueChange={(value) => setNotifications({...notifications, marketing: value})}
                trackColor={{ false: '#2d3748', true: '#7dd3fc' }}
                thumbColor={notifications.marketing ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
        </View>

        {/* Security Section */}
        <SectionHeader title="Security & Privacy" />
        <View style={{ backgroundColor: '#1a1a2e', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#2d3748' }}>
          <SettingItem
            icon={<Lock size={20} color="#ef4444" />}
            title="Biometric Authentication"
            subtitle="Use Face ID or fingerprint to unlock"
            rightElement={
              <Switch
                value={security.biometric}
                onValueChange={(value) => setSecurity({...security, biometric: value})}
                trackColor={{ false: '#2d3748', true: '#7dd3fc' }}
                thumbColor={security.biometric ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Shield size={20} color="#10b981" />}
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security"
            rightElement={
              <Switch
                value={security.twoFactor}
                onValueChange={(value) => setSecurity({...security, twoFactor: value})}
                trackColor={{ false: '#2d3748', true: '#7dd3fc' }}
                thumbColor={security.twoFactor ? '#ffffff' : '#ffffff'}
              />
            }
            showChevron={false}
          />
          <SettingItem
            icon={<Shield size={20} color="#10b981" />}
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => Alert.alert('Privacy', 'Privacy policy would open here')}
          />
          <SettingItem
            icon={<Shield size={20} color="#10b981" />}
            title="Terms of Service"
            subtitle="Read our terms of service"
            onPress={() => Alert.alert('Terms', 'Terms of service would open here')}
          />
        </View>

        {/* App Settings Section */}
        <SectionHeader title="App Settings" />
        <View style={{ backgroundColor: '#1a1a2e', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#2d3748' }}>
          <SettingItem
            icon={<BarChart3 size={20} color="#7dd3fc" />}
            title="Data & Analytics"
            subtitle="Manage your data and analytics"
            onPress={() => Alert.alert('Data', 'Data settings would open here')}
          />
          <SettingItem
            icon={<Calendar size={20} color="#7dd3fc" />}
            title="Focus Sessions"
            subtitle="Configure focus timer settings"
            onPress={() => Alert.alert('Focus', 'Focus settings would open here')}
          />
          <SettingItem
            icon={<Target size={20} color="#7dd3fc" />}
            title="Goal Settings"
            subtitle="Configure goal tracking preferences"
            onPress={() => Alert.alert('Goals', 'Goal settings would open here')}
          />
        </View>

        {/* Support Section */}
        <SectionHeader title="Support" />
        <View style={{ backgroundColor: '#1a1a2e', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#2d3748' }}>
          <SettingItem
            icon={<HelpCircle size={20} color="#f59e0b" />}
            title="Help Center"
            subtitle="Get answers to common questions"
            onPress={() => Alert.alert('Help', 'Help center would open here')}
          />
          <SettingItem
            icon={<HelpCircle size={20} color="#f59e0b" />}
            title="Contact Support"
            subtitle="Get in touch with our team"
            onPress={() => Alert.alert('Support', 'Contact form would open here')}
          />
          <SettingItem
            icon={<HelpCircle size={20} color="#f59e0b" />}
            title="App Version"
            subtitle="1.0.0 (Build 1)"
            showChevron={false}
          />
        </View>

        {/* Sign Out */}
        <View style={{ backgroundColor: '#1a1a2e', marginBottom: 24, borderRadius: 12, borderWidth: 1, borderColor: '#2d3748' }}>
          <SettingItem
            icon={<LogOut size={20} color="#ef4444" />}
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
            color: '#94a3b8', 
            textAlign: 'center',
            lineHeight: 20 
          }}>
            LockIn helps you build relentlessly with focus timers, goal tracking, and accountability.
          </Text>
          <Text style={{ 
            fontSize: 12, 
            color: '#64748b', 
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