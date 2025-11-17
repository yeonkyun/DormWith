import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { ChatListItem } from '@/types/chat';

// 더미 데이터
const MOCK_CHATS: ChatListItem[] = [
  {
    id: '1',
    name: '룸메이트 그룹',
    lastMessage: '네 알겠습니다! 그럼 내일 봬요~',
    lastMessageTime: '1분 전',
    unreadCount: 1,
    isGroup: true,
  },
  {
    id: '2',
    name: '룸메이트 2',
    lastMessage: '안녕하세요! 룸메이트 매칭 관련해서 연락드렸습니다.',
    lastMessageTime: '2분 전',
    unreadCount: 2,
    isGroup: false,
  },
  {
    id: '3',
    name: '룸메이트 그룹',
    lastMessage: '네 알겠습니다! 그럼 내일 봬요~',
    lastMessageTime: '3분 전',
    unreadCount: 3,
    isGroup: true,
  },
  {
    id: '4',
    name: '룸메이트 4',
    lastMessage: '안녕하세요! 룸메이트 매칭 관련해서 연락드렸습니다.',
    lastMessageTime: '4시간 전',
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: '5',
    name: '룸메이트 5',
    lastMessage: '네 알겠습니다! 그럼 내일 봬요~',
    lastMessageTime: '5시간 전',
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: '6',
    name: '룸메이트 6',
    lastMessage: '안녕하세요! 룸메이트 매칭 관련해서 연락드렸습니다.',
    lastMessageTime: '6시간 전',
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: '7',
    name: '룸메이트 7',
    lastMessage: '네 알겠습니다! 그럼 내일 봬요~',
    lastMessageTime: '7시간 전',
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: '8',
    name: '룸메이트 8',
    lastMessage: '안녕하세요! 룸메이트 매칭 관련해서 연락드렸습니다.',
    lastMessageTime: '8시간 전',
    unreadCount: 0,
    isGroup: false,
  },
];

export default function ChatScreen() {
  const router = useRouter();

  const handleChatPress = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>채팅</ThemedText>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="create-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 채팅방 목록 */}
        {MOCK_CHATS.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatItem}
            onPress={() => handleChatPress(chat.id)}
          >
            <View style={styles.profileImage}>
              {chat.isGroup ? (
                <Ionicons name="people" size={24} color="#999" />
              ) : (
                <Ionicons name="person" size={24} color="#999" />
              )}
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <ThemedText style={styles.chatName}>{chat.name}</ThemedText>
                <ThemedText style={styles.chatTime}>
                  {chat.lastMessageTime}
                </ThemedText>
              </View>
              <View style={styles.chatMessageRow}>
                <ThemedText
                  style={styles.chatMessage}
                  numberOfLines={1}
                >
                  {chat.lastMessage}
                </ThemedText>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <ThemedText style={styles.unreadText}>
                      {chat.unreadCount}
                    </ThemedText>
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
            <ThemedText style={styles.emptyText}>
              아직 채팅이 없습니다
            </ThemedText>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerIcon: {
    padding: 8,
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
    backgroundColor: Colors.primary,
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
