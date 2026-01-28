import { User, Post, Message } from '@/types/social';

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: 'Joel Ilhogo',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    bio: 'Fashion designer in Lagos crafting bold streetwear.',
    goals: ['Fashion', 'Design', 'Business'],
    streak: 18,
    isOnline: true,
    mutualConnections: 2,
    studyHours: 4,
    location: 'Lagos, Nigeria',
    progress: 56,
    achievements: [
      { id: 'a1', title: 'Style Builder', icon: 'color-palette', color: '#6C5CE7', description: 'Designed 10+ outfits' }
    ]
  },
  {
    id: 2,
    name: 'Gold Iniobong',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Writer from Abuja building a daily writing habit.',
    goals: ['Writing', 'Reading', 'Publishing'],
    streak: 27,
    isOnline: true,
    mutualConnections: 3,
    studyHours: 3,
    location: 'Abuja, Nigeria',
    progress: 62,
    achievements: [
      { id: 'a4', title: 'Daily Scribe', icon: 'book', color: '#FF7675', description: 'Wrote 30 days in a row' }
    ]
  },
  {
    id: 3,
    name: 'Tobi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    bio: 'Django dev and car enthusiast from Ibadan.',
    goals: ['Backend', 'Django', 'Automotive'],
    streak: 12,
    isOnline: false,
    mutualConnections: 1,
    studyHours: 2,
    location: 'Ibadan, Nigeria',
    progress: 40,
    achievements: [
      { id: 'a6', title: 'Django Starter', icon: 'code', color: '#FDCB6E', description: 'Built first API' }
    ]
  },
  {
    id: 4,
    name: 'Muiz',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    bio: 'Backend engineer who loves CLI and system devops.',
    goals: ['Backend', 'DevOps', 'Systems'],
    streak: 33,
    isOnline: true,
    mutualConnections: 4,
    studyHours: 5,
    location: 'Lagos, Nigeria',
    progress: 70,
    achievements: [
      { id: 'a9', title: 'Shell Master', icon: 'terminal', color: '#A29BFE', description: 'Automated daily workflows' }
    ]
  },
  {
    id: 5,
    name: 'Goodness Iyamah',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    bio: 'Builder in blockchain and growth. Tech + financial markets experience; crafting systems like a senior developer.',
    goals: ['Blockchain', 'Growth', 'Systems'],
    streak: 21,
    isOnline: true,
    mutualConnections: 6,
    studyHours: 5,
    location: 'Lagos, Nigeria',
    progress: 68,
    achievements: [
      { id: 'a10', title: 'Chain Architect', icon: 'link', color: '#6C5CE7', description: 'Designed robust on-chain workflows' }
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
