import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// Replaced lucide-react-native icons with emoji/text alternatives
const Calendar = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>📅</Text>;
const Shield = ({ size, color }: { size?: number; color?: string }) => <Text style={{ fontSize: size || 20 }}>🛡️</Text>;

const AgeVerification = ({ selectedDate, parentalControlsEnabled, onAgeVerified }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(selectedDate || new Date());

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTempDate(selectedDate);
      onAgeVerified(selectedDate, parentalControlsEnabled);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const toggleParentalControls = () => {
    onAgeVerified(selectedDate, !parentalControlsEnabled);
  };

  const formatDate = (date) => {
    if (!date) return 'Select your date of birth';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (date) => {
    if (!date) return null;
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      return age - 1;
    }
    return age;
  };

  const age = calculateAge(selectedDate);
  const isMinor = age !== null && age < 18;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Age Verification</Text>
      <Text style={styles.subtitle}>
        Please provide your date of birth to ensure age-appropriate content
      </Text>

      {/* Date of Birth Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date of Birth</Text>
        <TouchableOpacity
          style={[
            styles.dateButton,
            selectedDate && styles.dateButtonSelected
          ]}
          onPress={showDatePickerModal}
          activeOpacity={0.7}
        >
          <View style={styles.dateButtonContent}>
            <Calendar size={20} color={selectedDate ? '#2563eb' : '#9ca3af'} />
            <Text style={[
              styles.dateButtonText,
              selectedDate && styles.dateButtonTextSelected
            ]}>
              {formatDate(selectedDate)}
            </Text>
          </View>
        </TouchableOpacity>

        {selectedDate && (
          <View style={styles.ageInfo}>
            <Text style={styles.ageText}>
              You are {age} years old
            </Text>
            {isMinor && (
              <Text style={styles.minorText}>
                Parental controls are recommended for users under 18
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Parental Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parental Controls</Text>
        <Text style={styles.sectionDescription}>
          Enable additional safety features and content filtering
        </Text>
        
        <TouchableOpacity
          style={[
            styles.parentalControlsCard,
            parentalControlsEnabled && styles.parentalControlsCardEnabled
          ]}
          onPress={toggleParentalControls}
          activeOpacity={0.7}
        >
          <View style={styles.parentalControlsContent}>
            <View style={[
              styles.parentalControlsIcon,
              parentalControlsEnabled && styles.parentalControlsIconEnabled
            ]}>
              <Shield 
                size={24} 
                color={parentalControlsEnabled ? '#ffffff' : '#9ca3af'} 
              />
            </View>
            <View style={styles.parentalControlsText}>
              <Text style={[
                styles.parentalControlsTitle,
                parentalControlsEnabled && styles.parentalControlsTitleEnabled
              ]}>
                Enable Parental Controls
              </Text>
              <Text style={styles.parentalControlsDescription}>
                Add extra protection and content filtering
              </Text>
            </View>
            <View style={[
              styles.toggle,
              parentalControlsEnabled && styles.toggleEnabled
            ]}>
              <View style={[
                styles.toggleThumb,
                parentalControlsEnabled && styles.toggleThumbEnabled
              ]} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Privacy Notice */}
      <View style={styles.privacyNotice}>
        <Text style={styles.privacyText}>
          Your date of birth is used only for age verification and content filtering. 
          We do not share this information with third parties.
        </Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
    lineHeight: 20,
  },
  dateButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
  },
  dateButtonSelected: {
    backgroundColor: '#2563eb10',
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  dateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#9ca3af',
    marginLeft: 12,
  },
  dateButtonTextSelected: {
    color: '#2563eb',
  },
  ageInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  ageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 4,
  },
  minorText: {
    fontSize: 14,
    color: '#FFB347',
  },
  parentalControlsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
  },
  parentalControlsCardEnabled: {
    backgroundColor: '#2563eb10',
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  parentalControlsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentalControlsIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  parentalControlsIconEnabled: {
    backgroundColor: '#2563eb',
  },
  parentalControlsText: {
    flex: 1,
  },
  parentalControlsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 4,
  },
  parentalControlsTitleEnabled: {
    color: '#2563eb',
  },
  parentalControlsDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    padding: 2,
  },
  toggleEnabled: {
    backgroundColor: '#2563eb',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleThumbEnabled: {
    alignSelf: 'flex-end',
  },
  privacyNotice: {
    marginTop: 'auto',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  privacyText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default AgeVerification;
