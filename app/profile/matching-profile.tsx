import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';
import { activityStats } from '@/constants/profileMockData';

export default function MatchingProfileScreen() {
  const router = useRouter();
  const { user } = useUserStore();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>나의 매칭 프로필</ThemedText>
        <TouchableOpacity onPress={() => router.push('/profile/edit')}>
          <Ionicons name="pencil" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 프로필 */}
        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={60} color="#999" />
          </View>
          <ThemedText style={styles.profileName}>{user.name}</ThemedText>
          <ThemedText style={styles.profileInfo}>
            {user.gender} • {user.age}세 • {user.grade}학년
          </ThemedText>
        </View>

        {/* 자기소개 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>자기소개</ThemedText>
          <View style={styles.bioCard}>
            <ThemedText style={styles.bioText}>{user.bio}</ThemedText>
          </View>
        </View>

        {/* 생활 습관 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>생활 습관</ThemedText>
          <View style={styles.tagContainer}>
            {user.tags.map((tag, idx) => (
              <View key={idx} style={styles.tag}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
                <ThemedText style={styles.tagText}>{tag}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* 매칭 통계 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>매칭 통계</ThemedText>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="heart" size={24} color={Colors.primary} />
              <ThemedText style={styles.statValue}>{activityStats.matchingCount}</ThemedText>
              <ThemedText style={styles.statLabel}>매칭됨</ThemedText>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time" size={24} color={Colors.warning} />
              <ThemedText style={styles.statValue}>{activityStats.waitingCount}</ThemedText>
              <ThemedText style={styles.statLabel}>대기 중</ThemedText>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="eye" size={24} color={Colors.info} />
              <ThemedText style={styles.statValue}>45</ThemedText>
              <ThemedText style={styles.statLabel}>프로필 조회</ThemedText>
            </View>
          </View>
        </View>

        {/* 프로필 힌트 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>프로필 팁</ThemedText>
          <View style={styles.tipCard}>
            <Ionicons name="bulb-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.tipText}>
              생활 습관 태그를 더 추가하면 더 정확한 매칭을 받을 수 있습니다.
            </ThemedText>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.tipText}>
              자기소개를 자세히 작성하면 더 많은 사람들이 관심을 보입니다.
            </ThemedText>
          </View>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  profileInfo: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  section: {
    padding: 16,
    backgroundColor: Colors.background,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  bioCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  bioText: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.text,
  },
  tagContainer: {
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  tagText: {
    fontSize: 13,
    color: Colors.text,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 6,
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  tipCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
    borderWidth: 1,
    borderColor: '#e3f2fd',
    marginBottom: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: Colors.text,
    lineHeight: 16,
  },
});
