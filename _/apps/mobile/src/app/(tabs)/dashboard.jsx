import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Target,
  Clock,
  TrendingUp,
  Plus,
  Calendar,
  CheckCircle,
  Zap,
  Activity,
  Award,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react-native";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, signIn } = useAuth();
  const { data: user, loading } = useUser();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [targetDate] = useState(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)); // 90 days from now

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

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0b0b0f", paddingHorizontal: 32 }}>
        <StatusBar style="light" />
        <Target size={80} color="#7dd3fc" />
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#ffffff", marginTop: 24, textAlign: "center" }}>
          Welcome to LockIn
        </Text>
        <Text style={{ fontSize: 16, color: "#94a3b8", marginTop: 12, textAlign: "center", lineHeight: 24 }}>
          Dial in. Build relentlessly. Win together.
        </Text>
        <TouchableOpacity
          onPress={signIn}
          style={{ backgroundColor: "#7dd3fc", paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12, marginTop: 32, width: "100%" }}
        >
          <Text style={{ color: "#0b0b0f", fontSize: 16, fontWeight: "600", textAlign: "center" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0b0b0f" }}>
      <StatusBar style="light" />
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
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#ffffff" }}>
            Dashboard
          </Text>
          <Text style={{ fontSize: 16, color: "#94a3b8", marginTop: 4 }}>
            Welcome back, {user?.name || user?.email || "there"}!
          </Text>
        </View>

        {/* 90-Day Sprint Countdown */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#ffffff", marginBottom: 16 }}>
            90-Day Sprint
          </Text>
          <View style={{
            backgroundColor: "#1a1a2e",
            borderRadius: 16,
            padding: 24,
            borderWidth: 1,
            borderColor: "#2d3748",
          }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 16 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 32, fontWeight: "bold", color: "#7dd3fc" }}>
                  {timeLeft.days}
                </Text>
                <Text style={{ fontSize: 14, color: "#94a3b8" }}>Days</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 32, fontWeight: "bold", color: "#7dd3fc" }}>
                  {timeLeft.hours}
                </Text>
                <Text style={{ fontSize: 14, color: "#94a3b8" }}>Hours</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 32, fontWeight: "bold", color: "#7dd3fc" }}>
                  {timeLeft.minutes}
                </Text>
                <Text style={{ fontSize: 14, color: "#94a3b8" }}>Minutes</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 32, fontWeight: "bold", color: "#7dd3fc" }}>
                  {timeLeft.seconds}
                </Text>
                <Text style={{ fontSize: 14, color: "#94a3b8" }}>Seconds</Text>
              </View>
            </View>
            <Text style={{ fontSize: 16, color: "#94a3b8", textAlign: "center" }}>
              until your next milestone
            </Text>
          </View>
        </View>

        {/* Focus Timer */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#ffffff", marginBottom: 16 }}>
            Focus Timer
          </Text>
          <View style={{
            backgroundColor: "#1a1a2e",
            borderRadius: 16,
            padding: 24,
            borderWidth: 1,
            borderColor: "#2d3748",
          }}>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 48, fontWeight: "bold", color: "#7dd3fc", marginBottom: 8 }}>
                {formatTime(focusTime)}
              </Text>
              <Text style={{ fontSize: 16, color: "#94a3b8", textTransform: "capitalize" }}>
                {focusMode} Session
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", gap: 16 }}>
              <TouchableOpacity
                onPress={toggleFocusTimer}
                style={{
                  backgroundColor: isFocusRunning ? "#ef4444" : "#7dd3fc",
                  borderRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {isFocusRunning ? <Pause size={20} color="#ffffff" /> : <Play size={20} color="#ffffff" />}
                <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginLeft: 8 }}>
                  {isFocusRunning ? "Pause" : "Start"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={resetFocusTimer}
                style={{
                  backgroundColor: "#2d3748",
                  borderRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RotateCcw size={20} color="#ffffff" />
                <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginLeft: 8 }}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Progress Stats */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#ffffff", marginBottom: 16 }}>
            Today's Progress
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{
              flex: 1,
              backgroundColor: "#1a1a2e",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#2d3748",
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <Zap size={20} color="#7dd3fc" />
                <Text style={{ fontSize: 14, color: "#94a3b8", marginLeft: 8 }}>Streak</Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff" }}>
                {progressData.streak}
              </Text>
              <Text style={{ fontSize: 12, color: "#94a3b8" }}>days</Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: "#1a1a2e",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#2d3748",
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <CheckCircle size={20} color="#10b981" />
                <Text style={{ fontSize: 14, color: "#94a3b8", marginLeft: 8 }}>Goals</Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff" }}>
                {progressData.goalsCompleted}
              </Text>
              <Text style={{ fontSize: 12, color: "#94a3b8" }}>completed</Text>
            </View>
          </View>
        </View>

        {/* Weekly Goal Progress */}
        <View style={{ marginBottom: 32 }}>
          <View style={{
            backgroundColor: "#1a1a2e",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: "#2d3748",
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <Target size={20} color="#7dd3fc" />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#ffffff", marginLeft: 8 }}>
                Weekly Focus Goal
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ fontSize: 14, color: "#94a3b8" }}>
                {progressData.weeklyProgress} / {progressData.weeklyGoal} hours
              </Text>
              <Text style={{ fontSize: 14, color: "#7dd3fc", fontWeight: "600" }}>
                {Math.round((progressData.weeklyProgress / progressData.weeklyGoal) * 100)}%
              </Text>
            </View>
            <View style={{
              height: 8,
              backgroundColor: "#2d3748",
              borderRadius: 4,
              overflow: "hidden",
            }}>
              <View style={{
                height: "100%",
                width: `${(progressData.weeklyProgress / progressData.weeklyGoal) * 100}%`,
                backgroundColor: "#7dd3fc",
                borderRadius: 4,
              }} />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#ffffff", marginBottom: 16 }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: "#1a1a2e",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#2d3748",
            }}>
              <Plus size={24} color="#7dd3fc" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#ffffff", marginTop: 8 }}>
                Add Goal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: "#1a1a2e",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#2d3748",
            }}>
              <Calendar size={24} color="#7dd3fc" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#ffffff", marginTop: 8 }}>
                Schedule
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: "#1a1a2e",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#2d3748",
            }}>
              <TrendingUp size={24} color="#7dd3fc" />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#ffffff", marginTop: 8 }}>
                Analytics
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
