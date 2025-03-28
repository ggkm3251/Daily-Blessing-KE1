import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Bell, Clock, Heart } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Bell size={24} color="#6366f1" />
            <Text style={styles.settingText}>Daily Notifications</Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#d1d5db', true: '#818cf8' }}
            thumbColor={true ? '#6366f1' : '#f4f4f5'}
          />
        </View>

        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Clock size={24} color="#6366f1" />
            <Text style={styles.settingText}>Notification Time</Text>
          </View>
          <Text style={styles.timeText}>6:00 AM</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        
        <View style={styles.categories}>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Faith</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Motivation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Financial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Health</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Relationships</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Heart size={20} color="#6366f1" />
        <Text style={styles.footerText}>Daily Blessing KE v1.0.0</Text>
      </View>
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
    backgroundColor: '#6366f1',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  section: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
    fontFamily: 'Inter-Regular',
  },
  timeText: {
    fontSize: 16,
    color: '#6366f1',
    fontFamily: 'Inter-SemiBold',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  category: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    color: '#1f2937',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    marginLeft: 8,
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});