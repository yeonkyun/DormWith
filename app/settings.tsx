import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>앱 설정</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <ThemedText style={styles.blockTitle}>알림</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.rowText}>푸시 알림</ThemedText>
            <Switch value={true} />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.rowText}>이메일 알림</ThemedText>
            <Switch value={false} />
          </View>
        </View>

        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <ThemedText style={styles.blockTitle}>화면</ThemedText>
          </View>
          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.rowText}>다크 모드</ThemedText>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.rowText}>폰트 크기</ThemedText>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <ThemedText style={styles.blockTitle}>계정</ThemedText>
          </View>
          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.rowText}>개인정보 설정</ThemedText>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.rowText}>고객센터</ThemedText>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.rowText}>약관 및 정책</ThemedText>
            <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
          </TouchableOpacity>
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
  block: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 6,
  },
  blockHeader: {
    marginBottom: 4,
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '700',
  },
});
