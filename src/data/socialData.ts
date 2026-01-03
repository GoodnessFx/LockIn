import { User, Post, Message } from '@/types/social';

export const INITIAL_USERS: User[] = [
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
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    content: 'Just completed my 45-day coding streak! Built a full-stack app with React and Node.js. The consistency really pays off. Who else is on a learning streak?',
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
    content: 'Morning study session complete! Practiced Japanese for 2 hours and designed a new mobile interface. There\'s something magical about early morning productivity.',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 18,
    comments: 5,
    shares: 2,
    impressions: 89,
    tags: ['japanese', 'design', 'morning'],
    isLiked: true
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: 'Hey! I saw your post about the coding streak. That\'s amazing!',
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
];