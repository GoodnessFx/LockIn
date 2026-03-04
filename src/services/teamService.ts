import { getSupabase } from '@/services/supabase/client';
import type { NewTeamActivityInput, TeamActivity } from '@/types/team';
import * as ImagePicker from 'expo-image-picker';

const TABLE = 'team_activities';
const STORAGE_BUCKET = 'team-updates';

export async function listTeamActivities(teamId: string): Promise<TeamActivity[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data || []) as TeamActivity[];
}

export async function addTeamActivity(userId: string, input: NewTeamActivityInput): Promise<TeamActivity> {
  const supabase = getSupabase();
  const payload = {
    user_id: userId,
    ...input,
    created_at: input.created_at ?? new Date().toISOString(),
  };
  const { data, error } = await supabase.from(TABLE).insert(payload).select('*').single();
  if (error) throw error;
  return data as TeamActivity;
}

export function subscribeToTeamActivities(teamId: string, onInsert: (activity: TeamActivity) => void) {
  const supabase = getSupabase();
  const channel = supabase
    .channel(`team_activities:${teamId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: TABLE, filter: `team_id=eq.${teamId}` },
      (payload) => {
        onInsert(payload.new as TeamActivity);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function uploadImageToStorageAsync(localUri: string): Promise<string> {
  const supabase = getSupabase();
  const fileName = `img_${Date.now()}.jpg`;
  const file = await fetch(localUri);
  const blob = await file.blob();
  const { data, error } = await supabase.storage.from(STORAGE_BUCKET).upload(fileName, blob, {
    contentType: 'image/jpeg',
    upsert: false,
  });
  if (error) throw error;
  const { data: publicUrl } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);
  return publicUrl.publicUrl;
}

export async function pickImage(): Promise<string | null> {
  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  });
  if (res.canceled || res.assets.length === 0) return null;
  return res.assets[0].uri;
}

