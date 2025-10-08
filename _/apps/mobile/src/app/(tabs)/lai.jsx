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
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function LAIScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([
    {
      id: '1',
      type: 'image',
      title: 'Learning Progress Photo',
      date: '2024-01-15',
      tags: ['progress', 'learning'],
      uri: null,
    },
    {
      id: '2',
      type: 'document',
      title: 'Course Notes.pdf',
      date: '2024-01-14',
      tags: ['notes', 'course'],
      uri: null,
    },
    {
      id: '3',
      type: 'image',
      title: 'Whiteboard Session',
      date: '2024-01-13',
      tags: ['whiteboard', 'session'],
      uri: null,
    },
  ]);

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

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to add photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newDocument = {
        id: Date.now().toString(),
        type: 'image',
        title: 'New Photo',
        date: new Date().toISOString().split('T')[0],
        tags: ['new'],
        uri: result.assets[0].uri,
      };
      setDocuments([newDocument, ...documents]);
    }
  };

  const handleAddDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const newDocument = {
        id: Date.now().toString(),
        type: 'document',
        title: result.assets[0].name,
        date: new Date().toISOString().split('T')[0],
        tags: ['document'],
        uri: result.assets[0].uri,
      };
      setDocuments([newDocument, ...documents]);
    }
  };

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
    <View style={{ flex: 1, backgroundColor: '#0b0b0f' }}>
      <StatusBar style="light" />
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
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#ffffff' }}>
            Learning AI
          </Text>
          <Text style={{ fontSize: 16, color: '#94a3b8', marginTop: 4 }}>
            Document your learning journey
          </Text>
        </View>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#2d3748',
          }}
        >
          <Search size={20} color="#64748b" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search documents..."
            placeholderTextColor="#64748b"
            style={{
              flex: 1,
              marginLeft: 12,
              fontSize: 16,
              color: '#ffffff',
            }}
          />
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', marginBottom: 24, gap: 12 }}>
          <TouchableOpacity
            onPress={handleAddPhoto}
            style={{
              flex: 1,
              backgroundColor: '#1a1a2e',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#2d3748',
            }}
          >
            <Camera size={24} color="#7dd3fc" />
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#ffffff', marginTop: 8 }}>
              Add Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddDocument}
            style={{
              flex: 1,
              backgroundColor: '#1a1a2e',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#2d3748',
            }}
          >
            <FileText size={24} color="#7dd3fc" />
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#ffffff', marginTop: 8 }}>
              Add Document
            </Text>
          </TouchableOpacity>
        </View>

        {/* Learning Progress */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#ffffff', marginBottom: 16 }}>
            Learning Progress
          </Text>
          {learningJourney.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={{
                backgroundColor: '#1a1a2e',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#2d3748',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff', flex: 1 }}>
                  {course.title}
                </Text>
                <ChevronRight size={20} color="#64748b" />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 14, color: '#94a3b8' }}>
                  {course.completedLessons}/{course.totalLessons} lessons
                </Text>
                <Text style={{ fontSize: 14, color: '#7dd3fc', fontWeight: '600' }}>
                  {course.progress}%
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  backgroundColor: '#2d3748',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${course.progress}%`,
                    backgroundColor: '#7dd3fc',
                    borderRadius: 3,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Documents */}
        <View>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#ffffff', marginBottom: 16 }}>
            Documents ({filteredDocuments.length})
          </Text>
          {filteredDocuments.length === 0 ? (
            <View
              style={{
                backgroundColor: '#1a1a2e',
                borderRadius: 12,
                padding: 40,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#2d3748',
              }}
            >
              <BookOpen size={48} color="#64748b" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#ffffff', marginTop: 16, marginBottom: 8 }}>
                No Documents Yet
              </Text>
              <Text style={{ fontSize: 14, color: '#94a3b8', textAlign: 'center', marginBottom: 24 }}>
                Start documenting your learning journey by adding photos and documents
              </Text>
              <TouchableOpacity
                onPress={handleAddPhoto}
                style={{
                  backgroundColor: '#7dd3fc',
                  borderRadius: 12,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#0b0b0f' }}>
                  Add Your First Document
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredDocuments.map((doc) => (
              <TouchableOpacity
                key={doc.id}
                style={{
                  backgroundColor: '#1a1a2e',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#2d3748',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: doc.type === 'image' ? '#7dd3fc20' : '#10b98120',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    {doc.type === 'image' ? (
                      <ImageIcon size={20} color={doc.type === 'image' ? '#7dd3fc' : '#10b981'} />
                    ) : (
                      <File size={20} color={doc.type === 'image' ? '#7dd3fc' : '#10b981'} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>
                      {doc.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#94a3b8' }}>
                      {doc.date}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteDocument(doc.id)}
                    style={{
                      padding: 8,
                      borderRadius: 8,
                      backgroundColor: '#ef444420',
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
                        backgroundColor: '#2d3748',
                        borderRadius: 6,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: '#94a3b8' }}>#{tag}</Text>
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
