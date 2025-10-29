import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '@/store/appStore';

// Simple emoji icons to match app style
const CheckCircle = ({ size, color }) => <Text style={{ fontSize: size || 20 }}>✅</Text>;
const ChevronRight = ({ size, color }) => <Text style={{ fontSize: size || 20 }}>▶️</Text>;
const BookOpen = ({ size, color }) => <Text style={{ fontSize: size || 20 }}>📖</Text>;

export default function TopicDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { progress, markTaskComplete, updateProgress } = useAppStore();
  const [curriculum, setCurriculum] = useState([]);
  const [task, setTask] = useState(null);
  const [canMarkRead, setCanMarkRead] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const scrollRef = useRef(null);

  // Generate a detailed explanation for the topic
  const generateDetail = useCallback((t) => {
    if (!t) return '';
    const base = `${t.title} — Deep Dive`;
    const sections = [
      `Overview: ${t.description}. This lesson explains the core concepts, practical use-cases, and common pitfalls.`,
      'Key Concepts: Definitions, how it works under the hood, and why it matters.',
      'Step-by-Step Guide: Practical steps you can follow, with simple examples.',
      'Best Practices: Tips, conventions, and patterns to apply in real projects.',
      'Common Mistakes: Things to watch out for and how to avoid them.',
      'Interactive Challenge: Try a mini task to apply the concept and check your understanding.',
      'Further Reading: Where to go next to deepen your knowledge.'
    ];
    return `${base}\n\n${sections.map((s, i) => `• ${s}`).join('\n')}`;
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem('user_curriculum');
        const data = saved ? JSON.parse(saved) : [];
        setCurriculum(data);
        const found = data.find((x) => String(x.id) === String(id));
        setTask(found || null);
      } catch (e) {
        console.error('Error loading topic detail:', e);
      }
    };
    load();
  }, [id]);

  const onScrollCheckBottom = (e) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const paddingToBottom = 24; // require close to bottom
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    if (isBottom) setCanMarkRead(true);
  };

  const markAsRead = async () => {
    if (!task) return;
    if (!canMarkRead) {
      Alert.alert('Keep reading', 'Scroll to the end before marking as read.');
      return;
    }
    try {
      setIsCompleting(true);
      // Update curriculum completion
      const updated = curriculum.map((t) => (String(t.id) === String(task.id) ? { ...t, completed: true } : t));
      await AsyncStorage.setItem('user_curriculum', JSON.stringify(updated));
      setCurriculum(updated);

      // Update progress: add taskId and recompute battery based on overall completion
      await markTaskComplete(String(task.id));
      const total = updated.length || 1;
      const done = updated.filter((t) => t.completed).length;
      const batteryLevel = Math.min(100, Math.max(0, Math.round((done / total) * 100)));
      await updateProgress({ batteryLevel, lastActiveDate: new Date().toISOString() });

      Alert.alert('Marked as Read', 'Great job! This topic is now completed.');
      router.back();
    } catch (e) {
      console.error('Error marking topic as read:', e);
      Alert.alert('Error', 'Could not mark this topic as read.');
    } finally {
      setIsCompleting(false);
    }
  };

  const goNext = () => {
    if (!task || curriculum.length === 0) return;
    const idx = curriculum.findIndex((x) => String(x.id) === String(task.id));
    const next = curriculum[idx + 1];
    if (next) {
      router.replace({ pathname: '/(tabs)/topic/[id]', params: { id: String(next.id) } });
      setCanMarkRead(false);
    } else {
      Alert.alert('End of Curriculum', 'You have reached the end of available topics.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#0b0b0f' }} numberOfLines={1}>
          {task ? `Day ${task.day}: ${task.title}` : 'Topic'}
        </Text>
        <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8 }}>
          <Text style={{ color: '#2563eb', fontWeight: '600' }}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        onScroll={onScrollCheckBottom}
        scrollEventThrottle={32}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: '#f8f9fa', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e0e0e0' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <BookOpen size={20} color="#2563eb" />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>Lesson Detail</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#0b0b0f', lineHeight: 22 }}>
            {generateDetail(task)}
          </Text>
        </View>

        <View style={{ marginTop: 16, backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e0e0e0' }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#0b0b0f', marginBottom: 8 }}>Interactive Check</Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            Reflect: In one sentence, explain this topic in your own words. Think about where you would use it.
          </Text>
          <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>
            Tip: Finish reading to the end to enable the "Mark as Read" button.
          </Text>
        </View>
      </ScrollView>

      <View style={{ padding: 16, borderTopWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#ffffff' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: canMarkRead ? '#2563eb' : '#9aa9c9', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 }}
            onPress={markAsRead}
            disabled={!canMarkRead || isCompleting}
          >
            <CheckCircle size={18} color="#ffffff" />
            <Text style={{ color: '#ffffff', fontWeight: '700', marginLeft: 8 }}>{isCompleting ? 'Saving...' : 'Mark as Read'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f8ff', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 }}
            onPress={goNext}
          >
            <Text style={{ color: '#2563eb', fontWeight: '700', marginRight: 6 }}>Next</Text>
            <ChevronRight size={18} color="#2563eb" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>Scroll to the end to enable completion.</Text>
      </View>
    </View>
  );
}