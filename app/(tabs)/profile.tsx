import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useMatchingStatus } from '@/context/matching-status';

const statItems = [
  { label: '내 글', value: '12' },
  { label: '댓글', value: '48' },
  { label: '관심', value: '9' },
];

const activityMenu = [
  { label: '내가 쓴 글', icon: 'document-text' },
  { label: '댓글 단 글', icon: 'chatbubble-ellipses' },
  { label: '좋아요한 글', icon: 'heart' },
  { label: '북마크', icon: 'bookmark' },
];

const matchingMenu = [
  { label: '매칭 프로필', icon: 'person', route: '/matching-profile' },
  { label: '매칭 히스토리', icon: 'time', route: '/matching-history' },
  { label: '관심 목록', icon: 'heart', route: '/matching-favorites' },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { matchingOn, setMatchingOn } = useMatchingStatus();

  const toggleStatus = () => {
    const next = !matchingOn;
    Alert.alert(
      '매칭 상태 변경',
      next
        ? '매칭을 켜면 다른 사용자에게 추천됩니다.'
        : '매칭을 끄면 추천/요청에서 제외됩니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: next ? '매칭 켜기' : '매칭 끄기', onPress: () => setMatchingOn(next) },
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
            <ThemedText style={styles.headerTitle}>내정보</ThemedText>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.actionIcon}
              onPress={() => router.push('/settings')}
              activeOpacity={0.8}
            >
              <Ionicons name="settings-outline" size={22} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person-circle" size={60} color={Colors.primary} />
          </View>
            <TouchableOpacity style={styles.statusBadge} onPress={toggleStatus} activeOpacity={0.8}>
              <View
                style={[
                  styles.statusDot,
                  matchingOn ? styles.dotOnline : styles.dotOffline,
                ]}
              />
              <ThemedText
                style={[
                  styles.statusText,
                  matchingOn ? styles.statusOn : styles.statusOff,
                ]}
              >
                {matchingOn ? '매칭 ON' : '매칭 OFF'}
              </ThemedText>
            </TouchableOpacity>
          <ThemedText style={styles.name}>홍길동</ThemedText>
          <ThemedText style={styles.meta}>컴퓨터공학부 · 22살 · 2학년</ThemedText>
          <View style={styles.statRow}>
            {statItems.map((item) => (
              <View key={item.label} style={styles.statItem}>
                <ThemedText style={styles.statValue}>{item.value}</ThemedText>
                <ThemedText style={styles.statLabel}>{item.label}</ThemedText>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.editButton}>
            <ThemedText style={styles.editButtonText}>프로필 수정</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <ThemedText style={styles.blockTitle}>나의 활동</ThemedText>
          </View>
          <View style={styles.menuList}>
            {activityMenu.map((item) => (
              <TouchableOpacity key={item.label} style={styles.menuRow}>
                <View style={styles.menuLeft}>
                  <Ionicons name={item.icon} size={18} color={Colors.primary} />
                  <ThemedText style={styles.menuText}>{item.label}</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <ThemedText style={styles.blockTitle}>매칭</ThemedText>
          </View>
          <View style={styles.menuList}>
            {matchingMenu.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuRow}
                onPress={() => item.route && router.push(item.route)}
                activeOpacity={0.8}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name={item.icon} size={18} color={Colors.primary} />
                  <ThemedText style={styles.menuText}>{item.label}</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.block}>
          <TouchableOpacity style={styles.menuRow} onPress={() => router.replace('/login')}>
            <View style={styles.menuLeft}>
              <Ionicons name="log-out-outline" size={18} color="#ff5252" />
              <ThemedText style={[styles.menuText, styles.logoutText]}>로그아웃</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
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
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    gap: 8,
  },
  avatarWrap: {
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotOnline: {
    backgroundColor: Colors.primary,
  },
  dotOffline: {
    backgroundColor: Colors.textLight,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  statusOn: {
    color: Colors.primaryDark,
  },
  statusOff: {
    color: Colors.textSecondary,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
  },
  meta: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  statRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 6,
    marginBottom: 6,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  editButton: {
    marginTop: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
  },
  block: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  menuList: {
    gap: 6,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '700',
  },
  logoutText: {
    color: '#ff5252',
  },
});
