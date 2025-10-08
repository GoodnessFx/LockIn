import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardHome from "../screens/DashboardHome";
import LockInLearn from "../screens/LockInLearn";
import CommunityFeed from "../screens/CommunityFeed";
import UserProfile from "../screens/UserProfile";

const Tab = createBottomTabNavigator();

export default function RootStack() {
return (
<Tab.Navigator>
<Tab.Screen name="Dashboard" component={DashboardHome} />
<Tab.Screen name="LAI" component={LockInLearn} />
<Tab.Screen name="Community" component={CommunityFeed} />
<Tab.Screen name="Profile" component={UserProfile} />
</Tab.Navigator>
);
}

