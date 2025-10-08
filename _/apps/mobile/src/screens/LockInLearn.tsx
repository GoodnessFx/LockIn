import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { generateCurriculum } from '../services/ai/curriculum';

export default function LockInLearn() {
  const plan = React.useMemo(() => generateCurriculum('creator'), []);
  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={plan.slice(0, 14)}
      keyExtractor={(i) => String(i.day)}
      renderItem={({ item }) => (
        <View style={styles.row}><Text style={styles.day}>Day {item.day}</Text><Text style={styles.task}>{item.task}</Text></View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#eee' },
  day: { width: 64, fontWeight: '700', color: '#6C5CE7' },
  task: { flex: 1, color: '#2F2F3A' },
});

