import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>DormWith</ThemedText>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 빠른 메뉴 */}
        <View style={styles.quickMenuContainer}>
          <TouchableOpacity style={styles.quickMenuItem}>
            <Ionicons name="document-text" size={32} color={Colors.tint} />
            <ThemedText style={styles.quickMenuText}>게시판</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickMenuItem}>
            <Ionicons name="chatbubbles" size={32} color={Colors.tint} />
            <ThemedText style={styles.quickMenuText}>채팅</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickMenuItem}>
            <Ionicons name="people" size={32} color={Colors.tint} />
            <ThemedText style={styles.quickMenuText}>매칭</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickMenuItem}>
            <Ionicons name="person" size={32} color={Colors.tint} />
            <ThemedText style={styles.quickMenuText}>내정보</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 실시간 인기 글 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">실시간 인기 글</ThemedText>
          </View>
          {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity key={item} style={styles.postItem}>
              <ThemedText style={styles.postTitle}>
                룸메이트 구해요 [{item}]
              </ThemedText>
              <ThemedText style={styles.postPreview}>
                깔끔하고 조용한 사람 찾습니다...
              </ThemedText>
              <View style={styles.postMeta}>
                <ThemedText style={styles.postMetaText}>자유게시판</ThemedText>
                <ThemedText style={styles.postMetaText}>•</ThemedText>
                <ThemedText style={styles.postMetaText}>5분 전</ThemedText>
                <ThemedText style={styles.postMetaText}>•</ThemedText>
                <ThemedText style={styles.postMetaText}>댓글 {item * 2}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* HOT 게시판 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">HOT 게시판</ThemedText>
          </View>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.postItem}>
              <ThemedText style={styles.postTitle}>
                🔥 기숙사 생활 꿀팁 공유
              </ThemedText>
              <ThemedText style={styles.postPreview}>
                신입생들을 위한 기숙사 생활 꿀팁을 공유합니다...
              </ThemedText>
              <View style={styles.postMeta}>
                <ThemedText style={styles.postMetaText}>정보</ThemedText>
                <ThemedText style={styles.postMetaText}>•</ThemedText>
                <ThemedText style={styles.postMetaText}>1시간 전</ThemedText>
                <ThemedText style={styles.postMetaText}>•</ThemedText>
                <ThemedText style={styles.postMetaText}>좋아요 {item * 10}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
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
    color: Colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  quickMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    backgroundColor: Colors.background,
    marginBottom: 8,
  },
  quickMenuItem: {
    alignItems: 'center',
    gap: 8,
  },
  quickMenuText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  section: {
    paddingVertical: 16,
    backgroundColor: Colors.background,
    marginBottom: 8,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  postItem: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.text,
  },
  postPreview: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  postMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  postMetaText: {
    fontSize: 12,
    color: Colors.textLight,
  },
});
