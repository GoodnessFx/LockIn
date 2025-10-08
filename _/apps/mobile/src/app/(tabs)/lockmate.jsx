import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Users, 
  Clock, 
  Bell, 
  MessageCircle,
  UserPlus,
  Calendar,
  Trophy,
  Heart
} from 'lucide-react-native';

export default function LockmateScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0b0f' }}>
      <StatusBar style="light" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Coming Soon Content */}
        <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
          {/* Icon */}
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#7dd3fc20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}
          >
            <Users size={60} color="#7dd3fc" />
          </View>

          {/* Title */}
          <Text style={{ 
            fontSize: 32, 
            fontWeight: 'bold', 
            color: '#ffffff', 
            textAlign: 'center',
            marginBottom: 16 
          }}>
            Lockmate
          </Text>

          {/* Subtitle */}
          <Text style={{ 
            fontSize: 18, 
            color: '#94a3b8', 
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 26 
          }}>
            Connect with accountability partners and build together
          </Text>

          {/* Features Preview */}
          <View style={{ width: '100%', marginBottom: 40 }}>
            <View style={{ 
              backgroundColor: '#1a1a2e', 
              borderRadius: 16, 
              padding: 24,
              borderWidth: 1,
              borderColor: '#2d3748',
            }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '600', 
                color: '#ffffff', 
                marginBottom: 20,
                textAlign: 'center'
              }}>
                Coming Soon Features
              </Text>
              
              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#7dd3fc20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <UserPlus size={20} color="#7dd3fc" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff' }}>
                      Find Accountability Partners
                    </Text>
                    <Text style={{ fontSize: 14, color: '#94a3b8' }}>
                      Connect with like-minded individuals
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#10b98120',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <MessageCircle size={20} color="#10b981" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff' }}>
                      Group Chat & Check-ins
                    </Text>
                    <Text style={{ fontSize: 14, color: '#94a3b8' }}>
                      Stay connected and motivated
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#f59e0b20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <Trophy size={20} color="#f59e0b" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff' }}>
                      Shared Goals & Challenges
                    </Text>
                    <Text style={{ fontSize: 14, color: '#94a3b8' }}>
                      Work together towards common objectives
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#ef444420',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <Bell size={20} color="#ef4444" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff' }}>
                      Progress Notifications
                    </Text>
                    <Text style={{ fontSize: 14, color: '#94a3b8' }}>
                      Get notified about your partner's progress
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Notify Me Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#7dd3fc',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 32,
              width: '100%',
              alignItems: 'center',
              marginBottom: 20,
            }}
            activeOpacity={0.8}
          >
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: '#0b0b0f' 
            }}>
              Notify Me When Ready
            </Text>
          </TouchableOpacity>

          {/* Timeline */}
          <View style={{ 
            backgroundColor: '#1a1a2e', 
            borderRadius: 12, 
            padding: 20,
            width: '100%',
            borderWidth: 1,
            borderColor: '#2d3748',
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Clock size={20} color="#7dd3fc" />
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#ffffff', 
                marginLeft: 8 
              }}>
                Expected Launch
              </Text>
            </View>
            <Text style={{ 
              fontSize: 14, 
              color: '#94a3b8',
              textAlign: 'center'
            }}>
              Q2 2024 - We're working hard to bring you the best accountability experience
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
