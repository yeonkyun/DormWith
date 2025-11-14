import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const PrivacyItem = ({
  title,
  subtitle,
  value,
  onToggle,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <View style={styles.privacyItem}>
    <View style={styles.privacyInfo}>
      <ThemedText style={styles.privacyTitle}>{title}</ThemedText>
      <ThemedText style={styles.privacySubtitle}>{subtitle}</ThemedText>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: Colors.borderLight, true: '#81c784' }}
      thumbColor={value ? Colors.primary : '#f4f3f4'}
    />
  </View>
);

export default function PrivacyScreen() {
  const router = useRouter();
  const [profilePublic, setProfilePublic] = useState(true);
  const [showMatchHistory, setShowMatchHistory] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>개인정보 설정</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 프로필 공개 설정 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>프로필 공개</ThemedText>
          <PrivacyItem
            title="프로필 공개"
            subtitle="다른 사용자가 나의 프로필을 볼 수 있습니다"
            value={profilePublic}
            onToggle={() => setProfilePublic(!profilePublic)}
          />
          <PrivacyItem
            title="매칭 히스토리 공개"
            subtitle="다른 사용자가 나의 매칭 히스토리를 볼 수 있습니다"
            value={showMatchHistory}
            onToggle={() => setShowMatchHistory(!showMatchHistory)}
          />
        </View>

        {/* 연락 설정 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>연락 설정</ThemedText>
          <PrivacyItem
            title="메시지 수신"
            subtitle="다른 사용자가 나에게 메시지를 보낼 수 있습니다"
            value={allowMessages}
            onToggle={() => setAllowMessages(!allowMessages)}
          />
        </View>

        {/* 데이터 관리 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>데이터 관리</ThemedText>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuInfo}>
              <ThemedText style={styles.menuTitle}>다운로드</ThemedText>
              <ThemedText style={styles.menuSubtitle}>내 데이터를 다운로드합니다</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuInfo}>
              <ThemedText style={styles.menuTitle}>삭제</ThemedText>
              <ThemedText style={styles.menuSubtitle}>내 데이터를 삭제합니다</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* 계정 관리 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>계정 관리</ThemedText>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuInfo}>
              <ThemedText style={styles.menuTitle}>비밀번호 변경</ThemedText>
              <ThemedText style={styles.menuSubtitle}>계정 비밀번호를 변경합니다</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuInfo}>
              <ThemedText style={styles.menuTitle}>이메일 변경</ThemedText>
              <ThemedText style={styles.menuSubtitle}>가입 이메일을 변경합니다</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* 위험 구역 */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: Colors.error }]}>위험 구역</ThemedText>
          <TouchableOpacity style={[styles.menuItem, styles.dangerMenuItem]}>
            <View style={styles.menuInfo}>
              <ThemedText style={[styles.menuTitle, { color: Colors.error }]}>
                계정 탈퇴
              </ThemedText>
              <ThemedText style={styles.menuSubtitle}>계정과 모든 데이터가 삭제됩니다</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingVertical: 8,
    backgroundColor: Colors.background,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.text,
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  privacyInfo: {
    flex: 1,
    gap: 4,
    marginRight: 12,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  privacySubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  dangerMenuItem: {
    backgroundColor: 'rgba(244, 67, 54, 0.05)',
  },
  menuInfo: {
    flex: 1,
    gap: 4,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
