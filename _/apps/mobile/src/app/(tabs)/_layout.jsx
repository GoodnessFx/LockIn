import { Tabs } from 'expo-router';
import { Home, BookOpen, Users, User, BarChart3 } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0b0b0f',
          borderTopWidth: 1,
          borderColor: '#111218',
          paddingTop: 4,
          paddingBottom: 4,
        },
        tabBarActiveTintColor: '#7dd3fc',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="lai"
        options={{
          title: 'LAI',
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="lockmate"
        options={{
          title: 'Lockmate',
          tabBarIcon: ({ color, size }) => (
            <Users color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}