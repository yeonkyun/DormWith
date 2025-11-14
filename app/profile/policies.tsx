import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const PolicyItem = ({
  title,
  lastUpdated,
  isExpanded,
  onToggle,
  content,
}: {
  title: string;
  lastUpdated: string;
  isExpanded: boolean;
  onToggle: () => void;
  content: string;
}) => (
  <View style={styles.policyItem}>
    <TouchableOpacity style={styles.policyHeader} onPress={onToggle}>
      <View style={styles.policyTitleArea}>
        <ThemedText style={styles.policyTitle}>{title}</ThemedText>
        <ThemedText style={styles.lastUpdated}>{lastUpdated}</ThemedText>
      </View>
      <Ionicons
        name={isExpanded ? 'chevron-up' : 'chevron-down'}
        size={20}
        color={Colors.textLight}
      />
    </TouchableOpacity>
    {isExpanded && (
      <View style={styles.policyContent}>
        <ThemedText style={styles.policyText}>{content}</ThemedText>
      </View>
    )}
  </View>
);

export default function PoliciesScreen() {
  const router = useRouter();
  const [expandedPolicies, setExpandedPolicies] = useState<string[]>([]);

  const togglePolicy = (policyId: string) => {
    setExpandedPolicies((prev) =>
      prev.includes(policyId)
        ? prev.filter((id) => id !== policyId)
        : [...prev, policyId]
    );
  };

  const policies = [
    {
      id: 'terms',
      title: '이용약관',
      lastUpdated: '2024-01-01',
      content: `DormWith 서비스 이용약관

제1장 총칙
제1조 (목적)
본 약관은 DormWith(이하 "회사")가 제공하는 인터넷 기반 룸메이트 매칭 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (약관의 효력과 변경)
본 약관은 서비스 이용자(이하 "이용자")가 본 약관에 동의함으로써 효력이 발생합니다.
회사는 필요에 따라 약관을 개정할 수 있으며, 개정된 약관은 서비스 내 공지함으로써 효력을 발생합니다.

제3조 (서비스의 이용)
이용자는 본 약관에 따라 회사가 제공하는 서비스를 이용할 수 있습니다.
서비스 이용에 필요한 회원가입 및 개인정보 제공은 이용자의 책임입니다.`,
    },
    {
      id: 'privacy',
      title: '개인정보 처리방침',
      lastUpdated: '2024-01-01',
      content: `개인정보 처리방침

1. 개인정보의 수집 및 이용
회사는 이용자의 개인정보를 다음의 목적을 위해 수집 및 이용합니다.
- 회원 가입 및 서비스 제공
- 매칭 알고리즘 운영
- 고객 상담 및 문제 해결
- 서비스 개선 및 통계

2. 개인정보의 보관 기간
수집된 개인정보는 서비스 이용 기간 동안 보관하며, 이용 종료 후 안전하게 삭제합니다.
다만, 관계 법령에 따라 보관이 필요한 경우는 해당 기간 동안 보관합니다.

3. 개인정보의 보호
회사는 이용자의 개인정보를 보호하기 위해 적절한 기술적, 관리적 대책을 마련합니다.`,
    },
    {
      id: 'service',
      title: '서비스 이용 규칙',
      lastUpdated: '2024-01-01',
      content: `서비스 이용 규칙

1. 금지 행위
이용자는 서비스 이용 시 다음의 행위를 금지합니다.
- 다른 이용자를 명예훼손, 모욕하는 행위
- 부정한 목적으로 서비스를 이용하는 행위
- 서비스의 안정성을 해치는 행위
- 타인의 정보를 무단으로 수집하거나 유포하는 행위

2. 제재
위반 사항이 확인될 경우, 회사는 이용자 계정을 제한하거나 탈퇴시킬 수 있습니다.

3. 매칭 서비스
- 매칭은 생활 패턴 분석을 기반으로 자동으로 제공됩니다.
- 매칭 결과에 대한 책임은 이용자에게 있습니다.`,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>약관 및 정책</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionSubtitle}>
            DormWith의 약관 및 정책을 확인하세요
          </ThemedText>

          {policies.map((policy) => (
            <PolicyItem
              key={policy.id}
              title={policy.title}
              lastUpdated={`최근 수정: ${policy.lastUpdated}`}
              isExpanded={expandedPolicies.includes(policy.id)}
              onToggle={() => togglePolicy(policy.id)}
              content={policy.content}
            />
          ))}
        </View>

        {/* 버전 정보 */}
        <View style={styles.section}>
          <View style={styles.versionCard}>
            <ThemedText style={styles.versionLabel}>앱 버전</ThemedText>
            <ThemedText style={styles.versionNumber}>1.0.0</ThemedText>
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
    padding: 16,
    backgroundColor: Colors.background,
    marginVertical: 8,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  policyItem: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  policyTitleArea: {
    flex: 1,
    gap: 4,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  lastUpdated: {
    fontSize: 11,
    color: Colors.textLight,
  },
  policyContent: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingHorizontal: 14,
    paddingVertical: 12,
    maxHeight: 400,
  },
  policyText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  versionCard: {
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  versionLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
