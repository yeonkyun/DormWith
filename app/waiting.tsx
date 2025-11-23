import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const waitingList = [
  { name: '익명 • 컴퓨터공학부', gender: '남자', dorm: '101동', tags: ['아침형', '깔끔'] },
  { name: '익명 • 간호학과', gender: '여자', dorm: '103동', tags: ['저녁형', '조용'] },
  { name: '익명 • 경영학부', gender: '남자', dorm: '108동', tags: ['운동', 'ESTJ'] },
];

export default function WaitingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>대기 중</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <ThemedText style={styles.subtext}>상대가 수락하면 매칭이 성사됩니다.</ThemedText>

        <View style={styles.list}>
          {waitingList.map((item) => (
            <View key={item.name + item.dorm} style={styles.card}>
              <View style={styles.cardTop}>
                <Ionicons name="person-circle" size={40} color={Colors.primary} />
                <View style={styles.cardInfo}>
                  <ThemedText style={styles.cardName}>{item.name}</ThemedText>
                  <ThemedText style={styles.cardMeta}>
                    {item.gender} · {item.dorm}
                  </ThemedText>
                </View>
                <TouchableOpacity style={styles.cancelBtn}>
                  <ThemedText style={styles.cancelText}>취소</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.tags}>
                {item.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <ThemedText style={styles.tagText}>{tag}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  subtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  list: {
    gap: 10,
  },
  card: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  cardMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cancelBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cancelText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
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
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
});
