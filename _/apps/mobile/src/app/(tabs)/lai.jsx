import React, { useState } from 'react';
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
  Trash2
} from 'lucide-react-native';
// Removed document/photo features per requirement (moved to Progress)

export default function LAIScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [documents] = useState([]);

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
          <Text style={{ fontSize: 16, color: '#6b7280', marginTop: 4 }}>
            A warm space to grow in your niche
          </Text>
        </View>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: '#f8fafc',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
        >
          <Search size={20} color="#6b7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search documents..."
            placeholderTextColor="#6b7280"
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
              backgroundColor: '#f8fafc',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e5e7eb',
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
              backgroundColor: '#f8fafc',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e5e7eb',
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
                backgroundColor: '#f8fafc',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#e5e7eb',
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
                backgroundColor: '#f8fafc',
                borderRadius: 12,
                padding: 40,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e5e7eb',
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
                  backgroundColor: '#f8fafc',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
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
      </ScrollView>
    </View>
  );
}
