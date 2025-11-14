import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';
import { activityStats } from '@/constants/profileMockData';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUserStore();

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>내정보</ThemedText>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 프로필 카드 */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageLarge}>
            <Ionicons name="person" size={40} color="#999" />
          </View>
          <ThemedText style={styles.profileName}>{user.name}</ThemedText>
          <ThemedText style={styles.profileInfo}>
            {user.gender} • {user.age}살 • {user.grade}학년
          </ThemedText>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/profile/edit')}
          >
            <ThemedText style={styles.editButtonText}>프로필 수정</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 나의 활동 */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            나의 활동
          </ThemedText>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/my-posts')}
          >
            <View style={styles.menuItemContent}>
              <ThemedText style={styles.menuText}>내가 쓴 글</ThemedText>
              <ThemedText style={styles.menuCount}>{activityStats.totalPosts}</ThemedText>
            </View>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/commented-posts')}
          >
            <View style={styles.menuItemContent}>
              <ThemedText style={styles.menuText}>댓글 단 글</ThemedText>
              <ThemedText style={styles.menuCount}>{activityStats.totalComments}</ThemedText>
            </View>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/liked-posts')}
          >
            <View style={styles.menuItemContent}>
              <ThemedText style={styles.menuText}>좋아요한 글</ThemedText>
              <ThemedText style={styles.menuCount}>{activityStats.totalLikes}</ThemedText>
            </View>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/bookmarks')}
          >
            <View style={styles.menuItemContent}>
              <ThemedText style={styles.menuText}>북마크</ThemedText>
              <ThemedText style={styles.menuCount}>{activityStats.totalBookmarks}</ThemedText>
            </View>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 매칭 정보 */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            매칭 정보
          </ThemedText>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/matching-profile')}
          >
            <ThemedText style={styles.menuText}>나의 매칭 프로필</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/matching-history')}
          >
            <ThemedText style={styles.menuText}>매칭 히스토리</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/interest-list')}
          >
            <ThemedText style={styles.menuText}>관심 목록</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 설정 */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            설정
          </ThemedText>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/notifications')}
          >
            <ThemedText style={styles.menuText}>알림 설정</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/privacy')}
          >
            <ThemedText style={styles.menuText}>개인정보 설정</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/customer-service')}
          >
            <ThemedText style={styles.menuText}>고객센터</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/policies')}
          >
            <ThemedText style={styles.menuText}>약관 및 정책</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 계정 */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={[styles.menuText, styles.logoutText]}>로그아웃</ThemedText>
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
  profileCard: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: Colors.background,
    marginBottom: 8,
    gap: 8,
  },
  profileImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    fontSize: 14,
    opacity: 0.6,
  },
  editButton: {
    marginTop: 12,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: Colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  section: {
    paddingVertical: 16,
    backgroundColor: Colors.background,
    marginBottom: 8,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  menuText: {
    fontSize: 15,
    flex: 1,
  },
  menuCount: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#e3f2fd',
    minWidth: 32,
    textAlign: 'center',
  },
  menuArrow: {
    fontSize: 20,
    opacity: 0.3,
    marginLeft: 8,
  },
  logoutText: {
    color: '#ff5252',
  },
});
