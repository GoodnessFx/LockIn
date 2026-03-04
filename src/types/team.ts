import type { UserRole } from '@/store/appStore';

export type ActivityType =
  | 'code_push'
  | 'design_update'
  | 'video_edit'
  | 'writing_update'
  | 'idea'
  | 'meeting';

export interface TeamActivity {
  id: string;
  user_id: string;
  team_id: string;
  type: ActivityType;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  image_url?: string | null;
  created_at: string;
  user?: {
    name: string;
    role?: UserRole;
    avatarUrl?: string | null;
  };
}

export interface NewTeamActivityInput {
  team_id: string;
  type: ActivityType;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  image_url?: string | null;
  created_at?: string;
}

export const ROLE_EMOJI: Record<NonNullable<UserRole>, string> = {
  user: '👤',
  team_member: '👥',
  admin: '⭐',
};

