import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Replaced lucide-react-native icons with emoji/text alternatives
const Plus = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>➕</Text>;
const Camera = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📷</Text>;
const FileText = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📄</Text>;
const BookOpen = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📖</Text>;
const Search = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🔍</Text>;
const Calendar = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📅</Text>;
const Tag = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🏷️</Text>;
const ChevronRight = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>▶️</Text>;
const ImageIcon = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🖼️</Text>;
const File = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📁</Text>;
const Trash2 = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🗑️</Text>;
const MessageCircle = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>💬</Text>;
const Lightbulb = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>💡</Text>;
const TrendingUp = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📈</Text>;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '@/store/appStore';
import StorageService from '@/services/storage';

export default function LAIScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const [assistantMessage, setAssistantMessage] = useState('');
  const [progressNotes, setProgressNotes] = useState([]);
  const { progress, userProfile } = useAppStore();
  const userNiche = (userProfile?.niche || '').trim();
  const userGoal = (userProfile?.goal || '').trim();
  const displayName = (userProfile?.name || '').trim();
  const [profileExtras, setProfileExtras] = useState({ username: '', bio: '' });

  const [learningJourney, setLearningJourney] = useState([]);

  const getCoursesForNiche = (niche) => {
    const n = (niche || '').toLowerCase();
    if (n.includes('photo')) {
      return [
        { id: 'p1', title: 'Photography Basics: Exposure, Aperture, ISO', progress: 30, totalLessons: 12, completedLessons: 4, lastAccessed: '2025-01-01' },
        { id: 'p2', title: 'Composition Mastery: Rule of Thirds & Leading Lines', progress: 60, totalLessons: 10, completedLessons: 6, lastAccessed: '2025-01-02' },
        { id: 'p3', title: 'Portrait Lighting: Natural vs. Studio', progress: 10, totalLessons: 8, completedLessons: 1, lastAccessed: '2025-01-03' },
      ];
    }
    if (n.includes('design')) {
      return [
        { id: 'd1', title: 'UI Foundations: Color, Typography, Spacing', progress: 40, totalLessons: 15, completedLessons: 6, lastAccessed: '2025-01-01' },
        { id: 'd2', title: 'Figma Workflow: Components & Auto Layout', progress: 25, totalLessons: 20, completedLessons: 5, lastAccessed: '2025-01-03' },
        { id: 'd3', title: 'UX Research: Personas & User Interviews', progress: 80, totalLessons: 12, completedLessons: 10, lastAccessed: '2025-01-02' },
      ];
    }
    if (n.includes('coding') || n.includes('developer') || n.includes('program')) {
      return [
        { id: 'c1', title: 'JavaScript Essentials', progress: 55, totalLessons: 25, completedLessons: 14, lastAccessed: '2025-01-04' },
        { id: 'c2', title: 'React Native Fundamentals', progress: 75, totalLessons: 20, completedLessons: 15, lastAccessed: '2025-01-05' },
        { id: 'c3', title: 'State Management: Zustand & Patterns', progress: 35, totalLessons: 10, completedLessons: 3, lastAccessed: '2025-01-06' },
      ];
    }
    // Default general journey
    return [
      { id: 'g1', title: 'Focus & Deep Work Routines', progress: 70, totalLessons: 10, completedLessons: 7, lastAccessed: '2025-01-01' },
      { id: 'g2', title: 'Personal Growth: Habits & Systems', progress: 20, totalLessons: 8, completedLessons: 2, lastAccessed: '2025-01-02' },
      { id: 'g3', title: 'Creativity Warmups & Idea Generation', progress: 50, totalLessons: 12, completedLessons: 6, lastAccessed: '2025-01-03' },
    ];
  };

  // Growth mindset motivational messages
  const motivationalMessages = [
    `Day ${progress?.currentDay || 1} of your 97-day transformation! You're becoming unstoppable! 🚀`,
    "Your commitment battery is charged! Every action builds your future self! ⚡",
    "Growth happens in the discomfort zone. You're exactly where you need to be! 💪",
    "Small consistent actions compound into extraordinary results. Keep building! 🏗️",
    "Your future self is counting on today's version of you. Make it count! 🎯",
    "Every expert was once a beginner who refused to give up. You're on the right path! 🌟",
    "The compound effect of daily progress is your superpower. Use it! ⭐",
    "You're not just learning skills, you're building character. Stay locked in! 🔒"
  ];

  // Load progress notes from AsyncStorage
  useEffect(() => {
    loadProgressNotes();
    loadOnboardingExtras();
    generateMotivationalMessage();
  }, []);

  useEffect(() => {
    // Tailor courses when user niche changes
    setLearningJourney(getCoursesForNiche(userNiche));
  }, [userNiche]);

  const loadProgressNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem('lai_progress_notes');
      if (notes) {
        setProgressNotes(JSON.parse(notes));
      }
    } catch (error) {
      console.error('Error loading progress notes:', error);
    }
  };

  const loadOnboardingExtras = async () => {
    try {
      // Prefer stored user profile for niche and goal, but fetch onboarding data for username/bio
      const onboardingDataRaw = await AsyncStorage.getItem('lockin_onboarding_data');
      if (onboardingDataRaw) {
        const onboardingData = JSON.parse(onboardingDataRaw);
        const profile = onboardingData?.profile || {};
        setProfileExtras({
          username: (profile.username || '').trim(),
          bio: (profile.bio || '').trim(),
        });
      } else {
        // Fallback: try StorageService if a different key was used
        const maybeProfile = await StorageService.get('lockin_onboarding_data');
        const profile = maybeProfile?.profile || {};
        setProfileExtras({
          username: (profile.username || '').trim(),
          bio: (profile.bio || '').trim(),
        });
      }
    } catch (error) {
      console.error('Error loading onboarding extras:', error);
    }
  };

  const saveProgressNote = async (note) => {
    try {
      const newNote = {
        id: Date.now().toString(),
        text: note,
        date: new Date().toISOString(),
        type: 'user'
      };
      const updatedNotes = [...progressNotes, newNote];
      setProgressNotes(updatedNotes);
      await AsyncStorage.setItem('lai_progress_notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving progress note:', error);
    }
  };

  const generateMotivationalMessage = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    const nicheHint = userNiche ? ` Focus today on ${userNiche}.` : '';
    const goalHint = userGoal ? ` Aim toward: ${userGoal}.` : '';
    setAssistantMessage(randomMessage + nicheHint + goalHint);
  };

  const handleAddPhoto = () => Alert.alert('Moved', 'Add Photo is now in Progress tab.');
  const handleAddDocument = () => Alert.alert('Moved', 'Add Document is now in Progress tab.');

  const handleDeleteDocument = (id) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setDocuments(documents.filter(doc => doc.id !== id))
        }
      ]
    );
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#0b0b0f' }}>
            LAI {userNiche ? `— ${userNiche}` : ''}
          </Text>
          <Text style={{ fontSize: 12, color: '#6c757d', marginTop: 6 }}>
            {`Welcome${profileExtras.username ? `, ${profileExtras.username}` : displayName ? `, ${displayName}` : ''}.`}
            {userNiche ? ` Tailored for ${userNiche}.` : ' Personalized guidance based on your onboarding selections.'}
          </Text>
          {profileExtras.bio ? (
            <Text style={{ fontSize: 12, color: '#6c757d', marginTop: 4 }} numberOfLines={2}>
              {`Bio: ${profileExtras.bio}`}
            </Text>
          ) : null}
        </View>

        {/* Assistant Message */}
        {assistantMessage && (
          <View style={{
            backgroundColor: '#f0f8ff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: '#2563eb',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <MessageCircle size={24} color="#2563eb" style={{ marginRight: 12 }} />
            <Text style={{ flex: 1, fontSize: 14, color: '#0b0b0f', lineHeight: 20 }}>
              {assistantMessage}
            </Text>
          </View>
        )}

        {/* ChatGPT-like Prompt Interface */}
        <View style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: '#e0e0e0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <MessageCircle size={24} color="#2563eb" />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>
              Ask Your AI Coach
            </Text>
          </View>
          
          <TextInput
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              color: '#0b0b0f',
              borderWidth: 1,
              borderColor: '#e0e0e0',
              marginBottom: 12,
            }}
            placeholder="Ask me anything about your learning journey..."
            placeholderTextColor="#6c757d"
            multiline
            numberOfLines={3}
          />
          
          <TouchableOpacity
            style={{
              backgroundColor: '#2563eb',
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 24,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>
              Send Message
            </Text>
          </TouchableOpacity>
        </View>

        {/* Learning Progress */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginBottom: 16 }}>
            Learning Progress
          </Text>
          {learningJourney.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#0b0b0f', flex: 1 }}>
                  {course.title}
                </Text>
                <ChevronRight size={20} color="#64748b" />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>
                  {course.completedLessons}/{course.totalLessons} lessons
                </Text>
                <Text style={{ fontSize: 14, color: '#0b0b0f', fontWeight: '600' }}>
                  {course.progress}%
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  backgroundColor: '#e5e7eb',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${course.progress}%`,
                    backgroundColor: '#0b0b0f',
                    borderRadius: 3,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>


        {/* Progress Notes Section */}
        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Lightbulb size={20} color="#2563eb" />
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>
              Progress Notes
            </Text>
          </View>
          
          {progressNotes.length === 0 ? (
            <View style={{
              backgroundColor: '#f8f9fa',
              borderRadius: 12,
              padding: 24,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}>
              <TrendingUp size={32} color="#6b7280" />
              <Text style={{ fontSize: 16, color: '#6b7280', marginTop: 12, textAlign: 'center' }}>
                Start documenting your learning journey
              </Text>
              <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4, textAlign: 'center' }}>
                Add notes about your progress and insights
              </Text>
            </View>
          ) : (
            progressNotes.slice(-3).map((note) => (
              <View key={note.id} style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}>
                <Text style={{ fontSize: 14, color: '#0b0b0f', lineHeight: 20 }}>
                  {note.text}
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>
                  {new Date(note.date).toLocaleDateString()}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
