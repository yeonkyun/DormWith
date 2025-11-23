import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

type MatchProfile = {
  name: string;
  major: string;
  gender: '남자' | '여자';
  dorm: string;
  tags: string[];
};

const filters = ['전체', '아침형', '저녁형', '깔끔', '조용', '운동', '비흡연'];

const recommended: MatchProfile[] = [
  {
    name: '익명',
    major: '컴퓨터공학부',
    gender: '남자',
    dorm: '101동',
    tags: ['아침형', '깔끔', 'INTJ'],
  },
  {
    name: '익명',
    major: 'AI소프트웨어학과',
    gender: '여자',
    dorm: '105동',
    tags: ['조용', '저녁형', 'INFP'],
  },
  {
    name: '익명',
    major: '경영학부',
    gender: '남자',
    dorm: '108동',
    tags: ['운동', '아침형', 'ESTJ'],
  },
  {
    name: '익명',
    major: '간호학과',
    gender: '여자',
    dorm: '103동',
    tags: ['깔끔', '저녁형', 'ISFJ'],
  },
];

export default function MatchingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('전체');
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [matchingOn, setMatchingOn] = useState(true);

  const toggleLike = (key: string) => {
    setLiked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleMatching = () => {
    const next = !matchingOn;
    Alert.alert(
      next ? '매칭 ON' : '매칭 OFF',
      next ? '매칭을 켤까요?' : '매칭을 끌까요?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: () => setMatchingOn(next),
        },
      ],
    );
  };

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
            <ThemedText style={styles.headerTitle}>매칭</ThemedText>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.actionIcon}>
              <Ionicons name="filter" size={22} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <Ionicons name="notifications-outline" size={22} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hero}>
          <ThemedText style={styles.heroTitle}>오늘의 매칭</ThemedText>
          <ThemedText style={styles.heroSubtitle}>비슷한 생활 패턴의 룸메를 만나보세요.</ThemedText>
          <View style={styles.heroChips}>
            <TouchableOpacity
              style={styles.heroChip}
              activeOpacity={0.8}
              onPress={() => router.push('/waiting')}
            >
              <ThemedText style={styles.heroChipText}>대기 중 3명</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.heroChip, styles.heroChipAlt]}
              activeOpacity={0.8}
              onPress={() => router.push('/requests')}
            >
              <ThemedText style={[styles.heroChipText, styles.heroChipTextAlt]}>
                받은 요청 5건
              </ThemedText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.profileCTA}
            activeOpacity={0.85}
            onPress={() => router.push('/matching-profile')}
          >
            <Ionicons name="sparkles" size={18} color={Colors.primary} />
            <ThemedText style={styles.profileCTAText}>매칭 프로필 꾸미기</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleRow}>
          <ThemedText style={styles.toggleLabel}>매칭 상태</ThemedText>
          <TouchableOpacity
            style={[styles.togglePill, matchingOn ? styles.toggleOn : styles.toggleOff]}
            activeOpacity={0.8}
            onPress={handleToggleMatching}
          >
            <ThemedText
              style={[styles.toggleText, matchingOn ? styles.toggleTextOn : styles.toggleTextOff]}
            >
              {matchingOn ? 'ON' : 'OFF'}
            </ThemedText>
          </TouchableOpacity>
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

        <View style={styles.recHeader}>
          <View>
            <ThemedText style={styles.recTitle}>추천 룸메이트</ThemedText>
            <ThemedText style={styles.recMeta}>생활 패턴이 가까운 추천 카드</ThemedText>
          </View>
        </View>

        <View style={styles.recList}>
          {recommended.map((item, idx) => {
            const key = `${item.name}-${item.major}-${item.dorm}-${idx}`;
            const likedState = liked[key];

            return (
              <View key={key} style={styles.recCard}>
                <View style={styles.recTop}>
                  <Ionicons name="person-circle" size={42} color={Colors.primary} />
                  <View style={styles.recInfo}>
                    <ThemedText style={styles.recName}>
                      {item.name} • {item.major}
                    </ThemedText>
                    <ThemedText style={styles.recMeta}>
                      {item.gender} · {item.dorm}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    style={styles.heartBtn}
                    onPress={() => toggleLike(key)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={likedState ? 'heart' : 'heart-outline'}
                      size={20}
                      color={likedState ? Colors.primary : Colors.textSecondary}
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
                <View style={styles.recActions}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <ThemedText style={styles.rejectButtonText}>패스</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryButton}>
                    <ThemedText style={styles.primaryButtonText}>매칭 신청</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
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
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
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
  profileCTA: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  profileCTAText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  togglePill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  toggleOn: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  toggleOff: {
    backgroundColor: Colors.background,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '800',
  },
  toggleTextOn: {
    color: Colors.primaryDark,
  },
  toggleTextOff: {
    color: Colors.textSecondary,
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
  recHeader: {
    marginHorizontal: 20,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  recMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  recList: {
    marginHorizontal: 20,
    marginTop: 8,
    gap: 10,
  },
  recCard: {
    padding: 14,
    borderRadius: 14,
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
    marginBottom: 10,
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
  recActions: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
  },
});
