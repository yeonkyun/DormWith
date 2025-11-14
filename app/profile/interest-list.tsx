import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { interestedMatches } from '@/constants/profileMockData';

const InterestCard = ({ match }: { match: any }) => (
  <View style={styles.interestCard}>
    <View style={styles.cardContent}>
      <View style={styles.userInfo}>
        <View style={styles.userImage}>
          <Ionicons name="person" size={32} color="#999" />
        </View>
        <View style={styles.userDetails}>
          <ThemedText style={styles.userName}>{match.targetName}</ThemedText>
          <ThemedText style={styles.userDate}>관심 표시: {match.createdAt}</ThemedText>
        </View>
      </View>
    </View>
    <View style={styles.cardActions}>
      <TouchableOpacity style={styles.withdrawButton}>
        <ThemedText style={styles.withdrawButtonText}>취소</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton}>
        <Ionicons name="chatbubble-ellipses" size={14} color="#fff" />
        <ThemedText style={styles.chatButtonText}>대화</ThemedText>
      </TouchableOpacity>
    </View>
  </View>
);

export default function InterestListScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>관심 목록</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {interestedMatches.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <ThemedText style={styles.countText}>총 {interestedMatches.length}명</ThemedText>
            {interestedMatches.map((match) => (
              <InterestCard key={match.id} match={match} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={48} color={Colors.textLight} />
          <ThemedText style={styles.emptyText}>관심 목록이 비어있습니다</ThemedText>
          <ThemedText style={styles.emptySubtext}>
            추천 룸메이트에게 관심을 표시해보세요
          </ThemedText>
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
  interestCard: {
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    gap: 4,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  userDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  withdrawButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  withdrawButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  chatButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  chatButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
