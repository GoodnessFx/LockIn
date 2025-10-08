import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  Clock,
  CheckCircle,
  Activity,
  Zap,
  Trophy
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, month, year

  // Mock data for progress tracking
  const progressData = {
    week: {
      streak: 7,
      goalsCompleted: 12,
      hoursFocused: 28,
      productivity: 85,
      achievements: [
        { id: 1, title: '7-Day Streak', description: 'Consistent daily progress', icon: '🔥' },
        { id: 2, title: 'Focus Master', description: '28 hours of deep work', icon: '🎯' },
        { id: 3, title: 'Goal Crusher', description: '12 goals completed', icon: '✅' },
      ]
    },
    month: {
      streak: 23,
      goalsCompleted: 45,
      hoursFocused: 120,
      productivity: 78,
      achievements: [
        { id: 1, title: 'Month Warrior', description: '23-day streak', icon: '⚡' },
        { id: 2, title: 'Productivity Pro', description: '120 hours focused', icon: '🚀' },
        { id: 3, title: 'Achievement Hunter', description: '45 goals completed', icon: '🏆' },
      ]
    },
    year: {
      streak: 156,
      goalsCompleted: 234,
      hoursFocused: 890,
      productivity: 82,
      achievements: [
        { id: 1, title: 'Year Champion', description: '156-day streak', icon: '👑' },
        { id: 2, title: 'Focus Legend', description: '890 hours focused', icon: '💎' },
        { id: 3, title: 'Goal Master', description: '234 goals completed', icon: '🎖️' },
      ]
    }
  };

  const currentData = progressData[selectedPeriod];

  const StatCard = ({ icon, title, value, subtitle, color = '#7dd3fc' }) => (
    <View style={{
      backgroundColor: '#1a1a2e',
      borderRadius: 16,
      padding: 20,
      flex: 1,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: '#2d3748',
    }}>
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${color}20`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
      }}>
        {icon}
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 }}>
        {value}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#ffffff', marginBottom: 2 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 12, color: '#94a3b8' }}>
        {subtitle}
      </Text>
    </View>
  );

  const AchievementCard = ({ achievement }) => (
    <View style={{
      backgroundColor: '#1a1a2e',
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#2d3748',
    }}>
      <Text style={{ fontSize: 32, marginRight: 16 }}>
        {achievement.icon}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 4 }}>
          {achievement.title}
        </Text>
        <Text style={{ fontSize: 14, color: '#94a3b8' }}>
          {achievement.description}
        </Text>
      </View>
      <Award size={20} color="#f59e0b" />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0b0f' }}>
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
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#ffffff' }}>
            Progress
          </Text>
          <Text style={{ fontSize: 16, color: '#94a3b8', marginTop: 4 }}>
            Track your growth and achievements
          </Text>
        </View>

        {/* Period Selector */}
        <View style={{
          backgroundColor: '#1a1a2e',
          borderRadius: 12,
          padding: 4,
          flexDirection: 'row',
          marginBottom: 24,
          borderWidth: 1,
          borderColor: '#2d3748',
        }}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={{
                flex: 1,
                backgroundColor: selectedPeriod === period ? '#7dd3fc' : 'transparent',
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: selectedPeriod === period ? '#0b0b0f' : '#94a3b8',
                textTransform: 'capitalize',
              }}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          <StatCard
            icon={<Zap size={20} color="#7dd3fc" />}
            title="Streak"
            value={currentData.streak}
            subtitle="days"
            color="#7dd3fc"
          />
          <StatCard
            icon={<CheckCircle size={20} color="#10b981" />}
            title="Goals"
            value={currentData.goalsCompleted}
            subtitle="completed"
            color="#10b981"
          />
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          <StatCard
            icon={<Clock size={20} color="#f59e0b" />}
            title="Focus Time"
            value={currentData.hoursFocused}
            subtitle="hours"
            color="#f59e0b"
          />
          <StatCard
            icon={<Activity size={20} color="#ef4444" />}
            title="Productivity"
            value={`${currentData.productivity}%`}
            subtitle="average"
            color="#ef4444"
          />
        </View>

        {/* Productivity Chart Placeholder */}
        <View style={{
          backgroundColor: '#1a1a2e',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: '#2d3748',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <BarChart3 size={20} color="#7dd3fc" />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#ffffff', marginLeft: 8 }}>
              Productivity Trend
            </Text>
          </View>
          <View style={{
            height: 120,
            backgroundColor: '#2d3748',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ color: '#94a3b8' }}>Chart visualization coming soon</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Trophy size={20} color="#f59e0b" />
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#ffffff', marginLeft: 8 }}>
              Recent Achievements
            </Text>
          </View>
          {currentData.achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>

        {/* Goals Progress */}
        <View style={{
          backgroundColor: '#1a1a2e',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: '#2d3748',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Target size={20} color="#7dd3fc" />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#ffffff', marginLeft: 8 }}>
              Current Goals
            </Text>
          </View>
          
          <View style={{ gap: 12 }}>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 14, color: '#ffffff' }}>Learn React Native</Text>
                <Text style={{ fontSize: 14, color: '#7dd3fc', fontWeight: '600' }}>75%</Text>
              </View>
              <View style={{
                height: 6,
                backgroundColor: '#2d3748',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: '75%',
                  backgroundColor: '#7dd3fc',
                  borderRadius: 3,
                }} />
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 14, color: '#ffffff' }}>Build Portfolio</Text>
                <Text style={{ fontSize: 14, color: '#10b981', fontWeight: '600' }}>45%</Text>
              </View>
              <View style={{
                height: 6,
                backgroundColor: '#2d3748',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: '45%',
                  backgroundColor: '#10b981',
                  borderRadius: 3,
                }} />
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 14, color: '#ffffff' }}>Daily Exercise</Text>
                <Text style={{ fontSize: 14, color: '#f59e0b', fontWeight: '600' }}>90%</Text>
              </View>
              <View style={{
                height: 6,
                backgroundColor: '#2d3748',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{
                  height: '100%',
                  width: '90%',
                  backgroundColor: '#f59e0b',
                  borderRadius: 3,
                }} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
