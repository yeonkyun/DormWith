import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="onboarding">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="onboarding" options={{ title: '온보딩', headerShown: false }} />
        <Stack.Screen name="start" options={{ title: '시작하기', headerShown: false }} />
        <Stack.Screen name="signup" options={{ title: '회원가입', headerShown: false }} />
        <Stack.Screen name="login" options={{ title: '로그인', headerShown: false }} />
        <Stack.Screen name="find-id" options={{ title: '아이디 찾기', headerShown: false }} />
        <Stack.Screen
          name="reset-password"
          options={{ title: '비밀번호 찾기', headerShown: false }}
        />
        <Stack.Screen name="waiting" options={{ title: '대기 중', headerShown: false }} />
        <Stack.Screen name="requests" options={{ title: '받은 요청', headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: '설정', headerShown: false }} />
        <Stack.Screen
          name="matching-profile"
          options={{ title: '매칭 프로필', headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
