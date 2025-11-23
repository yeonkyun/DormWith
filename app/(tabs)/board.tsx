import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const categories = ['전체', '공지', '자유', '장터', '정보', '질문', '매칭'];

const hotPosts = [
  { title: '2026년 1학기 기숙사 입사 안내', meta: '공지 • 5분 전', stats: '댓글 12' },
  { title: '룸메 룰 정리했어요, 공유합니다', meta: '자유 • 12분 전', stats: '공감 33' },
  { title: '전자레인지 1.5만원 직거래', meta: '장터 • 22분 전', stats: '찜 9' },
];

const latestPosts = [
  { title: '101동 세탁기 내일 오전에 비어요?', meta: '자유 • 3분 전', stats: '댓글 2' },
  { title: 'AI소프트웨어학과 팀플원 구합니다', meta: '자유 • 8분 전', stats: '댓글 5' },
  { title: '2인실 룸메 모집(조용/아침형)', meta: '매칭 • 15분 전', stats: '관심 7' },
  { title: '기숙사 밥맛 괜찮은 요일?', meta: '질문 • 21분 전', stats: '댓글 4' },
];

export default function BoardScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('전체');

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
            <ThemedText style={styles.headerTitle}>게시판</ThemedText>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.actionIcon}>
              <Ionicons name="notifications-outline" size={22} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={Colors.textSecondary} />
            <TextInput
              placeholder="게시글 검색"
              placeholderTextColor={Colors.textLight}
              style={styles.searchInput}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPill,
                selectedCategory === category && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <ThemedText style={styles.blockTitle}>실시간 인기</ThemedText>
          </View>
          <View style={styles.list}>
            {hotPosts.map((post) => (
              <TouchableOpacity key={post.title} style={styles.listRow}>
                <ThemedText style={styles.postTitle}>{post.title}</ThemedText>
                <View style={styles.rowMeta}>
                  <ThemedText style={styles.postMeta}>{post.meta}</ThemedText>
                  <ThemedText style={styles.postStat}>{post.stats}</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <ThemedText style={styles.blockTitle}>최신 게시글</ThemedText>
          </View>
          <View style={styles.list}>
            {latestPosts.map((post) => (
              <TouchableOpacity key={post.title} style={styles.listRow}>
                <ThemedText style={styles.postTitle}>{post.title}</ThemedText>
                <View style={styles.rowMeta}>
                  <ThemedText style={styles.postMeta}>{post.meta}</ThemedText>
                  <ThemedText style={styles.postStat}>{post.stats}</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  hero: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  heroSubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  categoryRow: {
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  categoryPillActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: Colors.primaryDark,
  },
  block: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  list: {
    gap: 8,
  },
  listRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  rowMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  postStat: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '700',
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
