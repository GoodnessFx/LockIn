import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostCard = ({
  post,
  onLike,
  onComment,
  onShare,
  onUserPress,
  animationDelay = 0,
}) => {
  if (!post) return null;
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => onUserPress?.(post.id)}>
        <Ionicons name="person" size={20} color="#666" />
        <Text style={styles.author}>{post.user?.name || 'User'}</Text>
      </TouchableOpacity>
      <Text style={styles.content}>{post.content}</Text>
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
  imagePlaceholder: {
    height: 160,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: '#666',
  },
});

export default PostCard;