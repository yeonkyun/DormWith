import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { matchingHistory } from '@/constants/profileMockData';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'matched':
      return Colors.success;
    case 'waiting':
      return Colors.warning;
    case 'rejected':
      return Colors.error;
    default:
      return Colors.textLight;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'matched':
      return '매칭됨';
    case 'waiting':
      return '대기 중';
    case 'rejected':
      return '거절됨';
    default:
      return '';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'matched':
      return 'heart';
    case 'waiting':
      return 'time';
    case 'rejected':
      return 'close-circle';
    default:
      return 'help-circle';
  }
};

const HistoryCard = ({ history }: { history: any }) => (
  <View style={styles.historyCard}>
    <View style={styles.cardContent}>
      <View style={styles.userInfo}>
        <View style={styles.userImage}>
          <Ionicons name="person" size={24} color="#999" />
        </View>
        <View style={styles.userDetails}>
          <ThemedText style={styles.userName}>{history.targetName}</ThemedText>
          <ThemedText style={styles.userDate}>{history.createdAt}</ThemedText>
        </View>
      </View>
      <View style={[styles.statusBadge, { borderColor: getStatusColor(history.status) }]}>
        <Ionicons name={getStatusIcon(history.status)} size={14} color={getStatusColor(history.status)} />
        <ThemedText style={[styles.statusLabel, { color: getStatusColor(history.status) }]}>
          {getStatusLabel(history.status)}
        </ThemedText>
      </View>
    </View>
  </View>
);

export default function MatchingHistoryScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>매칭 히스토리</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {matchingHistory.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <ThemedText style={styles.countText}>총 {matchingHistory.length}건</ThemedText>
            {matchingHistory.map((history) => (
              <HistoryCard key={history.id} history={history} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="history" size={48} color={Colors.textLight} />
          <ThemedText style={styles.emptyText}>매칭 히스토리가 없습니다</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
  },
  countText: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  historyCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    gap: 2,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  userDate: {
    fontSize: 11,
    color: Colors.textLight,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: Colors.backgroundLight,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textLight,
  },
});
