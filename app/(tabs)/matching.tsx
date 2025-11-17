import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useMatchingStore } from '@/stores/matchingStore';

export default function MatchingScreen() {
  const router = useRouter();
  const {
    recommendedUsers,
    rejectUser,
    likeUser,
    initializeStore,
    getStatusCounts,
  } = useMatchingStore();

  useEffect(() => {
    initializeStore();
  }, []);

  const counts = getStatusCounts();

  const handleReject = (userId: string) => {
    rejectUser(userId);
  };

  const handleLike = (userId: string) => {
    likeUser(userId);
    // 관심 표시 후 상세 정보 페이지로 이동
    const user = recommendedUsers.find((u) => u.id === userId);
    if (user) {
      router.push({
        pathname: '/matching/[id]',
        params: { id: userId, name: user.name },
      });
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>매칭</ThemedText>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 매칭 상태 */}
        <View style={styles.statusCard}>
          <ThemedText type="subtitle">현재 매칭 상태</ThemedText>
          <TouchableOpacity
            style={styles.statusInfo}
            onPress={() => router.push('/matching/waiting')}
          >
            <ThemedText style={styles.statusText}>대기 중인 매칭</ThemedText>
            <ThemedText style={styles.statusNumber}>{counts.waiting}명</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statusInfo}
            onPress={() => router.push('/matching/requests')}
          >
            <ThemedText style={styles.statusText}>받은 요청</ThemedText>
            <ThemedText style={styles.statusNumber}>{counts.received}건</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 추천 룸메이트 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">추천 룸메이트</ThemedText>
            <ThemedText style={styles.sectionSubtext}>
              회원님과 생활 패턴이 비슷한 분들이에요
            </ThemedText>
          </View>

          {recommendedUsers.length > 0 ? (
            recommendedUsers.map((user) => (
              <View key={user.id} style={styles.matchCard}>
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
                </View>
                <View style={styles.matchActions}>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(user.id)}
                  >
                    <ThemedText style={styles.rejectButtonText}>거절</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => handleLike(user.id)}
                  >
                    <ThemedText style={styles.likeButtonText}>관심</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="happy-outline" size={48} color={Colors.textLight} />
              <ThemedText style={styles.emptyText}>
                추천할 사용자가 없습니다
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  statusCard: {
    padding: 20,
    margin: 16,
    borderRadius: 16,
    backgroundColor: Colors.background,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
  },
  statusNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    paddingVertical: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionSubtext: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
  },
  matchCard: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: Colors.background,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  matchProfile: {
    flexDirection: 'row',
    gap: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchInfo: {
    flex: 1,
    gap: 4,
  },
  matchName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchMeta: {
    fontSize: 13,
    opacity: 0.6,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e3f2fd',
  },
  tagText: {
    fontSize: 11,
    color: '#1976d2',
  },
  matchActions: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  likeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  likeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textLight,
  },
});
