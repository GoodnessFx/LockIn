import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert,
  Modal,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const ProfileSetup = ({ profileData, onProfileUpdated }) => {
  const [profile, setProfile] = useState(profileData || {
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    avatar: null
  });
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  const updateProfile = (field, value) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
    onProfileUpdated(updatedProfile);
  };

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');
    return status === 'granted';
  };

  const showImageSourceDialog = () => {
    Alert.alert(
      'Select Profile Photo',
      'Choose how you want to add your profile photo',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Camera', 
          onPress: async () => {
            const hasPermission = await requestCameraPermission();
            if (hasPermission) {
              setShowCamera(true);
            } else {
              Alert.alert('Permission Required', 'Camera permission is needed to take photos');
            }
          }
        },
        { 
          text: 'Gallery', 
          onPress: pickFromGallery
        }
      ]
    );
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateProfile('avatar', result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        updateProfile('avatar', photo.uri);
        setShowCamera(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo');
      }
    }
  };

  const renderCameraView = () => {
    // Avoid rendering Camera unless explicitly opened to prevent API errors
    if (!showCamera) return null;

    return (
      <Modal
        visible={true}
        presentationStyle="fullScreen"
      >
        <View style={styles.cameraContainer}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cameraButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.cameraTitle}>Take Profile Photo</Text>
            <View style={styles.placeholder} />
          </View>

          <Camera
            style={styles.camera}
            // Use compatible string prop to avoid deprecated Constants API
            type="front"
            ref={cameraRef}
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.cameraFrame} />
            </View>
          </Camera>

          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={pickFromGallery}
            >
              <Text style={styles.cameraButtonText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePhoto}
            >
              <Text style={styles.captureButtonText}>Capture</Text>
            </TouchableOpacity>

            <View style={styles.placeholder} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          Add your details to personalize your LockIn experience
        </Text>

        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity
            style={[
              styles.photoContainer,
              profile.avatar && styles.photoContainerSelected
            ]}
            onPress={showImageSourceDialog}
          >
            {profile.avatar ? (
              <Image source={{ uri: profile.avatar }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>Add Photo</Text>
              </View>
            )}
            <View style={styles.photoOverlay}>
              <Text style={styles.photoOverlayText}>Edit</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.photoHint}>Tap to add profile photo</Text>
        </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>First Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                placeholderTextColor="#9ca3af"
                value={profile.firstName}
                onChangeText={(value) => updateProfile('firstName', value)}
              />
            </View>
          </View>

          <View style={styles.halfWidth}>
            <Text style={styles.label}>Last Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                placeholderTextColor="#9ca3af"
                value={profile.lastName}
                onChangeText={(value) => updateProfile('lastName', value)}
              />
            </View>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Choose a unique username"
              placeholderTextColor="#9ca3af"
              value={profile.username}
              onChangeText={(value) => updateProfile('username', value)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Bio (Optional)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Tell others about yourself and your goals..."
              placeholderTextColor="#9ca3af"
              value={profile.bio}
              onChangeText={(value) => updateProfile('bio', value)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>
      </View>

      {renderCameraView()}
      </ScrollView>
    </KeyboardAvoidingView>
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
  photoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  photoContainerSelected: {
    borderColor: '#2563eb',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: '#2563eb',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoOverlayText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  photoHint: {
    fontSize: 14,
    color: '#6c757d',
  },
  form: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b0b0f',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0b0b0f',
  },
  bioInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    maxHeight: 80,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  cameraButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cameraButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  captureButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  cameraTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 60,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraFrame: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
});

export default ProfileSetup;
