import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const CreatePost = ({ visible, onClose, onCreate }) => {
  const [content, setContent] = useState('');

  const handleCreate = () => {
    const postData = {
      user: { id: 1, name: 'You' },
      content,
      image: null,
    };
    onCreate?.(postData);
    setContent('');
    onClose?.();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Create Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Share your progress..."
            placeholderTextColor="#999"
            value={content}
            onChangeText={setContent}
            multiline
          />
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.create]} onPress={handleCreate}>
              <Text style={[styles.buttonText, styles.createText]}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    color: '#222',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: '#f0f0f0',
  },
  create: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  createText: {
    color: '#fff',
  },
});

export default CreatePost;