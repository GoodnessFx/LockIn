import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAppStore } from '../store/appStore';
import { theme } from '../../config/constants';

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/splash-icon.png')} style={styles.logo} />
      <Text style={styles.title}>LockIn</Text>
      <Text style={styles.subtitle}>Dial in. Build relentlessly. Win together.</Text>
      <TouchableOpacity
        style={styles.cta}
        onPress={async () => {
          await setOnboarded(true);
          onDone();
        }}
      >
        <Text style={styles.ctaText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.backgroundDark, alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { width: 120, height: 120, marginBottom: 16 },
  title: { color: theme.colors.textDark, fontSize: 36, fontWeight: '800' },
  subtitle: { color: '#C8C8D4', fontSize: 16, marginTop: 8, textAlign: 'center' },
  cta: { marginTop: 24, backgroundColor: theme.colors.primary, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12 },
  ctaText: { color: 'white', fontSize: 16, fontWeight: '700' },
});

