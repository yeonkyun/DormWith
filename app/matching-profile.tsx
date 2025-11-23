import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type Question = {
  id: number;
  title: string;
  options: string[];
};

const questions: Question[] = [
  { id: 1, title: '기상 시간', options: ['아침형', '저녁형', '유동적'] },
  { id: 2, title: '청결 선호', options: ['매일 정리', '주기적 정리', '크게 신경 안 씀'] },
  { id: 3, title: '소음 허용', options: ['조용한 편', '보통', '상관없음'] },
  { id: 4, title: '취침 시간', options: ['22-24시', '0-2시', '2시 이후'] },
  { id: 5, title: '식습관', options: ['기숙사 내 취식', '외부 취식 위주', '혼합'] },
  { id: 6, title: '흡연 여부', options: ['비흡연', '흡연', '상관없음'] },
  { id: 7, title: '음주 빈도', options: ['안 마심', '가끔 마심', '자주 마심'] },
  { id: 8, title: '성격', options: ['배려형', '외향적', '조용한 편'] },
  { id: 9, title: '스터디 패턴', options: ['기숙사 공부', '도서관', '카페', '학교'] },
  { id: 10, title: '활동 스타일', options: ['운동 즐김', '집콕', '취미 외출'] },
];

export default function MatchingProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (id: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      Alert.alert('작성 필요', '모든 질문에 답변해 주세요.');
      return;
    }
    const prefs = Object.values(answers);
    const tags = prefs.slice(0, 3).join(' • ');
    Alert.alert('매칭 프로필 저장', `선호 태그: ${tags}`);
    router.back();
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top || 12 }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>매칭 프로필</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <ThemedText style={styles.subtext}>
          생활 패턴을 선택하면 비슷한 룸메이트와 더 잘 매칭돼요.
        </ThemedText>

        {questions.map((q) => (
          <View key={q.id} style={styles.questionCard}>
            <ThemedText style={styles.questionTitle}>
              {q.id}. {q.title}
            </ThemedText>
            <View style={styles.optionRow}>
              {q.options.map((opt) => {
                const active = answers[q.id] === opt;
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.optionPill, active && styles.optionPillActive]}
                    onPress={() => handleSelect(q.id, opt)}
                    activeOpacity={0.85}
                  >
                    <ThemedText
                      style={[styles.optionText, active && styles.optionTextActive]}
                      numberOfLines={1}
                    >
                      {opt}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.9}>
          <ThemedText style={styles.submitText}>매칭 프로필 저장</ThemedText>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  subtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  questionCard: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  questionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionPill: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  optionPillActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  optionTextActive: {
    color: Colors.primaryDark,
  },
  submitBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
  },
});
