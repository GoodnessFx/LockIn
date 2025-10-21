import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
// Replaced lucide-react-native icons with emoji/text alternatives
const Linkedin = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>💼</Text>;
const Github = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🐙</Text>;
const Twitter = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🐦</Text>;
const Instagram = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📷</Text>;
const Youtube = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📺</Text>;
const Palette = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🎨</Text>;

const SocialLinks = ({ socialLinks, onSocialLinksUpdated }) => {
  const [links, setLinks] = useState(socialLinks || {});

  useEffect(() => {
    onSocialLinksUpdated(links);
  }, [links, onSocialLinksUpdated]);

  const socialPlatforms = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      color: "#0077B5",
      placeholder: "linkedin.com/in/username",
      description: "Professional networking"
    },
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      color: "#333333",
      placeholder: "github.com/username",
      description: "Code repositories"
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: Twitter,
      color: "#1DA1F2",
      placeholder: "twitter.com/username",
      description: "Social updates"
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "#E4405F",
      placeholder: "instagram.com/username",
      description: "Visual content"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "#FF0000",
      placeholder: "youtube.com/channel/username",
      description: "Video content"
    },
    {
      id: "behance",
      name: "Behance",
      icon: Palette,
      color: "#1769FF",
      placeholder: "behance.net/username",
      description: "Creative portfolio"
    }
  ];

  const updateLink = (platformId, value) => {
    setLinks(prev => ({
      ...prev,
      [platformId]: value
    }));
  };

  const handleOAuthConnection = async (platform) => {
    // Simulate OAuth connection
    Alert.alert(
      `${platform.name} Connection`,
      `Would you like to connect your ${platform.name} account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Connect', 
          onPress: () => {
            // In a real app, this would open OAuth flow
            const mockUrl = `https://${platform.id}.com/username`;
            updateLink(platform.id, mockUrl);
          }
        }
      ]
    );
  };

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => 
        console.error('Failed to open URL:', err)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Social Accounts</Text>
      <Text style={styles.subtitle}>
        Link your social profiles to showcase your work and connect with the community
      </Text>

      {socialPlatforms.map((platform) => {
        const IconComponent = platform.icon;
        const hasConnection = links[platform.id];
        
        return (
          <View key={platform.id} style={styles.platformCard}>
            <View style={styles.platformHeader}>
              <View style={styles.platformIcon}>
                <IconComponent size={24} color={platform.color} />
              </View>
              <View style={styles.platformInfo}>
                <Text style={styles.platformName}>{platform.name}</Text>
                <Text style={styles.platformDescription}>{platform.description}</Text>
              </View>
              <View style={styles.platformActions}>
                {hasConnection ? (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => openLink(links[platform.id])}
                  >
                    <Text style={styles.actionButtonText}>Open</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.connectButton]}
                    onPress={() => handleOAuthConnection(platform)}
                  >
                    <Text style={[styles.actionButtonText, styles.connectButtonText]}>
                      Connect
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.linkInput}
                placeholder={platform.placeholder}
                placeholderTextColor="#9ca3af"
                value={links[platform.id] || ''}
                onChangeText={(value) => updateLink(platform.id, value)}
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        );
      })}

      {/* Optional Notice */}
      <View style={styles.noticeContainer}>
        <Text style={styles.noticeText}>
          💡 Social links are optional but help you connect with like-minded individuals 
          and showcase your work to potential collaborators.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b0b0f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 32,
    lineHeight: 24,
  },
  platformCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  platformHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 2,
  },
  platformDescription: {
    fontSize: 14,
    color: '#6c757d',
  },
  platformActions: {
    marginLeft: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
  },
  connectButton: {
    backgroundColor: '#2563eb',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  connectButtonText: {
    color: '#ffffff',
  },
  inputContainer: {
    marginTop: 8,
  },
  linkInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#0b0b0f',
  },
  noticeContainer: {
    marginTop: 'auto',
    padding: 16,
    backgroundColor: '#2563eb10',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  noticeText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
});

export default SocialLinks;
