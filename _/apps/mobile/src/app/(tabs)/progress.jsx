import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  Clock,
  CheckCircle,
  Activity,
  Zap,
  Trophy
} from 'lucide-react-native';
import { Camera, FileText, Search } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useAppStore } from '@/store/appStore';
import BatteryProgressIndicator from '@/components/BatteryProgressIndicator';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, month, year
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const { progress } = useAppStore();

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

  const filteredDocuments = documents.filter(doc =>
    doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Mock data for progress tracking
  const progressData = {
    week: {
      streak: 7,
      goalsCompleted: 12,
      hoursFocused: 28,
      productivity: 85,
      achievements: [
        { id: 1, title: '7-Day Streak', description: 'Consistent daily progress', icon: '🔥' },
        { id: 2, title: 'Focus Master', description: '28 hours of deep work', icon: '🎯' },
        { id: 3, title: 'Goal Crusher', description: '12 goals completed', icon: '✅' },
      ]
    },
    month: {
      streak: 23,
      goalsCompleted: 45,
      hoursFocused: 120,
      productivity: 78,
      achievements: [
        { id: 1, title: 'Month Warrior', description: '23-day streak', icon: '⚡' },
        { id: 2, title: 'Productivity Pro', description: '120 hours focused', icon: '🚀' },
        { id: 3, title: 'Achievement Hunter', description: '45 goals completed', icon: '🏆' },
      ]
    },
    year: {
      streak: 156,
      goalsCompleted: 234,
      hoursFocused: 890,
      productivity: 82,
      achievements: [
        { id: 1, title: 'Year Champion', description: '156-day streak', icon: '👑' },
        { id: 2, title: 'Focus Legend', description: '890 hours focused', icon: '💎' },
        { id: 3, title: 'Goal Master', description: '234 goals completed', icon: '🎖️' },
      ]
    }
  };

  const currentData = progressData[selectedPeriod];

  const StatCard = ({ icon, title, value, subtitle, color = '#6C5CE7' }) => (
    <View style={{
      backgroundColor: '#f8f9fa',
      borderRadius: 16,
      padding: 20,
      flex: 1,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }}>
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${color}20`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
      }}>
        {icon}
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0b0b0f', marginBottom: 4 }}>
        {value}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#0b0b0f', marginBottom: 2 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 12, color: '#6c757d' }}>
        {subtitle}
      </Text>
    </View>
  );

  const AchievementCard = ({ achievement }) => (
    <View style={{
      backgroundColor: '#f8f9fa',
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#e0e0e0',
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }}>
      <Text style={{ fontSize: 32, marginRight: 16 }}>
        {achievement.icon}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0b0b0f', marginBottom: 4 }}>
          {achievement.title}
        </Text>
        <Text style={{ fontSize: 14, color: '#6c757d' }}>
          {achievement.description}
        </Text>
      </View>
      <Award size={20} color="#fdcb6e" />
    </View>
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
            Progress
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280', marginTop: 4 }}>
            Track your growth and achievements
          </Text>
        </View>

        {/* Commitment Battery */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginBottom: 16, textAlign: 'center' }}>
            Your Commitment Energy
          </Text>
          <View style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            alignItems: 'center',
          }}>
            <BatteryProgressIndicator size={120} showPercentage={true} showText={true} />
            <Text style={{ fontSize: 14, color: '#6c757d', textAlign: 'center', marginTop: 12 }}>
              Day {progress?.currentDay || 1} of {progress?.totalDays || 97} - Keep building!
            </Text>
          </View>
        </View>

        {/* Quick Add: Documents & Photos */}
        <View style={{ flexDirection: 'row', marginBottom: 16, gap: 12 }}>
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

        {/* Search Docs */}
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

        {/* Period Selector */}
        <View style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 12,
          padding: 4,
          flexDirection: 'row',
          marginBottom: 24,
          borderWidth: 1,
          borderColor: '#e0e0e0',
        }}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={{
                flex: 1,
                backgroundColor: selectedPeriod === period ? '#6C5CE7' : 'transparent',
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: selectedPeriod === period ? '#ffffff' : '#6c757d',
                textTransform: 'capitalize',
              }}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          <StatCard
            icon={<Zap size={20} color="#6C5CE7" />}
            title="Streak"
            value={currentData.streak}
            subtitle="days"
            color="#6C5CE7"
          />
          <StatCard
            icon={<CheckCircle size={20} color="#00b894" />}
            title="Goals"
            value={currentData.goalsCompleted}
            subtitle="completed"
            color="#00b894"
          />
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          <StatCard
            icon={<Clock size={20} color="#fdcb6e" />}
            title="Focus Time"
            value={currentData.hoursFocused}
            subtitle="hours"
            color="#fdcb6e"
          />
          <StatCard
            icon={<Activity size={20} color="#e17055" />}
            title="Productivity"
            value={`${currentData.productivity}%`}
            subtitle="average"
            color="#e17055"
          />
        </View>

        {/* Productivity Chart Placeholder */}
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
            <BarChart3 size={20} color="#6C5CE7" />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>
              Productivity Trend
            </Text>
          </View>
          <View style={{
            height: 120,
            backgroundColor: '#ffffff',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#e0e0e0',
          }}>
            <Text style={{ color: '#6c757d' }}>Chart visualization coming soon</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Trophy size={20} color="#fdcb6e" />
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>
              Recent Achievements
            </Text>
          </View>
          {currentData.achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>

        {/* Goals Progress */}
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
            <Target size={20} color="#6C5CE7" />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>
              Current Goals
            </Text>
          </View>
          
          <View style={{ gap: 12 }}>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 14, color: '#0b0b0f' }}>Learn React Native</Text>
                <Text style={{ fontSize: 14, color: '#6C5CE7', fontWeight: '600' }}>75%</Text>
              </View>
              <View style={{
                height: 6,
                backgroundColor: '#e0e0e0',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: '75%',
                  backgroundColor: '#6C5CE7',
                  borderRadius: 3,
                }} />
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 14, color: '#0b0b0f' }}>Build Portfolio</Text>
                <Text style={{ fontSize: 14, color: '#00b894', fontWeight: '600' }}>45%</Text>
              </View>
              <View style={{
                height: 6,
                backgroundColor: '#e0e0e0',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: '45%',
                  backgroundColor: '#00b894',
                  borderRadius: 3,
                }} />
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 14, color: '#0b0b0f' }}>Daily Exercise</Text>
                <Text style={{ fontSize: 14, color: '#fdcb6e', fontWeight: '600' }}>90%</Text>
              </View>
              <View style={{
                height: 6,
                backgroundColor: '#e0e0e0',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: '90%',
                  backgroundColor: '#fdcb6e',
                  borderRadius: 3,
                }} />
              </View>
            </View>
          </View>

        {/* Documents moved here */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <FileText size={20} color="#0b0b0f" />
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>
              Documents ({filteredDocuments.length})
            </Text>
          </View>
          {filteredDocuments.length === 0 ? (
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
              <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center' }}>
                Add progress photos and documents to track your journey.
              </Text>
            </View>
          ) : (
            filteredDocuments.map((doc) => (
              <View
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
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#0b0b0f' }}>
                  {doc.title}
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>{doc.date}</Text>
              </View>
            ))
          )}
        </View>
        </View>
      </ScrollView>
    </View>
  );
}
