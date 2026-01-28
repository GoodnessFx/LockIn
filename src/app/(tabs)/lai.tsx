import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore, CurriculumItem } from '@/store/appStore';
import { generateCurriculum, getCurriculumProgress } from '@/services/ai/curriculum';
import { MOTIVATIONAL_MESSAGES, getCoursesForNiche } from '@/data/curriculumData';

// Icon components
const Plus = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="add-circle-outline" size={size || 24} color={color || '#0b0b0f'} />;
const ChevronRight = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="chevron-forward-outline" size={size || 24} color={color || '#0b0b0f'} />;
const MessageCircle = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="chatbubble-outline" size={size || 24} color={color || '#0b0b0f'} />;
const Lightbulb = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="bulb-outline" size={size || 24} color={color || '#0b0b0f'} />;
const TrendingUp = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="trending-up-outline" size={size || 24} color={color || '#0b0b0f'} />;
const User = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="person-outline" size={size || 24} color={color || '#0b0b0f'} />;
const Send = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="send-outline" size={size || 24} color={color || '#0b0b0f'} />;
const CheckCircle = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="checkmark-circle-outline" size={size || 24} color={color || '#0b0b0f'} />;
const Circle = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="ellipse-outline" size={size || 24} color={color || '#0b0b0f'} />;
const Clock = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="time-outline" size={size || 24} color={color || '#0b0b0f'} />;
const Target = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="rocket-outline" size={size || 24} color={color || '#0b0b0f'} />;
const Close = ({ size, color }: { size?: number; color?: string }) => <Ionicons name="close-outline" size={size || 24} color={color || '#0b0b0f'} />;

export default function LAIScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Store state
  const { 
    userProfile, 
    progress, 
    updateProgress,
    curriculum,
    setCurriculum,
    aiAssistant,
    updateAIAssistant
  } = useAppStore();

  const userNiche = (userProfile?.niche || '').trim();
  const displayName = (((userProfile?.name || '')).trim().split(' ')[0]) || 'You';

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [assistantMessage, setAssistantMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'mentor'>('overview');
  const [mentorInput, setMentorInput] = useState('');
  const [curriculumProgress, setCurriculumProgress] = useState<any>(null);
  
  // Modal state
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CurriculumItem | null>(null);
  const [taskHasRead, setTaskHasRead] = useState(false);
  
  // Learning journey data based on niche
  const learningJourney = getCoursesForNiche(userNiche);

  // Initialize
  useEffect(() => {
    generateMotivationalMessage();
    initializeCurriculum();
    
    // Initialize mentor messages if empty
    if (!aiAssistant.messages || aiAssistant.messages.length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        text: `Welcome to your 97-day ${userNiche || 'learning'} journey! I'm your dedicated mentor. I'll help you stay on track, customize your curriculum, and provide guidance whenever you need it. How are you feeling about starting this transformation?`,
        sender: 'mentor' as const,
        timestamp: new Date().toISOString(),
      };
      updateAIAssistant({ messages: [welcomeMessage] });
    }
  }, []);

  useEffect(() => {
    if (userNiche && curriculum.length === 0) {
      initializeCurriculum();
    }
  }, [userNiche]);

  useFocusEffect(
    React.useCallback(() => {
      // Refresh logic if needed
      return () => {};
    }, [])
  );

  const initializeCurriculum = () => {
    if (curriculum.length > 0) {
      setCurriculumProgress(getCurriculumProgress(curriculum));
    } else if (userNiche) {
      const newCurriculum = generateCurriculum(userNiche, 97);
      setCurriculum(newCurriculum);
      setCurriculumProgress(getCurriculumProgress(newCurriculum));
    }
  };

  // Watch for curriculum changes to update progress
  useEffect(() => {
    if (curriculum.length > 0) {
      setCurriculumProgress(getCurriculumProgress(curriculum));
    }
  }, [curriculum]);

  const generateMotivationalMessage = () => {
    const randomMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
    const nicheHint = userNiche ? ` Focus today on ${userNiche}.` : '';
    setAssistantMessage(randomMessage + nicheHint);
  };

  const openTaskDetail = (task: CurriculumItem) => {
    setSelectedTask(task);
    setTaskHasRead(false);
    setTaskModalVisible(true);
  };

  const closeTaskDetail = () => {
    setTaskModalVisible(false);
    setSelectedTask(null);
    setTaskHasRead(false);
  };

  const completeSelectedTask = () => {
    if (!selectedTask || !taskHasRead) {
      Alert.alert('Please read the lesson first', 'Scroll through and mark as read before completing.');
      return;
    }
    
    const updatedCurriculum = curriculum.map(t =>
      t.id === selectedTask.id ? { ...t, completed: true } : t
    );
    setCurriculum(updatedCurriculum);
    closeTaskDetail();
  };

  const sendMentorMessage = () => {
    if (!mentorInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: mentorInput.trim(),
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    };

    const mentorResponse = {
      id: (Date.now() + 1).toString(),
      text: generateMentorResponse(mentorInput.trim()),
      sender: 'mentor' as const,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...(aiAssistant.messages || []), userMessage, mentorResponse];
    updateAIAssistant({ messages: updatedMessages });
    setMentorInput('');
  };

  const generateMentorResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('stuck') || message.includes('difficult') || message.includes('hard')) {
      return "I understand this feels challenging! Remember, every expert was once a beginner. Let's break this down into smaller steps. I've added some extra practice tasks to help you master this concept. What specific part is giving you trouble?";
    }
    
    if (message.includes('behind') || message.includes('late') || message.includes('missed')) {
      return "Don't worry about being behind - progress isn't always linear! I've adjusted your curriculum to a more manageable pace. The important thing is that you're here now. Focus on consistency over speed!";
    }
    
    if (message.includes('too easy') || message.includes('boring') || message.includes('faster')) {
      return "Great to hear you're finding this manageable! I've accelerated your curriculum and added more advanced challenges. Let's push your limits and see what you can achieve!";
    }
    
    if (message.includes('motivation') || message.includes('tired') || message.includes('give up')) {
      return "I hear you, and it's completely normal to feel this way! Remember why you started this journey. I've added some quick wins and motivational milestones to help you regain momentum. Small wins build confidence!";
    }
    
    if (message.includes('change') || message.includes('different') || message.includes('customize')) {
      return "Absolutely! Your curriculum should work for YOU. Tell me what you'd like to change:\n\n• 'more projects' - I'll add hands-on projects\n• 'more theory' - I'll include deeper explanations\n• 'slower pace' - I'll spread tasks over more days\n• 'faster pace' - I'll condense the timeline\n\nJust tell me what you need!";
    }
    
    if (message.includes('more projects') || message.includes('hands-on') || message.includes('practical')) {
      return "Perfect! I've updated your curriculum to include more hands-on projects and practical exercises. Learning by doing is one of the most effective ways to master new skills!";
    }
    
    if (message.includes('more theory') || message.includes('explain') || message.includes('understand')) {
      return "Great approach! I've enhanced your curriculum with more theoretical content and detailed explanations. Understanding the 'why' behind concepts will make you a stronger practitioner!";
    }
    
    return `Great question! I'm here to support your ${userNiche || 'learning'} journey. Based on your progress, you're doing well! Keep up the momentum. Is there anything specific about today's tasks you'd like to discuss or modify?`;
  };

  const generateTaskDetails = (task: CurriculumItem, niche: string) => {
    const n = (niche || '').toLowerCase();
    const baseTitle = task?.title || 'Lesson';
    if (n.includes('coding') || n.includes('developer') || n.includes('program')) {
      return `${baseTitle}\n\nWhat you will learn:\n- Concept overview with practical examples\n- Step-by-step guided exercises\n- Common pitfalls and best practices\n\nHands-on Lab:\n1) Read the explanation and examples carefully.\n2) Implement the exercise in your environment.\n3) Validate with provided checklist.\n\nNotes:\nTreat this as a mini university lecture — study the notes, then practice.`;
    }
    if (n.includes('design')) {
      return `${baseTitle}\n\nDeep Dive:\n- Theory, visual examples, and frameworks\n- Figma or design tool exercises\n- Critique templates and improvement checkpoints\n\nWorkshop:\n1) Recreate the example with your own style.\n2) Compare with checklist.\n3) Write reflections.`;
    }
    if (n.includes('photo')) {
      return `${baseTitle}\n\nCore Concepts:\n- Camera settings and real scenarios\n- Lighting setups with diagrams\n- Composition exercises and field tasks\n\nPractice:\n1) Shoot 5 frames following the guide.\n2) Review and rate using rubric.\n3) Document learnings.`;
    }
    return `${baseTitle}\n\nDetailed Lesson:\n- Clear explanations and step-by-step tasks\n- Interactive prompts and reflection questions\n- Completion checklist to ensure mastery`;
  };

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
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#0b0b0f' }}>
            LAI — Your LockIn AI
          </Text>
          <Text style={{ fontSize: 14, color: '#6c757d', marginTop: 6 }}>
            Personalized guidance based on your onboarding selections
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#f8f9fa',
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
        }}>
          {(['overview', 'curriculum', 'mentor'] as const).map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[
                { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
                activeTab === tab && { backgroundColor: '#2563eb' }
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                { fontSize: 14, fontWeight: '600', color: '#6b7280', textTransform: 'capitalize' },
                activeTab === tab && { color: '#ffffff' }
              ]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'overview' && (
          <>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginBottom: 12 }}>
                Learning Progress
              </Text>
              {curriculumProgress ? (
                <View style={{ backgroundColor: '#f8f9fa', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e0e0e0' }}>
                  <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
                    {curriculumProgress.completedTasks}/{curriculumProgress.totalTasks} tasks completed
                  </Text>
                  <View style={{ height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                    <View style={{ height: '100%', width: `${curriculumProgress.progressPercentage}%`, backgroundColor: '#0b0b0f' }} />
                  </View>
                  <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4, textAlign: 'right' }}>
                    {curriculumProgress.progressPercentage.toFixed(0)}% Complete
                  </Text>
                </View>
              ) : (
                <Text style={{ fontSize: 14, color: '#6b7280' }}>
                  Your curriculum will be ready shortly.
                </Text>
              )}
            </View>
          </>
        )}

        {activeTab === 'curriculum' && (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Target size={20} color="#2563eb" />
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>
                  97-Day Curriculum
                </Text>
              </View>
            </View>
            
            {curriculumProgress && (
              <View style={{
                backgroundColor: '#f0f8ff',
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#0b0b0f', marginBottom: 8 }}>
                  Progress Overview
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
                  Day {curriculumProgress.currentDay} of 97 • {curriculumProgress.completedTasks}/{curriculumProgress.totalTasks} tasks completed
                </Text>
                <View style={{
                  height: 8,
                  backgroundColor: '#e5e7eb',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                  <View style={{
                    height: '100%',
                    width: `${curriculumProgress.progressPercentage}%`,
                    backgroundColor: '#2563eb',
                    borderRadius: 4,
                  }} />
                </View>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4, textAlign: 'right' }}>
                  {curriculumProgress.progressPercentage.toFixed(0)}% Complete
                </Text>
              </View>
            )}

            <View>
              {curriculum.slice(0, 14).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    backgroundColor: item.completed ? '#f0f8ff' : '#f8f9fa',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: item.completed ? '#2563eb' : '#e0e0e0',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => openTaskDetail(item)}
                >
                  <View style={{ marginRight: 12 }}>
                    {item.completed ? (
                      <CheckCircle size={24} color="#2563eb" />
                    ) : (
                      <Circle size={24} color="#6b7280" />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: item.completed ? '#2563eb' : '#0b0b0f',
                      marginBottom: 4,
                    }}>
                      Day {item.day}: {item.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      {item.description}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Clock size={16} color="#6b7280" />
                      <Text style={{ fontSize: 12, color: '#6b7280', marginLeft: 4 }}>
                        {item.estimatedTime} mins
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'mentor' && (
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <User size={20} color="#2563eb" />
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#0b0b0f', marginLeft: 8 }}>
                Mentor — {displayName}
              </Text>
            </View>
            
            <View style={{
              backgroundColor: '#f8f9fa',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              minHeight: 300,
              maxHeight: 400,
            }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {(aiAssistant.messages || []).map((item) => (
                  <View key={item.id} style={{
                    alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: item.sender === 'user' ? '#2563eb' : '#ffffff',
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 8,
                    maxWidth: '80%',
                    borderWidth: item.sender === 'mentor' ? 1 : 0,
                    borderColor: '#e0e0e0',
                  }}>
                    <Text style={{
                      fontSize: 14,
                      color: item.sender === 'user' ? '#ffffff' : '#0b0b0f',
                      lineHeight: 20,
                    }}>
                      {item.text}
                    </Text>
                    <Text style={{
                      fontSize: 10,
                      color: item.sender === 'user' ? '#e0e0e0' : '#6b7280',
                      marginTop: 4,
                    }}>
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              backgroundColor: '#ffffff',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#e0e0e0',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: '#0b0b0f',
                  maxHeight: 100,
                  paddingVertical: 8,
                }}
                placeholder="Ask your mentor anything..."
                placeholderTextColor="#6b7280"
                value={mentorInput}
                onChangeText={setMentorInput}
                multiline
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#2563eb',
                  borderRadius: 8,
                  padding: 8,
                  marginLeft: 8,
                }}
                onPress={sendMentorMessage}
                disabled={!mentorInput.trim()}
              >
                <Send size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Task Detail Modal */}
        <Modal
          visible={taskModalVisible}
          transparent
          animationType="slide"
          onRequestClose={closeTaskDetail}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <View style={{
              marginTop: insets.top + 24,
              marginHorizontal: 16,
              backgroundColor: '#ffffff',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#e0e0e0' }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#0b0b0f', flex: 1 }} numberOfLines={1}>
                  {selectedTask ? `Day ${selectedTask.day}: ${selectedTask.title}` : 'Lesson'}
                </Text>
                <TouchableOpacity onPress={closeTaskDetail}>
                  <Close size={24} color="#0b0b0f" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 520 }} contentContainerStyle={{ padding: 16 }}>
                <Text style={{ fontSize: 16, color: '#0b0b0f', lineHeight: 24 }}>
                  {generateTaskDetails(selectedTask || {} as CurriculumItem, userNiche)}
                </Text>
              </ScrollView>
              <View style={{ padding: 16, borderTopWidth: 1, borderColor: '#e0e0e0' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: taskHasRead ? '#16a34a' : '#e5e7eb',
                      borderRadius: 8,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                    }}
                    onPress={() => setTaskHasRead((v) => !v)}
                  >
                    <Text style={{ color: taskHasRead ? '#ffffff' : '#0b0b0f', fontWeight: '600' }}>
                      {taskHasRead ? 'Marked as Read' : 'Mark as Read'}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity
                    style={{
                      backgroundColor: taskHasRead ? '#2563eb' : '#93c5fd',
                      borderRadius: 8,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                    }}
                    disabled={!taskHasRead}
                    onPress={completeSelectedTask}
                  >
                    <Text style={{ color: '#ffffff', fontWeight: '600' }}>Complete Task</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                  You must read the lesson before completing.
                </Text>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
}
