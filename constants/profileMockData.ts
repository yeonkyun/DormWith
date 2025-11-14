import { UserProfile, Post, MatchingHistory, NotificationSettings, FAQ } from '@/types/profile';

// 현재 사용자 정보
export const currentUser: UserProfile = {
  id: 'user-001',
  name: '홍길동',
  gender: '남성',
  age: 22,
  grade: 2,
  bio: '기숙사 룸메이트를 찾고 있습니다. 깔끔함과 배려를 중요하게 생각합니다.',
  tags: ['깔끔함', '조용함', '아침형'],
  createdAt: '2024-01-01',
};

// 내가 쓴 글
export const myPosts: Post[] = [
  {
    id: 'post-1',
    title: '기숙사 생활 팁 공유합니다!',
    content: '기숙사 생활을 하면서 배운 유용한 팁들을 공유하고 싶습니다...',
    category: '생활 팁',
    likes: 24,
    comments: 8,
    bookmarks: 12,
    createdAt: '2024-11-10',
    authorId: 'user-001',
  },
  {
    id: 'post-2',
    title: '룸메이트와의 첫 만남 어떻게 준비해야 하나요?',
    content: '다음 주에 룸메이트와 처음 만나는데 어떻게 준비해야 좋을까요?...',
    category: '질문',
    likes: 15,
    comments: 12,
    bookmarks: 5,
    createdAt: '2024-11-08',
    authorId: 'user-001',
  },
  {
    id: 'post-3',
    title: '방음 문제 해결 방법',
    content: '기숙사에서 소음이 많았는데 이런 방법으로 해결했습니다...',
    category: '팁',
    likes: 32,
    comments: 6,
    bookmarks: 18,
    createdAt: '2024-11-05',
    authorId: 'user-001',
  },
];

// 댓글 단 글
export const commentedPosts: Post[] = [
  {
    id: 'post-4',
    title: '기숙사 후배들을 위한 꿀팁 모음',
    content: '선배로서 후배들에게 도움이 될 만한 팁들을 모아봤습니다...',
    category: '정보',
    likes: 45,
    comments: 20,
    bookmarks: 30,
    createdAt: '2024-11-12',
    authorId: 'user-002',
  },
  {
    id: 'post-5',
    title: '룸메이트 간 갈등 해결하기',
    content: '룸메이트와 마찰이 생겼을 때 어떻게 대처해야 할까요?...',
    category: '상담',
    likes: 28,
    comments: 15,
    bookmarks: 12,
    createdAt: '2024-11-09',
    authorId: 'user-003',
  },
];

// 좋아요한 글
export const likedPosts: Post[] = [
  {
    id: 'post-6',
    title: '기숙사에서 공부 잘하는 방법',
    content: '조용한 환경을 유지하면서 효율적으로 공부하는 방법...',
    category: '공부법',
    likes: 56,
    comments: 18,
    bookmarks: 34,
    createdAt: '2024-11-11',
    authorId: 'user-004',
  },
  {
    id: 'post-7',
    title: '기숙사 비용 절감 노하우',
    content: '기숙사 생활 중 돈을 절약할 수 있는 다양한 방법들...',
    category: '정보',
    likes: 42,
    comments: 14,
    bookmarks: 28,
    createdAt: '2024-11-07',
    authorId: 'user-005',
  },
  {
    id: 'post-8',
    title: '룸메이트와 좋은 관계 유지하는 법',
    content: '서로 다른 성격의 룸메이트와 잘 지내는 방법...',
    category: '관계',
    likes: 38,
    comments: 11,
    bookmarks: 22,
    createdAt: '2024-11-06',
    authorId: 'user-006',
  },
];

// 북마크한 글
export const bookmarkedPosts: Post[] = [
  ...likedPosts,
  {
    id: 'post-9',
    title: '기숙사 신입생 필수 준비물',
    content: '기숙사에 처음 가는 신입생들이 꼭 챙겨야 할 물건들...',
    category: '준비',
    likes: 67,
    comments: 25,
    bookmarks: 48,
    createdAt: '2024-11-04',
    authorId: 'user-007',
  },
];

// 매칭 히스토리
export const matchingHistory: MatchingHistory[] = [
  {
    id: 'match-1',
    targetUserId: 'user-100',
    targetName: '김민지',
    status: 'matched',
    createdAt: '2024-11-01',
  },
  {
    id: 'match-2',
    targetUserId: 'user-101',
    targetName: '이준호',
    status: 'waiting',
    createdAt: '2024-10-28',
  },
  {
    id: 'match-3',
    targetUserId: 'user-102',
    targetName: '박지연',
    status: 'rejected',
    createdAt: '2024-10-25',
  },
];

// 관심 목록 (매칭)
export const interestedMatches: MatchingHistory[] = [
  {
    id: 'int-1',
    targetUserId: 'user-200',
    targetName: '최현준',
    status: 'waiting',
    createdAt: '2024-11-12',
  },
  {
    id: 'int-2',
    targetUserId: 'user-201',
    targetName: '이서윤',
    status: 'waiting',
    createdAt: '2024-11-10',
  },
  {
    id: 'int-3',
    targetUserId: 'user-202',
    targetName: '정우성',
    status: 'waiting',
    createdAt: '2024-11-08',
  },
];

// 알림 설정 기본값
export const defaultNotificationSettings: NotificationSettings = {
  matchNotification: true,
  commentNotification: true,
  likeNotification: true,
  messageNotification: true,
  emailNotification: false,
};

// FAQ 목록
export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    category: '매칭',
    question: '매칭은 어떻게 이루어지나요?',
    answer: '생활 패턴 분석을 통해 가장 잘 맞는 룸메이트를 추천해드립니다. 추천된 사용자에게 관심을 표시하면 대기 중으로 이동됩니다.',
  },
  {
    id: 'faq-2',
    category: '매칭',
    question: '거절한 사용자는 다시 볼 수 있나요?',
    answer: '거절한 사용자는 향후 추천에서 제외됩니다. 변경을 원하시면 고객센터에 문의해주세요.',
  },
  {
    id: 'faq-3',
    category: '게시판',
    question: '게시글을 삭제하려면 어떻게 하나요?',
    answer: '게시글 상세 페이지의 메뉴에서 삭제를 선택할 수 있습니다.',
  },
  {
    id: 'faq-4',
    category: '계정',
    question: '회원 탈퇴는 어떻게 하나요?',
    answer: '개인정보 설정 페이지의 맨 아래에서 계정 탈퇴를 선택할 수 있습니다.',
  },
  {
    id: 'faq-5',
    category: '기타',
    question: '문제를 보고하려면?',
    answer: '고객센터 페이지의 문의 양식을 통해 신고할 수 있습니다.',
  },
];

// 활동 통계
export const activityStats = {
  totalPosts: myPosts.length,
  totalComments: commentedPosts.length,
  totalLikes: likedPosts.length,
  totalBookmarks: bookmarkedPosts.length,
  matchingCount: matchingHistory.filter((m) => m.status === 'matched').length,
  waitingCount: matchingHistory.filter((m) => m.status === 'waiting').length,
};
