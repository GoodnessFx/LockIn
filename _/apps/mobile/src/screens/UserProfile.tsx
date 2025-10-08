import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserProfile() {
return (
<View style={styles.container}>
<Text style={styles.title}>Profile</Text>
<Text style={styles.subtitle}>Track streaks and progress.</Text>
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 22, fontWeight: '800' },
subtitle: { marginTop: 8, color: '#666' }
});
