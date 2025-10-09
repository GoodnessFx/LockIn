import { CurriculumItem } from '../../store/appStore';

interface CurriculumTemplate {
  [key: string]: {
    title: string;
    description: string;
    type: 'learning' | 'practice' | 'milestone';
    estimatedTime: number;
  }[];
}

const CURRICULUM_TEMPLATES: CurriculumTemplate = {
  'web-dev': [
    { title: 'HTML Fundamentals', description: 'Learn semantic HTML, forms, and accessibility basics', type: 'learning', estimatedTime: 60 },
    { title: 'CSS Layout Practice', description: 'Build responsive layouts with Flexbox and Grid', type: 'practice', estimatedTime: 90 },
    { title: 'JavaScript Basics', description: 'Variables, functions, arrays, and objects', type: 'learning', estimatedTime: 75 },
    { title: 'DOM Manipulation', description: 'Select elements, handle events, and update content', type: 'practice', estimatedTime: 60 },
    { title: 'First Portfolio Page', description: 'Create your first personal portfolio website', type: 'milestone', estimatedTime: 120 },
    { title: 'CSS Animations', description: 'Learn transitions, transforms, and keyframes', type: 'learning', estimatedTime: 45 },
    { title: 'JavaScript ES6+', description: 'Arrow functions, destructuring, modules, and async/await', type: 'learning', estimatedTime: 90 },
    { title: 'API Integration', description: 'Fetch data from REST APIs and handle responses', type: 'practice', estimatedTime: 75 },
    { title: 'React Fundamentals', description: 'Components, props, state, and JSX', type: 'learning', estimatedTime: 120 },
    { title: 'React Hooks', description: 'useState, useEffect, and custom hooks', type: 'practice', estimatedTime: 90 },
    { title: 'State Management', description: 'Context API and Redux basics', type: 'learning', estimatedTime: 105 },
    { title: 'React Project', description: 'Build a todo app with React', type: 'milestone', estimatedTime: 150 },
    { title: 'Node.js Basics', description: 'Server-side JavaScript and npm', type: 'learning', estimatedTime: 75 },
    { title: 'Express.js', description: 'Create REST APIs with Express', type: 'practice', estimatedTime: 90 },
    { title: 'Database Integration', description: 'Connect to MongoDB or PostgreSQL', type: 'learning', estimatedTime: 105 },
    { title: 'Full-Stack App', description: 'Build a complete CRUD application', type: 'milestone', estimatedTime: 180 },
    { title: 'Authentication', description: 'Implement JWT and user sessions', type: 'learning', estimatedTime: 90 },
    { title: 'Testing Basics', description: 'Unit tests with Jest and React Testing Library', type: 'practice', estimatedTime: 75 },
    { title: 'Deployment', description: 'Deploy to Vercel, Netlify, or Heroku', type: 'practice', estimatedTime: 60 },
    { title: 'Final Project', description: 'Build and deploy your capstone project', type: 'milestone', estimatedTime: 240 },
  ],
  'mobile-dev': [
    { title: 'React Native Setup', description: 'Install and configure development environment', type: 'learning', estimatedTime: 60 },
    { title: 'First Mobile App', description: 'Create your first React Native app', type: 'practice', estimatedTime: 90 },
    { title: 'Navigation', description: 'Implement React Navigation', type: 'learning', estimatedTime: 75 },
    { title: 'State Management', description: 'Use Redux or Context for app state', type: 'practice', estimatedTime: 90 },
    { title: 'Mobile UI Components', description: 'Build custom components and layouts', type: 'milestone', estimatedTime: 120 },
    { title: 'Platform APIs', description: 'Camera, location, and device features', type: 'learning', estimatedTime: 105 },
    { title: 'Data Persistence', description: 'AsyncStorage and SQLite integration', type: 'practice', estimatedTime: 75 },
    { title: 'Push Notifications', description: 'Implement local and remote notifications', type: 'learning', estimatedTime: 90 },
    { title: 'App Store Prep', description: 'Prepare app for store submission', type: 'milestone', estimatedTime: 150 },
    { title: 'Performance Optimization', description: 'Optimize app performance and memory usage', type: 'practice', estimatedTime: 60 },
  ],
  'data-science': [
    { title: 'Python Basics', description: 'Variables, data types, and control structures', type: 'learning', estimatedTime: 60 },
    { title: 'NumPy Fundamentals', description: 'Arrays, operations, and mathematical functions', type: 'practice', estimatedTime: 75 },
    { title: 'Pandas DataFrames', description: 'Data manipulation and analysis', type: 'learning', estimatedTime: 90 },
    { title: 'Data Visualization', description: 'Create charts with Matplotlib and Seaborn', type: 'practice', estimatedTime: 60 },
    { title: 'First Data Analysis', description: 'Analyze a real dataset end-to-end', type: 'milestone', estimatedTime: 120 },
    { title: 'Statistical Analysis', description: 'Descriptive and inferential statistics', type: 'learning', estimatedTime: 90 },
    { title: 'Machine Learning Intro', description: 'Scikit-learn basics and algorithms', type: 'practice', estimatedTime: 105 },
    { title: 'Model Evaluation', description: 'Cross-validation and performance metrics', type: 'learning', estimatedTime: 75 },
    { title: 'ML Project', description: 'Build and deploy a machine learning model', type: 'milestone', estimatedTime: 180 },
    { title: 'Deep Learning', description: 'Neural networks with TensorFlow/Keras', type: 'learning', estimatedTime: 120 },
  ],
  'design': [
    { title: 'Design Principles', description: 'Learn fundamental design principles', type: 'learning', estimatedTime: 60 },
    { title: 'Figma Basics', description: 'Interface, tools, and basic shapes', type: 'practice', estimatedTime: 75 },
    { title: 'Typography', description: 'Font selection, hierarchy, and readability', type: 'learning', estimatedTime: 45 },
    { title: 'Color Theory', description: 'Color psychology and palette creation', type: 'practice', estimatedTime: 60 },
    { title: 'First Design System', description: 'Create a basic design system', type: 'milestone', estimatedTime: 120 },
    { title: 'User Research', description: 'Interviews, surveys, and personas', type: 'learning', estimatedTime: 90 },
    { title: 'Wireframing', description: 'Low-fidelity layouts and user flows', type: 'practice', estimatedTime: 75 },
    { title: 'Prototyping', description: 'Interactive prototypes and user testing', type: 'learning', estimatedTime: 90 },
    { title: 'UI Design Project', description: 'Design a complete mobile app interface', type: 'milestone', estimatedTime: 150 },
    { title: 'Design Portfolio', description: 'Create and publish your design portfolio', type: 'practice', estimatedTime: 120 },
  ],
  'marketing': [
    { title: 'Marketing Fundamentals', description: '4Ps, customer journey, and market research', type: 'learning', estimatedTime: 60 },
    { title: 'Content Strategy', description: 'Content planning and editorial calendars', type: 'practice', estimatedTime: 75 },
    { title: 'SEO Basics', description: 'Keywords, on-page optimization, and analytics', type: 'learning', estimatedTime: 90 },
    { title: 'Social Media Strategy', description: 'Platform selection and content creation', type: 'practice', estimatedTime: 60 },
    { title: 'First Campaign', description: 'Launch your first marketing campaign', type: 'milestone', estimatedTime: 120 },
    { title: 'Email Marketing', description: 'List building and email automation', type: 'learning', estimatedTime: 75 },
    { title: 'Paid Advertising', description: 'Google Ads and Facebook advertising', type: 'practice', estimatedTime: 90 },
    { title: 'Analytics & Metrics', description: 'Track and analyze campaign performance', type: 'learning', estimatedTime: 60 },
    { title: 'Growth Hacking', description: 'Viral loops and growth experiments', type: 'milestone', estimatedTime: 150 },
    { title: 'Marketing Portfolio', description: 'Document your marketing achievements', type: 'practice', estimatedTime: 90 },
  ],
  'business': [
    { title: 'Business Model Canvas', description: 'Map your business idea and value proposition', type: 'learning', estimatedTime: 60 },
    { title: 'Market Research', description: 'Analyze competitors and target market', type: 'practice', estimatedTime: 90 },
    { title: 'Financial Planning', description: 'Revenue models and basic accounting', type: 'learning', estimatedTime: 75 },
    { title: 'MVP Development', description: 'Build your minimum viable product', type: 'milestone', estimatedTime: 180 },
    { title: 'Customer Validation', description: 'Test your product with real users', type: 'practice', estimatedTime: 120 },
    { title: 'Pitch Deck', description: 'Create a compelling investor presentation', type: 'learning', estimatedTime: 90 },
    { title: 'Legal Basics', description: 'Business structure and intellectual property', type: 'learning', estimatedTime: 60 },
    { title: 'Funding Strategy', description: 'Explore funding options and prepare applications', type: 'practice', estimatedTime: 75 },
    { title: 'Launch Strategy', description: 'Plan and execute your product launch', type: 'milestone', estimatedTime: 150 },
    { title: 'Business Plan', description: 'Write a comprehensive business plan', type: 'practice', estimatedTime: 120 },
  ],
};

export function generateCurriculum(niche: string, days = 90): CurriculumItem[] {
  const template = CURRICULUM_TEMPLATES[niche] || CURRICULUM_TEMPLATES['web-dev'];
  const curriculum: CurriculumItem[] = [];
  
  // Distribute tasks across the specified number of days
  const tasksPerDay = Math.ceil(template.length / days);
  let taskIndex = 0;
  
  for (let day = 1; day <= days; day++) {
    // Add 1-3 tasks per day, with milestones getting their own day
    const tasksForDay = Math.min(tasksPerDay, template.length - taskIndex);
    
    for (let i = 0; i < tasksForDay && taskIndex < template.length; i++) {
      const task = template[taskIndex];
      curriculum.push({
        id: `day-${day}-task-${i + 1}`,
        day,
        title: task.title,
        description: task.description,
        type: task.type,
        completed: false,
        estimatedTime: task.estimatedTime,
      });
      taskIndex++;
    }
    
    // If it's a milestone day, give it more space
    if (curriculum.some(item => item.day === day && item.type === 'milestone')) {
      // Skip adding more tasks for milestone days
      continue;
    }
  }
  
  return curriculum;
}

export function getCurriculumProgress(curriculum: CurriculumItem[]): {
  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;
  currentWeek: number;
  weekProgress: number;
} {
  const totalTasks = curriculum.length;
  const completedTasks = curriculum.filter(item => item.completed).length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const currentDay = Math.max(...curriculum.map(item => item.day));
  const currentWeek = Math.ceil(currentDay / 7);
  
  const weekTasks = curriculum.filter(item => {
    const weekStart = (currentWeek - 1) * 7 + 1;
    const weekEnd = currentWeek * 7;
    return item.day >= weekStart && item.day <= weekEnd;
  });
  
  const weekCompleted = weekTasks.filter(item => item.completed).length;
  const weekProgress = weekTasks.length > 0 ? (weekCompleted / weekTasks.length) * 100 : 0;
  
  return {
    totalTasks,
    completedTasks,
    progressPercentage,
    currentWeek,
    weekProgress,
  };
}

