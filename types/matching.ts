// 사용자 정보 타입
export interface MatchUser {
  id: string;
  name: string;
  age: number;
  gender: '남성' | '여성';
  grade: number;
  profileImage?: string;
  bio: string;
  tags: string[];
  compatibility: number; // 0-100 호환도
  createdAt: string;
}

// 매칭 상태
export enum MatchingStatus {
  RECOMMENDED = 'recommended', // 추천
  WAITING = 'waiting', // 대기 중 (내가 관심 표시)
  RECEIVED = 'received', // 받은 요청 (상대가 관심 표시)
  MATCHED = 'matched', // 매칭됨
}

// 매칭 상태 카운트
export interface MatchingStatus_Count {
  waiting: number;
  received: number;
  matched: number;
}
