import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUserProfile } = useUserStore();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [selectedTags, setSelectedTags] = useState(user.tags);

  const availableTags = ['깔끔함', '조용함', '아침형', '밤형', '친절함', '활발함', '성실함', '배려심'];

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    updateUserProfile({
      name,
      bio,
      tags: selectedTags,
    });
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>프로필 수정</ThemedText>
        <TouchableOpacity onPress={handleSave}>
          <ThemedText style={styles.saveButton}>저장</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 프로필 이미지 */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={50} color="#999" />
          </View>
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={16} color={Colors.primary} />
            <ThemedText style={styles.editImageText}>사진 변경</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 기본 정보 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>기본 정보</ThemedText>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>이름</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력하세요"
              placeholderTextColor={Colors.textLight}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>성별</ThemedText>
            <View style={styles.readOnlyField}>
              <ThemedText>{user.gender}</ThemedText>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>나이</ThemedText>
            <View style={styles.readOnlyField}>
              <ThemedText>{user.age}세</ThemedText>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={styles.fieldLabel}>학년</ThemedText>
            <View style={styles.readOnlyField}>
              <ThemedText>{user.grade}학년</ThemedText>
            </View>
          </View>
        </View>

        {/* 자기소개 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>자기소개</ThemedText>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="자신을 소개해주세요"
            placeholderTextColor={Colors.textLight}
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          <ThemedText style={styles.charCount}>{bio.length}/200자</ThemedText>
        </View>

        {/* 생활 습관 태그 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>생활 습관 (최대 5개)</ThemedText>
          <View style={styles.tagGrid}>
            {availableTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagButton,
                  selectedTags.includes(tag) && styles.tagButtonSelected,
                ]}
                onPress={() => handleToggleTag(tag)}
              >
                <ThemedText
                  style={[
                    styles.tagButtonText,
                    selectedTags.includes(tag) && styles.tagButtonTextSelected,
                  ]}
                >
                  {tag}
                </ThemedText>
              </TouchableOpacity>
            ))}
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
  saveButton: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  editImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundGray,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  editImageText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
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
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
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
  readOnlyField: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.backgroundGray,
    justifyContent: 'center',
  },
  bioInput: {
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 6,
    textAlign: 'right',
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.background,
  },
  tagButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#e3f2fd',
  },
  tagButtonText: {
    fontSize: 13,
    color: Colors.text,
  },
  tagButtonTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
