import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Plus, 
  Camera, 
  FileText, 
  BookOpen, 
  Search,
  Calendar,
  Tag,
  ChevronRight,
  Image as ImageIcon,
  File,
  Trash2,
  MessageCircle,
  Lightbulb,
  TrendingUp
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '@/store/appStore';

export default function LAIScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [documents] = useState([]);
  const [assistantMessage, setAssistantMessage] = useState('');
  const [progressNotes, setProgressNotes] = useState([]);
  const { progress } = useAppStore();

  const [learningJourney, setLearningJourney] = useState([
    {
      id: '1',
      title: 'React Native Fundamentals',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      lastAccessed: '2024-01-15',
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      progress: 45,
      totalLessons: 30,
      completedLessons: 13,
      lastAccessed: '2024-01-14',
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      progress: 90,
      totalLessons: 15,
      completedLessons: 14,
      lastAccessed: '2024-01-15',
    },
  ]);

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
    generateMotivationalMessage();
  }, []);

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
    setAssistantMessage(randomMessage);
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
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#0b0b0f' }}>
            LAI
          </Text>
          <Text style={{ fontSize: 16, color: '#6c757d', marginTop: 4 }}>
            A warm space to grow in your niche
          </Text>
        </View>

        {/* Assistant Message */}
        {assistantMessage && (
          <View style={{
            backgroundColor: '#f0f8ff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: '#6C5CE7',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <MessageCircle size={24} color="#6C5CE7" style={{ marginRight: 12 }} />
            <Text style={{ flex: 1, fontSize: 14, color: '#0b0b0f', lineHeight: 20 }}>
              {assistantMessage}
            </Text>
          </View>
        )}

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#e0e0e0',
          }}
        >
          <Search size={20} color="#6c757d" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search documents..."
            placeholderTextColor="#6c757d"
            style={{
              flex: 1,
              marginLeft: 12,
              fontSize: 16,
              color: '#0b0b0f',
            }}
          />
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', marginBottom: 24, gap: 12 }}>
          <TouchableOpacity
            onPress={handleAddPhoto}
            style={{
              flex: 1,
              backgroundColor: '#f8f9fa',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}
          >
            <Camera size={24} color="#0b0b0f" />
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#0b0b0f', marginTop: 8 }}>
              Add Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddDocument}
            style={{
              flex: 1,
              backgroundColor: '#f8f9fa',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}
          >
            <FileText size={24} color="#0b0b0f" />
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#0b0b0f', marginTop: 8 }}>
              Add Document
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

        {/* Documents */}
        <View>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginBottom: 16 }}>
            Documents (moved to Progress)
          </Text>
          {true ? (
            <View
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 12,
                padding: 40,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
            >
              <BookOpen size={48} color="#6b7280" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#0b0b0f', marginTop: 16, marginBottom: 8 }}>
                Find documents in Progress tab
              </Text>
              <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 24 }}>
                Add Photo and Add Document actions have been moved
              </Text>
              <TouchableOpacity
                onPress={handleAddPhoto}
                style={{
                  backgroundColor: '#0b0b0f',
                  borderRadius: 12,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>
                  Open Progress
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredDocuments.map((doc) => (
              <TouchableOpacity
                key={doc.id}
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: doc.type === 'image' ? '#0b0b0f10' : '#10b98120',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    {doc.type === 'image' ? (
                      <ImageIcon size={20} color={doc.type === 'image' ? '#0b0b0f' : '#10b981'} />
                    ) : (
                      <File size={20} color={doc.type === 'image' ? '#0b0b0f' : '#10b981'} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#0b0b0f' }}>
                      {doc.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>
                      {doc.date}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteDocument(doc.id)}
                    style={{
                      padding: 8,
                      borderRadius: 8,
                      backgroundColor: '#ef444410',
                    }}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {doc.tags.map((tag, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#e5e7eb',
                        borderRadius: 6,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Progress Notes Section */}
        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Lightbulb size={20} color="#6C5CE7" />
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
