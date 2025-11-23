import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const quickActions = [
  { label: '기숙사 홈', icon: 'bed' },
  { label: '기숙사 공지', icon: 'notifications' },
  { label: '학교 홈', icon: 'home' },
  { label: '학사 공지', icon: 'megaphone' },
  { label: '학사 일정', icon: 'calendar' },
  { label: '셔틀버스', icon: 'bus' },
];

const favoriteBoards = [
  {
    title: '공지사항',
    summary: '2026년 1학기 기숙사 입사 안내',
    boardRoute: '/(tabs)/board',
    postRoute: '/(tabs)/board',
  },
  {
    title: '매칭·탐색',
    summary: '2인실 룸메 구해요 (조용/아침형)',
    boardRoute: '/(tabs)/matching',
    postRoute: '/(tabs)/matching',
  },
  {
    title: '자유게시판',
    summary: '1층 세탁기 내일 오전에 비어요?',
    boardRoute: '/(tabs)/board',
    postRoute: '/(tabs)/board',
  },
  {
    title: '장터게시판',
    summary: '전자레인지 1만5천원, 304동 직거래',
    boardRoute: '/(tabs)/board',
    postRoute: '/(tabs)/board',
  },
];

const recommendedProfiles = [
  {
    name: '익명 • 컴퓨터공학부',
    gender: '남자',
    dorm: '101동',
    tags: ['아침형', '깔끔한 성격', 'INTJ'],
  },
  {
    name: '익명 • AI소프트웨어학과',
    gender: '여자',
    dorm: '105동',
    tags: ['저녁형', '조용한 룸메', 'INFP'],
  },
  {
    name: '익명 • 경영학부',
    gender: '남자',
    dorm: '108동',
    tags: ['아침형', '운동 좋아함', 'ESTJ'],
  },
  {
    name: '익명 • 간호학과',
    gender: '여자',
    dorm: '103동',
    tags: ['저녁형', '깔끔한 성격', 'ISFJ'],
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (key: string) => {
    setLiked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.appIcon}>
            <View style={styles.appIconInner}>
              <ThemedText style={styles.appIconText}>DW</ThemedText>
            </View>
          </TouchableOpacity>
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
          <ThemedText style={styles.heroTitle}>DormWith</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            룸메이트, 대화, 매칭까지 한 번에. 지금 바로 연결해보세요.
          </ThemedText>
          <View style={styles.heroChips}>
            <View style={styles.heroChip}>
              <ThemedText style={styles.heroChipText}>LIVE 커뮤니티</ThemedText>
            </View>
            <View style={[styles.heroChip, styles.heroChipAlt]}>
              <ThemedText style={[styles.heroChipText, styles.heroChipTextAlt]}>
                안전한 매칭
              </ThemedText>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickRow}
        >
          {quickActions.map((item) => (
            <TouchableOpacity key={item.label} style={styles.quickPill}>
              <View style={styles.quickIconCircle}>
                <Ionicons name={item.icon} size={18} color={Colors.primary} />
              </View>
              <ThemedText style={styles.quickLabel}>{item.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.favHeader}>
          <ThemedText style={styles.favTitle}>즐겨찾기</ThemedText>
          <TouchableOpacity onPress={() => router.push('/(tabs)/board')}>
            <ThemedText style={styles.favMore}>더 보기 &gt;</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.favBlock}>
          {favoriteBoards.map((item) => (
            <View key={item.title} style={styles.favRow}>
              <TouchableOpacity
                style={styles.favNameWrap}
                onPress={() => router.push(item.boardRoute)}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.favName}>{item.title}</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.favSummaryWrap}
                onPress={() => router.push(item.postRoute)}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.favSummary} numberOfLines={1} ellipsizeMode="tail">
                  {item.summary}
                </ThemedText>
              </TouchableOpacity>
              <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
            </View>
          ))}
        </View>

        <View style={styles.recHeader}>
          <ThemedText style={styles.recTitle}>맞춤 추천</ThemedText>
          <TouchableOpacity onPress={() => router.push('/(tabs)/matching')}>
            <ThemedText style={styles.favMore}>더 보기 &gt;</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.recList}>
          {recommendedProfiles.map((item) => (
            <TouchableOpacity
              key={item.name + item.dorm}
              style={styles.recCard}
              activeOpacity={0.8}
              onPress={() => router.push('/(tabs)/matching')}
            >
              <View style={styles.recTop}>
                <Ionicons name="person-circle" size={36} color={Colors.primary} />
                <View style={styles.recInfo}>
                  <ThemedText style={styles.recName}>{item.name}</ThemedText>
                  <ThemedText style={styles.recMeta}>
                    {item.gender} · {item.dorm}
                  </ThemedText>
                </View>
                <TouchableOpacity
                  style={styles.heartBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleLike(item.name);
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={liked[item.name] ? 'heart' : 'heart-outline'}
                    size={20}
                    color={liked[item.name] ? Colors.primary : Colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.recTags}>
                {item.tags.map((tag) => (
                  <View key={tag} style={styles.recTag}>
                    <ThemedText style={styles.recTagText}>{tag}</ThemedText>
                  </View>
                ))}
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
    backgroundColor: Colors.backgroundGray,
  },
  content: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
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
  hero: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  heroSubtitle: {
    color: '#f1f5ff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
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
  quickRow: {
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginBottom: 12,
  },
  quickSpacer: {
    height: 8,
  },
  quickPill: {
    width: 76,
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
  },
  quickIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  favHeader: {
    marginHorizontal: 20,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  favMore: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  favBlock: {
    marginHorizontal: 20,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 0,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  favRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    gap: 6,
  },
  favNameWrap: {
    paddingVertical: 2,
  },
  favSummaryWrap: {
    flex: 1,
    paddingVertical: 2,
  },
  favName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  favSummary: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  recHeader: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  recList: {
    marginHorizontal: 20,
    marginTop: 8,
    gap: 8,
  },
  recCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  recTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  recInfo: {
    flex: 1,
  },
  recName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  recMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  heartBtn: {
    padding: 6,
    borderRadius: 999,
  },
  recTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  recTag: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  recTagText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
});
