import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type ChatRoom = {
  name: string;
  snippet: string;
  time: string;
  unread?: number;
  type: '1:1' | '그룹';
  tags?: string[];
};

const filters = ['전체', '미확인', '그룹', '1:1'];

const chatRooms: ChatRoom[] = [
  {
    name: '룸메이트',
    snippet: '청소기 오늘 빌리면 될까요?',
    time: '3분 전',
    unread: 3,
    type: '1:1',
    tags: ['101동', '아침형'],
  },
  {
    name: '룸메이트 그룹',
    snippet: '이번 주 장보기 내일 7시에 할까요?',
    time: '12분 전',
    unread: 9,
    type: '그룹',
    tags: ['공동생활'],
  },
  {
    name: '기숙사 공지 채널',
    snippet: '입사 오리엔테이션 안내 확인해주세요.',
    time: '1시간 전',
    unread: 0,
    type: '그룹',
    tags: ['공지'],
  },
  {
    name: '스터디 매칭',
    snippet: 'AI 스터디 참여 가능하신가요?',
    time: '2시간 전',
    unread: 1,
    type: '1:1',
    tags: ['스터디'],
  },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('전체');

  const filteredRooms = chatRooms.filter((room) => {
    if (activeFilter === '전체') return true;
    if (activeFilter === '미확인') return (room.unread ?? 0) > 0;
    return room.type === activeFilter;
  });

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <TouchableOpacity style={styles.appIcon}>
              <View style={styles.appIconInner}>
                <ThemedText style={styles.appIconText}>DW</ThemedText>
              </View>
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>채팅</ThemedText>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.actionIcon}>
              <Ionicons name="search" size={22} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <Ionicons name="notifications-outline" size={22} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hero}>
          <ThemedText style={styles.heroTitle}>메시지를 확인하세요</ThemedText>
          <ThemedText style={styles.heroSubtitle}>룸메/그룹 채팅을 한 곳에서 관리합니다.</ThemedText>
          <View style={styles.heroChips}>
            <View style={styles.heroChip}>
              <ThemedText style={styles.heroChipText}>새 메시지 {filteredRooms.filter(r => (r.unread ?? 0) > 0).length}</ThemedText>
            </View>
            <View style={[styles.heroChip, styles.heroChipAlt]}>
              <ThemedText style={[styles.heroChipText, styles.heroChipTextAlt]}>
                전체 {chatRooms.length}개
              </ThemedText>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterPill,
                activeFilter === item && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  activeFilter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.chatList}>
          {filteredRooms.map((item) => (
            <TouchableOpacity key={item.name + item.time} style={styles.chatCard}>
              <View style={styles.chatTop}>
                <Ionicons name="person-circle" size={42} color={Colors.primary} />
                <View style={styles.chatInfo}>
                  <View style={styles.chatHeaderRow}>
                    <ThemedText style={styles.chatName}>{item.name}</ThemedText>
                    <ThemedText style={styles.chatTime}>{item.time}</ThemedText>
                  </View>
                  <ThemedText style={styles.chatSnippet} numberOfLines={1}>
                    {item.snippet}
                  </ThemedText>
                  <View style={styles.chatTags}>
                    <View style={styles.chatTag}>
                      <ThemedText style={styles.chatTagText}>{item.type}</ThemedText>
                    </View>
                    {(item.tags ?? []).map((tag) => (
                      <View key={tag} style={styles.chatTag}>
                        <ThemedText style={styles.chatTagText}>{tag}</ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
                {(item.unread ?? 0) > 0 && (
                  <View style={styles.unreadBadge}>
                    <ThemedText style={styles.unreadText}>{item.unread}</ThemedText>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.writeButton}>
        <Ionicons name="create" size={26} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundGray,
  },
  content: {
    paddingVertical: 16,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  appIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  appIconInner: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  topActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionIcon: {
    padding: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  hero: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.primary,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  heroSubtitle: {
    color: '#f1f5ff',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  heroChips: {
    flexDirection: 'row',
    gap: 8,
  },
  heroChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroChipAlt: {
    backgroundColor: Colors.background,
  },
  heroChipText: {
    color: '#f7fbff',
    fontSize: 12,
    fontWeight: '700',
  },
  heroChipTextAlt: {
    color: Colors.primary,
  },
  filterRow: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  filterPillActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  filterTextActive: {
    color: Colors.primaryDark,
  },
  chatList: {
    marginHorizontal: 20,
    marginTop: 8,
    gap: 10,
  },
  chatCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  chatTop: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  chatInfo: {
    flex: 1,
    gap: 4,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    flex: 1,
  },
  chatTime: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  chatSnippet: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  chatTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chatTag: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  chatTagText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '700',
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
    fontWeight: '800',
    color: '#ffffff',
  },
  writeButton: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
