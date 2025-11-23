import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function FindIdScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="search" size={24} color={Colors.primary} />
          </View>
          <ThemedText style={styles.title}>아이디 찾기</ThemedText>
          <ThemedText style={styles.subtitle}>
            가입 시 입력한 이름과 이메일로 아이디를 확인하세요.
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

          <TouchableOpacity style={styles.primaryButton}>
            <ThemedText style={styles.primaryButtonText}>아이디 확인하기</ThemedText>
          </TouchableOpacity>

          <View style={styles.linksRow}>
            <Link href="/login" style={styles.linkText}>
              로그인
            </Link>
            <Link href="/reset-password" style={styles.linkText}>
              비밀번호 찾기
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
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  linkText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700',
  },
});
