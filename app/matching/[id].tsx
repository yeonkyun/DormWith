import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useMatchingStore } from '@/stores/matchingStore';

export default function UserDetailScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const { waitingMatches } = useMatchingStore();

  // 대기 중인 매칭 목록에서 사용자 정보 찾기
  const user = waitingMatches.find((u) => u.id === id);

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>사용자 정보</ThemedText>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle" size={48} color={Colors.textLight} />
          <ThemedText style={styles.notFoundText}>사용자를 찾을 수 없습니다</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>사용자 정보</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 프로필 이미지 */}
        <View style={styles.profileSection}>
          <View style={styles.largeProfileImage}>
            <Ionicons name="person" size={80} color="#999" />
          </View>
        </View>

        {/* 기본 정보 */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>이름</ThemedText>
            <ThemedText style={styles.infoValue}>{user.name}</ThemedText>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>성별</ThemedText>
            <ThemedText style={styles.infoValue}>{user.gender}</ThemedText>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>나이</ThemedText>
            <ThemedText style={styles.infoValue}>{user.age}세</ThemedText>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>학년</ThemedText>
            <ThemedText style={styles.infoValue}>{user.grade}학년</ThemedText>
          </View>
        </View>

        {/* 자기소개 */}
        <View style={styles.bioSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            자기소개
          </ThemedText>
          <View style={styles.bioCard}>
            <ThemedText style={styles.bioText}>{user.bio}</ThemedText>
          </View>
        </View>

        {/* 생활 습관 */}
        <View style={styles.tagsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            생활 습관
          </ThemedText>
          <View style={styles.tagGrid}>
            {user.tags.map((tag, idx) => (
              <View key={idx} style={styles.tagItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
                <ThemedText style={styles.tagItemText}>{tag}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* 호환도 */}
        <View style={styles.compatibilitySection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            호환도
          </ThemedText>
          <View style={styles.compatibilityCard}>
            <View style={styles.compatibilityBar}>
              <View
                style={[
                  styles.compatibilityFill,
                  { width: `${user.compatibility}%` },
                ]}
              />
            </View>
            <ThemedText style={styles.compatibilityText}>
              {user.compatibility}% 일치
            </ThemedText>
          </View>
        </View>

        {/* 액션 버튼 */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.cancelButton}>
            <ThemedText style={styles.cancelButtonText}>대기 취소</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
            <ThemedText style={styles.chatButtonText}>대화하기</ThemedText>
          </TouchableOpacity>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  largeProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: Colors.background,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 16,
  },
  bioSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bioCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
  },
  tagsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tagGrid: {
    gap: 12,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  tagItemText: {
    fontSize: 13,
    color: Colors.text,
  },
  compatibilitySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  compatibilityCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 12,
  },
  compatibilityBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderLight,
    overflow: 'hidden',
  },
  compatibilityFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  compatibilityText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
  },
  actionSection: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  chatButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  notFoundText: {
    fontSize: 14,
    color: Colors.textLight,
  },
});
