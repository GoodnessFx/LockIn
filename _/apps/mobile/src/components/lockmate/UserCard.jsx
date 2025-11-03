import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Placeholder UserCard (currently unused by lockmate.jsx rendering)
const UserCard = ({ user }) => {
  if (!user) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      {user.location && <Text style={styles.location}>{user.location}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontWeight: '600',
    color: '#222',
  },
  location: {
    color: '#666',
    marginTop: 4,
  },
});

export default UserCard;