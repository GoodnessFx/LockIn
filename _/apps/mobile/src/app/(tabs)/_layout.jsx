import { Tabs } from 'expo-router';
import { Home, BookOpen, Users, User, BarChart3 } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderColor: '#e0e0e0',
          paddingTop: 6,
          paddingBottom: 6,
          height: 65,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 4,
        },
        tabBarActiveTintColor: '#6C5CE7',
        tabBarInactiveTintColor: '#6c757d',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'LockIn',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={20.4} />
          ),
        }}
      />
      <Tabs.Screen
        name="lai"
        options={{
          title: 'LAI',
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={20.4} />
          ),
        }}
      />
      <Tabs.Screen
        name="lockmate"
        options={{
          title: 'Lockmate',
          tabBarIcon: ({ color, size }) => (
            <Users color={color} size={20.4} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={20.4} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={20.4} />
          ),
        }}
      />
    </Tabs>
  );
}