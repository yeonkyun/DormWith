import { create } from 'zustand';
import { MatchUser } from '@/types/matching';
import {
  mockRecommendedUsers,
  mockWaitingMatches,
  mockReceivedRequests,
} from '@/constants/mockData';

interface MatchingStore {
  // 상태
  recommendedUsers: MatchUser[];
  waitingMatches: MatchUser[];
  receivedRequests: MatchUser[];
  rejectedUsers: string[];

  // 액션
  rejectUser: (userId: string) => void;
  likeUser: (userId: string) => void;
  initializeStore: () => void;
  getStatusCounts: () => {
    waiting: number;
    received: number;
  };
}

export const useMatchingStore = create<MatchingStore>((set, get) => ({
  recommendedUsers: [],
  waitingMatches: [],
  receivedRequests: [],
  rejectedUsers: [],

  initializeStore: () => {
    set({
      recommendedUsers: mockRecommendedUsers,
      waitingMatches: mockWaitingMatches,
      receivedRequests: mockReceivedRequests,
      rejectedUsers: [],
    });
  },

  rejectUser: (userId: string) => {
    set((state) => ({
      recommendedUsers: state.recommendedUsers.filter((u) => u.id !== userId),
      rejectedUsers: [...state.rejectedUsers, userId],
    }));
  },

  likeUser: (userId: string) => {
    set((state) => {
      const user = state.recommendedUsers.find((u) => u.id === userId);
      if (!user) return state;

      return {
        recommendedUsers: state.recommendedUsers.filter((u) => u.id !== userId),
        waitingMatches: [...state.waitingMatches, user],
      };
    });
  },

  getStatusCounts: () => {
    const state = get();
    return {
      waiting: state.waitingMatches.length,
      received: state.receivedRequests.length,
    };
  },
}));
