import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { addTeamActivity, listTeamActivities, subscribeToTeamActivities } from '@/services/teamService';
import type { TeamActivity, NewTeamActivityInput, ActivityType } from '@/types/team';
import { useAppStore } from '@/store/appStore';

export interface TeamState {
  teamId: string;
  activities: TeamActivity[];
  filter: ActivityType | 'all';
  isLoading: boolean;
  isSyncing: boolean;
  queue: Array<NewTeamActivityInput>;
  setFilter: (f: TeamState['filter']) => void;
  setTeamId: (id: string) => void;
  setActivities: (items: TeamActivity[]) => void;
  addLocalActivity: (activity: TeamActivity) => void;
  loadInitial: (teamId: string) => Promise<void>;
  logActivity: (input: NewTeamActivityInput) => Promise<void>;
  startRealtime: (teamId: string) => () => void;
  flushQueue: () => Promise<void>;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      teamId: 'LockIn-Core',
      activities: [],
      filter: 'all',
      isLoading: false,
      isSyncing: false,
      queue: [],

      setFilter: (f) => set({ filter: f }),
      setTeamId: (id) => set({ teamId: id }),
      setActivities: (items) => set({ activities: items }),
      addLocalActivity: (activity) => set({ activities: [activity, ...get().activities] }),

      loadInitial: async (teamId: string) => {
        set({ isLoading: true });
        try {
          const activities = await listTeamActivities(teamId);
          set({ activities, teamId });
        } catch {
          set({ activities: [], teamId });
        } finally {
          set({ isLoading: false });
        }
      },

      logActivity: async (input: NewTeamActivityInput) => {
        const state = useAppStore.getState();
        const user = state.userProfile;
        if (!user?.id) {
          throw new Error('User not signed in');
        }
        const connection = await NetInfo.fetch();
        if (!connection.isConnected) {
          set({ queue: [input, ...get().queue] });
          return;
        }
        try {
          const created = await addTeamActivity(user.id, input);
          set({ activities: [created, ...get().activities] });
        } catch {
          set({ queue: [input, ...get().queue] });
        }
      },

      startRealtime: (teamId: string) => {
        return subscribeToTeamActivities(teamId, (activity) => {
          const exists = get().activities.some((a) => a.id === activity.id);
          if (!exists) {
            set({ activities: [activity, ...get().activities] });
          }
        });
      },

      flushQueue: async () => {
        if (get().queue.length === 0) return;
        set({ isSyncing: true });
        try {
          const state = useAppStore.getState();
          const user = state.userProfile;
          if (!user?.id) return;
          const pending = [...get().queue];
          for (const item of pending) {
            try {
              const created = await addTeamActivity(user.id, item);
              set({ activities: [created, ...get().activities] });
            } catch {
            }
          }
          set({ queue: [] });
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'team-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        teamId: s.teamId,
        activities: s.activities,
        filter: s.filter,
        queue: s.queue,
      }),
    }
  )
);
