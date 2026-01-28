import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
  Switch,
  Animated,
  ViewStyle,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme/theme';
import { useAppStore } from '../../store/appStore';

// Import our custom components
import PostCard from '../../components/lockmate/PostCard';
import ChatMessage from '../../components/lockmate/ChatMessage';
import CreatePost from '../../components/lockmate/CreatePost';
import FilterModal from '../../components/lockmate/FilterModal';

// Import types
import { User, Post, Message, Achievement, FilterState } from '../../types/social';

import { INITIAL_USERS, INITIAL_POSTS, INITIAL_MESSAGES } from '../../data/socialData';

 

// Progress Chart Component
interface ProgressChartProps {
  progress: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }, [progress]);
  
  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });
  
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <Animated.View 
          style={[styles.progressFill, { width, backgroundColor: '#666' } as any]} 
          />
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
};

const { width } = Dimensions.get('window');

export default function LockmateScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'discover' | 'feed' | 'chat'>('discover');
  const [refreshing, setRefreshing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState<User | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({});
  const notificationsEnabled = useAppStore((s) => s.notificationsEnabled);
  const setNotificationsEnabled = useAppStore((s) => s.setNotificationsEnabled);
  const [connections, setConnections] = useState<Set<number | string>>(new Set());
  
  // Animation values
  const refreshProgress = useRef(new Animated.Value(0)).current;
  const darkModeAnim = useRef(new Animated.Value(0)).current;

  // State initialized with data from separate file
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const { userProfile, theme } = useAppStore();
  const darkMode = theme === 'dark';

  const currentUser = {
    id: userProfile?.id || 'current',
    name: userProfile?.name || 'You',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    Animated.timing(refreshProgress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
    
    setTimeout(() => {
      setRefreshing(false);
      refreshProgress.setValue(0);
    }, 1000);
  };

  const handleConnect = (userId: number | string) => {
    if (!connections.has(userId)) {
      const next = new Set(connections);
      next.add(userId);
      setConnections(next);
      Alert.alert('Connected', 'You are now connected.');
    }
  };

  const handleMessage = (userId: number | string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedChatUser(user);
      setShowChat(true);
    }
  };

  const handleLike = (postId: number | string, isLiked: boolean) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked, likes: isLiked ? post.likes + 1 : post.likes - 1 }
        : post
    ));
  };

  const handleCreatePost = (postData: Partial<Post>) => {
    const newPost: Post = {
      id: posts.length + 1,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      content: postData.content || '',
      likes: 0,
      comments: 0,
      shares: 0,
      impressions: 0,
      isLiked: false,
      timestamp: new Date().toISOString(),
      ...postData
    };
    setPosts([newPost, ...posts]);
  };

  const handleSendMessage = () => {
    const text = messageText.trim();
    if (!text || !selectedChatUser) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toISOString(),
      user: { id: currentUser.id, name: currentUser.name },
      status: 'sent',
    };
    setMessages([...messages, newMsg]);
    setMessageText('');
    setTimeout(() => {
      const reply: Message = {
        id: `${newMsg.id}-r`,
        text: 'Got it. Let’s keep the momentum.',
        timestamp: new Date().toISOString(),
        user: { id: selectedChatUser.id, name: selectedChatUser.name },
        status: 'read',
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <View style={styles.tabContent}>
            {/* Search and Filter Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color={colors.textSecondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search partners..."
                  placeholderTextColor={colors.textTertiary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity 
                style={styles.filterButton}
                onPress={() => setShowFilters(true)}
              >
                <Ionicons name="options" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Stats removed */}

            {/* User Cards */}
            <FlatList
              data={users}
              keyExtractor={(item) => item.id.toString()}
              refreshing={refreshing}
              onRefresh={onRefresh}
              renderItem={({ item, index }) => (
                <Animatable.View
                  animation="fadeInUp"
                  delay={index * 100}
                  style={styles.userCard}
                >
                  <View style={styles.userCardHeader}>
                    <View style={styles.userAvatar}>
                      <Ionicons name="person" size={24} color={colors.textSecondary} />
                      {item.isOnline && <View style={styles.onlineIndicator} />}
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{item.name}</Text>
                      <Text style={styles.userLocation}>
                        <Ionicons name="location" size={12} /> {item.location}
                      </Text>
                    </View>
                    <View style={styles.streakBadge}>
                      <Text style={styles.streakText}>{item.streak}d</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.userBio} numberOfLines={2}>
                    {item.bio}
                  </Text>
                  
                  {/* Progress Chart */}
                  <View style={styles.progressSection}>
                    <Text style={styles.progressLabel}>Goal Progress</Text>
                    <ProgressChart progress={item.progress || 0} />
                  </View>
                  
                  {/* Achievements removed */}
                  
                  <View style={styles.userCardActions}>
                    <TouchableOpacity 
                      style={[styles.userCardButton, styles.connectButton]}
                      onPress={() => handleConnect(item.id)}
                    >
                      <Text style={styles.connectButtonText}>Connect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.userCardButton, styles.messageButton]}
                      onPress={() => handleMessage(item.id)}
                    >
                      <Ionicons name="chatbubble-outline" size={16} color={colors.accentColor} />
                      <Text style={styles.messageButtonText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );

      case 'feed':
        return (
          <View style={styles.tabContent}>
            {/* Create Post Button */}
            <TouchableOpacity 
              style={styles.createPostButton}
              onPress={() => setShowCreatePost(true)}
            >
              <View style={styles.createPostGradient}>
                <Ionicons name="add" size={24} color="#222" />
                <Text style={styles.createPostText}>Share your progress</Text>
              </View>
            </TouchableOpacity>

            {/* Posts Feed */}
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              refreshing={refreshing}
              onRefresh={onRefresh}
              renderItem={({ item, index }) => (
                <PostCard
                  post={item}
                  onLike={handleLike}
                  onComment={(id) => console.log('Comment on:', id)}
                  onShare={(id) => console.log('Share:', id)}
                  onUserPress={(id) => console.log('User press:', id)}
                  animationDelay={index * 100}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );

      case 'chat':
        return (
          <View style={styles.tabContent}>
            {/* Chat Header */}
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>Messages</Text>
              <TouchableOpacity style={styles.newChatButton}>
                <Ionicons name="create-outline" size={24} color="#222" />
              </TouchableOpacity>
            </View>

            {/* Chat List */}
            <View style={styles.chatList}>
              {users.slice(0, 2).map((user, index) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.chatItem}
                  onPress={() => {
                    setSelectedChatUser(user);
                    setShowChat(true);
                  }}
                >
                  <View style={styles.chatAvatar}>
                    <Ionicons name="person" size={24} color={colors.textSecondary} />
                    {user.isOnline && <View style={styles.onlineIndicator} />}
                  </View>
                  <View style={styles.chatInfo}>
                    <Text style={styles.chatName}>{user.name}</Text>
                    <Text style={styles.chatLastMessage}>
                      {index === 0 ? 'Thanks! It\'s been quite a journey...' : 'Let\'s start our study session!'}
                    </Text>
                  </View>
                  <View style={styles.chatMeta}>
                    <Text style={styles.chatTime}>
                      {index === 0 ? '2m ago' : '1h ago'}
                    </Text>
                    {index === 1 && <View style={styles.unreadBadge} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>LockMate</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            <Ionicons 
              name="notifications-outline" 
              size={24} 
              color={colors.textPrimary} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        {[
          { key: 'discover', label: 'Discover', icon: 'compass' },
          { key: 'feed', label: 'Feed', icon: 'newspaper' },
          { key: 'chat', label: 'Chat', icon: 'chatbubbles' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <View style={[styles.tabIcon, activeTab === tab.key && styles.activeTabIcon]}>
              <Ionicons 
                name={tab.icon as any} 
                size={20} 
                color={activeTab === tab.key ? colors.primaryDark : colors.textSecondary} 
              />
            </View>
            <Text style={[
              styles.tabLabel,
              activeTab === tab.key && styles.activeTabLabel
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>

      {/* Create Post */}
      <CreatePost
        onCreate={handleCreatePost}
        onClose={() => setShowCreatePost(false)}
        visible={showCreatePost}
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={setFilters}
        currentFilters={filters}
      />

      {/* Achievements Modal */}
      {/* Achievements modal removed */}

      {/* Confetti removed */}

      {/* Chat Modal */}
      <Modal
        visible={showChat}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.chatModal}>
          <View style={styles.chatModalHeader}>
            <TouchableOpacity onPress={() => setShowChat(false)}>
              <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.chatModalTitle}>{selectedChatUser?.name}</Text>
            <TouchableOpacity>
              <Ionicons name="videocam-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.chatMessages}>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isCurrentUser={message.user.id === currentUser.id}
                animationDelay={index * 50}
              />
            ))}
          </ScrollView>
          
          <View style={styles.chatInput}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor={colors.textTertiary}
              value={messageText}
              onChangeText={setMessageText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={20} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  headerButton: {
    padding: spacing.xs,
  },
  darkModeToggle: {
    padding: spacing.xs,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingHorizontal: spacing.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#222',
  },
  tabLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  tabIcon: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  activeTabIcon: {
    backgroundColor: 'rgba(37,99,235,0.08)',
  },
  activeTabLabel: {
    color: colors.primaryDark,
    fontWeight: typography.fontWeight.semiBold,
  },
  content: {
    flex: 1,
  },
  /* dark content removed */
  tabContent: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceColor,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statNumber: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  userCardDark: {
    backgroundColor: '#1E1E1E',
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  userName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  userLocation: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  streakText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: '#FF6B35',
    marginLeft: 4,
  },
  userBio: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressSection: {
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBackground: {
    flex: 1,
    height: 6,
    backgroundColor: colors.borderColor,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    width: 30,
  },
  achievementsRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  achievementBadge: {
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  badgeGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeTitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    width: 50,
  },
  moreAchievements: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAchievementsText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
  },
  userCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userCardButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: colors.accentColor,
    marginRight: spacing.xs,
  },
  connectButtonText: {
    color: 'white',
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.sm,
  },
  messageButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: spacing.xs,
    flexDirection: 'row',
  },
  messageButtonText: {
    color: colors.accentColor,
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.sm,
    marginLeft: 4,
  },
  createPostButton: {
    marginBottom: spacing.lg,
  },
  createPostGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  createPostText: {
    color: 'white',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  chatTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  newChatButton: {
    padding: spacing.sm,
  },
  chatList: {
    gap: spacing.sm,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceColor,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.successColor,
    borderWidth: 2,
    borderColor: colors.backgroundColor,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  chatLastMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
  },
  chatModal: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  chatModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  chatModalTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  chatMessages: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    gap: spacing.md,
  },
  messageInput: {
    flex: 1,
    backgroundColor: colors.surfaceColor,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  sendButton: {
    backgroundColor: colors.surfaceColor,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* achievements styles removed */
  /* confetti styles removed */
  textLight: {
    color: '#FFFFFF',
  },
  textLightSecondary: {
    color: '#CCCCCC',
  },
});
