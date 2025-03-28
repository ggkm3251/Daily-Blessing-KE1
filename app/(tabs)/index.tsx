import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { Share as ShareIcon, Facebook, Instagram, Archive } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useArchive } from '@/hooks/useArchive';

const DAILY_MESSAGE = {
  id: new Date().toISOString(),
  text: "Your potential is God's promise to you. Trust in His timing, work with dedication, and watch miracles unfold in your life.",
  category: "Faith & Motivation",
  date: new Date().toLocaleDateString(),
};

export default function TodayScreen() {
  const { archiveMessage } = useArchive();

  const shareMessage = async (platform: string) => {
    try {
      const message = `${DAILY_MESSAGE.text}\n\n- Daily Blessing KE`;
      await Share.share({
        message,
        title: 'Share Daily Blessing',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleArchive = async () => {
    try {
      await archiveMessage(DAILY_MESSAGE);
      Alert.alert(
        "Success",
        "Today's blessing has been archived!",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to archive the blessing. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6366f1', '#818cf8']}
        style={styles.header}>
        <Text style={styles.date}>{DAILY_MESSAGE.date}</Text>
        <Text style={styles.category}>{DAILY_MESSAGE.category}</Text>
      </LinearGradient>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>{DAILY_MESSAGE.text}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.archiveButton}
          onPress={handleArchive}>
          <Archive size={24} color="#6366f1" />
          <Text style={styles.archiveButtonText}>Archive</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shareContainer}>
        <Text style={styles.shareTitle}>Share this blessing</Text>
        <View style={styles.shareButtons}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => shareMessage('whatsapp')}>
            <ShareIcon size={24} color="#4ade80" />
            <Text style={styles.shareButtonText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => shareMessage('facebook')}>
            <Facebook size={24} color="#3b82f6" />
            <Text style={styles.shareButtonText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => shareMessage('instagram')}>
            <Instagram size={24} color="#ec4899" />
            <Text style={styles.shareButtonText}>Instagram</Text>
          </TouchableOpacity>
        </View>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  date: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
  },
  category: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  messageContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
    color: '#1f2937',
    fontFamily: 'Inter-SemiBold',
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  archiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
  },
  archiveButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6366f1',
    fontFamily: 'Inter-SemiBold',
  },
  shareContainer: {
    padding: 24,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  shareTitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shareButton: {
    alignItems: 'center',
    padding: 12,
  },
  shareButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
});