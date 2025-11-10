import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function ProfileScreen() {

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
          <ThemedText style={styles.profileName}>홍길동</ThemedText>
          <ThemedText style={styles.profileInfo}>남성 • 22살 • 2학년</ThemedText>
          <TouchableOpacity style={styles.editButton}>
            <ThemedText style={styles.editButtonText}>프로필 수정</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 나의 활동 */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            나의 활동
          </ThemedText>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>내가 쓴 글</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>댓글 단 글</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>좋아요한 글</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>북마크</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 매칭 정보 */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            매칭 정보
          </ThemedText>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>나의 매칭 프로필</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>매칭 히스토리</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>관심 목록</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 설정 */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            설정
          </ThemedText>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>알림 설정</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>개인정보 설정</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedText style={styles.menuText}>고객센터</ThemedText>
            <ThemedText style={styles.menuArrow}>›</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
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
  menuText: {
    fontSize: 15,
  },
  menuArrow: {
    fontSize: 20,
    opacity: 0.3,
  },
  logoutText: {
    color: '#ff5252',
  },
});
