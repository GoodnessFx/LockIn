import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../../types/social';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  animationDelay?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser, animationDelay = 0 }) => {
  if (!message) return null;
  // Map common emojis to Ionicons for professional UI
  const getIconForText = (text: string): keyof typeof Ionicons.glyphMap | null => {
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

  const sanitizeText = (text: string) => {
    if (!text) return '';
    return text.replace(/🔥|🎉|☀️|☀|🚀|✅|💡|💪|🔒/g, '').trim();
  };

  const leadingIcon = getIconForText(message.text);

  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUser : styles.otherUser,
      ]}
    >
      <View style={[styles.bubble, isCurrentUser ? styles.bubbleCurrent : styles.bubbleOther]}>
        <View style={styles.textRow}>
          {leadingIcon && (
            <Ionicons name={leadingIcon} size={16} color="#666" style={styles.textIcon} />
          )}
          <Text style={styles.text}>{sanitizeText(message.text)}</Text>
        </View>
        <Text style={styles.meta}>{new Date(message.timestamp).toLocaleTimeString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  currentUser: {
    justifyContent: 'flex-end',
  },
  otherUser: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bubbleCurrent: {
    backgroundColor: '#DCF8C6',
  },
  bubbleOther: {
    backgroundColor: '#F0F0F0',
  },
  text: {
    color: '#222',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textIcon: {
    marginRight: 2,
  },
  meta: {
    marginTop: 4,
    fontSize: 10,
    color: '#888',
    textAlign: 'right',
  },
});

export default ChatMessage;
