import { ScrollView, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { faqs } from '@/constants/profileMockData';

const FAQItem = ({
  faq,
  isExpanded,
  onToggle,
}: {
  faq: any;
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <View style={styles.faqItem}>
    <TouchableOpacity style={styles.faqHeader} onPress={onToggle}>
      <ThemedText style={styles.faqQuestion}>{faq.question}</ThemedText>
      <Ionicons
        name={isExpanded ? 'chevron-up' : 'chevron-down'}
        size={20}
        color={Colors.textLight}
      />
    </TouchableOpacity>
    {isExpanded && (
      <View style={styles.faqContent}>
        <ThemedText style={styles.faqAnswer}>{faq.answer}</ThemedText>
      </View>
    )}
  </View>
);

export default function CustomerServiceScreen() {
  const router = useRouter();
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  const [category, setCategory] = useState('일반');

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQs((prev) =>
      prev.includes(faqId) ? prev.filter((id) => id !== faqId) : [...prev, faqId]
    );
  };

  const categories = ['일반', '매칭', '게시판', '기술 문제', '기타'];

  const handleSubmitInquiry = () => {
    if (inquiryTitle.trim() && inquiryContent.trim()) {
      alert('문의가 접수되었습니다. 빠른 시간 내에 답변드리겠습니다.');
      setInquiryTitle('');
      setInquiryContent('');
      setCategory('일반');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>고객센터</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 자주 묻는 질문 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>자주 묻는 질문</ThemedText>
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isExpanded={expandedFAQs.includes(faq.id)}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </View>

        {/* 문의하기 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>문의하기</ThemedText>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>카테고리</ThemedText>
            <View style={styles.categoryButtons}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    category === cat && styles.categoryButtonActive,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <ThemedText
                    style={[
                      styles.categoryButtonText,
                      category === cat && styles.categoryButtonTextActive,
                    ]}
                  >
                    {cat}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>제목</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="문의 제목을 입력하세요"
              placeholderTextColor={Colors.textLight}
              value={inquiryTitle}
              onChangeText={setInquiryTitle}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>내용</ThemedText>
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="자세한 내용을 입력하세요"
              placeholderTextColor={Colors.textLight}
              value={inquiryContent}
              onChangeText={setInquiryContent}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitInquiry}>
            <ThemedText style={styles.submitButtonText}>문의 접수</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 추가 지원 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>추가 지원</ThemedText>
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportIcon}>
              <Ionicons name="mail" size={20} color={Colors.primary} />
            </View>
            <View style={styles.supportInfo}>
              <ThemedText style={styles.supportTitle}>이메일 문의</ThemedText>
              <ThemedText style={styles.supportEmail}>support@dormwith.com</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.text,
  },
  faqItem: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    color: Colors.text,
  },
  faqContent: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  faqAnswer: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.backgroundLight,
  },
  categoryButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: '#e3f2fd',
  },
  categoryButtonText: {
    fontSize: 12,
    color: Colors.text,
  },
  categoryButtonTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.backgroundLight,
    fontSize: 14,
    color: Colors.text,
  },
  contentInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 12,
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  supportEmail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
