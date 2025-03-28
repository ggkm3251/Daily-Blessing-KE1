import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export interface Reminder {
  id: string;
  messageId: string;
  time: string; // HH:mm format
  days: number[]; // 0-6 (Sunday-Saturday)
  enabled: boolean;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const stored = await AsyncStorage.getItem('daily_reminders');
      if (stored) {
        setReminders(JSON.parse(stored));
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load reminders');
      setLoading(false);
    }
  };

  const scheduleReminder = async (reminder: Reminder) => {
    if (Platform.OS === 'web') {
      return; // Web doesn't support local notifications
    }

    const [hours, minutes] = reminder.time.split(':').map(Number);

    for (const day of reminder.days) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Daily Blessing Reminder',
          body: 'Time to reflect on your daily blessing',
        },
        trigger: {
          weekday: day + 1, // Notifications API uses 1-7 for days
          hour: hours,
          minute: minutes,
          repeats: true,
        },
      });
    }
  };

  const addReminder = async (reminder: Reminder) => {
    try {
      const newReminders = [...reminders, reminder];
      await AsyncStorage.setItem('daily_reminders', JSON.stringify(newReminders));
      setReminders(newReminders);
      if (reminder.enabled) {
        await scheduleReminder(reminder);
      }
    } catch (err) {
      setError('Failed to add reminder');
    }
  };

  const toggleReminder = async (id: string) => {
    try {
      const updatedReminders = reminders.map(rem => {
        if (rem.id === id) {
          const updated = { ...rem, enabled: !rem.enabled };
          if (updated.enabled) {
            scheduleReminder(updated);
          } else {
            // Cancel notifications for this reminder
            Notifications.cancelScheduledNotificationAsync(id);
          }
          return updated;
        }
        return rem;
      });
      await AsyncStorage.setItem('daily_reminders', JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
    } catch (err) {
      setError('Failed to update reminder');
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      const updatedReminders = reminders.filter(rem => rem.id !== id);
      await AsyncStorage.setItem('daily_reminders', JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
      if (Platform.OS !== 'web') {
        await Notifications.cancelScheduledNotificationAsync(id);
      }
    } catch (err) {
      setError('Failed to delete reminder');
    }
  };

  return {
    reminders,
    loading,
    error,
    addReminder,
    toggleReminder,
    deleteReminder,
  };
}