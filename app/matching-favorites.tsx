import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useMatchingFavorites } from '@/context/matching-favorites';

export default function MatchingFavoritesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites, toggleFavorite } = useMatchingFavorites();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>관심 목록</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {favorites.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={42} color={Colors.textSecondary} />
            <ThemedText style={styles.emptyText}>관심 등록된 매칭이 없습니다</ThemedText>
            <ThemedText style={styles.emptySubtext}>매칭 화면에서 하트를 눌러 추가하세요</ThemedText>
          </View>
        ) : (
          <View style={styles.list}>
            {favorites.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.row}>
                  <Ionicons name="person-circle" size={32} color={Colors.primary} />
                  <View style={styles.info}>
                    <ThemedText style={styles.name}>{item.name}</ThemedText>
                    <ThemedText style={styles.meta}>
                      {item.gender} · {item.dorm}
                    </ThemedText>
                    <View style={styles.tags}>
                      {item.tags.map((tag) => (
                        <View key={tag} style={styles.tag}>
                          <ThemedText style={styles.tagText}>{tag}</ThemedText>
                        </View>
                      ))}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.heartBtn}
                    onPress={() => toggleFavorite(item)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="heart" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  list: {
    gap: 10,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  tagText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  heartBtn: {
    padding: 6,
    borderRadius: 999,
  },
  empty: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  emptySubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
