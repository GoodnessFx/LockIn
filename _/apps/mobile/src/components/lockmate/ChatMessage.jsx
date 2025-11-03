import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatMessage = ({ message, isCurrentUser, animationDelay = 0 }) => {
  if (!message) return null;
  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUser : styles.otherUser,
      ]}
    >
      <View style={[styles.bubble, isCurrentUser ? styles.bubbleCurrent : styles.bubbleOther]}>
        <Text style={styles.text}>{message.text}</Text>
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
  meta: {
    marginTop: 4,
    fontSize: 10,
    color: '#888',
    textAlign: 'right',
  },
});

export default ChatMessage;