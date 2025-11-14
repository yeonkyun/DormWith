import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useMatchingStore } from '@/stores/matchingStore';
import { MatchUser } from '@/types/matching';

export default function WaitingMatchesScreen() {
  const router = useRouter();
  const { waitingMatches } = useMatchingStore();

  const handleViewDetails = (user: MatchUser) => {
    router.push({
      pathname: '/matching/[id]',
      params: { id: user.id, name: user.name },
    });
  };

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>대기 중인 매칭</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {waitingMatches.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <View style={styles.countBadge}>
              <ThemedText style={styles.countText}>{waitingMatches.length}명</ThemedText>
            </View>
            <ThemedText style={styles.sectionSubtext}>
              관심을 표시한 사용자들입니다
            </ThemedText>

            {waitingMatches.map((user) => (
              <TouchableOpacity
                key={user.id}
                style={styles.matchCard}
                onPress={() => handleViewDetails(user)}
              >
                <View style={styles.matchProfile}>
                  <View style={styles.profileImage}>
                    <Ionicons name="person" size={32} color="#999" />
                  </View>
                  <View style={styles.matchInfo}>
                    <ThemedText style={styles.matchName}>{user.name}</ThemedText>
                    <ThemedText style={styles.matchMeta}>
                      {user.gender} • {user.age}살 • {user.grade}학년
                    </ThemedText>
                    <View style={styles.tagContainer}>
                      {user.tags.slice(0, 3).map((tag, idx) => (
                        <View key={idx} style={styles.tag}>
                          <ThemedText style={styles.tagText}>{tag}</ThemedText>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.statusBadge}>
                    <Ionicons name="heart" size={16} color={Colors.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={48} color={Colors.textLight} />
          <ThemedText style={styles.emptyText}>
            아직 관심을 표시한 사용자가 없습니다
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            매칭 페이지에서 관심을 표시해보세요
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
  countBadge: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  sectionSubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  matchCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: Colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  matchProfile: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchInfo: {
    flex: 1,
    gap: 4,
  },
  matchName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  matchMeta: {
    fontSize: 12,
    opacity: 0.6,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: '#e3f2fd',
  },
  tagText: {
    fontSize: 10,
    color: '#1976d2',
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffe0e6',
    justifyContent: 'center',
    alignItems: 'center',
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
