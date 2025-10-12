import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user is authenticated
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        setData(null);
        return;
      }

      // Simulate API call - replace with actual user data fetch
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      setData(mockUser);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates) => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual user update
      const updatedUser = { ...data, ...updates };
      setData(updatedUser);
      return { success: true };
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchUserData,
    updateUser,
  };
}