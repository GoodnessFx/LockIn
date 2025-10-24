import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Replaced lucide-react-native icons with emoji/text alternatives
const Home = () => <Text style={{ fontSize: 20 }}><Ionicons name="lock-closed" size={36} color="black" /></Text>;
const BookOpen = () => <Text style={{ fontSize: 20 }}><Ionicons name="chatbubbles" size={24} color="black" /></Text>;
const Users = () => <Text style={{ fontSize: 20 }}><Ionicons name="people" size={36} color="black" /></Text>;
const User = () => <Text style={{ fontSize: 20 }}><Ionicons name="person-circle" size={36} color="black" /></Text>;
const BarChart3 = () => <Text style={{ fontSize: 20 }}><Ionicons name="speedometer" size={34} color="black" /></Text>;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
          shadowColor: '#060606FF',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: '#000000FF',
        tabBarInactiveTintColor: '#6c757d',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
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