import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Message {
  id: string;
  text: string;
  category: string;
  date: string;
  isFavorite?: boolean;
}

export function useArchive() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem('archived_messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load archived messages');
      setLoading(false);
    }
  };

  const archiveMessage = async (message: Message) => {
    try {
      const newMessages = [message, ...messages];
      await AsyncStorage.setItem('archived_messages', JSON.stringify(newMessages));
      setMessages(newMessages);
    } catch (err) {
      setError('Failed to archive message');
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, isFavorite: !msg.isFavorite } : msg
      );
      await AsyncStorage.setItem('archived_messages', JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
    } catch (err) {
      setError('Failed to update favorite status');
    }
  };

  return {
    messages,
    loading,
    error,
    archiveMessage,
    toggleFavorite,
  };
}