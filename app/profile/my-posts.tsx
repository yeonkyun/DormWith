import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { myPosts } from '@/constants/profileMockData';

const PostCard = ({ post }: { post: any }) => (
  <View style={styles.postCard}>
    <View style={styles.postHeader}>
      <View style={styles.postMeta}>
        <ThemedText style={styles.postCategory}>{post.category}</ThemedText>
        <ThemedText style={styles.postDate}>{post.createdAt}</ThemedText>
      </View>
    </View>
    <ThemedText style={styles.postTitle}>{post.title}</ThemedText>
    <ThemedText style={styles.postContent} numberOfLines={2}>
      {post.content}
    </ThemedText>
    <View style={styles.postStats}>
      <View style={styles.statItem}>
        <Ionicons name="heart" size={14} color={Colors.textLight} />
        <ThemedText style={styles.statText}>{post.likes}</ThemedText>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="chatbubble" size={14} color={Colors.textLight} />
        <ThemedText style={styles.statText}>{post.comments}</ThemedText>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="bookmark" size={14} color={Colors.textLight} />
        <ThemedText style={styles.statText}>{post.bookmarks}</ThemedText>
      </View>
    </View>
  </View>
);

export default function MyPostsScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>내가 쓴 글</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {myPosts.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <ThemedText style={styles.countText}>총 {myPosts.length}개</ThemedText>
            {myPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-outline" size={48} color={Colors.textLight} />
          <ThemedText style={styles.emptyText}>작성한 글이 없습니다</ThemedText>
        </View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
  },
  countText: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  postCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.background,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postMeta: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  postCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#e3f2fd',
  },
  postDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  postContent: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textLight,
  },
});
