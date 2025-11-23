import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function SignupScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="person-add" size={24} color={Colors.primary} />
          </View>
          <ThemedText style={styles.title}>회원가입</ThemedText>
          <ThemedText style={styles.subtitle}>
            DormWith에서 룸메이트와 커뮤니티를 시작하세요.
          </ThemedText>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <ThemedText style={styles.label}>이름</ThemedText>
            <TextInput
              placeholder="이름"
              placeholderTextColor={Colors.textLight}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>이메일</ThemedText>
            <TextInput
              placeholder="example@campus.edu"
              placeholderTextColor={Colors.textLight}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>비밀번호</ThemedText>
            <TextInput
              placeholder="8자 이상, 영문·숫자 포함"
              placeholderTextColor={Colors.textLight}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>비밀번호 확인</ThemedText>
            <TextInput
              placeholder="비밀번호 확인"
              placeholderTextColor={Colors.textLight}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.primaryButton}>
            <ThemedText style={styles.primaryButtonText}>가입하기</ThemedText>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <ThemedText style={styles.footerText}>이미 계정이 있나요?</ThemedText>
            <Link href="/login" style={styles.linkText}>
              로그인
            </Link>
          </View>
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
  hero: {
    paddingVertical: 28,
    gap: 10,
  },
  heroIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    backgroundColor: Colors.background,
    fontSize: 14,
    color: Colors.text,
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  footerText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  linkText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700',
  },
});
