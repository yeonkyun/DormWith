// 사용자 프로필
export interface UserProfile {
  id: string;
  name: string;
  gender: '남성' | '여성';
  age: number;
  grade: number;
  bio: string;
  profileImage?: string;
  tags: string[];
  createdAt: string;
}

// 게시글
export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  bookmarks: number;
  createdAt: string;
  authorId: string;
}

// 매칭 히스토리
export interface MatchingHistory {
  id: string;
  targetUserId: string;
  targetName: string;
  status: 'matched' | 'rejected' | 'waiting';
  createdAt: string;
}

// 알림 설정
export interface NotificationSettings {
  matchNotification: boolean;
  commentNotification: boolean;
  likeNotification: boolean;
  messageNotification: boolean;
  emailNotification: boolean;
}

// FAQ/고객센터
export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}
