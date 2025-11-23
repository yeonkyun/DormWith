# CLAUDE.md - DormWith Project Guide

This document provides guidance for AI assistants working with the DormWith codebase.

## Project Overview

**DormWith** is a React Native/Expo mobile application for dormitory roommate matching. It enables university students to find compatible roommates through profile matching, community boards, and in-app messaging.

- **Platform**: iOS, Android, Web (cross-platform)
- **Framework**: Expo SDK 54 with Expo Router
- **Language**: TypeScript (strict mode)
- **UI Language**: Korean (한국어)

## Quick Commands

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
```

## Project Structure

```
DormWith/
├── app/                    # Screens (file-based routing)
│   ├── (tabs)/             # Tab navigation screens
│   │   ├── _layout.tsx     # Tab bar configuration
│   │   ├── index.tsx       # Home screen (홈)
│   │   ├── matching.tsx    # Roommate matching (매칭)
│   │   ├── board.tsx       # Community board (게시판)
│   │   ├── chat.tsx        # Messaging (채팅)
│   │   └── profile.tsx     # User profile (마이페이지)
│   ├── _layout.tsx         # Root layout
│   └── modal.tsx           # Modal screen
├── components/             # Reusable components
│   ├── ui/                 # UI primitives
│   │   ├── icon-symbol.tsx # Cross-platform icons
│   │   └── collapsible.tsx # Expandable sections
│   ├── themed-text.tsx     # Theme-aware Text
│   ├── themed-view.tsx     # Theme-aware View
│   └── haptic-tab.tsx      # Tab with haptic feedback
├── constants/
│   └── theme.ts            # Design system (colors, fonts)
├── hooks/                  # Custom React hooks
│   ├── use-color-scheme.ts # System theme detection
│   └── use-theme-color.ts  # Theme color resolution
├── assets/images/          # App icons, splash, images
└── scripts/                # Utility scripts
```

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Expo | ~54.0.23 |
| Routing | Expo Router | ~6.0.14 |
| UI | React Native | 0.81.5 |
| Language | TypeScript | ~5.9.2 |
| Navigation | React Navigation | ^7.x |
| Animations | React Native Reanimated | ~4.1.1 |
| Icons | Expo Vector Icons | ^15.0.3 |

## Coding Conventions

### File Naming

- **Screens**: lowercase with hyphens → `matching.tsx`, `board.tsx`
- **Layouts**: underscore prefix → `_layout.tsx`
- **Components**: kebab-case → `themed-text.tsx`, `haptic-tab.tsx`
- **Platform-specific**: suffix → `use-color-scheme.web.ts`, `icon-symbol.ios.tsx`

### Import Order

```typescript
// 1. React and React Native
import { ScrollView, StyleSheet, View } from 'react-native';

// 2. External libraries
import { Ionicons } from '@expo/vector-icons';

// 3. Internal components (use @/ alias)
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// 4. Constants and hooks
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
```

### Component Pattern

```typescript
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function ScreenName() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Screen Title</ThemedText>
      </View>
      {/* Content */}
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

### TypeScript Guidelines

- **Strict mode** is enabled - all types must be explicit
- Use `@/` path alias for imports from project root
- Define prop types with `type` keyword:

```typescript
type CardProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
};
```

## Design System

### Colors (from `constants/theme.ts`)

```typescript
Colors.primary      // #2196F3 - Main brand color
Colors.primaryDark  // #1976D2 - Darker variant
Colors.primaryLight // #BBDEFB - Lighter variant

Colors.text         // #1a1a1a - Primary text
Colors.textSecondary // #666 - Secondary text
Colors.textLight    // #999 - Disabled/hint text

Colors.background   // #fff - Main background
Colors.backgroundGray // #f8f9fa - Section backgrounds
Colors.border       // #e0e0e0 - Standard border
Colors.borderLight  // #f0f0f0 - Subtle border

// Status colors
Colors.success      // #4CAF50
Colors.warning      // #FF9800
Colors.error        // #F44336
Colors.info         // #2196F3
```

### Typography Patterns

```typescript
// Title (screens)
{ fontSize: 26, fontWeight: 'bold', color: Colors.text }

// Section headers
{ fontSize: 18, fontWeight: '600', color: Colors.text }

// Body text
{ fontSize: 16, color: Colors.text }

// Secondary text
{ fontSize: 14, color: Colors.textSecondary }

// Small/caption text
{ fontSize: 13, color: Colors.textLight }
```

### Spacing Standards

```typescript
// Screen padding
paddingTop: 60,       // Header top (accounts for status bar)
paddingHorizontal: 20,
paddingBottom: 16,

// Section spacing
marginBottom: 24,     // Between major sections
marginBottom: 16,     // Between items
gap: 12,              // Grid/list item gaps

// Card padding
padding: 16,
borderRadius: 12,
```

### Shadow Pattern

```typescript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 3,  // Android
}
```

## Key Components

### ThemedText

Theme-aware text with preset styles:

```typescript
<ThemedText type="title">Large Title</ThemedText>
<ThemedText type="subtitle">Section Header</ThemedText>
<ThemedText type="default">Body Text</ThemedText>
<ThemedText type="link">Clickable Link</ThemedText>
```

### ThemedView

Container with theme-aware background:

```typescript
<ThemedView style={styles.container}>
  {/* Content */}
</ThemedView>
```

### Icon Usage

Cross-platform icon component with SF Symbols on iOS:

```typescript
import { IconSymbol } from '@/components/ui/icon-symbol';

<IconSymbol name="house.fill" size={24} color={Colors.primary} />
```

For standard icons:

```typescript
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="heart" size={24} color={Colors.primary} />
```

## Navigation

### Tab Navigation

Defined in `app/(tabs)/_layout.tsx`:

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

### Screen Navigation

Using Expo Router's typed routes:

```typescript
import { router } from 'expo-router';

// Navigate
router.push('/matching');
router.replace('/profile');
router.back();
```

## Platform-Specific Code

Use file suffixes for platform variants:

```
component.tsx          # Default/Android
component.ios.tsx      # iOS-specific
component.web.tsx      # Web-specific
```

Or use Platform.select():

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

## Current Project State

The project is in **initial UI template phase**:

- Core screens implemented with placeholder content
- Design system established
- Navigation structure complete
- No backend integration yet
- No state management library yet
- No testing infrastructure yet

## Development Guidelines

### Do's

- Use `ThemedText` and `ThemedView` for consistent theming
- Import from `@/` alias for cleaner imports
- Define styles with `StyleSheet.create()` at module level
- Use `Colors` constants - never hardcode colors
- Keep components focused and single-purpose
- Test on multiple platforms (iOS, Android, Web)

### Don'ts

- Don't use inline styles for repeated patterns
- Don't hardcode color values
- Don't skip TypeScript types
- Don't import directly from `react-native` for themed components
- Don't ignore platform-specific behaviors

## Future Considerations

When extending this codebase:

1. **State Management**: Consider Zustand or Redux Toolkit for global state
2. **API Integration**: Use React Query/TanStack Query for server state
3. **Testing**: Add Jest + React Native Testing Library
4. **Forms**: Consider React Hook Form for form handling
5. **Auth**: Implement with Expo SecureStore for token storage
