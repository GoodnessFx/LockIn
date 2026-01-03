import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../types/social';

interface PostCardProps {
  post: Post;
  onLike?: (id: number | string, isLiked: boolean) => void;
  onComment?: (id: number | string) => void;
  onShare?: (id: number | string) => void;
  onUserPress?: (id: number | string) => void;
  animationDelay?: number;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onUserPress,
  animationDelay = 0,
}) => {
  if (!post) return null;
  // Map common emojis to Ionicons for professional UI
  const getIconForContent = (text: string): keyof typeof Ionicons.glyphMap | null => {
    if (!text) return null;
    if (text.includes('🔥')) return 'flame-outline';
    if (text.includes('🎉')) return 'trophy-outline';
    if (text.includes('☀️') || text.includes('☀')) return 'sunny-outline';
    if (text.includes('🚀')) return 'rocket-outline';
    if (text.includes('✅')) return 'checkmark-circle-outline';
    if (text.includes('💡')) return 'bulb-outline';
    if (text.includes('💪')) return 'fitness-outline';
    if (text.includes('🔒')) return 'lock-closed-outline';
    return null;
  };

  const sanitizeContent = (text: string) => {
    if (!text) return '';
    // Remove common emojis used in content
    return text
      .replace(/🔥|🎉|☀️|☀|🚀|✅|💡|💪|🔒/g, '')
      .trim();
  };

  const leadingIcon = getIconForContent(post.content);

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => onUserPress?.(post.id)}>
        <Ionicons name="person" size={20} color="#666" />
        <Text style={styles.author}>{post.user?.name || 'User'}</Text>
      </TouchableOpacity>
      <View style={styles.contentRow}>
        {leadingIcon && (
          <Ionicons name={leadingIcon} size={18} color="#666" style={styles.contentIcon} />
        )}
        <Text style={styles.content}>{sanitizeContent(post.content)}</Text>
      </View>
      {post.image && <View style={styles.imagePlaceholder} />}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => onLike?.(post.id, !post.isLiked)}>
          <Ionicons name={post.isLiked ? 'heart' : 'heart-outline'} size={18} color={post.isLiked ? '#e74c3c' : '#666'} />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => onComment?.(post.id)}>
          <Ionicons name="chatbubble-outline" size={18} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => onShare?.(post.id)}>
          <Ionicons name="share-social-outline" size={18} color="#666" />
          <Text style={styles.actionText}>{post.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  author: {
    fontWeight: '600',
    color: '#222',
  },
  content: {
    color: '#333',
    marginBottom: 8,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contentIcon: {
    marginRight: 2,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
    gap: 16,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#666',
    fontSize: 12,
  },
});

export default PostCard;
