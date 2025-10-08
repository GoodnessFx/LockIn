import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../config/constants';
import CountdownTimer from '../components/CountdownTimer';

export default function DashboardHome() {
  const d90 = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.heading}>Your 90-Day Sprint</Text>
      <View style={styles.card}>
        <CountdownTimer targetDate={d90} />
        <Text style={styles.cardLabel}>to ship your next milestone</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.row}>
          <View style={styles.box}><Text style={styles.boxText}>Focus: Deep Work (2h)</Text></View>
          <View style={styles.box}><Text style={styles.boxText}>Workout: 30m</Text></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.backgroundLight },
  heading: { fontSize: 24, fontWeight: '800', color: theme.colors.textLight, marginBottom: 12 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 },
  cardLabel: { marginTop: 8, color: '#666' },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  box: { flex: 1, backgroundColor: '#F5F7FB', borderRadius: 12, padding: 12 },
  boxText: { color: '#2F2F3A', fontWeight: '600' },
});

