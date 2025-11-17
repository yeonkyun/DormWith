import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import MessageBubble from '@/components/chat/MessageBubble';
import MessageInput from '@/components/chat/MessageInput';
import { Colors } from '@/constants/theme';
import { Message, ChatRoom } from '@/types/chat';

// 더미 데이터
const MOCK_CHATS: Record<string, ChatRoom> = {
  '1': {
    id: '1',
    name: '룸메이트 그룹',
    isGroup: true,
    members: [
      { id: '1', name: '철수', isOnline: true },
      { id: '2', name: '영희', isOnline: false },
      { id: '3', name: '나', isOnline: true },
    ],
    unreadCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  '2': {
    id: '2',
    name: '룸메이트 2',
    isGroup: false,
    members: [
      { id: '2', name: '영희', isOnline: true },
      { id: '3', name: '나', isOnline: true },
    ],
    unreadCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      sender: { id: '1', name: '철수' },
      content: '안녕! 내일 뭐해?',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
    },
    {
      id: '2',
      sender: { id: '3', name: '나' },
      content: '특별한 계획은 없어',
      timestamp: new Date(Date.now() - 3000000),
      isRead: true,
    },
    {
      id: '3',
      sender: { id: '1', name: '철수' },
      content: '그럼 같이 영화 보자!',
      timestamp: new Date(Date.now() - 2400000),
      isRead: true,
    },
    {
      id: '4',
      sender: { id: '2', name: '영희' },
      content: '좋아! 언제?',
      timestamp: new Date(Date.now() - 1800000),
      isRead: true,
    },
    {
      id: '5',
      sender: { id: '3', name: '나' },
      content: '나도 가고 싶은데 내일은 바빠',
      timestamp: new Date(Date.now() - 1200000),
      isRead: true,
    },
    {
      id: '6',
      sender: { id: '1', name: '철수' },
      content: '아 그럼 모레는?',
      timestamp: new Date(Date.now() - 600000),
      isRead: true,
    },
    {
      id: '7',
      sender: { id: '3', name: '나' },
      content: '그건 괜찮을 것 같아',
      timestamp: new Date(Date.now() - 300000),
      isRead: true,
    },
  ],
  '2': [
    {
      id: '1',
      sender: { id: '2', name: '영희' },
      content: '안녕하세요! 룸메이트 매칭 관련해서 연락드렸습니다.',
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
    },
    {
      id: '2',
      sender: { id: '3', name: '나' },
      content: '네, 안녕하세요!',
      timestamp: new Date(Date.now() - 6600000),
      isRead: true,
    },
    {
      id: '3',
      sender: { id: '2', name: '영희' },
      content: '혹시 대학가 기숙사 관심 있으신가요?',
      timestamp: new Date(Date.now() - 6000000),
      isRead: true,
    },
    {
      id: '4',
      sender: { id: '3', name: '나' },
      content: '네 알겠습니다! 그럼 내일 봬요~',
      timestamp: new Date(Date.now() - 5400000),
      isRead: true,
    },
  ],
};

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[id as string] || []);
  const chatRoom = MOCK_CHATS[id as string];
  const flatListRef = useRef<FlatList>(null);

  const currentUserId = '3'; // 현재 사용자 ID (임시)

  useEffect(() => {
    // 스크롤을 맨 아래로 이동
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: { id: currentUserId, name: '나' },
      content,
      timestamp: new Date(),
      isRead: true,
    };

    setMessages([...messages, newMessage]);

    // 메시지 전송 후 스크롤을 맨 아래로
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (!chatRoom) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>채팅방을 찾을 수 없습니다</ThemedText>
      </ThemedView>
    );
  }

  const onlineCount = chatRoom.members.filter((m) => m.isOnline).length;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>{chatRoom.name}</ThemedText>
          {chatRoom.isGroup ? (
            <ThemedText style={styles.headerSubtitle}>
              {onlineCount}명 온라인
            </ThemedText>
          ) : (
            <ThemedText style={styles.headerSubtitle}>
              {chatRoom.members[0]?.isOnline ? '온라인' : '오프라인'}
            </ThemedText>
          )}
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="call" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* 매칭 예약 배너 */}
      <TouchableOpacity style={styles.bookingBanner}>
        <View style={styles.bookingContent}>
          <Ionicons name="calendar" size={18} color="#ffffff" />
          <View style={styles.bookingText}>
            <ThemedText style={styles.bookingTitle}>매칭 예약</ThemedText>
            <ThemedText style={styles.bookingSubtitle}>
              만남의 시간과 장소를 예약하세요
            </ThemedText>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ffffff" />
      </TouchableOpacity>

      {/* 메시지 리스트 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            isOwn={item.sender.id === currentUserId}
          />
        )}
        contentContainerStyle={styles.messageListContent}
        scrollEnabled={true}
      />

      {/* 메시지 입력 */}
      <MessageInput onSend={handleSendMessage} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    gap: 12,
  },
  headerContent: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 11,
    opacity: 0.6,
  },
  headerIcon: {
    padding: 8,
  },
  messageListContent: {
    paddingVertical: 12,
  },
  bookingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  bookingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bookingText: {
    flex: 1,
    gap: 2,
  },
  bookingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  bookingSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
