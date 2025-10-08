import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, GraduationCap, Users, User } from "lucide-react-native";
import { theme } from "../../config/constants";
import DashboardHome from "../screens/DashboardHome";
import LockInLearn from "../screens/LockInLearn";
import CommunityFeed from "../screens/CommunityFeed";
import UserProfile from "../screens/UserProfile";

const Tab = createBottomTabNavigator();

export default function RootStack() {
return (
<Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: theme.colors.primary }}>
<Tab.Screen name="Dashboard" component={DashboardHome} options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
<Tab.Screen name="LAI" component={LockInLearn} options={{ tabBarIcon: ({ color, size }) => <GraduationCap color={color} size={size} /> }} />
<Tab.Screen name="Community" component={CommunityFeed} options={{ tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> }} />
<Tab.Screen name="Profile" component={UserProfile} options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
</Tab.Navigator>
);
}

