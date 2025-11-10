import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function MatchingScreen() {

  return (
    <ThemedView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>매칭</ThemedText>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 매칭 상태 */}
        <View style={styles.statusCard}>
          <ThemedText type="subtitle">현재 매칭 상태</ThemedText>
          <View style={styles.statusInfo}>
            <ThemedText style={styles.statusText}>대기 중인 매칭</ThemedText>
            <ThemedText style={styles.statusNumber}>3명</ThemedText>
          </View>
          <View style={styles.statusInfo}>
            <ThemedText style={styles.statusText}>받은 요청</ThemedText>
            <ThemedText style={styles.statusNumber}>5건</ThemedText>
          </View>
        </View>

        {/* 추천 룸메이트 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">추천 룸메이트</ThemedText>
            <ThemedText style={styles.sectionSubtext}>
              회원님과 생활 패턴이 비슷한 분들이에요
            </ThemedText>
          </View>

          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.matchCard}>
              <View style={styles.matchProfile}>
                <View style={styles.profileImage}>
                  <Ionicons name="person" size={32} color="#999" />
                </View>
                <View style={styles.matchInfo}>
                  <ThemedText style={styles.matchName}>룸메이트 {item}</ThemedText>
                  <ThemedText style={styles.matchMeta}>
                    {item % 2 === 0 ? '여성' : '남성'} • {20 + item}살 • {item}학년
                  </ThemedText>
                  <View style={styles.tagContainer}>
                    <View style={styles.tag}>
                      <ThemedText style={styles.tagText}>깔끔함</ThemedText>
                    </View>
                    <View style={styles.tag}>
                      <ThemedText style={styles.tagText}>조용함</ThemedText>
                    </View>
                    <View style={styles.tag}>
                      <ThemedText style={styles.tagText}>아침형</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.matchActions}>
                <TouchableOpacity style={styles.rejectButton}>
                  <ThemedText style={styles.rejectButtonText}>거절</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.likeButton}>
                  <ThemedText style={styles.likeButtonText}>관심</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  statusCard: {
    padding: 20,
    margin: 16,
    borderRadius: 16,
    backgroundColor: Colors.background,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
  },
  statusNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    paddingVertical: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionSubtext: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
  },
  matchCard: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: Colors.background,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  matchProfile: {
    flexDirection: 'row',
    gap: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchInfo: {
    flex: 1,
    gap: 4,
  },
  matchName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchMeta: {
    fontSize: 13,
    opacity: 0.6,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e3f2fd',
  },
  tagText: {
    fontSize: 11,
    color: '#1976d2',
  },
  matchActions: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  likeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  likeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
