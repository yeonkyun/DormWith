import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const historyData = [
  { name: '익명 • AI소프트웨어학과', result: '수락', time: '2일 전' },
  { name: '익명 • 경영학부', result: '거절', time: '3일 전' },
  { name: '익명 • 컴퓨터공학부', result: '매칭 완료', time: '1주 전' },
];

export default function MatchingHistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>매칭 히스토리</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.list}>
          {historyData.map((item) => (
            <View key={item.name + item.time} style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="person-circle" size={32} color={Colors.primary} />
                <View style={styles.info}>
                  <ThemedText style={styles.name}>{item.name}</ThemedText>
                  <ThemedText style={styles.meta}>{item.time}</ThemedText>
                </View>
                <ThemedText style={styles.result}>{item.result}</ThemedText>
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
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  result: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
});
