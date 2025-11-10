import { ScrollView, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function BoardScreen() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '자유', '정보', '질문', '룸메이트'];

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>게시판</ThemedText>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={Colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="게시글 검색..."
            placeholderTextColor={Colors.textLight}
          />
        </View>
      </View>

      {/* 카테고리 탭 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(category)}>
            <ThemedText
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}>
              {category}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView}>
        {/* 인기 게시글 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              🔥 인기 게시글
            </ThemedText>
          </View>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={`hot-${item}`} style={styles.postCard}>
              <View style={styles.postHeader}>
                <ThemedText style={styles.postCategory}>[자유]</ThemedText>
                <ThemedText style={styles.postTitle}>
                  기숙사 근처 맛집 추천해주세요!
                </ThemedText>
              </View>
              <ThemedText style={styles.postContent}>
                이번에 처음 기숙사에 들어오게 됐는데 근처에 맛집 있을까요?
              </ThemedText>
              <View style={styles.postFooter}>
                <ThemedText style={styles.postMeta}>익명 • 10분 전</ThemedText>
                <View style={styles.postStats}>
                  <ThemedText style={styles.postStat}>👍 {item * 5}</ThemedText>
                  <ThemedText style={styles.postStat}>💬 {item * 3}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 일반 게시글 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              최신 게시글
            </ThemedText>
          </View>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <TouchableOpacity key={`post-${item}`} style={styles.postCard}>
              <View style={styles.postHeader}>
                <ThemedText style={styles.postCategory}>
                  [{['자유', '정보', '질문', '룸메이트'][item % 4]}]
                </ThemedText>
                <ThemedText style={styles.postTitle}>
                  {item % 2 === 0 ? '룸메이트 구합니다' : '기숙사 생활 질문있어요'}
                </ThemedText>
              </View>
              <ThemedText style={styles.postContent}>
                {item % 2 === 0
                  ? '깔끔하고 조용한 룸메이트 구합니다.'
                  : '기숙사 와이파이 비밀번호가 어떻게 되나요?'}
              </ThemedText>
              <View style={styles.postFooter}>
                <ThemedText style={styles.postMeta}>익명 • {item * 5}분 전</ThemedText>
                <View style={styles.postStats}>
                  <ThemedText style={styles.postStat}>👍 {item}</ThemedText>
                  <ThemedText style={styles.postStat}>💬 {item * 2}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 글쓰기 버튼 */}
      <TouchableOpacity style={styles.writeButton}>
        <Ionicons name="create" size={28} color="#ffffff" />
      </TouchableOpacity>
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
    gap: 12,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.backgroundGray,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 14,
    color: Colors.text,
  },
  categoryScroll: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundGray,
    marginRight: 8,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingVertical: 12,
    backgroundColor: Colors.background,
    marginBottom: 8,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  postCard: {
    padding: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postCategory: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    color: Colors.text,
  },
  postContent: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  postMeta: {
    fontSize: 12,
    color: Colors.textLight,
  },
  postStats: {
    flexDirection: 'row',
    gap: 12,
  },
  postStat: {
    fontSize: 12,
    color: Colors.textLight,
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
