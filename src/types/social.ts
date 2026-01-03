export interface Achievement {
  id: string;
  title: string;
  icon: any; // Using 'any' for Ionicons name as strict typing depends on vector-icons types
  color: string;
  description: string;
}

export interface User {
  id: number | string;
  name: string;
  avatar: string;
  bio?: string;
  goals?: string[];
  streak?: number;
  isOnline?: boolean;
  mutualConnections?: number;
  studyHours?: number;
  location?: string;
  progress?: number;
  achievements?: Achievement[];
}

export interface Post {
  id: number | string;
  user: {
    id: number | string;
    name: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  timestamp?: string;
  likes: number;
  comments: number;
  shares: number;
  impressions?: number;
  tags?: string[];
  isLiked?: boolean;
}

export interface Message {
  id: number | string;
  text: string;
  timestamp: string;
  user: {
    id: number | string;
    name: string;
    avatar?: string;
  };
  status?: 'read' | 'unread' | 'sent';
}

export interface FilterState {
  showOnlineOnly?: boolean;
  minStreak?: number;
}
