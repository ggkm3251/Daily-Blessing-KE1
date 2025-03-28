import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Plus, Trash2, Clock } from 'lucide-react-native';
import { useState } from 'react';
import { useReminders, Reminder } from '@/hooks/useReminders';
import { useArchive } from '@/hooks/useArchive';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function RemindersScreen() {
  const { reminders, loading, error, addReminder, toggleReminder, deleteReminder } = useReminders();
  const { messages } = useArchive();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddReminder = () => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      messageId: messages[0]?.id || '',
      time: '09:00',
      days: [1, 2, 3, 4, 5], // Monday to Friday
      enabled: true,
    };
    addReminder(newReminder);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6366f1', '#818cf8']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Daily Reminders</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddReminder}>
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {loading ? (
          <Text style={styles.messageText}>Loading reminders...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : reminders.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={48} color="#64748b" />
            <Text style={styles.emptyStateTitle}>No reminders set</Text>
            <Text style={styles.emptyStateText}>
              Add reminders to get daily notifications for your favorite blessings
            </Text>
          </View>
        ) : (
          reminders.map(reminder => (
            <View key={reminder.id} style={styles.reminderCard}>
              <View style={styles.reminderHeader}>
                <View style={styles.timeContainer}>
                  <Clock size={20} color="#6366f1" />
                  <Text style={styles.timeText}>{reminder.time}</Text>
                </View>
                <Switch
                  value={reminder.enabled}
                  onValueChange={() => toggleReminder(reminder.id)}
                  trackColor={{ false: '#d1d5db', true: '#818cf8' }}
                  thumbColor={reminder.enabled ? '#6366f1' : '#f4f4f5'}
                />
              </View>
              
              <View style={styles.daysContainer}>
                {DAYS.map((day, index) => (
                  <View
                    key={day}
                    style={[
                      styles.dayChip,
                      reminder.days.includes(index) && styles.dayChipSelected
                    ]}>
                    <Text
                      style={[
                        styles.dayText,
                        reminder.days.includes(index) && styles.dayTextSelected
                      ]}>
                      {day}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteReminder(reminder.id)}>
                <Trash2 size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  reminderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#1f2937',
    fontFamily: 'Inter-SemiBold',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  dayChipSelected: {
    backgroundColor: '#6366f1',
  },
  dayText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  dayTextSelected: {
    color: '#ffffff',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 20,
    color: '#1f2937',
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  messageText: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    padding: 32,
  },
});