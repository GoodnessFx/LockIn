import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import { colors, spacing, typography, shadows } from '@/theme/theme';
import { useTeamStore } from '@/store/teamStore';
import { useAppStore, AppState, UserRole } from '@/store/appStore';
import type { ActivityType, TeamActivity, NewTeamActivityInput } from '@/types/team';
import { pickImage, uploadImageToStorageAsync } from '@/services/teamService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TEAM_ID = 'LockIn-Core';
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/Gpk9FXZWKqc4vVnr1kVqwA';

const TYPE_EMOJI: Record<ActivityType, string> = {
  code_push: '💻',
  design_update: '🎨',
  video_edit: '🎥',
  writing_update: '✍️',
  idea: '💡',
  meeting: '📅',
};

const FILTERS: Array<{ key: 'all' | ActivityType; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'code_push', label: 'Dev' },
  { key: 'design_update', label: 'Design' },
  { key: 'video_edit', label: 'Video' },
  { key: 'writing_update', label: 'Writing' },
  { key: 'idea', label: 'Ideas' },
  { key: 'meeting', label: 'Meet' },
];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const d = Math.floor(hr / 24);
  return `${d}d`;
}

export default function TeamWorkspace() {
  const insets = useSafeAreaInsets();
  const user = useAppStore((s: AppState) => s.userProfile);
  const role: UserRole | undefined = user?.role;

  const {
    activities,
    isLoading,
    filter,
    setFilter,
    loadInitial,
    startRealtime,
    logActivity,
    flushQueue,
  } = useTeamStore();

  const [isSheetVisible, setSheetVisible] = useState(false);
  const [pinChecked, setPinChecked] = useState(false);
  const [pinVerified, setPinVerified] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    loadInitial(TEAM_ID);
    const unsubscribeRT = startRealtime(TEAM_ID);
    const unsubscribeNet = NetInfo.addEventListener((s) => {
      if (s.isConnected) flushQueue();
    });
    (async () => {
      const v = await AsyncStorage.getItem('team_pin_' + TEAM_ID);
      setPinVerified(v === '1');
      setPinChecked(true);
    })();
    return () => {
      unsubscribeRT && unsubscribeRT();
      unsubscribeNet();
    };
  }, [loadInitial, startRealtime, flushQueue]);

  const filtered = useMemo(() => {
    if (filter === 'all') return activities;
    return activities.filter((a) => a.type === filter);
  }, [activities, filter]);

  const canAccess = role === 'team_member' || role === 'admin';
  if (!canAccess) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Team</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <Ionicons name="lock-closed" size={48} color={colors.textSecondary} />
          <Text style={{ marginTop: 12, fontSize: 16, color: colors.textSecondary, textAlign: 'center' }}>
            Team Workspace is available to LockIn-Core members only.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  if (canAccess && pinChecked && !pinVerified) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Team</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <Ionicons name="key" size={48} color={colors.textPrimary} />
          <Text style={{ marginTop: 12, fontSize: 16, color: colors.textPrimary, textAlign: 'center', marginBottom: 8 }}>
            Enter Team PIN to unlock
          </Text>
          <TextInput
            value={pinInput}
            onChangeText={(t) => { setPinInput(t); if (pinError) setPinError(''); }}
            placeholder="Team PIN"
            placeholderTextColor={colors.textTertiary}
            secureTextEntry
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: pinError ? colors.errorColor : colors.borderColor,
              padding: 12,
              borderRadius: 12,
              color: colors.textPrimary,
              marginBottom: 10
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {!!pinError && <Text style={{ color: colors.errorColor, marginBottom: 12 }}>{pinError}</Text>}
          <TouchableOpacity
            onPress={async () => {
              if (pinInput === 'LockedInKpa') {
                await AsyncStorage.setItem('team_pin_' + TEAM_ID, '1');
                setPinVerified(true);
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              } else {
                setPinError('Invalid PIN');
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
              }
            }}
            style={{
              backgroundColor: '#0b0b0f',
              paddingHorizontal: 18,
              paddingVertical: 12,
              borderRadius: 12
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Unlock</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const onRefresh = async () => {
    await loadInitial(TEAM_ID);
  };

  const openWhatsAppGroup = async () => {
    try {
      await Linking.openURL(WHATSAPP_GROUP_URL);
    } catch {
    }
  };

  const shareToWhatsApp = async (activity: TeamActivity) => {
    const formatted =
      `${TYPE_EMOJI[activity.type]} ${activity.title}\n` +
      (activity.description ? `${activity.description}\n` : '') +
      `— ${activity.user?.name || 'Teammate'} • ${timeAgo(activity.created_at)} • #${activity.team_id}`;
    const url = `whatsapp://send?text=${encodeURIComponent(formatted)}`;
    try {
      await Linking.openURL(url);
    } catch {
      await Linking.openURL(WHATSAPP_GROUP_URL);
    }
  };

  const quickLog = useCallback(
    async (type: ActivityType) => {
      const base: NewTeamActivityInput = {
        team_id: TEAM_ID,
        type,
        title: '',
      };
      switch (type) {
        case 'code_push':
          base.title = 'Pushed commits to main';
          base.description = 'Latest changes synced';
          break;
        case 'design_update':
          base.title = 'Design update';
          base.description = 'Posted new screens';
          break;
        case 'video_edit':
          base.title = 'Video edit progress';
          base.description = 'New cut uploaded';
          break;
        case 'writing_update':
          base.title = 'Writing update';
          base.description = 'Draft progressed';
          break;
        case 'idea':
          base.title = 'New idea';
          base.description = 'Captured a quick thought';
          break;
        case 'meeting':
          base.title = 'Call team meeting';
          base.description = 'Jump in now';
          break;
      }
      if (type === 'meeting') {
        const msg = `🔥 Quick team meeting in 5 min? Join now! (${new Date().toLocaleTimeString()})`;
        const url = `whatsapp://send?text=${encodeURIComponent(msg)}`;
        try {
          await Linking.openURL(url);
        } catch {
          await Linking.openURL(WHATSAPP_GROUP_URL);
        }
      }
      if (type === 'design_update' || type === 'idea') {
        try {
          const uri = await pickImage();
          if (uri) {
            const publicUrl = await uploadImageToStorageAsync(uri);
            base.image_url = publicUrl;
          }
        } catch {
        }
      }
      await logActivity(base);
      setSheetVisible(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    [logActivity]
  );

  const renderItem = ({ item }: { item: TeamActivity }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            {item.user?.avatarUrl ? (
              <Image source={{ uri: item.user.avatarUrl }} style={{ width: 36, height: 36, borderRadius: 18 }} />
            ) : (
              <Text style={styles.avatarText}>{item.user?.name?.charAt(0)?.toUpperCase() || 'U'}</Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>
              {TYPE_EMOJI[item.type]} {item.title}
            </Text>
            <Text style={styles.cardMeta}>
              {item.user?.name || 'Teammate'} • {timeAgo(item.created_at)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => shareToWhatsApp(item)} style={styles.shareButton}>
            <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
          </TouchableOpacity>
        </View>
        {!!item.description && <Text style={styles.cardDesc}>{item.description}</Text>}
        {item.image_url ? <Image source={{ uri: item.image_url }} style={styles.cardImage} /> : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Team</Text>
        <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsAppGroup}>
          <Ionicons name="logo-whatsapp" size={18} color="#fff" />
          <Text style={styles.whatsappButtonText}>Open Team WhatsApp Group</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setFilter(f.key as any)}
            style={[styles.filterPill, filter === f.key && styles.filterPillActive]}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 120 }}
        ListEmptyComponent={
          isLoading ? null : (
            <View style={{ padding: spacing.lg }}>
              <Text style={{ color: colors.textSecondary }}>No updates yet. Be the first to log one.</Text>
            </View>
          )
        }
        renderItem={renderItem}
      />

      <TouchableOpacity onPress={() => setSheetVisible(true)} style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal
        isVisible={isSheetVisible}
        onBackdropPress={() => setSheetVisible(false)}
        onBackButtonPress={() => setSheetVisible(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Log Update</Text>
          <View style={styles.sheetGrid}>
            {([
              { key: 'code_push', label: 'Code Push', icon: 'code-slash' },
              { key: 'design_update', label: 'Design Update', icon: 'color-palette' },
              { key: 'video_edit', label: 'Video Edit', icon: 'film' },
              { key: 'writing_update', label: 'Writing Update', icon: 'create' },
              { key: 'idea', label: 'Shoot an Idea', icon: 'bulb' },
              { key: 'meeting', label: 'Call Meeting', icon: 'calendar' },
            ] as Array<{ key: ActivityType; label: string; icon: any }>).map((opt) => (
              <TouchableOpacity key={opt.key} style={styles.sheetButton} onPress={() => quickLog(opt.key)}>
                <View style={styles.sheetIcon}>
                  <Ionicons name={opt.icon as any} size={22} color={colors.textPrimary} />
                </View>
                <Text style={styles.sheetLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#25D366',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  whatsappButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#fff',
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 999,
  },
  filterPillActive: {
    backgroundColor: '#0b0b0f',
    borderColor: '#0b0b0f',
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  cardMeta: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  cardDesc: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },
  cardImage: {
    marginTop: 10,
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: colors.surfaceColor,
  },
  shareButton: {
    padding: 6,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0b0b0f',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  sheetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sheetButton: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginBottom: 10,
  },
  sheetIcon: {
    padding: 8,
    backgroundColor: colors.surfaceColor,
    borderRadius: 10,
    marginBottom: 6,
  },
  sheetLabel: {
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
