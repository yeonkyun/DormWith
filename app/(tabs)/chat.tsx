import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function ChatScreen() {

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>채팅</ThemedText>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 채팅방 목록 */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <TouchableOpacity key={item} style={styles.chatItem}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={24} color="#999" />
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <ThemedText style={styles.chatName}>
                  {item % 3 === 0 ? '룸메이트 그룹' : `룸메이트 ${item}`}
                </ThemedText>
                <ThemedText style={styles.chatTime}>
                  {item < 3 ? `${item}분 전` : `${item}시간 전`}
                </ThemedText>
              </View>
              <View style={styles.chatMessageRow}>
                <ThemedText style={styles.chatMessage} numberOfLines={1}>
                  {item % 2 === 0
                    ? '네 알겠습니다! 그럼 내일 봬요~'
                    : '안녕하세요! 룸메이트 매칭 관련해서 연락드렸습니다.'}
                </ThemedText>
                {item <= 3 && (
                  <View style={styles.unreadBadge}>
                    <ThemedText style={styles.unreadText}>{item}</ThemedText>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* 빈 상태 */}
        {false && (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
            <ThemedText style={styles.emptyText}>아직 채팅이 없습니다</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              룸메이트 매칭을 통해 대화를 시작해보세요
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 15,
    fontWeight: '600',
  },
  chatTime: {
    fontSize: 11,
    opacity: 0.5,
  },
  chatMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chatMessage: {
    fontSize: 13,
    opacity: 0.7,
    flex: 1,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
});
