import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
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
const User = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>👤</Text>;
const Send = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📤</Text>;
const CheckCircle = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>✅</Text>;
const Circle = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>⭕</Text>;
const Clock = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🕐</Text>;
const Target = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🎯</Text>;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '@/store/appStore';
import { generateCurriculum, getCurriculumProgress } from '@/services/ai/curriculum';

export default function LAIScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const [assistantMessage, setAssistantMessage] = useState('');
  const [progressNotes, setProgressNotes] = useState([]);
  const { progress, userProfile } = useAppStore();
  const userNiche = (userProfile?.niche || '').trim();

  const [learningJourney, setLearningJourney] = useState([]);
  
  // New state for enhanced functionality
  const [activeTab, setActiveTab] = useState('overview'); // overview, curriculum, mentor
  const [curriculum, setCurriculum] = useState([]);
  const [curriculumProgress, setCurriculumProgress] = useState(null);
  const [mentorMessages, setMentorMessages] = useState([]);
  const [mentorInput, setMentorInput] = useState('');
  const [currentDay, setCurrentDay] = useState(1);

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
    generateMotivationalMessage();
    initializeCurriculum();
    loadMentorMessages();
  }, []);

  useEffect(() => {
    // Tailor courses when user niche changes
    setLearningJourney(getCoursesForNiche(userNiche));
    if (userNiche) {
      initializeCurriculum();
      loadMentorMessages();
    }
  }, [userNiche]);

  // Refresh curriculum when returning to this screen
  useFocusEffect(
    React.useCallback(() => {
      initializeCurriculum();
      return () => {};
    }, [])
  );

  const initializeCurriculum = async () => {
    try {
      const savedCurriculum = await AsyncStorage.getItem('user_curriculum');
      if (savedCurriculum) {
        const parsedCurriculum = JSON.parse(savedCurriculum);
        setCurriculum(parsedCurriculum);
        setCurriculumProgress(getCurriculumProgress(parsedCurriculum));
      } else if (userNiche) {
        // Generate new curriculum based on user's niche
        const newCurriculum = generateCurriculum(userNiche, 97);
        setCurriculum(newCurriculum);
        setCurriculumProgress(getCurriculumProgress(newCurriculum));
        await AsyncStorage.setItem('user_curriculum', JSON.stringify(newCurriculum));
      }
    } catch (error) {
      console.error('Error initializing curriculum:', error);
    }
  };

  const loadMentorMessages = async () => {
    try {
      const messages = await AsyncStorage.getItem('mentor_messages');
      if (messages) {
        setMentorMessages(JSON.parse(messages));
      } else {
        // Initialize with welcome message
        const welcomeMessage = {
          id: Date.now().toString(),
          text: `Welcome to your 97-day ${userNiche || 'learning'} journey! I'm your dedicated mentor. I'll help you stay on track, customize your curriculum, and provide guidance whenever you need it. How are you feeling about starting this transformation?`,
          sender: 'mentor',
          timestamp: new Date().toISOString(),
        };
        setMentorMessages([welcomeMessage]);
        await AsyncStorage.setItem('mentor_messages', JSON.stringify([welcomeMessage]));
      }
    } catch (error) {
      console.error('Error loading mentor messages:', error);
    }
  };

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

  // Curriculum detail modal and completion gating state
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskHasRead, setTaskHasRead] = useState(false);

  // Developer editor state to manually add or improve curriculum
  const [devEditorVisible, setDevEditorVisible] = useState(false);
  const [devNewTask, setDevNewTask] = useState({ title: '', description: '', day: 1, estimatedTime: '', notes: '' });

  const openTaskDetail = (task) => {
    setSelectedTask(task);
    setTaskHasRead(false);
    setTaskModalVisible(true);
  };

  const closeTaskDetail = () => {
    setTaskModalVisible(false);
    setSelectedTask(null);
    setTaskHasRead(false);
  };

  const completeSelectedTask = async () => {
    if (!selectedTask || !taskHasRead) {
      Alert.alert('Please read the lesson first', 'Scroll through and mark as read before completing.');
      return;
    }
    try {
      const updatedCurriculum = curriculum.map(t =>
        t.id === selectedTask.id ? { ...t, completed: true } : t
      );
      setCurriculum(updatedCurriculum);
      setCurriculumProgress(getCurriculumProgress(updatedCurriculum));
      await AsyncStorage.setItem('user_curriculum', JSON.stringify(updatedCurriculum));
      closeTaskDetail();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const addDeveloperTask = async () => {
    const trimmedTitle = (devNewTask.title || '').trim();
    if (!trimmedTitle) {
      Alert.alert('Task title required', 'Please add a clear, specific title.');
      return;
    }
    try {
      const newTask = {
        id: `dev-${Date.now()}`,
        title: trimmedTitle,
        description: (devNewTask.description || '').trim(),
        day: Number(devNewTask.day) || currentDay || 1,
        estimatedTime: (devNewTask.estimatedTime || '').trim(),
        notes: (devNewTask.notes || '').trim(),
        completed: false,
      };
      const updated = [...curriculum, newTask];
      setCurriculum(updated);
      setCurriculumProgress(getCurriculumProgress(updated));
      await AsyncStorage.setItem('user_curriculum', JSON.stringify(updated));
      const overridesKey = 'developer_curriculum_overrides';
      const existingOverrides = await AsyncStorage.getItem(overridesKey);
      const overrides = existingOverrides ? JSON.parse(existingOverrides) : [];
      await AsyncStorage.setItem(overridesKey, JSON.stringify([...overrides, newTask]));
      setDevNewTask({ title: '', description: '', day: currentDay || 1, estimatedTime: '', notes: '' });
      setDevEditorVisible(false);
      Alert.alert('Task added', 'Your custom task has been added to the curriculum.');
    } catch (error) {
      console.error('Error adding developer task:', error);
    }
  };

  const generateTaskDetails = (task, niche) => {
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

  const sendMentorMessage = async () => {
    if (!mentorInput.trim()) return;

    try {
      const userMessage = {
        id: Date.now().toString(),
        text: mentorInput.trim(),
        sender: 'user',
        timestamp: new Date().toISOString(),
      };

      const mentorResponse = {
        id: (Date.now() + 1).toString(),
        text: generateMentorResponse(mentorInput.trim()),
        sender: 'mentor',
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...mentorMessages, userMessage, mentorResponse];
      setMentorMessages(updatedMessages);
      await AsyncStorage.setItem('mentor_messages', JSON.stringify(updatedMessages));
      setMentorInput('');
    } catch (error) {
      console.error('Error sending mentor message:', error);
    }
  };

  const generateMentorResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('stuck') || message.includes('difficult') || message.includes('hard')) {
      // Add extra practice tasks for difficult topics
      addExtraPracticeTasks(message);
      return "I understand this feels challenging! Remember, every expert was once a beginner. Let's break this down into smaller steps. I've added some extra practice tasks to help you master this concept. What specific part is giving you trouble?";
    }
    
    if (message.includes('behind') || message.includes('late') || message.includes('missed')) {
      // Adjust curriculum pacing
      adjustCurriculumPacing('slower');
      return "Don't worry about being behind - progress isn't always linear! I've adjusted your curriculum to a more manageable pace. The important thing is that you're here now. Focus on consistency over speed!";
    }
    
    if (message.includes('too easy') || message.includes('boring') || message.includes('faster')) {
      // Speed up curriculum
      adjustCurriculumPacing('faster');
      return "Great to hear you're finding this manageable! I've accelerated your curriculum and added more advanced challenges. Let's push your limits and see what you can achieve!";
    }
    
    if (message.includes('motivation') || message.includes('tired') || message.includes('give up')) {
      // Add motivational milestones
      addMotivationalMilestones();
      return "I hear you, and it's completely normal to feel this way! Remember why you started this journey. I've added some quick wins and motivational milestones to help you regain momentum. Small wins build confidence!";
    }
    
    if (message.includes('change') || message.includes('different') || message.includes('customize')) {
      return "Absolutely! Your curriculum should work for YOU. Tell me what you'd like to change:\n\n• 'more projects' - I'll add hands-on projects\n• 'more theory' - I'll include deeper explanations\n• 'slower pace' - I'll spread tasks over more days\n• 'faster pace' - I'll condense the timeline\n\nJust tell me what you need!";
    }
    
    if (message.includes('more projects') || message.includes('hands-on') || message.includes('practical')) {
      addProjectFocusedTasks();
      return "Perfect! I've updated your curriculum to include more hands-on projects and practical exercises. Learning by doing is one of the most effective ways to master new skills!";
    }
    
    if (message.includes('more theory') || message.includes('explain') || message.includes('understand')) {
      addTheoryFocusedTasks();
      return "Great approach! I've enhanced your curriculum with more theoretical content and detailed explanations. Understanding the 'why' behind concepts will make you a stronger practitioner!";
    }
    
    return `Great question! I'm here to support your ${userNiche || 'learning'} journey. Based on your progress, you're doing well! Keep up the momentum. Is there anything specific about today's tasks you'd like to discuss or modify?`;
  };

  const addExtraPracticeTasks = (difficultTopic) => {
    const practiceTask = {
      id: `practice-${Date.now()}`,
      day: curriculumProgress.currentDay + 0.5,
      title: `Extra Practice: ${difficultTopic.includes('javascript') ? 'JavaScript Fundamentals' : 'Current Topic'}`,
      description: "Additional practice exercises to reinforce challenging concepts",
      estimatedTime: "30-45 minutes",
      completed: false,
      type: 'practice'
    };
    
    const updatedCurriculum = [...curriculum, practiceTask].sort((a, b) => a.day - b.day);
    setCurriculum(updatedCurriculum);
    AsyncStorage.setItem('user_curriculum', JSON.stringify(updatedCurriculum));
  };

  const adjustCurriculumPacing = (direction) => {
    const updatedCurriculum = curriculum.map(task => {
      if (!task.completed) {
        if (direction === 'slower') {
          return { ...task, estimatedTime: task.estimatedTime.replace(/\d+/, (match) => Math.min(parseInt(match) + 15, 120)) };
        } else {
          return { ...task, estimatedTime: task.estimatedTime.replace(/\d+/, (match) => Math.max(parseInt(match) - 10, 15)) };
        }
      }
      return task;
    });
    
    setCurriculum(updatedCurriculum);
    AsyncStorage.setItem('user_curriculum', JSON.stringify(updatedCurriculum));
  };

  const addMotivationalMilestones = () => {
    const milestone = {
      id: `milestone-${Date.now()}`,
      day: curriculumProgress.currentDay + 1,
      title: "🎉 Motivation Checkpoint",
      description: "Celebrate your progress and reflect on your achievements so far",
      estimatedTime: "15 minutes",
      completed: false,
      type: 'milestone'
    };
    
    const updatedCurriculum = [...curriculum, milestone].sort((a, b) => a.day - b.day);
    setCurriculum(updatedCurriculum);
    AsyncStorage.setItem('user_curriculum', JSON.stringify(updatedCurriculum));
  };

  const addProjectFocusedTasks = () => {
    const projectTask = {
      id: `project-${Date.now()}`,
      day: curriculumProgress.currentDay + 2,
      title: `🚀 Hands-on Project: ${userNiche} Application`,
      description: "Build a practical project to apply your learning",
      estimatedTime: "2-3 hours",
      completed: false,
      type: 'project'
    };
    
    const updatedCurriculum = [...curriculum, projectTask].sort((a, b) => a.day - b.day);
    setCurriculum(updatedCurriculum);
    AsyncStorage.setItem('user_curriculum', JSON.stringify(updatedCurriculum));
  };

  const addTheoryFocusedTasks = () => {
    const theoryTask = {
      id: `theory-${Date.now()}`,
      day: curriculumProgress.currentDay + 1,
      title: `📚 Deep Dive: ${userNiche} Concepts`,
      description: "Comprehensive study of underlying principles and best practices",
      estimatedTime: "45-60 minutes",
      completed: false,
      type: 'theory'
    };
    
    const updatedCurriculum = [...curriculum, theoryTask].sort((a, b) => a.day - b.day);
    setCurriculum(updatedCurriculum);
    AsyncStorage.setItem('user_curriculum', JSON.stringify(updatedCurriculum));
  };

  const generateMotivationalMessage = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    const nicheHint = userNiche ? ` Focus today on ${userNiche}.` : '';
    setAssistantMessage(randomMessage + nicheHint);
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
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#0b0b0f' }}>
            LAI {userNiche ? `— ${userNiche}` : ''}
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
          <TouchableOpacity 
            style={[
              { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
              activeTab === 'overview' && { backgroundColor: '#2563eb' }
            ]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[
              { fontSize: 14, fontWeight: '600', color: '#6b7280' },
              activeTab === 'overview' && { color: '#ffffff' }
            ]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
              activeTab === 'curriculum' && { backgroundColor: '#2563eb' }
            ]}
            onPress={() => setActiveTab('curriculum')}
          >
            <Text style={[
              { fontSize: 14, fontWeight: '600', color: '#6b7280' },
              activeTab === 'curriculum' && { color: '#ffffff' }
            ]}>Curriculum</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
              activeTab === 'mentor' && { backgroundColor: '#2563eb' }
            ]}
            onPress={() => setActiveTab('mentor')}
          >
            <Text style={[
              { fontSize: 14, fontWeight: '600', color: '#6b7280' },
              activeTab === 'mentor' && { color: '#ffffff' }
            ]}>Mentor</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'overview' && (
          <>
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
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f8ff', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#e0e0e0' }}
                onPress={() => setDevEditorVisible(true)}
              >
                <Plus size={16} color="#2563eb" />
                <Text style={{ color: '#2563eb', fontWeight: '600', marginLeft: 6 }}>Add</Text>
              </TouchableOpacity>
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
                    width: `${curriculumProgress.completionPercentage}%`,
                    backgroundColor: '#2563eb',
                    borderRadius: 4,
                  }} />
                </View>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4, textAlign: 'right' }}>
                  {curriculumProgress.completionPercentage}% Complete
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
                  onPress={() => router.push({ pathname: '/(tabs)/topic/[id]', params: { id: item.id } })}
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
                        {item.estimatedTime}
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
                AI Mentor Chat
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
                {mentorMessages.map((item) => (
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
        {/* Task Detail Modal for interactive learning */}
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
                  <Text style={{ fontSize: 18 }}>✖️</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 520 }} contentContainerStyle={{ padding: 16 }}>
                <Text style={{ fontSize: 16, color: '#0b0b0f', lineHeight: 24 }}>
                  {generateTaskDetails(selectedTask || {}, userNiche)}
                </Text>
                {selectedTask?.notes ? (
                  <View style={{ marginTop: 16, backgroundColor: '#f8f9fa', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#e0e0e0' }}>
                    <Text style={{ fontSize: 14, color: '#6b7280' }}>{selectedTask.notes}</Text>
                  </View>
                ) : null}
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

        {/* Developer Editor Modal to add/improve curriculum */}
        <Modal
          visible={devEditorVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setDevEditorVisible(false)}
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
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#0b0b0f' }}>Add Curriculum Task</Text>
                <TouchableOpacity onPress={() => setDevEditorVisible(false)}>
                  <Text style={{ fontSize: 18 }}>✖️</Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 6 }}>Title</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 10, marginBottom: 12 }}
                  value={devNewTask.title}
                  onChangeText={(t) => setDevNewTask((prev) => ({ ...prev, title: t }))}
                  placeholder="e.g., Build a small React Native app"
                  placeholderTextColor="#6b7280"
                />
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 6 }}>Description</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 10, marginBottom: 12, minHeight: 80 }}
                  value={devNewTask.description}
                  onChangeText={(t) => setDevNewTask((prev) => ({ ...prev, description: t }))}
                  placeholder="Detailed guidance and expected outcomes"
                  placeholderTextColor="#6b7280"
                  multiline
                />
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 6 }}>Day</Text>
                    <TextInput
                      style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 10, marginBottom: 12 }}
                      value={String(devNewTask.day)}
                      onChangeText={(t) => setDevNewTask((prev) => ({ ...prev, day: t }))}
                      placeholder={String(currentDay || 1)}
                      placeholderTextColor="#6b7280"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 6 }}>Estimated Time</Text>
                    <TextInput
                      style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 10, marginBottom: 12 }}
                      value={devNewTask.estimatedTime}
                      onChangeText={(t) => setDevNewTask((prev) => ({ ...prev, estimatedTime: t }))}
                      placeholder="e.g., 60-90 minutes"
                      placeholderTextColor="#6b7280"
                    />
                  </View>
                </View>
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 6 }}>Notes</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 10, marginBottom: 16, minHeight: 60 }}
                  value={devNewTask.notes}
                  onChangeText={(t) => setDevNewTask((prev) => ({ ...prev, notes: t }))}
                  placeholder="Additional pointers or references"
                  placeholderTextColor="#6b7280"
                  multiline
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: '#e5e7eb', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14 }}
                    onPress={() => setDevEditorVisible(false)}
                  >
                    <Text style={{ color: '#0b0b0f' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: '#2563eb', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14 }}
                    onPress={addDeveloperTask}
                  >
                    <Text style={{ color: '#ffffff', fontWeight: '600' }}>Add Task</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
}
