import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio, Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const TOBI_STORAGE_KEY = 'tobi_media';

const Tobi = () => {
  const [media, setMedia] = useState([]);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const storedMedia = await AsyncStorage.getItem(TOBI_STORAGE_KEY);
        if (storedMedia) {
          setMedia(JSON.parse(storedMedia));
        }
      } catch (error) {
        console.error('Failed to load media from storage', error);
      }
    };
    loadMedia();
  }, []);

  const saveMedia = async (newMedia) => {
    try {
      await AsyncStorage.setItem(TOBI_STORAGE_KEY, JSON.stringify(newMedia));
    } catch (error) {
      console.error('Failed to save media to storage', error);
    }
  };

  const pickFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const libOptions = { quality: 0.8 };
    if (ImagePicker.MediaType && ImagePicker.MediaType.Images && ImagePicker.MediaType.Videos) {
      libOptions.mediaTypes = [ImagePicker.MediaType.Images, ImagePicker.MediaType.Videos];
    } else if (ImagePicker.MediaTypeOptions) {
      libOptions.mediaTypes = ImagePicker.MediaTypeOptions.All;
    }
    const result = await ImagePicker.launchImageLibraryAsync(libOptions);
    if (!result.canceled && result.assets?.length) {
      const items = result.assets.map((a) => ({
        id: `${Date.now()}-${a.assetId || Math.random()}`,
        type: a.type, // 'image' | 'video'
        uri: a.uri,
      }));
      const newMedia = [...items, ...media];
      setMedia(newMedia);
      saveMedia(newMedia);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const camOptions = { quality: 0.8 };
    const mediaTypeImages =
      (ImagePicker.MediaType && ImagePicker.MediaType.Images) ||
      (ImagePicker.MediaTypeOptions && ImagePicker.MediaTypeOptions.Images);
    if (mediaTypeImages) {
      camOptions.mediaTypes = mediaTypeImages;
    }
    const result = await ImagePicker.launchCameraAsync(camOptions);
    if (!result.canceled && result.assets?.length) {
      const a = result.assets[0];
      const newMedia = [
        { id: `${Date.now()}-${a.assetId || Math.random()}`, type: 'image', uri: a.uri },
        ...media,
      ];
      setMedia(newMedia);
      saveMedia(newMedia);
    }
  };

  const pickDocument = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      if (doc.type === 'success') {
        const newMedia = [
          { id: `${Date.now()}`, type: 'document', uri: doc.uri, name: doc.name },
          ...media,
        ];
        setMedia(newMedia);
        saveMedia(newMedia);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const startRecording = async () => {
    const perm = await Audio.requestPermissionsAsync();
    if (!perm.granted) return;
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await rec.startAsync();
    setRecording(rec);
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const newMedia = [
        { id: `${Date.now()}`, type: 'voice', uri },
        ...media,
      ];
      setMedia(newMedia);
      saveMedia(newMedia);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    } finally {
      setRecording(null);
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {item.type === 'image' && <Image source={{ uri: item.uri }} style={styles.image} />}
        {item.type === 'video' && (
          <Video source={{ uri: item.uri }} style={styles.video} useNativeControls resizeMode="cover" />
        )}
        {item.type === 'document' && (
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="document-text" size={24} color="#333" />
            <Text numberOfLines={1}>{item.name || 'Document'}</Text>
          </View>
        )}
        {item.type === 'voice' && (
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="musical-notes" size={24} color="#333" />
            <Text>Voice Note</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tobi - Your Memory guy</Text>
      <Text style={styles.subtitle}>i'll help you store your memories as you grow</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickFromLibrary}>
          <Ionicons name="images" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Ionicons name="document-text" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, recording ? { backgroundColor: '#dc3545' } : null]}
          onPress={recording ? stopRecording : startRecording}
        >
          <Ionicons name={recording ? 'stop' : 'mic'} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <MasonryList
        data={media}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={() => console.log('onEndReached')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'beautiful-font', // Replace with your desired font
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  video: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
});

export default Tobi;