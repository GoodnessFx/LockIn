import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../types/social';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  animationDelay?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser, animationDelay = 0 }) => {
  if (!message) return null;
  const sanitizeText = (text: string) => {
    if (!text) return '';
    return text.replace(/🔥|🎉|☀️|☀|🚀|✅|💡|💪|🔒/g, '').trim();
  };

  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUser : styles.otherUser,
      ]}
    >
      <View style={[styles.bubble, isCurrentUser ? styles.bubbleCurrent : styles.bubbleOther]}>
        <View style={styles.textRow}>
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
    backgroundColor: '#EAEAEA',
  },
  bubbleOther: {
    backgroundColor: '#F5F5F5',
  },
  text: {
    color: '#222',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
 
  meta: {
    marginTop: 4,
    fontSize: 10,
    color: '#888',
    textAlign: 'right',
  },
});

export default ChatMessage;
