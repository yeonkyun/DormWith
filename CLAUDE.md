# CLAUDE.md - DormWith 프로젝트 가이드

이 문서는 AI 어시스턴트가 DormWith 코드베이스 작업 시 참고할 가이드입니다.

## 프로젝트 개요

**DormWith**는 기숙사 룸메이트 매칭을 위한 React Native/Expo 모바일 애플리케이션입니다. 대학생들이 프로필 매칭, 커뮤니티 게시판, 인앱 메시징을 통해 호환되는 룸메이트를 찾을 수 있습니다.

- **플랫폼**: iOS, Android, Web (크로스 플랫폼)
- **프레임워크**: Expo SDK 54 + Expo Router
- **언어**: TypeScript (strict 모드)
- **UI 언어**: 한국어

## 주요 명령어

```bash
npm start          # Expo 개발 서버 시작
npm run ios        # iOS 시뮬레이터 실행
npm run android    # Android 에뮬레이터 실행
npm run web        # 웹 브라우저 실행
npm run lint       # ESLint 실행
```

## 프로젝트 구조

```
DormWith/
├── app/                    # 화면 (파일 기반 라우팅)
│   ├── (tabs)/             # 탭 네비게이션 화면
│   │   ├── _layout.tsx     # 탭바 설정
│   │   ├── index.tsx       # 홈 화면
│   │   ├── matching.tsx    # 룸메이트 매칭
│   │   ├── board.tsx       # 커뮤니티 게시판
│   │   ├── chat.tsx        # 채팅
│   │   └── profile.tsx     # 마이페이지
│   ├── _layout.tsx         # 루트 레이아웃
│   └── modal.tsx           # 모달 화면
├── components/             # 재사용 컴포넌트
│   ├── ui/                 # UI 기본 요소
│   │   ├── icon-symbol.tsx # 크로스 플랫폼 아이콘
│   │   └── collapsible.tsx # 접기/펼치기 섹션
│   ├── themed-text.tsx     # 테마 적용 Text
│   ├── themed-view.tsx     # 테마 적용 View
│   └── haptic-tab.tsx      # 햅틱 피드백 탭
├── constants/
│   └── theme.ts            # 디자인 시스템 (색상, 폰트)
├── hooks/                  # 커스텀 React 훅
│   ├── use-color-scheme.ts # 시스템 테마 감지
│   └── use-theme-color.ts  # 테마 색상 처리
├── assets/images/          # 앱 아이콘, 스플래시, 이미지
└── scripts/                # 유틸리티 스크립트
```

## 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Expo | ~54.0.23 |
| 라우팅 | Expo Router | ~6.0.14 |
| UI | React Native | 0.81.5 |
| 언어 | TypeScript | ~5.9.2 |
| 네비게이션 | React Navigation | ^7.x |
| 애니메이션 | React Native Reanimated | ~4.1.1 |
| 아이콘 | Expo Vector Icons | ^15.0.3 |

## 코딩 컨벤션

### 파일 네이밍

- **화면**: 소문자 kebab-case → `matching.tsx`, `board.tsx`
- **레이아웃**: 언더스코어 접두사 → `_layout.tsx`
- **컴포넌트**: kebab-case → `themed-text.tsx`, `haptic-tab.tsx`
- **플랫폼별**: 접미사 사용 → `use-color-scheme.web.ts`, `icon-symbol.ios.tsx`

### Import 순서

```typescript
// 1. React 및 React Native
import { ScrollView, StyleSheet, View } from 'react-native';

// 2. 외부 라이브러리
import { Ionicons } from '@expo/vector-icons';

// 3. 내부 컴포넌트 (@/ 별칭 사용)
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// 4. 상수 및 훅
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
```

### 컴포넌트 패턴

```typescript
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function ScreenName() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">화면 제목</ThemedText>
      </View>
      {/* 콘텐츠 */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
```

### TypeScript 가이드라인

- **Strict 모드** 활성화 - 모든 타입 명시 필수
- 프로젝트 루트에서 import 시 `@/` 경로 별칭 사용
- prop 타입은 `type` 키워드로 정의:

```typescript
type CardProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
};
```

## 디자인 시스템

### 색상 (`constants/theme.ts`)

```typescript
Colors.primary      // #2196F3 - 메인 브랜드 색상
Colors.primaryDark  // #1976D2 - 어두운 변형
Colors.primaryLight // #BBDEFB - 밝은 변형

Colors.text         // #1a1a1a - 기본 텍스트
Colors.textSecondary // #666 - 보조 텍스트
Colors.textLight    // #999 - 비활성/힌트 텍스트

Colors.background   // #fff - 메인 배경
Colors.backgroundGray // #f8f9fa - 섹션 배경
Colors.border       // #e0e0e0 - 기본 테두리
Colors.borderLight  // #f0f0f0 - 연한 테두리

// 상태 색상
Colors.success      // #4CAF50 - 성공
Colors.warning      // #FF9800 - 경고
Colors.error        // #F44336 - 오류
Colors.info         // #2196F3 - 정보
```

### 타이포그래피 패턴

```typescript
// 제목 (화면)
{ fontSize: 26, fontWeight: 'bold', color: Colors.text }

// 섹션 헤더
{ fontSize: 18, fontWeight: '600', color: Colors.text }

// 본문
{ fontSize: 16, color: Colors.text }

// 보조 텍스트
{ fontSize: 14, color: Colors.textSecondary }

// 작은/캡션 텍스트
{ fontSize: 13, color: Colors.textLight }
```

### 간격 표준

```typescript
// 화면 패딩
paddingTop: 60,       // 헤더 상단 (상태바 고려)
paddingHorizontal: 20,
paddingBottom: 16,

// 섹션 간격
marginBottom: 24,     // 주요 섹션 간
marginBottom: 16,     // 항목 간
gap: 12,              // 그리드/리스트 항목 간격

// 카드 패딩
padding: 16,
borderRadius: 12,
```

### 그림자 패턴

```typescript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 3,  // Android
}
```

## 주요 컴포넌트

### ThemedText

테마가 적용된 텍스트 (프리셋 스타일 포함):

```typescript
<ThemedText type="title">큰 제목</ThemedText>
<ThemedText type="subtitle">섹션 헤더</ThemedText>
<ThemedText type="default">본문 텍스트</ThemedText>
<ThemedText type="link">클릭 가능한 링크</ThemedText>
```

### ThemedView

테마가 적용된 배경 컨테이너:

```typescript
<ThemedView style={styles.container}>
  {/* 콘텐츠 */}
</ThemedView>
```

### 아이콘 사용

iOS에서 SF Symbols를 지원하는 크로스 플랫폼 아이콘:

```typescript
import { IconSymbol } from '@/components/ui/icon-symbol';

<IconSymbol name="house.fill" size={24} color={Colors.primary} />
```

일반 아이콘:

```typescript
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="heart" size={24} color={Colors.primary} />
```

## 네비게이션

### 탭 네비게이션

`app/(tabs)/_layout.tsx`에서 정의:

```typescript
<Tabs screenOptions={{
  headerShown: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarStyle: { height: 85, paddingTop: 10 }
}}>
  <Tabs.Screen name="index" options={{ title: '홈' }} />
  <Tabs.Screen name="matching" options={{ title: '매칭' }} />
  {/* ... */}
</Tabs>
```

### 화면 이동

Expo Router의 타입드 라우트 사용:

```typescript
import { router } from 'expo-router';

// 이동
router.push('/matching');
router.replace('/profile');
router.back();
```

## 플랫폼별 코드

플랫폼 변형은 파일 접미사 사용:

```
component.tsx          # 기본/Android
component.ios.tsx      # iOS 전용
component.web.tsx      # Web 전용
```

또는 Platform.select() 사용:

```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { paddingTop: 50 },
      android: { paddingTop: 30 },
      web: { paddingTop: 20 },
    }),
  },
});
```

## 현재 프로젝트 상태

프로젝트는 **초기 UI 템플릿 단계**입니다:

- 플레이스홀더 콘텐츠가 포함된 핵심 화면 구현 완료
- 디자인 시스템 구축 완료
- 네비게이션 구조 완료
- 백엔드 연동 미구현
- 상태 관리 라이브러리 미적용
- 테스트 인프라 미구축

## 개발 가이드라인

### 권장 사항

- 일관된 테마를 위해 `ThemedText`와 `ThemedView` 사용
- 깔끔한 import를 위해 `@/` 별칭 사용
- 모듈 레벨에서 `StyleSheet.create()`로 스타일 정의
- `Colors` 상수 사용 - 색상값 하드코딩 금지
- 컴포넌트는 단일 목적에 집중
- 여러 플랫폼에서 테스트 (iOS, Android, Web)

### 지양 사항

- 반복되는 패턴에 인라인 스타일 사용 금지
- 색상값 하드코딩 금지
- TypeScript 타입 생략 금지
- 테마 컴포넌트에 `react-native`에서 직접 import 금지
- 플랫폼별 동작 차이 무시 금지

## 향후 고려사항

코드베이스 확장 시:

1. **상태 관리**: 전역 상태를 위해 Zustand 또는 Redux Toolkit 고려
2. **API 연동**: 서버 상태를 위해 React Query/TanStack Query 사용
3. **테스트**: Jest + React Native Testing Library 추가
4. **폼 처리**: React Hook Form 고려
5. **인증**: 토큰 저장을 위해 Expo SecureStore 활용
