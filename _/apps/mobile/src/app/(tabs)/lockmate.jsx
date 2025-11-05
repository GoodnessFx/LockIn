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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme/theme';

// Import our custom components
import UserCard from '../../components/lockmate/UserCard';
import PostCard from '../../components/lockmate/PostCard';
import ChatMessage from '../../components/lockmate/ChatMessage';
import CreatePost from '../../components/lockmate/CreatePost';
import FilterModal from '../../components/lockmate/FilterModal';

// Achievement Badge Component
const AchievementBadge = ({ achievement, animationDelay = 0 }) => {
  return (
    <Animatable.View 
      animation="bounceIn" 
      delay={animationDelay}
      style={styles.achievementBadge}
    >
      <LinearGradient
        colors={[achievement.color, achievement.color + '99']}
        style={styles.badgeGradient}
      >
        <Ionicons name={achievement.icon} size={16} color="#FFFFFF" />
      </LinearGradient>
      <Text style={styles.badgeTitle} numberOfLines={1}>{achievement.title}</Text>
    </Animatable.View>
  );
};

// Progress Chart Component
const ProgressChart = ({ progress, color = colors.accentColor }) => {
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
          style={[
            styles.progressFill, 
            { width, backgroundColor: color }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
};

const { width } = Dimensions.get('window');

export default function LockmateScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('discover'); // discover, feed, chat
  const [refreshing, setRefreshing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Animation values
  const refreshProgress = useRef(new Animated.Value(0)).current;
  const darkModeAnim = useRef(new Animated.Value(0)).current;

  // Mock data - in real app, this would come from API
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Goodness Iyamah',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      bio: 'Full-stack developer learning AI/ML. Looking for coding accountability partners!',
      goals: ['Programming', 'AI/ML', 'Reading'],
      streak: 45,
      isOnline: true,
      mutualConnections: 3,
      studyHours: 6,
      location: 'San Francisco, CA',
      progress: 78,
      achievements: [
        { id: 'a1', title: 'Coding Ninja', icon: 'code', color: '#6C5CE7', description: 'Completed 30+ days coding streak' },
        { id: 'a2', title: 'Early Bird', icon: 'sunny', color: '#FDCB6E', description: 'Consistent morning sessions' },
        { id: 'a3', title: 'Team Player', icon: 'people', color: '#00B894', description: 'Helped 10+ community members' }
      ]
    },
    {
      id: 2,
      name: 'Oluwatobi Onatade',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'Medical student preparing for MCAT. Early bird study sessions preferred.',
      goals: ['Academic Study', 'Fitness', 'Meditation'],
      streak: 23,
      isOnline: false,
      mutualConnections: 1,
      studyHours: 8,
      location: 'Boston, MA',
      progress: 65,
      achievements: [
        { id: 'a4', title: 'Focus Master', icon: 'fitness', color: '#FF7675', description: 'Completed 20+ pomodoro sessions' },
        { id: 'a5', title: 'Knowledge Seeker', icon: 'book', color: '#74B9FF', description: 'Studied 100+ hours' }
      ]
    },
    {
      id: 3,
      name: 'Gold Iniobong',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      bio: 'UX Designer learning Japanese. Love morning study sessions with coffee!',
      goals: ['Language Learning', 'Design', 'Writing'],
      streak: 67,
      isOnline: true,
      mutualConnections: 5,
      studyHours: 4,
      location: 'Austin, TX',
      progress: 92,
      achievements: [
        { id: 'a6', title: 'Consistency King', icon: 'trophy', color: '#FDCB6E', description: '60+ day streak' },
        { id: 'a7', title: 'Polyglot', icon: 'language', color: '#6C5CE7', description: 'Learning multiple languages' },
        { id: 'a8', title: 'Creative Genius', icon: 'brush', color: '#FF7675', description: 'Completed 20+ design projects' }
      ]
    },
    {
      id: 4,
      name: 'Joel Ilhogo',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      bio: 'Aspiring data scientist. Let\'s connect and learn together!',
      goals: ['Data Science', 'Python', 'Machine Learning'],
      streak: 12,
      isOnline: true,
      mutualConnections: 2,
      studyHours: 5,
      location: 'New York, NY',
      progress: 40,
      achievements: [
        { id: 'a9', title: 'Data Dabbler', icon: 'analytics', color: '#A29BFE', description: 'Started data science journey' }
      ]
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        id: 1,
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      },
      content: 'Just completed my 45-day coding streak! 🎉 Built a full-stack app with React and Node.js. The consistency really pays off. Who else is on a learning streak?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 24,
      comments: 8,
      shares: 3,
      impressions: 156,
      tags: ['coding', 'streak', 'fullstack'],
      isLiked: false
    },
    {
      id: 2,
      user: {
        id: 3,
        name: 'Elena Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      content: 'Morning study session complete! ☀️ Practiced Japanese for 2 hours and designed a new mobile interface. There\'s something magical about early morning productivity.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: 18,
      comments: 5,
      shares: 2,
      impressions: 89,
      tags: ['japanese', 'design', 'morning'],
      isLiked: true
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hey! I saw your post about the coding streak. That\'s amazing! 🔥',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      user: { id: 2, name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      status: 'read'
    },
    {
      id: 2,
      text: 'Thanks! It\'s been quite a journey. Are you working on any coding projects?',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      user: { id: 1, name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
      status: 'read'
    }
  ]);

  const currentUser = {
    id: 'current',
    name: 'You',
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

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Animate transition
    Animated.timing(darkModeAnim, {
      toValue: newMode ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const handleConnect = (userId) => {
    console.log('Connecting to user:', userId);
    // In real app, this would send a connection request
  };

  const handleMessage = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedChatUser(user);
    setShowChat(true);
  };

  const handleLike = (postId, isLiked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked, likes: isLiked ? post.likes + 1 : post.likes - 1 }
        : post
    ));
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      ...postData,
      likes: 0,
      comments: 0,
      shares: 0,
      impressions: 0,
      isLiked: false
    };
    setPosts([newPost, ...posts]);
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

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <Animatable.View animation="fadeInLeft" delay={100} style={styles.statCard}>
                <Ionicons name="people" size={24} color={colors.successColor} />
                <Text style={styles.statNumber}>1.2k</Text>
                <Text style={styles.statLabel}>Active Partners</Text>
              </Animatable.View>
              <Animatable.View animation="fadeInUp" delay={200} style={styles.statCard}>
                <Ionicons name="flash" size={24} color="#FF6B35" />
                <Text style={styles.statNumber}>89%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </Animatable.View>
              <Animatable.View animation="fadeInRight" delay={300} style={styles.statCard}>
                <Ionicons name="trophy" size={24} color="#FFD700" />
                <Text style={styles.statNumber}>45d</Text>
                <Text style={styles.statLabel}>Avg Streak</Text>
              </Animatable.View>
            </View>

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
                  style={[
                    styles.userCard,
                    darkMode && styles.userCardDark
                  ]}
                >
                  <View style={styles.userCardHeader}>
                    <View style={styles.userAvatar}>
                      <Ionicons name="person" size={24} color={colors.textSecondary} />
                      {item.isOnline && <View style={styles.onlineIndicator} />}
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={[styles.userName, darkMode && styles.textLight]}>{item.name}</Text>
                      <Text style={[styles.userLocation, darkMode && styles.textLightSecondary]}>
                        <Ionicons name="location" size={12} /> {item.location}
                      </Text>
                    </View>
                    <View style={styles.streakBadge}>
                      <Ionicons name="flame" size={14} color="#FF6B35" />
                      <Text style={styles.streakText}>{item.streak}d</Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.userBio, darkMode && styles.textLightSecondary]} numberOfLines={2}>
                    {item.bio}
                  </Text>
                  
                  {/* Progress Chart */}
                  <View style={styles.progressSection}>
                    <Text style={[styles.progressLabel, darkMode && styles.textLightSecondary]}>Goal Progress</Text>
                    <ProgressChart progress={item.progress} color={item.progress > 80 ? '#00B894' : '#FDCB6E'} />
                  </View>
                  
                  {/* Achievement Badges */}
                  <View style={styles.achievementsRow}>
                    {item.achievements.slice(0, 3).map((achievement, i) => (
                      <AchievementBadge 
                        key={achievement.id} 
                        achievement={achievement} 
                        animationDelay={300 + (i * 100)}
                      />
                    ))}
                    {item.achievements.length > 3 && (
                      <TouchableOpacity 
                        style={styles.moreAchievements}
                        onPress={() => {
                          setSelectedUser(item);
                          setShowAchievements(true);
                        }}
                      >
                        <Text style={styles.moreAchievementsText}>+{item.achievements.length - 3}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  
                  <View style={styles.userCardActions}>
                    <TouchableOpacity 
                      style={[styles.userCardButton, styles.connectButton]}
                      onPress={() => {
                        handleConnect(item.id);
                        // Show confetti for successful connection
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 3000);
                      }}
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
              <LinearGradient
                colors={['#000000', '#333333']}
                style={styles.createPostGradient}
              >
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.createPostText}>Share your progress</Text>
              </LinearGradient>
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
                <Ionicons name="create-outline" size={24} color={colors.accentColor} />
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
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: darkModeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.background, '#121212']
          })
        }
      ]}
    >
      <StatusBar style={darkMode ? "light" : "dark"} />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={[
          styles.headerTitle,
          darkMode && { color: colors.lightText }
        ]}>LockMate</Text>
        <View style={styles.headerActions}>
          {/* Dark Mode Toggle */}
          <TouchableOpacity 
            style={styles.darkModeToggle} 
            onPress={toggleDarkMode}
          >
            <Ionicons 
              name={darkMode ? "sunny" : "moon"} 
              size={22} 
              color={darkMode ? colors.lightText : colors.textPrimary} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons 
              name="notifications-outline" 
              size={24} 
              color={darkMode ? colors.lightText : colors.textPrimary} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons 
              name="settings-outline" 
              size={24} 
              color={darkMode ? colors.lightText : colors.textPrimary} 
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
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.key ? colors.primaryDark : colors.textSecondary} 
            />
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
      <View style={[styles.content, darkMode && styles.contentDark]}>
        {renderTabContent()}
      </View>

      {/* Modals */}
      <Modal
        visible={showCreatePost}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <CreatePost
          onPost={handleCreatePost}
          onClose={() => setShowCreatePost(false)}
          user={currentUser}
        />
      </Modal>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={setFilters}
        currentFilters={filters}
      />

      {/* Achievements Modal */}
      <Modal
        visible={showAchievements}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAchievements(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAchievements(false)}
        >
          <View style={[styles.achievementsModal, darkMode && styles.achievementsModalDark]}>
            <Text style={[styles.achievementsTitle, darkMode && styles.textLight]}>
              {selectedUser?.name}'s Achievements
            </Text>
            <FlatList
              data={selectedUser?.achievements || []}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item, index }) => (
                <Animatable.View 
                  animation="zoomIn" 
                  delay={index * 100}
                  style={styles.achievementItem}
                >
                  <LinearGradient
                    colors={[item.color, item.color + '99']}
                    style={styles.achievementGradient}
                  >
                    <Ionicons name={item.icon} size={24} color="#FFFFFF" />
                  </LinearGradient>
                  <Text style={[styles.achievementItemTitle, darkMode && styles.textLight]}>{item.title}</Text>
                  <Text style={[styles.achievementDescription, darkMode && styles.textLightSecondary]}>
                    {item.description}
                  </Text>
                </Animatable.View>
              )}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowAchievements(false)}
            >
              <Ionicons name="close" size={24} color={darkMode ? colors.lightText : colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Confetti Animation */}
      {showConfetti && (
        <Animatable.View 
          style={styles.confettiContainer}
          animation="fadeOut"
          duration={2000}
          delay={1000}
        >
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 8 + 4;
            const left = Math.random() * width;
            const delay = Math.random() * 2000;
            const duration = Math.random() * 3000 + 2000;
            const color = [
              '#FDCB6E', '#FF7675', '#74B9FF', '#55EFC4', 
              '#A29BFE', '#FD79A8', '#00B894', '#6C5CE7'
            ][Math.floor(Math.random() * 8)];
            
            return (
              <Animatable.View
                key={i}
                style={[
                  styles.confetti,
                  {
                    width: size,
                    height: size,
                    backgroundColor: color,
                    left: left,
                  }
                ]}
                animation={{
                  0: { opacity: 0, translateY: -20 },
                  0.1: { opacity: 1, translateY: 0 },
                  1: { opacity: 0, translateY: 500 }
                }}
                duration={duration}
                delay={delay}
                easing="linear"
              />
            );
          })}
        </Animatable.View>
      )}

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
                isCurrentUser={message.user.id === 1}
                animationDelay={index * 50}
              />
            ))}
          </ScrollView>
          
          <View style={styles.chatInput}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor={colors.textTertiary}
            />
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={20} color={colors.primaryDark} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.backgroundColor,
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
    backgroundColor: colors.backgroundColor,
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
    borderBottomColor: colors.primaryDark,
  },
  tabLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  activeTabLabel: {
    color: colors.primaryDark,
    fontWeight: typography.fontWeight.semiBold,
  },
  content: {
    flex: 1,
  },
  contentDark: {
    backgroundColor: '#121212',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
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
    backgroundColor: colors.surfaceColor,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  filterButton: {
    backgroundColor: colors.surfaceColor,
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
    backgroundColor: colors.surfaceColor,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
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
    fontSize: typography.fontSize.md,
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
    fontSize: typography.fontSize.md,
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
    fontSize: typography.fontSize.md,
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
    backgroundColor: colors.accentColor,
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
    fontSize: typography.fontSize.lg,
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
    fontSize: typography.fontSize.md,
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
  achievementsModal: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: colors.backgroundColor,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  achievementsModalDark: {
    backgroundColor: '#1E1E1E',
  },
  achievementsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  achievementItem: {
    flex: 1,
    alignItems: 'center',
    margin: spacing.xs,
    padding: spacing.sm,
    backgroundColor: colors.surfaceColor,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  achievementGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  achievementItemTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    padding: spacing.xs,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  confetti: {
    position: 'absolute',
    top: -20,
    borderRadius: 2,
  },
  textLight: {
    color: colors.lightText || '#FFFFFF',
  },
  textLightSecondary: {
    color: colors.lightTextSecondary || '#CCCCCC',
  },
});
