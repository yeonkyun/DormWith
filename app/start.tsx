import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const steps = [
  { icon: 'person-add', title: '가입', desc: '간단 정보 입력 후 가입 완료' },
  { icon: 'log-in', title: '로그인', desc: '캠퍼스 계정으로 안전하게 접속' },
  { icon: 'chatbubbles', title: '시작', desc: '게시판 · 채팅 · 매칭 바로 사용' },
];

export default function StartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <ThemedText style={styles.heroTitle}>시작하기</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            DormWith를 어떻게 활용할지 한눈에 보고 바로 들어가세요.
          </ThemedText>
        </View>

        <View style={styles.stepList}>
          {steps.map((step) => (
            <View key={step.title} style={styles.stepCard}>
              <View style={styles.stepIcon}>
                <Ionicons name={step.icon} size={20} color={Colors.primary} />
              </View>
              <View>
                <ThemedText style={styles.stepTitle}>{step.title}</ThemedText>
                <ThemedText style={styles.stepDesc}>{step.desc}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/login')}>
          <ThemedText style={styles.primaryText}>로그인으로 이동</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/signup')}>
          <ThemedText style={styles.secondaryText}>회원가입</ThemedText>
        </TouchableOpacity>
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
    gap: 18,
  },
  hero: {
    paddingVertical: 24,
    gap: 8,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  stepList: {
    gap: 10,
  },
  stepCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  stepDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
});
