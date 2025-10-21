import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
// Replaced lucide-react-native icons with emoji/text alternatives
const Search = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🔍</Text>;

const NicheSelection = ({ selectedNiche, onNicheSelected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNiches, setFilteredNiches] = useState([]);

  const niches = [
    {
      id: "web_development",
      name: "Web Development",
      icon: "code",
      description: "Frontend & Backend Development"
    },
    {
      id: "mobile_development",
      name: "Mobile Development",
      icon: "smartphone",
      description: "iOS & Android Apps"
    },
    {
      id: "data_science",
      name: "Data Science",
      icon: "bar-chart-3",
      description: "AI, ML & Data Analysis"
    },
    {
      id: "ui_ux_design",
      name: "UI/UX Design",
      icon: "palette",
      description: "User Interface & Experience"
    },
    {
      id: "digital_marketing",
      name: "Digital Marketing",
      icon: "megaphone",
      description: "SEO, Social Media & Ads"
    },
    {
      id: "content_creation",
      name: "Content Creation",
      icon: "edit",
      description: "Writing, Video & Graphics"
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: "shield",
      description: "Network & Information Security"
    },
    {
      id: "blockchain",
      name: "Blockchain",
      icon: "bitcoin",
      description: "Crypto & Web3 Development"
    },
    {
      id: "game_development",
      name: "Game Development",
      icon: "gamepad-2",
      description: "Unity, Unreal & Indie Games"
    },
    {
      id: "photography",
      name: "Photography",
      icon: "camera",
      description: "Portrait, Landscape & Commercial"
    },
    {
      id: "music_production",
      name: "Music Production",
      icon: "music",
      description: "Audio Engineering & Composition"
    },
    {
      id: "entrepreneurship",
      name: "Entrepreneurship",
      icon: "briefcase",
      description: "Startups & Business Development"
    }
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNiches(niches);
    } else {
      const filtered = niches.filter(niche =>
        niche.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        niche.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNiches(filtered);
    }
  }, [searchQuery]);

  const renderNicheItem = ({ item }) => {
    const isSelected = selectedNiche === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.nicheCard,
          isSelected && styles.nicheCardSelected
        ]}
        onPress={() => onNicheSelected(item.id)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.nicheIcon,
          isSelected && styles.nicheIconSelected
        ]}>
          <Text style={styles.nicheEmoji}>
            {getNicheEmoji(item.id)}
          </Text>
        </View>
        <View style={styles.nicheContent}>
          <Text style={[
            styles.nicheTitle,
            isSelected && styles.nicheTitleSelected
          ]}>
            {item.name}
          </Text>
          <Text style={styles.nicheDescription}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getNicheEmoji = (nicheId) => {
    const emojiMap = {
      web_development: '💻',
      mobile_development: '📱',
      data_science: '📊',
      ui_ux_design: '🎨',
      digital_marketing: '📢',
      content_creation: '✍️',
      cybersecurity: '🔒',
      blockchain: '₿',
      game_development: '🎮',
      photography: '📸',
      music_production: '🎵',
      entrepreneurship: '💼'
    };
    return emojiMap[nicheId] || '💡';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Niche</Text>
      <Text style={styles.subtitle}>
        Select the skill area you want to master in 97 days 🚀
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search niches..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Niches Grid */}
      <FlatList
        data={filteredNiches}
        renderItem={renderNicheItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.nichesList}
      />
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
  searchContainer: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0b0b0f',
  },
  nichesList: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nicheCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  nicheCardSelected: {
    backgroundColor: '#2563eb10',
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  nicheIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  nicheIconSelected: {
    backgroundColor: '#2563eb',
  },
  nicheEmoji: {
    fontSize: 24,
  },
  nicheContent: {
    alignItems: 'center',
  },
  nicheTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b0b0f',
    textAlign: 'center',
    marginBottom: 4,
  },
  nicheTitleSelected: {
    color: '#2563eb',
  },
  nicheDescription: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default NicheSelection;
