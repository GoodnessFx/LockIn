import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';

const NicheSelection = ({ selectedNiche, onNicheSelected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNiches, setFilteredNiches] = useState([]);

  const niches = [
    {
      id: "web_development",
      name: "Web Development",
      description: "Frontend & Backend Development"
    },
    {
      id: "mobile_development",
      name: "Mobile Development",
      description: "iOS & Android Apps"
    },
    {
      id: "data_science",
      name: "Data Science",
      description: "AI, ML & Data Analysis"
    },
    {
      id: "ui_ux_design",
      name: "UI/UX Design",
      description: "User Interface & Experience"
    },
    {
      id: "digital_marketing",
      name: "Digital Marketing",
      description: "SEO, Social Media & Ads"
    },
    {
      id: "content_creation",
      name: "Content Creation",
      description: "Writing, Video & Graphics"
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      description: "Network & Information Security"
    },
    {
      id: "blockchain",
      name: "Blockchain",
      description: "Crypto & Web3 Development"
    },
    {
      id: "cloud_computing",
      name: "Cloud Computing",
      description: "AWS, Azure & Google Cloud"
    },
    {
      id: "devops",
      name: "DevOps",
      description: "CI/CD & Infrastructure"
    },
    {
      id: "product_management",
      name: "Product Management",
      description: "Strategy & Roadmapping"
    },
    {
      id: "technical_writing",
      name: "Technical Writing",
      description: "Documentation & Guides"
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      description: "Online Stores & Marketplaces"
    },
    {
      id: "saas_development",
      name: "SaaS Development",
      description: "Software as a Service"
    },
    {
      id: "ar_vr",
      name: "AR/VR Development",
      description: "Augmented & Virtual Reality"
    },
    {
      id: "iot",
      name: "IoT Development",
      description: "Internet of Things"
    },
    {
      id: "fintech",
      name: "FinTech",
      description: "Financial Technology"
    },
    {
      id: "healthtech",
      name: "HealthTech",
      description: "Healthcare Technology"
    },
    {
      id: "edtech",
      name: "EdTech",
      description: "Educational Technology"
    },
    {
      id: "qa_testing",
      name: "QA & Testing",
      description: "Quality Assurance"
    },
    {
      id: "data_engineering",
      name: "Data Engineering",
      description: "ETL & Data Pipelines"
    },
    {
      id: "business_intelligence",
      name: "Business Intelligence",
      description: "Data Visualization & Reporting"
    },
    {
      id: "project_management",
      name: "Project Management",
      description: "Agile & Scrum"
    },
    {
      id: "api_development",
      name: "API Development",
      description: "RESTful & GraphQL APIs"
    },
    {
      id: "microservices",
      name: "Microservices",
      description: "Service-Oriented Architecture"
    },
    {
      id: "embedded_systems",
      name: "Embedded Systems",
      description: "Hardware & Firmware"
    },
    {
      id: "game_development",
      name: "Game Development",
      description: "Unity, Unreal & Indie Games"
    },
    {
      id: "photography",
      name: "Photography",
      description: "Portrait, Landscape & Commercial"
    },
    {
      id: "music_production",
      name: "Music Production",
      description: "Audio Engineering & Composition"
    },
    {
      id: "entrepreneurship",
      name: "Entrepreneurship",
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


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      <Text style={styles.title}>Choose Your Niche</Text>
      <Text style={styles.subtitle}>
        Select the skill area you want to master in 97 days
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
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
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b0b0f',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 24,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
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
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  nicheCardSelected: {
    backgroundColor: '#2563eb10',
    borderColor: '#2563eb',
    borderWidth: 2,
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
    letterSpacing: 0.3,
  },
  nicheTitleSelected: {
    color: '#2563eb',
    fontWeight: '700',
  },
  nicheDescription: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default NicheSelection;
