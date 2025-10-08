import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommunityFeed() {
return (
<View style={styles.container}>
<Text style={styles.title}>Community</Text>
<Text style={styles.subtitle}>Challenges, wins, and accountability.</Text>
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 22, fontWeight: '800' },
subtitle: { marginTop: 8, color: '#666' }
});
