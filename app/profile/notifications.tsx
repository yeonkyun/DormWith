import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';

const SettingItem = ({
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
  <View style={styles.settingItem}>
    <View style={styles.settingInfo}>
      <ThemedText style={styles.settingTitle}>{title}</ThemedText>
      <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: Colors.borderLight, true: '#81c784' }}
      thumbColor={value ? Colors.primary : '#f4f3f4'}
    />
  </View>
);

export default function NotificationsScreen() {
  const router = useRouter();
  const { notificationSettings, updateNotificationSettings } = useUserStore();
  const [settings, setSettings] = useState(notificationSettings);

  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    updateNotificationSettings(newSettings);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>알림 설정</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 앱 알림 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>앱 알림</ThemedText>
          <SettingItem
            title="매칭 알림"
            subtitle="매칭 요청과 수락 알림을 받습니다"
            value={settings.matchNotification}
            onToggle={() => handleToggle('matchNotification')}
          />
          <SettingItem
            title="댓글 알림"
            subtitle="내 게시글에 댓글이 달리면 알림을 받습니다"
            value={settings.commentNotification}
            onToggle={() => handleToggle('commentNotification')}
          />
          <SettingItem
            title="좋아요 알림"
            subtitle="내 게시글이 좋아요를 받으면 알림을 받습니다"
            value={settings.likeNotification}
            onToggle={() => handleToggle('likeNotification')}
          />
          <SettingItem
            title="메시지 알림"
            subtitle="새로운 메시지를 받으면 알림을 받습니다"
            value={settings.messageNotification}
            onToggle={() => handleToggle('messageNotification')}
          />
        </View>

        {/* 이메일 알림 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>이메일 알림</ThemedText>
          <SettingItem
            title="이메일 알림"
            subtitle="중요한 알림을 이메일로 받습니다"
            value={settings.emailNotification}
            onToggle={() => handleToggle('emailNotification')}
          />
        </View>

        {/* 알림 설정 팁 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>알림 설정 팁</ThemedText>
          <View style={styles.tipCard}>
            <Ionicons name="bulb-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.tipText}>
              알림을 끄면 중요한 소식을 놓칠 수 있습니다.
            </ThemedText>
          </View>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingInfo: {
    flex: 1,
    gap: 4,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  settingSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  tipCard: {
    flexDirection: 'row',
    gap: 12,
    margin: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
    borderWidth: 1,
    borderColor: '#e3f2fd',
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: Colors.text,
    lineHeight: 16,
  },
});
