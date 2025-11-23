import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [userId, setUserId] = useState('sunmoon');
  const [password, setPassword] = useState('sunmoon');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (userId === 'sunmoon' && password === 'sunmoon') {
      setError('');
      router.replace('/(tabs)');
      return;
    }
    setError('아이디 또는 비밀번호를 확인하세요.');
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="log-in" size={24} color={Colors.primary} />
          </View>
          <ThemedText style={styles.title}>로그인</ThemedText>
          <ThemedText style={styles.subtitle}>DormWith 계정으로 바로 연결하세요.</ThemedText>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <TextInput
              placeholder="이메일 또는 아이디"
              placeholderTextColor={Colors.textLight}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={userId}
              onChangeText={setUserId}
            />
          </View>
          <View style={styles.field}>
            <TextInput
              placeholder="비밀번호"
              placeholderTextColor={Colors.textLight}
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <ThemedText style={styles.primaryButtonText}>로그인</ThemedText>
          </TouchableOpacity>
          {!!error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

          <View style={styles.linksRow}>
            <Link href="/find-id" style={styles.linkText}>
              아이디 찾기
            </Link>
            <Link href="/reset-password" style={styles.linkText}>
              비밀번호 찾기
            </Link>
            <Link href="/signup" style={styles.linkText}>
              회원가입
            </Link>
          </View>

          <View style={styles.divider} />
          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialIcon, styles.kakao]}>
              <Ionicons name="chatbubble-ellipses" size={22} color="#3c1e1e" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, styles.naver]}>
              <Ionicons name="leaf" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, styles.google]}>
              <Ionicons name="logo-google" size={22} color="#4285F4" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, styles.apple]}>
              <Ionicons name="logo-apple" size={22} color="#000" />
            </TouchableOpacity>
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  hero: {
    paddingVertical: 28,
    gap: 10,
    alignItems: 'center',
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  form: {
    gap: 12,
  },
  field: {
    gap: 4,
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
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  socialIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  kakao: {
    backgroundColor: '#FEE500',
    borderColor: '#F6D500',
  },
  naver: {
    backgroundColor: '#03C75A',
    borderColor: '#03C75A',
  },
  google: {
    backgroundColor: '#fff',
    borderColor: Colors.border,
  },
  apple: {
    backgroundColor: '#f2f2f2',
    borderColor: Colors.border,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginTop: 18,
    marginBottom: 6,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  linkText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700',
  },
  errorText: {
    marginTop: 8,
    color: Colors.error,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
