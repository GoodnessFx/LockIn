import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Replaced lucide-react-native icons with emoji/text alternatives
const Target = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🎯</Text>;
const Clock = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🕐</Text>;
const TrendingUp = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📈</Text>;
const Plus = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>➕</Text>;
const Calendar = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📅</Text>;
const CheckCircle = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>✅</Text>;
const Zap = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>⚡</Text>;
const Activity = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📊</Text>;
const Award = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🏆</Text>;
const Play = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>▶️</Text>;
const Pause = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>⏸️</Text>;
const RotateCcw = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🔄</Text>;
const Users = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>👥</Text>;
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";
import { useAppStore } from "@/store/appStore";
import BatteryProgressIndicator from "@/components/BatteryProgressIndicator";
import CountdownTimer from "@/components/CountdownTimer";
import LiveClock from "@/components/LiveClock";
import ProgressTracker from "@/components/ProgressTracker";
import ProgressService from "@/services/progress";
import StorageService from "@/services/storage";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, signIn } = useAuth();
  const { data: user, loading } = useUser();
  const { progress, updateProgress } = useAppStore();
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'progress'
  const [userProfile, setUserProfile] = useState(null);

  // Load user profile
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await StorageService.getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };
    loadUserProfile();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#ffffff" 
      }}>
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#2563eb',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          shadowColor: '#2563eb',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}>
          <Activity size={30} color="#ffffff" />
        </View>
        <Text style={{ 
          color: "#0b0b0f", 
          fontSize: 18, 
          fontWeight: '600',
          marginTop: 8 
        }}>
          Loading your dashboard...
        </Text>
      </View>
    );
  }

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [targetDate] = useState(new Date(Date.now() + 97 * 24 * 60 * 60 * 1000)); // 97 days from now

  // Focus timer state
  const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutes in seconds
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [focusMode, setFocusMode] = useState('work'); // work, break, longBreak

  // Progress data
  const [progressData] = useState({
    streak: 7,
    goalsCompleted: 12,
    hoursFocused: 28,
    productivity: 85,
    weeklyGoal: 40,
    weeklyProgress: 28,
  });

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Focus timer effect
  useEffect(() => {
    let interval = null;
    if (isFocusRunning && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime(time => time - 1);
      }, 1000);
    } else if (focusTime === 0) {
      setIsFocusRunning(false);
      // Timer completed - could add notification here
    }
    return () => clearInterval(interval);
  }, [isFocusRunning, focusTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFocusTimer = () => {
    setIsFocusRunning(!isFocusRunning);
  };

  const resetFocusTimer = () => {
    setIsFocusRunning(false);
    setFocusTime(25 * 60);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0b0b0f" }}>
        <Text style={{ color: "#ffffff" }}>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 36, 
                fontWeight: "800", 
                color: "#0b0b0f",
                letterSpacing: 1.0,
              }}>
                LockIn
              </Text>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#2563eb',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 12,
                shadowColor: '#2563eb',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}>
                <Text style={{ fontSize: 20 }}>🔒</Text>
              </View>
            </View>
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: '#f8f9fa', 
              borderRadius: 16, 
              padding: 6,
              borderWidth: 1,
              borderColor: '#e0e0e0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: currentView === 'dashboard' ? '#2563eb' : 'transparent',
                  shadowColor: currentView === 'dashboard' ? '#2563eb' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: currentView === 'dashboard' ? 4 : 0,
                }}
                onPress={() => setCurrentView('dashboard')}
              >
                <Text style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: currentView === 'dashboard' ? '#ffffff' : '#6c757d'
                }}>
                  Dashboard
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: currentView === 'progress' ? '#2563eb' : 'transparent',
                  shadowColor: currentView === 'progress' ? '#2563eb' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: currentView === 'progress' ? 4 : 0,
                }}
                onPress={() => setCurrentView('progress')}
              >
                <Text style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: currentView === 'progress' ? '#ffffff' : '#6c757d'
                }}>
                  Progress
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ 
            fontSize: 18, 
            color: "#6c757d", 
            fontWeight: '500',
            lineHeight: 24,
          }}>
            Welcome back, {userProfile?.firstName || user?.name || user?.email || "there"}! 👋
          </Text>
        </View>

        {/* Conditional Content */}
        {currentView === 'dashboard' ? (
          <>
            {/* Live Clock */}
            <View style={{ marginBottom: 24, alignItems: 'center' }}>
              <LiveClock size="medium" color="#2563eb" />
            </View>

        {/* 97-Day Commitment Countdown */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: "700", 
            color: "#0b0b0f", 
            marginBottom: 20, 
            textAlign: 'center',
            letterSpacing: 0.5,
          }}>
            97-Day Commitment Sprint
          </Text>
          <View style={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            padding: 28,
            borderWidth: 2,
            borderColor: "#2563eb",
            shadowColor: '#2563eb',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 12,
            alignItems: 'center',
          }}>
            <CountdownTimer 
              targetDate={targetDate} 
              size="medium"
              onComplete={() => {
                // Handle completion
                console.log('97-day sprint completed!');
              }}
            />
            <Text style={{ fontSize: 16, color: "#6c757d", textAlign: "center", marginTop: 16 }}>
              until your transformation is complete
            </Text>
          </View>
        </View>

        {/* Battery Progress Indicator */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#0b0b0f", marginBottom: 16, textAlign: 'center' }}>
            Commitment Battery
          </Text>
          <View style={{
            backgroundColor: "#f8f9fa",
            borderRadius: 16,
            padding: 24,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            alignItems: 'center',
          }}>
            <BatteryProgressIndicator size={140} showPercentage={true} showText={true} />
            <Text style={{ fontSize: 14, color: "#6c757d", textAlign: "center", marginTop: 12 }}>
              Your commitment energy level
            </Text>
          </View>
        </View>

        {/* Focus Timer */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#0b0b0f", marginBottom: 16 }}>
            Focus Timer
          </Text>
          <View style={{
            backgroundColor: "#f8fafc",
            borderRadius: 16,
            padding: 24,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }}>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 48, fontWeight: "bold", color: "#2563eb", marginBottom: 8 }}>
                {formatTime(focusTime)}
              </Text>
              <Text style={{ fontSize: 16, color: "#6c757d", textTransform: "capitalize" }}>
                {focusMode} Session
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", gap: 16 }}>
              <TouchableOpacity
                onPress={toggleFocusTimer}
                activeOpacity={0.7}
                style={{
                  backgroundColor: isFocusRunning ? "#ef4444" : "#2563eb",
                  borderRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                {isFocusRunning ? <Pause size={20} color="#ffffff" /> : <Play size={20} color="#ffffff" />}
                <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginLeft: 8 }}>
                  {isFocusRunning ? "Pause" : "Start"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={resetFocusTimer}
                activeOpacity={0.7}
                style={{
                  backgroundColor: "#e0e0e0",
                  borderRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <RotateCcw size={20} color="#0b0b0f" />
                <Text style={{ color: "#0b0b0f", fontSize: 16, fontWeight: "600", marginLeft: 8 }}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Progress Stats */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#0b0b0f", marginBottom: 16 }}>
            Today's Progress
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{
              flex: 1,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <Zap size={20} color="#0b0b0f" />
                <Text style={{ fontSize: 14, color: "#6b7280", marginLeft: 8 }}>Streak</Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#0b0b0f" }}>
                {progressData.streak}
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280" }}>days</Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <CheckCircle size={20} color="#10b981" />
                <Text style={{ fontSize: 14, color: "#6b7280", marginLeft: 8 }}>Goals</Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#0b0b0f" }}>
                {progressData.goalsCompleted}
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280" }}>completed</Text>
            </View>
          </View>
        </View>

        {/* Weekly Goal Progress */}
        <View style={{ marginBottom: 32 }}>
          <View style={{
            backgroundColor: "#f8fafc",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <Target size={20} color="#0b0b0f" />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#0b0b0f", marginLeft: 8 }}>
                Weekly Focus Goal
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ fontSize: 14, color: "#6b7280" }}>
                {progressData.weeklyProgress} / {progressData.weeklyGoal} hours
              </Text>
              <Text style={{ fontSize: 14, color: "#0b0b0f", fontWeight: "600" }}>
                {Math.round((progressData.weeklyProgress / progressData.weeklyGoal) * 100)}%
              </Text>
            </View>
            <View style={{
              height: 8,
              backgroundColor: "#e5e7eb",
              borderRadius: 4,
              overflow: "hidden",
            }}>
              <View style={{
                height: "100%",
                width: `${(progressData.weeklyProgress / progressData.weeklyGoal) * 100}%`,
                backgroundColor: "#0b0b0f",
                borderRadius: 4,
              }} />
            </View>
          </View>
        </View>

        {/* Growth Features Section */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#0b0b0f", marginBottom: 16 }}>
            Accelerate Your Growth
          </Text>
          
          {/* Niche Mastery Card */}
          <View style={{
            backgroundColor: "#f8f9fa",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Award size={24} color="#2563eb" />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#0b0b0f", marginLeft: 8 }}>
                Niche Mastery Path
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: "#6c757d", marginBottom: 16, lineHeight: 20 }}>
              Complete specialized learning tracks to become an expert in your field
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "#2563eb",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}>
                <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "600" }}>
                  Start Track
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "#e0e0e0",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}>
                <Text style={{ color: "#0b0b0f", fontSize: 14, fontWeight: "600" }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Daily Challenge Card */}
          <View style={{
            backgroundColor: "#f8f9fa",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Zap size={24} color="#fdcb6e" />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#0b0b0f", marginLeft: 8 }}>
                Daily Challenge
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#0b0b0f", marginBottom: 8 }}>
              Build a micro-project in 30 minutes
            </Text>
            <Text style={{ fontSize: 14, color: "#6c757d", marginBottom: 16, lineHeight: 20 }}>
              Complete today's challenge to earn bonus XP and unlock achievements
            </Text>
            <TouchableOpacity style={{
              backgroundColor: "#fdcb6e",
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: "center",
            }}>
              <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "600" }}>
                Accept Challenge
              </Text>
            </TouchableOpacity>
          </View>

          {/* Community Features */}
          <View style={{
            backgroundColor: "#f8f9fa",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Users size={24} color="#00b894" />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#0b0b0f", marginLeft: 8 }}>
                Community Growth
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: "#6c757d", marginBottom: 16, lineHeight: 20 }}>
              Connect with like-minded builders and accelerate your learning together
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "#00b894",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}>
                <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "600" }}>
                  Join Group
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "#e0e0e0",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}>
                <Text style={{ color: "#0b0b0f", fontSize: 14, fontWeight: "600" }}>
                  Find Mentor
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#0b0b0f", marginBottom: 16 }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}>
              <Plus size={24} color="#0b0b0f" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#0b0b0f", marginTop: 8 }}>
                Add Goal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}>
              <Calendar size={24} color="#0b0b0f" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#0b0b0f", marginTop: 8 }}>
                Schedule
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}>
              <TrendingUp size={24} color="#0b0b0f" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#0b0b0f", marginTop: 8 }}>
                Analytics
              </Text>
            </TouchableOpacity>
          </View>
        </View>
          </>
        ) : (
          <ProgressTracker />
        )}
      </ScrollView>
    </View>
  );
}
