import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const features = [
  { icon: 'chatbubbles', title: '캠퍼스 커뮤니티', desc: '실시간 게시판 · 채팅으로 룸메와 소통' },
  { icon: 'people', title: '안전 매칭', desc: '선호도 기반 맞춤 룸메 추천' },
  { icon: 'home', title: '기숙사 꿀팁', desc: '생활 팁부터 나눔까지 한 번에' },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.heroAccent} />
          <View style={[styles.heroAccent, styles.heroAccentAlt]} />
          <ThemedText style={styles.badge}>DormWith</ThemedText>
          <ThemedText style={styles.title}>기숙사 라이프를 더 가깝게</ThemedText>
          <ThemedText style={styles.subtitle}>
            룸메 찾기부터 커뮤니티까지 한 번에 이어주는 캠퍼스 플랫폼.
          </ThemedText>
        </View>

        <View style={styles.featureList}>
          {features.map((item) => (
            <View key={item.title} style={styles.featureCard}>
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon} size={22} color={Colors.primary} />
              </View>
              <View>
                <ThemedText style={styles.featureTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.featureDesc}>{item.desc}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/login')}>
          <ThemedText style={styles.primaryText}>시작하기</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/start')}>
          <ThemedText style={styles.secondaryText}>자세히 보기</ThemedText>
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
    paddingBottom: 32,
    gap: 18,
  },
  hero: {
    marginTop: 16,
    padding: 20,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    overflow: 'hidden',
    gap: 12,
  },
  heroAccent: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.18)',
    right: -40,
    top: -30,
    transform: [{ rotate: '12deg' }],
  },
  heroAccentAlt: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.12)',
    left: -30,
    bottom: -40,
    transform: [{ rotate: '-12deg' }],
  },
  badge: {
    fontSize: 12,
    fontWeight: '800',
    color: '#e8f2ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e9f1ff',
    lineHeight: 20,
  },
  featureList: {
    gap: 10,
  },
  featureCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  featureDesc: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
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
