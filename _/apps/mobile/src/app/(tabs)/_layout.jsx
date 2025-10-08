import { Tabs } from 'expo-router';
import { Home, PiggyBank, CreditCard, Settings, BarChart3 } from 'lucide-react-native';

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
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="savings"
        options={{
          title: 'LAI',
          tabBarIcon: ({ color, size }) => (
            <PiggyBank color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Lockmate',
          tabBarIcon: ({ color, size }) => (
            <CreditCard color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}