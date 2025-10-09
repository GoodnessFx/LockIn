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
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" />
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
              backgroundColor: '#6C5CE720',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}
          >
            <Users size={60} color="#6C5CE7" />
          </View>

          {/* Title */}
          <Text style={{ 
            fontSize: 32, 
            fontWeight: 'bold', 
            color: '#0b0b0f', 
            textAlign: 'center',
            marginBottom: 16 
          }}>
            Lockmate
          </Text>

          {/* Subtitle */}
          <Text style={{ 
            fontSize: 18, 
            color: '#6c757d', 
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 26 
          }}>
            Connect with accountability partners and build together
          </Text>

          {/* Features Preview */}
          <View style={{ width: '100%', marginBottom: 40 }}>
            <View style={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: 16, 
              padding: 24,
              borderWidth: 1,
              borderColor: '#e0e0e0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '600', 
                color: '#0b0b0f', 
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
                    backgroundColor: '#6C5CE720',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <UserPlus size={20} color="#6C5CE7" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#0b0b0f' }}>
                      Find Accountability Partners
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6c757d' }}>
                      Connect with like-minded individuals
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#00b89420',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <MessageCircle size={20} color="#00b894" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#0b0b0f' }}>
                      Group Chat & Check-ins
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6c757d' }}>
                      Stay connected and motivated
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#fdcb6e20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <Trophy size={20} color="#fdcb6e" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#0b0b0f' }}>
                      Shared Goals & Challenges
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6c757d' }}>
                      Work together towards common objectives
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#e1705520',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <Bell size={20} color="#e17055" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#0b0b0f' }}>
                      Progress Notifications
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6c757d' }}>
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
              backgroundColor: '#6C5CE7',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 32,
              width: '100%',
              alignItems: 'center',
              marginBottom: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: '#ffffff' 
            }}>
              Notify Me When Ready
            </Text>
          </TouchableOpacity>

          {/* Timeline */}
          <View style={{ 
            backgroundColor: '#f8f9fa', 
            borderRadius: 12, 
            padding: 20,
            width: '100%',
            borderWidth: 1,
            borderColor: '#e0e0e0',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Clock size={20} color="#6C5CE7" />
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#0b0b0f', 
                marginLeft: 8 
              }}>
                Expected Launch
              </Text>
            </View>
            <Text style={{ 
              fontSize: 14, 
              color: '#6c757d',
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
